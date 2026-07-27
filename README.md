# Dark Optimistic Oracle Web App

Transaction console for `dark_optimistic_oracle.aleo` on Aleo testnet.

- Website: https://dark-optimistic-oracle.github.io/website/
- App: https://dark-optimistic-oracle.github.io/webapp/
- Documentation: https://dark-optimistic-oracle.github.io/webdocs/

Protocol purpose, lifecycle, privacy boundaries, architecture, and integration notes live in the [documentation repository](https://github.com/dark-optimistic-oracle/webdocs).

## Features

- Shield wallet connection on Aleo testnet.
- Public assertion lookup by known ID.
- Assertion and dispute transactions.
- Private voting-right, confirm, and deny transactions.
- Public and private settlement transactions.
- Fail-closed network and program availability checks.

## Development

```bash
pnpm install
pnpm run dev
```

For local Aleo devnet setup and sample records, follow `../core/README.md` and `../core/demo/README.md`.

## Validation

```bash
pnpm run lint
pnpm exec vitest run
pnpm run build
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes from `main`. In repository Pages settings, select **GitHub Actions** as the source.

The production build uses `/webapp/` as its Vite base path. A future custom domain can be attached through GitHub Pages without changing application routes.
