# reposcore-ts

A CLI for scoring student participation in an open-source class repo, implemented in TypeScript using GraphQL.

## Usage

Install dependencies:

```bash
bun install
```

Run the CLI:

```bash
bun run index.ts <owner/repo> [options]
```

Example:

```bash
bun run index.ts oss2026hnu/reposcore-ts --format csv
```

You can also pass a GitHub Personal Access Token with `--token`:

```bash
bun run index.ts oss2026hnu/reposcore-ts --token your_token --format txt
```

If you do not pass a token with `--token`, set the `GITHUB_TOKEN` environment variable before running the CLI.

## Synopsis

```text
For more info, run any command with the `--help` flag:
  $ reposcore-ts --help

Options:
  --token <token>    GitHub Personal Access Token (default: $GITHUB_TOKEN)
  --format <format>  출력 형식 (csv, txt) (default: csv)
  -h, --help         Display this message
```
