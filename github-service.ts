import {graphql} from '@octokit/graphql';
import type {ContributionKind} from './score-calculator';

export interface RepoStats {
  issues: number;
  pullRequests: number;
}

// score-calculator.ts 의 ContributionKind(doc 단수형)를 그대로 재사용해
// 도메인 용어를 통일합니다. 미인식 라벨은 'none'으로만 확장합니다.
export type ContributionLabel = ContributionKind | 'none';

export interface PRRecord {
  number: number;
  title: string;
  url: string;
  isMerged: boolean;
  labels: string[];
  category: ContributionLabel;
  additions?: number;
  deletions?: number;
  mergedAt?: string;
  author?: string;
}

export interface IssueRecord {
  number: number;
  title: string;
  url: string;
  labels: string[];
  category: ContributionLabel;
  state: string;
  author?: string;
  createdAt?: string;
  closedAt?: string;
}

export interface DetailedRepoData {
  prs: PRRecord[];
  issues: IssueRecord[];
}

interface RepositoryStatsResponse {
  repository: {
    issues: {totalCount: number};
    pullRequests: {totalCount: number};
  };
}

interface RawAuthor {
  login: string;
}

interface RawLabel {
  name: string;
}

interface RawIssue {
  number: number;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  closedAt: string | null;
  author: RawAuthor | null;
  labels: {nodes: RawLabel[]} | null;
}

interface RawPullRequest {
  number: number;
  title: string;
  url: string;
  merged: boolean;
  mergedAt: string | null;
  additions: number;
  deletions: number;
  author: RawAuthor | null;
  labels: {nodes: RawLabel[]} | null;
}

interface DetailedRepoResponse {
  repository: {
    issues: {nodes: RawIssue[]};
    pullRequests: {nodes: RawPullRequest[]};
  };
}

const PAGE_SIZE = 100;

// 라벨 문자열을 ContributionLabel 카테고리로 정규화합니다.
// 소문자 변환 후 하이픈/공백/언더스코어를 제거해 매칭합니다.
export const normalizeLabel = (label: string): ContributionLabel => {
  const key = label.toLowerCase().replace(/[-_\s]/g, '');
  if (key === 'feat' || key === 'feature') return 'feature';
  if (key === 'bug') return 'bug';
  if (key === 'doc' || key === 'docs' || key === 'documentation') return 'doc';
  if (key === 'typo') return 'typo';
  return 'none';
};

// 라벨 배열에서 첫 번째로 인식되는 ContributionLabel을 반환합니다.
// 인식 가능한 라벨이 없으면 'none'을 반환합니다.
export const categorizeLabels = (labels: string[]): ContributionLabel => {
  for (const label of labels) {
    const category = normalizeLabel(label);
    if (category !== 'none') {
      return category;
    }
  }
  return 'none';
};

const extractLabelNames = (labels: {nodes: RawLabel[]} | null): string[] => {
  if (!labels || !labels.nodes) return [];
  return labels.nodes.map(node => node.name).filter(name => Boolean(name));
};

const toIssueRecord = (raw: RawIssue): IssueRecord => {
  const labels = extractLabelNames(raw.labels);
  return {
    number: raw.number,
    title: raw.title,
    url: raw.url,
    labels,
    category: categorizeLabels(labels),
    state: raw.state,
    author: raw.author?.login,
    createdAt: raw.createdAt,
    closedAt: raw.closedAt ?? undefined,
  };
};

const toPrRecord = (raw: RawPullRequest): PRRecord => {
  const labels = extractLabelNames(raw.labels);
  return {
    number: raw.number,
    title: raw.title,
    url: raw.url,
    isMerged: raw.merged,
    labels,
    category: categorizeLabels(labels),
    additions: raw.additions,
    deletions: raw.deletions,
    mergedAt: raw.mergedAt ?? undefined,
    author: raw.author?.login,
  };
};

// GraphQL 응답을 DetailedRepoData로 변환합니다.
// 응답에 라벨이 없거나 인식되지 않는 경우 category는 'none'으로 설정됩니다.
export const mapDetailedRepoResponse = (
  response: DetailedRepoResponse,
): DetailedRepoData => {
  const issueNodes = response.repository.issues?.nodes ?? [];
  const prNodes = response.repository.pullRequests?.nodes ?? [];

  return {
    issues: issueNodes.map(toIssueRecord),
    prs: prNodes.map(toPrRecord),
  };
};

// DetailedRepoData에서 카테고리별 개수를 집계합니다.
export interface CategoryCounts {
  feature: number;
  bug: number;
  doc: number;
  typo: number;
  none: number;
}

export const countByCategory = (
  records: ReadonlyArray<{category: ContributionLabel}>,
): CategoryCounts => {
  const counts: CategoryCounts = {
    feature: 0,
    bug: 0,
    doc: 0,
    typo: 0,
    none: 0,
  };
  for (const record of records) {
    counts[record.category] += 1;
  }
  return counts;
};

export const createGitHubService = (token: string) => {
  const githubGraphQL = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  const getRepoStats = async (
    owner: string,
    repo: string,
  ): Promise<RepoStats> => {
    const result = await githubGraphQL<RepositoryStatsResponse>(
      `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues { totalCount }
          pullRequests { totalCount }
        }
      }
      `,
      {owner, repo},
    );

    return {
      issues: result.repository.issues.totalCount,
      pullRequests: result.repository.pullRequests.totalCount,
    };
  };

  // closed 이슈와 merged PR을 한 번의 GraphQL 요청으로 조회합니다.
  // 라벨 정보를 포함하며, 응답 누락 시 안전하게 빈 값으로 처리됩니다.
  const getDetailedRepoData = async (
    owner: string,
    repo: string,
  ): Promise<DetailedRepoData> => {
    const response = await githubGraphQL<DetailedRepoResponse>(
      `
      query($owner: String!, $repo: String!, $pageSize: Int!) {
        repository(owner: $owner, name: $repo) {
          issues(first: $pageSize, states: CLOSED, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              number
              title
              url
              state
              createdAt
              closedAt
              author { login }
              labels(first: 20) { nodes { name } }
            }
          }
          pullRequests(first: $pageSize, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              number
              title
              url
              merged
              mergedAt
              additions
              deletions
              author { login }
              labels(first: 20) { nodes { name } }
            }
          }
        }
      }
      `,
      {owner, repo, pageSize: PAGE_SIZE},
    );

    return mapDetailedRepoResponse(response);
  };

  return {
    getRepoStats,
    getDetailedRepoData,
  };
};
