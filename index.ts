import { graphql } from "@octokit/graphql";
import { cac } from "cac";

interface RepositoryStatsResponse {
  repository: {
    issues: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
  };
}

const cli = cac("reposcore-ts");

cli
  .command("<owner> <repo>", "저장소의 이슈 수와 PR 수를 출력합니다")
  .option(
    "--token <token>",
    "GitHub Personal Access Token (기본값: $GITHUB_TOKEN)",
  )
  .action(async (owner: string, repo: string, options: { token?: string }) => {
    const token = options.token ?? Bun.env.GITHUB_TOKEN;
    if (!token) {
      console.error(
        "오류: GitHub 토큰이 필요합니다. --token 옵션 또는 GITHUB_TOKEN 환경 변수를 설정하세요.",
      );
      process.exit(1);
    }

    const githubGraphQL = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    const result = await githubGraphQL<RepositoryStatsResponse>(
      `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
        }
      }
      `,
      { owner, repo },
    );

    console.log(`이슈 수: ${result.repository.issues.totalCount}`);
    console.log(`PR 수: ${result.repository.pullRequests.totalCount}`);
  });

cli.help();
cli.parse();
