# You Don't Need an ngOnInit: Reactive Programming With Signals

Source code for the **Angular Kenya** online Thursday webinar: *You Don't Need an ngOnInit: Reactive Programming With Signals*.

**[Watch the webinar recording on YouTube](https://www.youtube.com/live/8k9o4T4sn9k)** · **[View the slides (Google Slides)](https://docs.google.com/presentation/d/1ciA354H0gydgcQwMdrNy-AB-OmLzqDiHAuv56Igahk8/edit?usp=sharing)**

The demo is a paginated product catalog backed by the [DummyJSON](https://dummyjson.com) API. Each branch implements the same UI with a different approach to loading data, so you can compare imperative lifecycle hooks, zoneless pitfalls, signal-based resources, and a classic RxJS pipeline side by side.

## What you'll learn

- How imperative state (`loading`, `error`, manual `subscribe`) compares to declarative data flow
- Think in visual states and relationships
- How `httpResource` and signals express loading, success, and error without lifecycle hooks
- How the same feature looks with RxJS streams (still without `ngOnInit`)

## Branches

`main` is a minimal Angular CLI scaffold. The full webinar demo lives on the feature branches—check out the branch you want to explore, then run the app.

| Branch | Description |
|--------|-------------|
| [`main`](https://github.com/suleyunus/reactive-programming-with-signals/tree/main) | Starter project (no product feature yet) |
| [`with-ngoninit`](https://github.com/suleyunus/reactive-programming-with-signals/tree/with-ngoninit) | Imperative approach: mutable fields, manual `subscribe`, and `ngOnInit` to load the first page |
| [`with-ngoninit-no-zones`](https://github.com/suleyunus/reactive-programming-with-signals/tree/with-ngoninit-no-zones) | Same as `with-ngoninit`, but **zoneless** (`provideZoneChangeDetection` removed)—the request still completes, but the view does not update |
| [`reactive`](https://github.com/suleyunus/reactive-programming-with-signals/tree/reactive) | Declarative approach: `httpResource`, signals for pagination, `OnPush`, no `ngOnInit` |
| [`reactive-rxjs`](https://github.com/suleyunus/reactive-programming-with-signals/tree/reactive-rxjs) | RxJS alternative: `combineLatest`, `switchMap`, and `AsyncPipe`—same idea, no lifecycle hook for initialization |

### Quick comparison

```text
with-ngoninit          →  ngOnInit() → subscribe() → assign fields
with-ngoninit-no-zones →  same code, zoneless → UI doesn't refresh showing pitfalls of non-reactive code
reactive               →  signals + httpResource → template reads resource state
reactive-rxjs          →  observables + async pipe → vm$ drives the template
```

### Where to look in the code

On the feature branches, the main teaching material is under:

- `src/app/feature/product/product-list/product-list.ts` — list component (differs per branch)
- `src/app/feature/product/data/product-service.ts` — HTTP layer (`HttpClient` vs `httpResource`)

## Getting started

**Requirements:** Node.js 20+, npm 11+

```bash
git clone https://github.com/suleyunus/reactive-programming-with-signals.git
cd reactive-programming-with-signals

# Pick a branch (example: signal-based reactive version)
git checkout reactive

npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The app redirects to `/product`, which shows the paginated product grid.

### Try the zoneless failure

```bash
git checkout with-ngoninit-no-zones
npm start
```

Load products and paginate. Network calls succeed, but without Zone.js–driven change detection the template may not reflect new data until something else triggers updates—this is intentional for the webinar discussion.

## Tech stack

- [Angular](https://angular.dev) 21 (standalone components, signals, `httpResource`)
- [PrimeNG](https://primeng.org) + Aura theme (DataView, toasts, skeletons)
- [Tailwind CSS](https://tailwindcss.com) 4
- [DummyJSON](https://dummyjson.com/docs/products) products API

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest via Angular CLI) |

## Project structure (feature branches)

```text
src/app/
├── app.config.ts          # App providers (zone vs zoneless differs by branch)
├── app.routes.ts          # Routes → lazy-loaded product feature
└── feature/
    ├── product/
    │   ├── data/          # Models + ProductService
    │   ├── product-list/  # Main demo component
    │   └── ui/            # Product card + skeleton
    └── shared-ui/error/   # Shared error presentation
```

## Additional resources

- [Webinar recording (YouTube)](https://www.youtube.com/live/8k9o4T4sn9k)
- [Slides: Angular Kenya — You Don't need an ngOnInit (Google Slides)](https://docs.google.com/presentation/d/1ciA354H0gydgcQwMdrNy-AB-OmLzqDiHAuv56Igahk8/edit?usp=sharing)
- [Angular signals guide](https://angular.dev/guide/signals)
- [Angular httpResource](https://angular.dev/guide/http/http-resource)
- [Angular zoneless change detection](https://angular.dev/guide/zoneless)

## License

This repository is provided as webinar companion code. Use and adapt it for learning and talks; attribute Angular Kenya and the repo when sharing publicly.
