# Verynize Marketing

TanStack Start + React landing page for Verynize. English product copy targets designers and developers working with local AI agents.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. The Cloudflare Vite adapter runs SSR in local workerd. `npm run build` writes Workers Build Output to `.cloudflare/output/`; `npm run preview` previews that build locally.

## Validation

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm test
```

Tests cover SSR content, perspective switching, FAQ expansion, mobile navigation, clipboard copying, roadmap navigation/filtering, and layout overflow. These checks validate the marketing site, not the product runtime.

## Content sources

Copy is based on product **0.17.0** at commit `e14b81b79aefe7cc94bfb34128670f123d6caba5`, including `../verynize-product/README.md`, the acceptance notes updated 2026-10-31, and current code/test evidence reviewed on 2026-11-01. See [the product evidence ledger](docs/product-evidence.md) for supported claims, source conflicts, and validation limits. The product workspace is an original CSS illustration, explicitly labeled as illustrative. It is not a screenshot or evidence of a successful agent task.

The primary CTA opens source-checkout instructions. No public download, paid plan prices, signup, hosted collaboration, or production service is implied. Review the FAQ alongside the implementation status before changing claims. Product source is not bundled into the website. Fonts are bundled locally with their license.

## Pricing commitment

The product owner confirmed that the Verynize app will always be free. Any future paid offerings are limited to optional cloud and AI services. Self-hosting remains free of Verynize license or subscription fees; third-party infrastructure and AI usage may incur provider charges. Preserve this commitment in the hero, free-app section, and FAQ. This policy does not imply that hosted services are already available.

## Repository

This is the marketing Git submodule of the Verynize workspace. Its configured origin is `https://github.com/AdamAbd/verynize-marketing.git`. Commit changes here before updating the submodule pointer in the parent repository. Publishing the Git repository and deploying the website are separate actions.

## Roadmap

`/roadmap` starts from the feature coverage in [Wonder’s roadmap](https://wonder.design/roadmap), read on 2026-10-29 with Agent Reach/Jina Reader, and tracks Verynize’s own capabilities. The implementation and copy are original. Statuses come from our product acceptance notes dated 2026-10-31 and the product evidence ledger, not the vendor’s shipped labels.

The current inventory has 42 directions: 14 Available locally, 23 Partial, and 5 Exploring. The page derives filter counts from `src/data/roadmap.ts`. Statuses distinguish local implementation, incomplete or live-unverified capabilities, and future directions.

Edit `src/data/roadmap.ts` to maintain the feature inventory. Available locally means exercised within stated limits; Partial means bounded implementation or pending validation; Exploring is a parity direction with no delivery commitment. Do not promote an item without new product evidence. Preserve the always-free app and self-hosting commitment.

## License

Original Verynize code and documentation are licensed under the [MIT License](LICENSE). Third-party materials retain their own rights and licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Cloudflare deployment

Marketing is deployed independently of the product to https://verynize-marketing.gayaloo.app.
`cloudflare.config.ts` configures the `verynize-marketing` Worker and its custom domain. The app uses SSR for page routes and Workers assets for static files. No product database, secrets, or cloud-service bindings are needed.

Use a Node version supported by the pinned cf CLI (`^22.23.0`, `^24.22.0`, or `^26.12.0`) and an authenticated cf profile for the account owning the domain:

```sh
npm run deploy:check  # build and cf prebuilt dry-run
npm run deploy        # build and cf deploy --prebuilt
```

Deploying this marketing site does not establish production readiness of the product's collaboration or other hosted features.
