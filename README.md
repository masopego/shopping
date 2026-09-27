# MBST Shopping App 📱

Looking for a new phone? So was I 🤳! This is my version of the MBST shopping app: search your next smartphone,
choose its storage and color and put it in your bag. Come in, **enjoy my code and find your perfect phone**!

## ▶️ To start

It is time to go shopping. You will need **Node.js 20.9 or later** and an API key for the products API.

- Start by **cloning or downloading this project**, then create your environment file from the example and add
  your API key:

```bash
cp .env.example .env
```

```bash
API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
API_KEY=your-api-key
```

- Execute these commands in your terminal:

```bash
npm install && npm run dev
```

MBST Shopping App is now running at http://localhost:3000!

Other commands you may need:

| Command                 | What it does                            |
| ----------------------- | --------------------------------------- |
| `npm run build`         | Builds the app for production           |
| `npm start`             | Runs the production build               |
| `npm test`              | Runs the tests in watch mode            |
| `npm run test:run`      | Runs the tests once                     |
| `npm run test:coverage` | Runs the tests with the coverage report |
| `npm run lint`          | Lints the code with Oxlint              |
| `npm run typecheck`     | Checks the TypeScript types             |
| `npm run format`        | Formats the code with Prettier          |

<br>

## ▶️ LogBook

<br>

My goal with this test was not only to build three views, but to build them in a way that another developer could
pick up the project tomorrow and feel at home: clear structure, tested code and every decision written down 🤖.
Here is the story of how it went.

<br>

**Hexagonal architecture 🧱**

Before writing a single component I decided how the code would be organised. I chose a
[`hexagonal architecture`](https://alistair.cockburn.us/hexagonal-architecture/) because it keeps the business
logic independent from the framework:

- `core` → domain (models, ports and pure business logic) and infrastructure (API client, mappers and adapters),
  with no dependency on React or Next.
- `ui` → everything React, split into `shared` (reusable pieces), `layout` (header and page wrapper) and
  `features` (cart, product, product detail).
- `app` → only the Next.js routes, which fetch the data from `core` and render `ui` components.

API responses are mapped to domain models, so if the API changes, the views do not notice it. The folder
structure changed a couple of times during the project: when `ui` started to feel like a mixed bag, I reorganised
it into `shared`, `layout` and `features` so it is always clear where a new piece belongs.

<br>

**Testing: Vitest + React Testing Library 📝**

Every feature comes with its tests. I used [`Vitest`](https://vitest.dev/) and
[`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro/), following a few rules I
set for myself at the beginning: one goal per test, tests in a `__tests__` folder next to the file they test, and
test data built with [`object mothers`](https://martinfowler.com/bliki/ObjectMother.html) placed next to the model
they create.

A funny challenge: the search tests got stuck forever. `user-event` relies on its own timers and hangs with the
fake timers I needed to control the search delay, so those tests use `fireEvent` instead.

<br>

**Clean code tooling 🧹**

`Prettier` formats the code on save and `Oxlint` lints it. I also shared the VS Code settings and recommended
extensions in the repository, so anyone who opens the project gets the same experience.

<br>

**Styling with styled-components 🎨**

I styled the app with [`styled-components`](https://styled-components.com/), adding the registry Next needs to
render the styles on the server so the page never shows up unstyled. Some rules I followed:

- **Mobile first**, with shared breakpoints for tablet (768px) and desktop (1024px).
- **`rem` for font sizes and spacing**, so the app respects the font size chosen by the user.
- All the texts live in a single `literals.json`, so nothing is hardcoded in the components.

The design was not pixel perfect, so I measured it carefully and used multiples of 8 when I had to decide.

<br>

**Phone list and grid 🔲**

The grid shows square cards with shared lines between them. Drawing those lines was trickier than it looked:
borders left double lines or stray lines over empty columns, so every card draws its own lines with `box-shadow`.
Now there are only lines where there are cards, whatever the number of results.

On hover, a black layer grows from the bottom of the card and goes back down when the mouse leaves. It also works
with the keyboard and it is disabled for users who prefer reduced motion.

<br>

**Real-time search 🔍**

The search is filtered by the API and it lives in the URL (`/?search=samsung`), which is the
[pattern recommended by Next](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination): the page is
rendered on the server with the results, the API key never reaches the browser, and a search can be shared or
reloaded. To avoid a request per keystroke, it waits 400 ms after the user stops typing and needs at least
2 characters.

While testing it in the browser I found a bug that had nothing to do with the search: the API returns some
products twice with the same id, and the grid kept old cards on screen. I fixed it in the infrastructure layer with
a small generic `uniqueBy` util, because protecting the app from external data is that layer's job.

<br>

**Product detail 📋**

The detail page shows the phone with its storage and color selectors: the image changes with the color and the
price updates with the storage. The selectors are native radio buttons, so they work with the keyboard and screen
readers out of the box. The "add" button is only enabled once both options are chosen.

A decision I like: the product overview does not know the cart exists. It just tells its parent which
configuration was chosen, and the cart feature decides what adding it means. This kept the two features
independent and let me ship them in separate PRs.

<br>

**The similar items carousel 🎠**

This was the most challenging component. I built a generic `Carousel` on top of the native scroll, so touch,
trackpad and keyboard keep working, with [`scroll snap`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap):

- A thin line below shows the scroll position, because on macOS the native scrollbar is invisible until you
  scroll.
- Mouse users can drag the row. My first version did not work: the browser started its own drag of the links and
  images and stole the pointer. Disabling that native drag fixed it.
- The row bleeds to both edges of the screen, as in the design. Here I learned that a percentage in CSS does not
  mean the same in every property: in `scroll-padding` it refers to the scroll area, so the carousel started
  already scrolled. I ended up computing the bleed with
  [`container query units`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_query_length_units)
  and no percentages.

<br>

**The cart 🛍️**

There is no cart endpoint in the API, so the cart is stored in `localStorage`, behind a repository port so it
could be replaced by an API in the future. Reading `localStorage` in a server-rendered app is tricky: the server
has no `localStorage`, and the first render in the browser must match the server one. I used
[`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore), a hook I had never used before:
it reads the stored cart without effects and without hydration mismatches.

The header is synced with the cart: the counter shows the number of phones and the bag is filled in black when the
cart has items. After adding a phone, the app takes you straight to the cart.

<br>

**Sticky header 📌**

The header stays at the top while scrolling, with its background reaching the edges of the screen so the content
never shows through the page margins.

<br>

**Accessibility 👀**

I tried to keep accessibility in mind throughout the app: semantic HTML (lists, fieldsets, headings), native form
controls, accessible names for icon buttons and links, `aria-live` regions for the search results, visible focus
styles and respect for reduced motion.

<br>

**What I would do next 🔭**

There is always something else to improve. These are the next steps I would take:

- Cache the API responses on the server with Next's `fetch` cache. I tested it: a repeated search goes from
  ~200 ms to ~1 ms.
- Add loading states with `loading.tsx` and `Suspense`, and my own error and not found pages.
- Generate the metadata of each product page for SEO and sharing.
- Two product images have a white background instead of a transparent one, so they show a white box during the
  hover animation. The right fix is transparent images from the source.

<br>

## ▶️ Requisites

- Phone list view:
  - show the phones in a grid ✅
  - real-time search by name or brand, filtered by the API ✅
  - show the number of results found ✅

- Product detail view:
  - show the name and brand of the phone ✅
  - large image that changes with the selected color ✅
  - storage and color selectors with real-time price update ✅
  - technical specifications, base price and price per storage ✅
  - "add to cart" button only enabled once color and storage are selected ✅
  - similar products section ✅

- Cart view:
  - show the phones in the cart with image, name, selected storage and color and price ✅
  - remove single products from the cart ✅
  - show the total price ✅
  - "continue shopping" button back to the main view ✅

- The cart icon in the header is synced with the cart ✅
- The app looks good on mobile, tablet and desktop ✅
- Unit and integration tests ✅
- Micro interactions and animations ✅
- Be careful about accessibility ✅
- Be careful about your markup semantics ✅
