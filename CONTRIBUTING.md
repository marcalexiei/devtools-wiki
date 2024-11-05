# Contributing

## Setup

[https://marcalexiei.github.io/contribute/setup-pnpm-nvm.html](https://marcalexiei.github.io/contribute/setup-pnpm-nvm.html)

## Development

To run dev server use:

```shell
pnpm dev
```

To run all checks locally:

```shell
pnpm check-all
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

## Commit rules

[https://marcalexiei.github.io/contribute/commit-rules.html](https://marcalexiei.github.io/contribute/commit-rules.html)

## 404 management

Github routing doesn't allow nested routes to be resolved with the root `index.html`:

- if a user open the site, navigate between pages and then reloads the application via browser
- user loads directly a nested page URLs

ends up in a 404 page.

To avoid this behavior the `404.html` page, which github pages renders in all the following scenarios,
includes a script that reads the path from the current `window.location` and performs a redirect to
`/?{path}`.
On the main entry point if location has a query it will be used as `url` parameter
in `window.history.replaceState` invocation.
