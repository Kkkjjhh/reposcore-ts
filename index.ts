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
  .command("[...repos]", "대상 저장소 목록 (예: owner/repo1 owner/repo2)")
  .option(
    "--token <token>",
    "GitHub Personal Access Token (기본값: $GITHUB_TOKEN)",
  )
  .option("--format <format>", "출력 형식 (csv, txt)", { default: "csv" })
  .action(async (repos: string[], options: { token?: string; format: string }) => {
    // 1. 토큰 체크 (process.exit 대신 return으로 흐름 제어)
    const token = options.token ?? Bun.env.GITHUB_TOKEN;
    if (!token) {
      console.error(
        "오류: GitHub 토큰이 필요합니다. --token 옵션 또는 GITHUB_TOKEN 환경 변수를 설정하세요.",
      );
      return; 
    }

    // 2. 저장소 입력 여부 확인
    if (repos.length === 0) {
      console.error("오류: 최소 하나 이상의 저장소(owner/repo)를 입력해야 합니다.");
      cli.outputHelp();
      return;
    }

    console.log("분석 기능 구현 중입니다.");
    console.log(`저장소: ${repos.join(", ")}`);
    console.log(`형식: ${options.format}`);

    const githubGraphQL = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    for (const repoPath of repos) {
      if (!repoPath.includes("/")) {
        console.error(`오류: '${repoPath}'는 'owner/repo' 형식이 아닙니다. 건너뜀.`);
        continue;
      }

      const [owner, repoName] = repoPath.split("/");

      try {
        const result = await githubGraphQL<RepositoryStatsResponse>(
          `
          query($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
              issues { totalCount }
              pullRequests { totalCount }
            }
          }
          `,
          { owner, repo: repoName },
        );

        console.log(`[${repoPath}] 이슈: ${result.repository.issues.totalCount}, PR: ${result.repository.pullRequests.totalCount}`);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`오류: '${repoPath}'의 데이터를 가져올 수 없습니다.`);
        console.error(`상세 원인: ${errorMessage}`);
      }
    }
  });

cli.help();
cli.parse();
