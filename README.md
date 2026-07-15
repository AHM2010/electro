# Electro

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

Electro is a responsive, front-end electronics storefront for browsing smartphones, tablets, and laptops. It provides product discovery, detailed product pages, local cart persistence, and a validated demo checkout experience in a polished single-page application.

> This is a portfolio demonstration. Product data is stored locally, and checkout does not process real payments or submit orders to a backend.

## Live Demo

**Demo URL:** (https://electro-one.vercel.app/)

## Screenshots

Screenshots have not yet been added.

| Home                                | Product details                                | Checkout                                |
| ----------------------------------- | ---------------------------------------------- | --------------------------------------- |
| (./src/assets/images/home-page.png) | (./src/assets/images/product-details-page.png) | (./src/assets/images/checkout-page.png) |

## Features

- Product catalog organized into phones, tablets, and laptops
- Featured-product landing page with an automatic, manually selectable hero carousel
- Client-side search by product name or slug
- Product detail pages with image galleries, specifications, quantity selection, delivery estimates, and shipping information
- Cart drawer with add, remove, increment, and decrement controls
- Persistent cart and checkout draft data through `localStorage`
- Responsive checkout with shipping, optional billing, delivery, and payment fields
- Standard and express delivery options with calculated totals in SAR
- Contact form validation and prefilled email handoff through `mailto:`
- Route-aware page titles, scroll-to-top navigation, and animated page content
- Empty states and a top-level React error boundary

## Tech Stack

| Area               | Technology                                   |
| ------------------ | -------------------------------------------- |
| UI                 | React 19, JSX                                |
| Build tooling      | Vite 8                                       |
| Styling            | Tailwind CSS 4, custom CSS                   |
| Routing            | React Router DOM 7                           |
| State              | React Context, custom hooks, component state |
| Animation          | AOS                                          |
| Icons              | Lucide React, Bootstrap Icons                |
| Quality            | ESLint 10                                    |
| Deployment support | Vercel SPA rewrite configuration             |

## Project Structure

```text
1.4-Electro/
|-- public/                 # Favicons and web app manifest assets
|-- src/
|   |-- assets/images/      # Product, hero, and brand imagery
|   |-- components/         # Shared storefront UI components
|   |   `-- checkout/       # Checkout fields, sections, delivery, and summary UI
|   |-- context/            # Cart context and provider
|   |-- data/               # Product catalog and navigation definitions
|   |-- hooks/              # Cart access and checkout form logic
|   |-- layouts/            # Shared navigation, drawers, main content, and footer
|   |-- pages/              # Catalog, contact, checkout, and product pages
|   |-- utils/              # Currency, delivery, and order-total formatters
|   |-- App.jsx             # Router, route metadata, and landing-page composition
|   |-- index.css           # Tailwind import and global typography
|   `-- main.jsx            # React entry point and global providers
|-- eslint.config.js
|-- index.html
|-- package.json
|-- vercel.json             # SPA fallback rewrite
`-- vite.config.js
```

## Installation

### Prerequisites

- Node.js compatible with Vite 8 (Node.js 20.19+ or 22.12+)
- npm

```bash
git clone https://github.com/AHM2010/Electro.git
cd Electro
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

## Available Scripts

| Command           | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with hot module replacement |
| `npm run build`   | Creates an optimized production build in `dist/`               |
| `npm run preview` | Serves the production build locally for verification           |
| `npm run lint`    | Runs ESLint across the project                                 |

## Usage

1. Browse all products from **Home**, or select a category from the navigation.
2. Use search to find a product by its name.
3. Open a product to review its gallery, specifications, delivery estimate, and shipping policy.
4. Select a quantity and add the product to the cart.
5. Adjust or remove items in the cart drawer, then continue to checkout.
6. Complete the validated demo form and select a delivery method to place a simulated order.

Cart items and checkout form drafts remain available after a refresh because they are stored in the browser. Submitted orders are not sent to a server.

## Responsive Design

The interface uses mobile-first Tailwind breakpoints throughout. Navigation switches to a drawer on smaller screens, product grids adapt by viewport width, hero artwork is selected with responsive `<picture>` sources, and checkout changes from a stacked layout to a two-column form and sticky order summary on larger displays.

## Key Implemented Features

- **Data-driven catalog:** A single local product dataset supplies category pages, featured products, search results, and dynamic detail routes.
- **Cart calculations:** Memoized subtotal and item-count values update as quantities change; delivery fees are included in checkout totals.
- **Validated demo checkout:** Custom hooks manage draft persistence, touched fields, conditional billing fields, card formatting, and inline errors.
- **Product experience:** Lazy-loaded gallery imagery, formatted SAR prices, specifications, quantity controls, and dynamic delivery windows support informed browsing.
- **SPA deployment:** Vercel rewrites all routes to `index.html`, preserving client-side routing on direct visits.

## State Management

Global cart state is managed with React Context through `CartProvider` and accessed with the `useCart` hook. Cart actions use memoized callbacks, while derived subtotal and item-count values use `useMemo`. The cart is synchronized to `localStorage`.

Checkout form state is isolated in `useCheckoutForm`, which also persists the draft locally. Search terms, drawer visibility, carousel position, product quantity, tabs, and submission feedback remain local component state. No external state-management library is used.

## Routing Structure

| Route             | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `/`               | Marketing landing page and featured products |
| `/home`           | Complete product catalog                     |
| `/phones`         | Phone catalog                                |
| `/tablets`        | Tablet catalog                               |
| `/laptops`        | Laptop catalog                               |
| `/products/:slug` | Dynamic product details                      |
| `/checkout`       | Cart review and demo checkout                |
| `/contact`        | Validated contact form and contact details   |

All routes render inside the shared `Layout`, which provides navigation, search, the cart drawer, main content, and footer. Route changes also update the document title and reset the page scroll position.

## Performance and UX Improvements

- Vite-powered development and optimized production builds
- Lazy loading for noncritical product and gallery images
- Responsive hero assets for mobile, tablet, and desktop viewports
- Memoized cart actions, calculated totals, filtered search results, and checkout components
- Persistent cart and checkout drafts for refresh resilience
- Smooth scrolling, route scroll reset, dynamic page titles, and AOS transitions
- Clear empty states, delivery estimates, formatted currency, and guarded quantity controls

## Accessibility Considerations

- Semantic landmarks, headings, lists, forms, fieldsets, legends, and labels
- Descriptive image alternative text and labels for icon-only controls
- `aria-current` for the active hero slide and `aria-pressed` for product tabs
- Form errors connected with `aria-describedby`, `aria-invalid`, and live status regions
- Keyboard-visible focus treatments on key interactive controls
- Required-field indicators and disabled states where applicable

## Future Improvements

- Connect the catalog, inventory, authentication, and order flow to a backend
- Integrate a real payment provider instead of the simulated checkout
- Add automated unit, integration, and end-to-end tests
- Add a not-found route and route-level error handling
- Add product filters, sorting, pagination, and richer search
- Add deployed screenshots and the production demo URL
- Review color contrast and complete automated and manual accessibility audits

## Author

**Ahmed Ashraf**

- GitHub: [@AHM2010](https://github.com/AHM2010)
- Repository: [AHM2010/electro](https://github.com/AHM2010/Electro)

## License

No license file is currently included in this repository. Unless a license is added, the source remains under the author's default copyright.
