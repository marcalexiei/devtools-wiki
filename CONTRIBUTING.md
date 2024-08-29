# Contributing

## Setup

This repository uses:

- `node` via [`nvm`](https://github.com/nvm-sh)
- `pnpm` as package manager via [`corepack`].

```shell
# install nvm
nvm use
```

```shell
corepack use pnpm
```

## Development

To run dev server use:

```shell
pnpm dev
```

To run all checks locally:

```shell
pnpm codecheck
```

## Adding dependency or a dev dependency

When installing a new dependency check if it can be added to one of dependabot groups on [dependabot.yml](.github/dependabot.yml)

## Build and deploy

Deploy is performed via GitHub Actions, hence is completely automated:

1. When merging on `main` `CI` workflow is run.
2. After its completion  `CD` workflow is triggered
3. If `CI` workflow is completed successfully then `CD` workflow build the site and performs the deploy using `actions/deploy-pages`

> [!NOTE]
> If needed `CD` workflow can be executed manually from the GitHub Actions UI
