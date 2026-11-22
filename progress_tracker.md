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

-   [x] JavaScript only; no TypeScript introduced.
-   [x] SvelteKit + Svelte 5 remain the application foundation.
-   [x] Tailwind CSS and shadcn-svelte are used consistently.
-   [x] `mode-watcher` handles theme behaviour.
-   [x] Mock data and domain logic are separate from components.
-   [x] Arabic RTL and English LTR are supported.
-   [ ] Passenger, Operator (Company/Driver), and Global Admin
    experiences are distinct (Note: Company manages multiple buses;
    Driver manages only 1 bus).
-   [x] Company data operations are scoped to the selected operator
    (Company fleet vs Driver single bus).
-   [ ] Note for future releases: Users will register as a specific user
    type and role buttons will be removed; buttons retained for demo.
-   [x] MapLibre + configurable OSM-derived tiles are used.
-   [x] GeoJSON represents routes and geographic features.
-   [ ] Bus movement and ETAs are simulated and coherent.
-   [ ] No backend, database, real authentication, payments, live GPS or
    live traffic has been added.
-   [x] Simulated data is clearly labelled.
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

-   [x] Arabic translation dictionary added for current shell.
-   [x] English translation dictionary added for current shell.
-   [x] Language switch works.
-   [x] Language preference persists.
-   [x] Document `lang` and `dir` update correctly.
-   [x] RTL changes layout flow, alignment and navigation.
-   [x] `mode-watcher` integrated.
-   [x] Light/dark theme switch works.
-   [x] Theme preference persists.
-   [x] Semantic colour tokens established.
-   [x] Mobile layout works.
-   [x] Desktop passenger presentation works.
-   [x] Admin shell can use wider layouts.
-   [x] Touch targets and safe-area spacing checked.
-   [x] Build/checks pass.
-   [x] Phase report received.

**Verification notes:**
- Commands: `npm run build` (built SSR and client bundles in ~45s), `npm run preview -- --port 4173`, `curl.exe` verifying HTTP 200 on `/`, `/urban`, `/intercity`, `/lines`, `/tickets`, `/profile`, `/company`, `/admin` and HTTP 404 on `/nonexistent`.
- Issues caught & fixed:
  1. Replaced lingering Phase 1 French placeholder strings across all pages with structured Arabic and English dictionaries.
  2. Fixed Svelte 5 store vs rune subscription in `mode-watcher` v1 (used `mode.current` and `userPrefersMode.current` with `.setMode()` / `.resetMode()` instead of Svelte 4 `$mode`).
  3. Added inline script in `app.html` to eliminate direction/language flicker prior to hydration.
- Commit / checkpoint: Phase 2 responsive shell, localization and theme complete.

## Phase 3 --- Domain model and structured mock data

-   [x] Stable IDs and entity relationships defined.
-   [x] Wilaya and City data created.
-   [x] Company and demo User data created.
-   [x] UrbanRoute data created.
-   [x] Stop data created.
-   [x] Bus data created.
-   [x] IntercityTrip data created.
-   [x] Incident data created.
-   [x] Subscription and Ticket data created.
-   [x] Geographic coordinates are plausible and internally consistent.
-   [x] Route geometry is GeoJSON-compatible.
-   [x] Route stop order is explicit.
-   [x] Fixed segment durations are stored.
-   [x] Company ownership is represented.
-   [x] Query/helper services are available.
-   [x] Invalid references are handled defensively.
-   [x] Components do not contain large hardcoded datasets.
-   [x] Build/checks pass.
-   [x] Phase report received.

**Verification notes:**
- Commands: `npm run build` (built SSR and client bundles in ~48s without errors), `npm run preview -- --port 4173`, `curl.exe` verifying HTTP 200 on all routes and content rendering from services.
- Data created:
  - Canonical 58 wilayas of Algeria (`wilayas.js`).
  - 3 urban centers (`cities.js`: Algiers, Oran, Constantine) with GeoJSON center coordinates.
  - Multi-tenant operators (`companies.js`: ETUSA, SOGRAL, El Ghazala, ETO).
  - Structured demo users (`users.js`): Passenger Karim Benali, Driver Ahmed Mansouri (single bus `BUS-16-042`), Company ETUSA Fleet Admin (multiple buses), Admin.
  - Algiers landmark stops (`stops.js`) with GeoJSON `[longitude, latitude]` coordinates.
  - Urban routes (`routes.js`) with GeoJSON LineString paths, ordered stops, and explicit segment durations.
  - Fleet buses (`buses.js`) scoped by company and driver.
  - Intercity trips (`trips.js`) with intermediate stops, fares, and scheduled times.
  - Route incidents (`incidents.js`) with deterministic segment delays.
  - Passenger passes & tickets (`tickets.js`).
  - Service layer (`urbanService.js`, `intercityService.js`, `operatorService.js`, `simulationService.js`, `passengerService.js`).
- Issues caught & fixed:
  1. Connected UI components (`lines`, `intercity`, `tickets`, `company`, `admin`, `urban`, `home`) to consume domain services rather than holding hardcoded inline mock arrays.
  2. Implemented intermediate-stop trip matching for intercity travel.
- Commit / checkpoint: Phase 3 domain model and structured mock data complete.

## Phase 4 --- Passenger urban map and exploration

-   [x] MapLibre integrated using Svelte lifecycle correctly.
-   [x] Map configuration separated from map component.
-   [x] Tile source is configurable.
-   [x] No fabricated API credentials.
-   [x] Map attribution visible.
-   [x] Map centres on selected city.
-   [x] Urban route GeoJSON rendered.
-   [x] Stops rendered at correct positions.
-   [x] Bus markers displayed.
-   [x] Stop selection opens correct details.
-   [x] Bus selection opens correct details.
-   [x] Route selection highlights/fits route.
-   [x] Route ordered stops can be inspected.
-   [x] Loading and map failure states implemented.
-   [x] Map works on mobile.
-   [x] RTL/LTR does not break map controls/panels.
-   [x] Map lifecycle has no duplicate instances or normal-navigation errors.
-   [x] Build/checks pass.
-   [x] Phase report received.

**Verification notes:**
- Tile provider/config: Configurable OpenStreetMap-derived raster tiles (CARTO Voyager light / Dark Matter dark presets with standard OSM fallback, configurable via `VITE_MAP_TILE_URL` or `VITE_MAP_STYLE_URL` in `src/lib/map/config.js`). Visible OSM & CARTO attribution rendered.
- Commands: `npm run build` (built SSR and client bundles in ~53s without errors), `npx vite --port 5173`, `curl.exe` testing HTTP 200 on `/`, `/urban`, `/urban?route=route-etusa-04`, `/lines`, `/profile`, `/company`, `/admin`.
- Architecture & components created:
  - `src/lib/map/config.js`: Separated tile endpoints, attribution, city coordinate presets, and style generator.
  - `src/lib/map/geojson.js`: Domain-to-GeoJSON converters for routes (LineStrings), stops (Points), buses (Points), and coordinate bounding box calculator.
  - `src/lib/services/activeCity.js`: Centralized reactive active city store with localStorage persistence across TopBar, Urban map, Lines, and Profile.
  - `src/lib/components/map/TransitMap.svelte`: Svelte 5 MapLibre component with client lifecycle safety, layer rendering, interactive route/stop clicks, custom DOM bus markers, loading/error states, and zoom/compass controls.
  - `src/lib/components/map/CitySelector.svelte`: Manual city selection (Algiers, Oran, Constantine) and optional explicit geolocation fallback.
  - `src/lib/components/map/RouteDetailCard.svelte`: Detail drawer with route summary, operational status, ordered stop list, and assigned buses.
  - `src/lib/components/map/StopDetailCard.svelte`: Stop detail card with station type, shelter info, served routes, and deterministic arrival times.
  - `src/lib/components/map/BusDetailCard.svelte`: Bus detail card with model, capacity, status, assigned driver, and assigned route.
  - `src/lib/components/map/MapLegend.svelte`: Collapsible transit map legend.
- Mistakes checked & fixed:
  1. TopBar active city was hardcoded; now reactively synchronized with `$activeCity` in both English and Arabic.
  2. Profile city preference was disconnected dummy local state; now synchronized with `activeCityId` and canonical IDs.
  3. Lines page and Home page now support direct `?route={route.id}` deep linking into the urban map with route highlight and camera auto-fit.
- Commit / checkpoint: Phase 4 passenger urban map and exploration complete.

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
-   [ ] Company/Driver role works (same workspace; Company manages multiple buses, Driver manages only 1 bus).
-   [ ] Global Admin role works.
-   [ ] Note for future: Registration will restrict users to 1 user type, and the 3 demo role buttons will be removed.
-   [ ] No real authentication is claimed.
-   [ ] Company dashboard implemented.
-   [ ] Fleet list scoped to selected company (multiple buses) or driver (single bus).
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
