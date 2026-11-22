# SUTRAF --- Implementation Progress Tracker

Use this file to track implementation independently from learning
progress.

**Status legend:**\
- \[ \] Not started\
- \[x\] Completed and verified\
- \[\~\] In progress or partially complete\
- \[!\] Blocked / needs a decision

Only mark a phase complete after its acceptance criteria have been
checked and the application still runs.

## Global project checks

-   [ ] JavaScript only; no TypeScript introduced.
-   [ ] SvelteKit + Svelte 5 remain the application foundation.
-   [ ] Tailwind CSS and shadcn-svelte are used consistently.
-   [ ] `mode-watcher` handles theme behaviour.
-   [ ] Mock data and domain logic are separate from components.
-   [ ] Arabic RTL and English LTR are supported.
-   [ ] Passenger, Company/Driver and Global Admin experiences are
    distinct.
-   [ ] Company data operations are scoped to the selected company.
-   [ ] MapLibre + configurable OSM-derived tiles are used.
-   [ ] GeoJSON represents routes and geographic features.
-   [ ] Bus movement and ETAs are simulated and coherent.
-   [ ] No backend, database, real authentication, payments, live GPS or
    live traffic has been added.
-   [ ] Simulated data is clearly labelled.
-   [ ] No phase contains unrelated scope expansion.

------------------------------------------------------------------------

## Phase 1 --- Project foundation and application shell

-   [x] Repository and current setup inspected before changes.
-   [x] Existing project preserved where possible.
-   [x] JavaScript/Svelte 5 setup verified.
-   [x] Tailwind CSS configured or verified.
-   [x] shadcn-svelte configured or verified.
-   [x] Global styles and design tokens established.
-   [x] SUTRAF visual direction established.
-   [x] Root layout and shared page structure created.
-   [x] Passenger shell and primary navigation created.
-   [x] Placeholder passenger/company/admin destinations created.
-   [x] Not-found/fallback route handled.
-   [x] Development server starts.
-   [x] Production build succeeds.
-   [x] Phase report received.

**Verification notes:**
- Commands: `npm run build` (built in 1m 10s without errors), `npx vite --port 5173` (dev server started in 2.37s), curl tests for `/`, `/urban`, `/intercity`, `/lines`, `/tickets`, `/profile`, `/company`, `/admin` (HTTP 200) and `/nonexistent` (HTTP 404 handled).
- Issues: Addressed deprecated `lucide-svelte` by using `@lucide/svelte` for Svelte 5; configured `jsconfig.json` to extend `.svelte-kit/tsconfig.json`.
- Commit / checkpoint: Phase 1 foundation complete.

## Phase 2 --- Responsive shell, localization and theme

-   [ ] Arabic translation dictionary added for current shell.
-   [ ] English translation dictionary added for current shell.
-   [ ] Language switch works.
-   [ ] Language preference persists.
-   [ ] Document `lang` and `dir` update correctly.
-   [ ] RTL changes layout flow, alignment and navigation.
-   [ ] `mode-watcher` integrated.
-   [ ] Light/dark theme switch works.
-   [ ] Theme preference persists.
-   [ ] Semantic colour tokens established.
-   [ ] Mobile layout works.
-   [ ] Desktop passenger presentation works.
-   [ ] Admin shell can use wider layouts.
-   [ ] Touch targets and safe-area spacing checked.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Commands: - Issues: - Commit / checkpoint:

## Phase 3 --- Domain model and structured mock data

-   [ ] Stable IDs and entity relationships defined.
-   [ ] Wilaya and City data created.
-   [ ] Company and demo User data created.
-   [ ] UrbanRoute data created.
-   [ ] Stop data created.
-   [ ] Bus data created.
-   [ ] IntercityTrip data created.
-   [ ] Incident data created.
-   [ ] Subscription and Ticket data created.
-   [ ] Geographic coordinates are plausible and internally consistent.
-   [ ] Route geometry is GeoJSON-compatible.
-   [ ] Route stop order is explicit.
-   [ ] Fixed segment durations are stored.
-   [ ] Company ownership is represented.
-   [ ] Query/helper services are available.
-   [ ] Invalid references are handled defensively.
-   [ ] Components do not contain large hardcoded datasets.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Commands: - Issues: - Commit / checkpoint:

## Phase 4 --- Passenger urban map and exploration

-   [ ] MapLibre integrated using Svelte lifecycle correctly.
-   [ ] Map configuration separated from map component.
-   [ ] Tile source is configurable.
-   [ ] No fabricated API credentials.
-   [ ] Map attribution visible.
-   [ ] Map centres on selected city.
-   [ ] Urban route GeoJSON rendered.
-   [ ] Stops rendered at correct positions.
-   [ ] Bus markers displayed.
-   [ ] Stop selection opens correct details.
-   [ ] Bus selection opens correct details.
-   [ ] Route selection highlights/fits route.
-   [ ] Route ordered stops can be inspected.
-   [ ] Loading and map failure states implemented.
-   [ ] Map works on mobile.
-   [ ] RTL/LTR does not break map controls/panels.
-   [ ] Map lifecycle has no duplicate instances or normal-navigation
    errors.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Tile provider/config: - Commands: - Issues: -
Commit / checkpoint:

## Phase 5 --- Bus simulation, ETA and traffic incidents

-   [ ] Simulation logic separated from UI.
-   [ ] Bus route, direction and progress represented.
-   [ ] Bus positions advance along route coordinates.
-   [ ] Coordinate interpolation produces smooth movement.
-   [ ] Map marker updates without map recreation.
-   [ ] Simulation timers are cleaned up correctly.
-   [ ] ETA uses remaining current-segment time.
-   [ ] ETA includes upcoming segment durations.
-   [ ] Active incidents affect only relevant segments.
-   [ ] Normal segment durations remain consistent.
-   [ ] Simulation state is reproducible/controlled.
-   [ ] Bus details show direction, next stop, status and ETA.
-   [ ] Incident details are visible.
-   [ ] Simulated values are clearly labelled.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Example ETA checked: - Incident test: -
Issues: - Commit / checkpoint:

## Phase 6 --- Intercity search and trip details

-   [ ] Origin wilaya selector implemented.
-   [ ] Destination wilaya selector implemented.
-   [ ] Same origin/destination rejected.
-   [ ] Date selector and validation implemented.
-   [ ] Search filters structured trip data correctly.
-   [ ] Intermediate-stop matching behaviour is defined.
-   [ ] Results show departure and arrival times.
-   [ ] Results show operator and price where available.
-   [ ] Empty results state implemented.
-   [ ] Invalid form feedback implemented.
-   [ ] Trip detail view implemented.
-   [ ] Ordered stop timeline and scheduled times displayed.
-   [ ] Arabic/English labels and RTL/LTR work.
-   [ ] Mobile layout checked.
-   [ ] No booking/payment implied.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Search cases tested: - Issues: - Commit /
checkpoint:

## Phase 7 --- Passenger routes, tickets, subscriptions and profile

-   [ ] Passenger routes/lines page implemented.
-   [ ] Route details reuse route data and map functionality.
-   [ ] Ticket page implemented with mock records.
-   [ ] Subscription display implemented.
-   [ ] Demonstration QR/reference presentation implemented.
-   [ ] Mock-only status clearly communicated.
-   [ ] No payment/renewal/validation action added.
-   [ ] Profile/settings page implemented.
-   [ ] Language preference accessible.
-   [ ] Theme preference accessible.
-   [ ] Selected-city preference accessible.
-   [ ] Empty states for no tickets/subscriptions implemented.
-   [ ] All passenger navigation destinations work.
-   [ ] Responsive behaviour checked.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Issues: - Commit / checkpoint:

## Phase 8 --- Demo roles and Company / Driver workspace

-   [ ] Demo role/account selection implemented.
-   [ ] Passenger role works.
-   [ ] Company/Driver role works.
-   [ ] Global Admin role works.
-   [ ] No real authentication is claimed.
-   [ ] Company dashboard implemented.
-   [ ] Fleet list scoped to selected company.
-   [ ] Add bus form implemented.
-   [ ] Edit bus form implemented.
-   [ ] Bus route assignment constrained to company routes.
-   [ ] Mock status/timing updates work.
-   [ ] Company-scoped service functions enforce ownership.
-   [ ] Shared mock state updates during session.
-   [ ] Validation/success/error/empty states implemented.
-   [ ] Other company records are not exposed through UI actions.
-   [ ] Passenger/admin flows remain functional.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - Demo accounts tested: - Cross-company
isolation test: - Issues: - Commit / checkpoint:

## Phase 9 --- Global Admin workspace

-   [ ] Admin dashboard implemented.
-   [ ] Cities/wilayas management implemented.
-   [ ] Routes management implemented.
-   [ ] Stops/stations management implemented.
-   [ ] Companies management implemented.
-   [ ] Buses management implemented.
-   [ ] Intercity trips management implemented.
-   [ ] Incidents management implemented.
-   [ ] Create/edit forms validate required fields.
-   [ ] Entity references remain valid after edits.
-   [ ] Route geometry editing approach implemented/documented.
-   [ ] Incident changes affect ETA simulation.
-   [ ] Admin changes are reflected in passenger/company views.
-   [ ] Destructive actions require confirmation.
-   [ ] Empty/validation/success/error states implemented.
-   [ ] Desktop/tablet layout checked.
-   [ ] Build/checks pass.
-   [ ] Phase report received.

**Verification notes:** - CRUD cases tested: - Incident-to-ETA test: -
Issues: - Commit / checkpoint:

## Phase 10 --- Integration, quality, Capacitor and deployment readiness

-   [ ] Passenger urban workflow tested end-to-end.
-   [ ] Passenger intercity workflow tested end-to-end.
-   [ ] Passenger tickets/profile workflow tested.
-   [ ] Company/Driver workflow tested.
-   [ ] Global Admin workflow tested.
-   [ ] Arabic RTL tested across page groups.
-   [ ] English LTR tested across page groups.
-   [ ] Light theme tested.
-   [ ] Dark theme tested.
-   [ ] Phone/tablet/desktop layouts tested.
-   [ ] Keyboard access and labels checked.
-   [ ] Contrast and touch targets checked.
-   [ ] Map loading failure and attribution checked.
-   [ ] Map resize and cleanup checked.
-   [ ] Simulation timer cleanup checked.
-   [ ] ETA consistency checked.
-   [ ] Forms and destructive confirmations checked.
-   [ ] Dead code/debug output removed.
-   [ ] Console errors reviewed.
-   [ ] Production build succeeds.
-   [ ] No unintended backend/database/payment/live integrations exist.
-   [ ] Capacitor build strategy configured or remaining platform steps
    documented.
-   [ ] MapLibre WebView behaviour checked if native tooling is
    available.
-   [ ] Vercel deployment configuration ready.
-   [ ] No deployment published without approval.
-   [ ] Final implementation report received.

**Final notes:** - Build result: - Known limitations: - Manual platform
steps: - Deployment status: - Final commit:
