# SUTRAF --- Implementation Plan

**Purpose:** Break the project into implementation units that an AI
coding agent can complete in one focused prompt.\
**Implementation agent:** Gemini in Antigravity.\
**Source of truth:** `documentation.md`. If this plan and the product
specification conflict, stop and report the conflict instead of silently
changing scope.

## How to use this plan

-   Implement phases in order. Each phase is a self-contained
    implementation task with explicit boundaries and acceptance
    criteria.
-   Give the implementation agent **one phase only per prompt**. Do not
    ask it to implement the whole roadmap.
-   Before each phase, ensure the previous phase is complete and the
    application still runs.
-   The agent must inspect the existing repository before editing. It
    must preserve working code and follow the project's actual installed
    package versions.
-   The agent must run relevant checks after implementation and report
    changed files, decisions, commands and known limitations.
-   Do not let the agent add a backend, database, real authentication,
    real GPS tracking, payments or live transport integrations.
-   If a phase cannot be completed without a decision or dependency that
    is not defined, the agent must ask before making a consequential
    assumption.

## Global implementation rules

1.  Use JavaScript, not TypeScript.
2.  Use SvelteKit and Svelte 5.
3.  Use Tailwind CSS and shadcn-svelte for the UI where appropriate.
4.  Use `mode-watcher` for theme handling.
5.  Keep mock data and domain logic separate from Svelte components.
6.  Use stable IDs and entity references. Avoid duplicating entire
    related records.
7.  Keep passenger, company/driver and global admin experiences
    distinct.
8.  Company/driver mock operations must be scoped to that company's
    records.
9.  Frontend role checks are demonstration behaviour, not security.
10. The passenger experience is mobile-first. Desktop may show a centred
    phone-sized passenger shell; admin screens may use wider layouts.
11. Support Arabic RTL and English LTR throughout the application.
12. Use MapLibre GL JS with configurable OpenStreetMap-derived tile
    configuration. Do not assume the public OSM tile server is a
    production tile service.
13. Use GeoJSON for geographic routes and points.
14. Make bus movement and ETA calculations deterministic/coherent. Never
    randomize ETAs on each render.
15. Label simulated information honestly.
16. Avoid unnecessary dependencies. Explain any new dependency before
    adding it.
17. Do not make unrelated refactors during a phase.
18. Do not create server endpoints or backend infrastructure in this
    frontend-only stage.

------------------------------------------------------------------------

# Phase 1 --- Project foundation and application shell

**Goal:** Establish a clean, runnable SvelteKit application structure
and the first visual shell.

### Tasks

-   Inspect the repository, current SvelteKit setup, package manager,
    installed versions and existing files.
-   Preserve the existing project where possible; do not blindly
    scaffold over it.
-   Confirm the app uses JavaScript and Svelte 5, not TypeScript.
-   Configure or verify Tailwind CSS and shadcn-svelte using versions
    compatible with the existing project.
-   Configure the global font, CSS reset/base styles, design tokens and
    basic colour variables.
-   Establish a restrained visual direction for SUTRAF:
    transportation-oriented, map-led, clear information hierarchy, not a
    generic dashboard template.
-   Create the root application layout and reusable page/container
    structure.
-   Create the passenger application shell with header and primary
    navigation placeholders.
-   Create placeholder route destinations for passenger, company and
    admin areas. Do not implement their business features yet.
-   Add a simple not-found route or equivalent fallback.
-   Ensure the app starts and builds.

### Acceptance criteria

-   The development server starts without errors.
-   The production build completes.
-   The application has a coherent shell and navigation structure.
-   The source tree has clear places for components, data, services, map
    utilities and routes.
-   No TypeScript has been introduced.
-   No backend, database or authentication system has been added.

### Explicitly out of scope

Map integration, real page features, data modelling beyond placeholders,
theme switching, localization implementation, Capacitor.

------------------------------------------------------------------------

# Phase 2 --- Responsive shell, localization and theme

**Goal:** Make the shared UI responsive and support Arabic/English plus
light/dark themes.

### Tasks

-   Implement a small, maintainable translation mechanism suitable for
    this project; avoid introducing a large i18n framework unless
    necessary.
-   Add Arabic and English dictionaries for all currently visible
    shell/navigation text.
-   Implement language switching and persist the selected language
    locally.
-   Update document `lang` and `dir` attributes when language changes.
-   Ensure RTL/LTR changes affect layout flow, alignment, spacing and
    navigation---not only translated strings.
-   Integrate `mode-watcher` for light/dark/system theme behaviour as
    appropriate.
-   Add a theme control in the shared settings or navigation area.
-   Persist theme preference using the chosen library's supported
    approach.
-   Define reusable semantic colour tokens for background, surface,
    text, muted text, border, primary, success, warning and destructive
    states.
-   Implement mobile-first responsive behaviour.
-   On desktop, show the passenger experience in a centred mobile-sized
    presentation shell if appropriate; do not use user-agent detection.
-   Keep admin layout capable of using wider screens later.
-   Check safe-area spacing and touch target sizes.

### Acceptance criteria

-   Language can be switched between Arabic and English.
-   Arabic uses RTL and English uses LTR correctly.
-   Theme can be changed and persists after refresh.
-   Shell remains usable on narrow mobile viewports and desktop.
-   No untranslated shell labels remain in the implemented shell.
-   Build and relevant checks pass.

### Explicitly out of scope

Map features, full translation of pages not yet implemented, backend
persistence, Capacitor packaging.

------------------------------------------------------------------------

# Phase 3 --- Domain model and structured mock data

**Goal:** Create the mock-data foundation and domain services used by
all application areas.

### Tasks

-   Define stable, consistent IDs and relationships for: Wilaya, City,
    Company, User, UrbanRoute, Stop, Bus, IntercityTrip, Incident,
    Subscription and Ticket.
-   Create structured JavaScript mock-data modules under the shared data
    layer.
-   Add realistic but clearly fictional demonstration records for a
    small number of Algerian cities/wilayas, operators, urban routes,
    stops, buses, intercity trips and incidents.
-   Do not claim that mock routes, schedules, prices or operators are
    official or current.
-   Include valid geographic coordinates for the sample city, route
    stops and route geometry. Coordinates should be geographically
    plausible and consistent with the selected sample city.
-   Represent urban route geometry as ordered GeoJSON-compatible
    coordinates/LineStrings.
-   Represent route stop order explicitly.
-   Store fixed normal durations for each route segment.
-   Store company ownership on company-managed records.
-   Keep intercity stop sequences and scheduled times structured.
-   Add small service/helper functions for querying records by ID and
    relationships.
-   Add basic data validation or defensive handling for missing
    references where useful.
-   Keep components free of large hardcoded datasets.
-   Document any deliberate mock-data simplification in code comments or
    a short data README.

### Acceptance criteria

-   All entities have stable IDs.
-   References between records resolve correctly.
-   Urban route geometry and stop coordinates are valid.
-   Segment durations are explicit and stable.
-   Company ownership can be determined from the data.
-   Services expose data to future UI without requiring components to
    import raw datasets everywhere.
-   No backend or database is introduced.

### Explicitly out of scope

Rendering the map, simulation timers, full CRUD screens, real data
integrations.

------------------------------------------------------------------------

# Phase 4 --- Passenger urban map and exploration

**Goal:** Implement the urban passenger experience using a real
interactive map and the mock geographic data.

### Tasks

-   Integrate MapLibre GL JS in a Svelte-safe lifecycle.
-   Initialize and destroy the map correctly; avoid duplicate map
    instances during navigation or component updates.
-   Keep map style/tile configuration separate from the map component.
-   Use a configurable OpenStreetMap-derived tile source. If no provider
    key/configuration is available, provide a clear development
    configuration placeholder and explain setup; do not fabricate
    credentials.
-   Display visible map attribution.
-   Centre the map on the selected city.
-   Render urban route paths from GeoJSON.
-   Render stops from geographic point data.
-   Render bus markers as static initial positions for this phase.
-   Make route, stop and bus selection interactive.
-   Display selected entity details in a mobile-friendly panel/card.
-   Add route selection and fit map bounds to the selected route.
-   Provide clear map loading and map failure states.
-   Keep the map usable on mobile viewport sizes.
-   Ensure RTL/LTR changes do not break map controls or detail panels.
-   Do not request location permission automatically on first launch.
    Provide manual city selection; location detection can be added only
    as an explicit optional action if implemented.

### Acceptance criteria

-   Map renders in the passenger urban experience.
-   Route paths and stops align with the map.
-   Selecting a stop shows the correct stop details.
-   Selecting a route highlights/fits the route and shows its ordered
    stops.
-   Bus markers are displayed and selectable.
-   Attribution is visible.
-   Map initialization and cleanup do not produce duplicate instances or
    console errors during normal navigation.
-   The map failure state is usable if tiles cannot load.

### Explicitly out of scope

Animated bus movement, ETA calculation, real GPS, real traffic, route
directions APIs.

------------------------------------------------------------------------

# Phase 5 --- Bus simulation, ETA and traffic incidents

**Goal:** Make buses move coherently along routes and calculate
predictable mock arrival estimates.

### Tasks

-   Implement a simulation service independent of Svelte components.
-   Represent each bus's route, direction and progress through its
    route.
-   Advance bus positions along ordered route coordinates.
-   Interpolate between coordinates so movement is smooth rather than
    jumping from stop to stop.
-   Update map markers without recreating the MapLibre map.
-   Ensure simulation lifecycle is controlled: start when needed,
    pause/cleanup when appropriate, and avoid leaked intervals or
    duplicated timers.
-   Implement ETA calculations using remaining current-segment duration
    plus upcoming fixed segment durations.
-   Apply active incident delays only to affected route segments.
-   Ensure normal segment durations remain consistent across repeated
    calculations.
-   Provide a controlled simulation clock/state so results are
    reproducible.
-   Display bus direction, next stop, status and estimated arrivals.
-   Display active incident information on affected routes/stops.
-   Add a clear visual distinction between normal and delayed estimates.
-   Do not use random ETA changes on render.

### Acceptance criteria

-   Buses move along their assigned route geometry.
-   Bus positions remain geographically aligned with the route.
-   Simulation does not create duplicate timers or memory leaks.
-   ETA uses fixed segment durations and current progress.
-   An incident adds delay only to affected journeys/segments.
-   Removing/deactivating an incident removes its delay from subsequent
    calculations.
-   UI clearly labels ETAs and positions as simulated.

### Explicitly out of scope

Live GPS, live traffic feeds, server-side scheduling, driver location
permissions.

------------------------------------------------------------------------

# Phase 6 --- Intercity search and trip details

**Goal:** Implement the complete passenger intercity search experience
using mock trip data.

### Tasks

-   Build origin and destination wilaya selectors.
-   Prevent selecting the same origin and destination.
-   Add travel-date selection and sensible validation.
-   Search structured mock trips by origin, destination and date.
-   Define clearly how matching works when a mock trip has intermediate
    stops. Do not return unrelated trips.
-   Display a results state with departure, arrival, duration, operator
    and price when available.
-   Add empty results, invalid form and loading/search feedback states.
-   Allow opening a trip detail view.
-   Display the ordered intermediate stops with scheduled times.
-   Ensure times and trip metadata are consistent with the mock dataset.
-   Support Arabic and English labels and RTL/LTR layout.
-   Make the flow usable on mobile.

### Acceptance criteria

-   Passenger can search by origin, destination and date.
-   Invalid or identical endpoints are handled clearly.
-   Results correspond to the selected criteria.
-   Trip details show the correct stop order and scheduled times.
-   Empty results are handled gracefully.
-   No booking or payment flow is implied.

### Explicitly out of scope

Real booking, ticket purchasing, operator APIs, intercity live bus
tracking.

------------------------------------------------------------------------

# Phase 7 --- Passenger routes, tickets, subscriptions and profile

**Goal:** Complete the remaining passenger-facing presentation features
from the product specification and prototype.

### Tasks

-   Build a passenger route/lines browsing page.
-   Allow opening a route and inspecting its path and ordered stops,
    reusing urban route data and map components where appropriate.
-   Build a tickets and subscriptions page using structured mock
    records.
-   Display subscription plan, validity and status.
-   Display intercity ticket details and a demonstration QR/reference
    presentation.
-   Make it unmistakable that tickets and subscriptions are mock
    examples; do not add payment or validation actions.
-   Build the passenger profile/settings page.
-   Include language, theme and selected-city preferences in the
    appropriate settings area.
-   Add empty states for users with no tickets or subscriptions.
-   Ensure all passenger navigation destinations work.
-   Keep visual patterns consistent with earlier passenger pages.

### Acceptance criteria

-   Passenger can browse routes and inspect route details.
-   Ticket/subscription screens display coherent mock data.
-   No real purchase, renewal, payment or QR validation is implemented.
-   Profile/settings controls work for local preferences.
-   Passenger navigation is complete and responsive.

### Explicitly out of scope

Real user accounts, payments, notifications, support integrations.

------------------------------------------------------------------------

# Phase 8 --- Demo roles and Company / Driver workspace

**Goal:** Add demonstration role selection and a functional
operator-side workspace.

### Tasks

-   Add a clearly labelled demo account/role selection experience.
-   Support Passenger, Company/Driver and Global Admin roles.
-   Use structured demo user records; do not implement real
    authentication.
-   Route each demo role to its appropriate workspace.
-   Build the Company/Driver dashboard.
-   Build a fleet list showing only the selected demo company's buses.
-   Implement add/edit bus forms with validation and clear feedback.
-   Allow assigning a bus only to routes available to that company.
-   Allow updating mock bus status and relevant schedule/timing fields
    supported by the data model.
-   Add company-scoped service functions that enforce ownership in the
    frontend domain layer.
-   Ensure changing a company demo account changes the visible records.
-   Prevent UI actions from exposing other companies' records.
-   Add empty, validation, success and error states.
-   Clearly indicate this is a demo workspace and not a secure operator
    portal.

### Acceptance criteria

-   Demo role switching works.
-   Company/Driver user sees only its company's records.
-   Add/edit operations update the shared mock data state during the
    session.
-   Bus assignment is constrained to valid company routes.
-   Passenger and admin experiences remain functional.
-   No real authentication or security claims are made.

### Explicitly out of scope

Driver GPS tracking, real login, backend authorization, production
operator management.

------------------------------------------------------------------------

# Phase 9 --- Global Admin workspace

**Goal:** Implement the admin interface for managing the complete mock
dataset.

### Tasks

-   Build an admin dashboard with useful counts and navigation to
    management areas.
-   Build management views for cities/wilayas, routes, stops/stations,
    companies, buses, intercity trips and incidents.
-   Provide appropriate list, detail and create/edit forms for the
    supported entities.
-   Add validation for required fields and references.
-   For route editing, support the mock route geometry representation in
    a practical way. If full map-based geometry editing is too large for
    this phase, provide a clearly scoped coordinate/geometry editor
    suitable for the learning project and report the limitation.
-   Ensure route stop references and company/bus references remain valid
    after edits.
-   Allow creating, editing and deactivating incidents with affected
    route segment and delay.
-   Ensure admin changes update the shared mock data state and are
    reflected in passenger/company views during the session.
-   Add confirmation for destructive actions.
-   Add empty, loading, validation, success and error states.
-   Use a wider desktop-friendly layout while preserving tablet
    usability.

### Acceptance criteria

-   Admin can inspect and manage all specified mock entity groups.
-   Admin changes are reflected in other workspaces.
-   Invalid relationships are prevented or clearly reported.
-   Incident changes affect the ETA simulation.
-   Destructive actions require confirmation.
-   No backend or persistent production database is added.

### Explicitly out of scope

Production content-management system, audit logs, multi-admin security,
server persistence.

------------------------------------------------------------------------

# Phase 10 --- Integration, quality, Capacitor and deployment readiness

**Goal:** Stabilize the integrated application and prepare the
web/mobile delivery paths.

### Tasks

-   Review the complete application against `documentation.md`.
-   Test all main passenger, company/driver and admin workflows.
-   Test Arabic RTL and English LTR on all implemented page groups.
-   Test light and dark themes across the application.
-   Test narrow mobile, larger phone, tablet and desktop layouts.
-   Check keyboard access, labels, contrast and touch target sizes.
-   Check map loading failure, attribution, resize behaviour and WebGL
    cleanup.
-   Check simulation timer cleanup and ETA consistency.
-   Check form validation, empty states, error states and destructive
    confirmations.
-   Remove dead code, unused imports, debug output and accidental
    placeholder links.
-   Check for console errors and build warnings; explain any remaining
    unavoidable warnings.
-   Verify there is no accidental backend, database, payment, live GPS
    or live traffic integration.
-   Configure the SvelteKit build/output strategy required by the
    selected Capacitor workflow. Do not assume server-side SvelteKit
    features are available inside the native bundle.
-   Add/configure Capacitor only if the repository is ready and the
    required platform tooling is available. If Android Studio/Xcode or
    platform SDKs are unavailable, complete the project configuration
    and document the manual platform step.
-   Verify MapLibre in the Capacitor WebView if native tooling is
    available.
-   Prepare Vercel deployment configuration for the web app.
-   Do not deploy or publish without the user's explicit approval.

### Acceptance criteria

-   Main workflows pass a manual verification checklist.
-   Production build succeeds.
-   No critical console errors remain.
-   RTL/LTR and themes work across page groups.
-   Map and simulation lifecycle are stable.
-   Capacitor configuration is compatible with the app architecture, or
    remaining platform setup is documented.
-   Vercel deployment configuration is ready, without publishing
    automatically.
-   Final report lists completed work, known limitations and manual
    steps.

------------------------------------------------------------------------

## Phase completion report required from the implementation agent

After every phase, the agent must provide:

1.  **Phase and outcome:** completed, partially completed or blocked.
2.  **What changed:** concise feature summary.
3.  **Files changed:** grouped by purpose.
4.  **Architecture decisions:** important choices and why.
5.  **Commands/checks run:** exact commands and results.
6.  **Manual verification:** steps the user should try.
7.  **Known limitations:** anything incomplete or deferred.
8.  **Learning handoff:** concepts and files the teaching agent should
    explain.
9.  **Next phase readiness:** whether the next phase can safely begin.

Do not mark a phase complete merely because code was written. The
acceptance criteria and checks must be addressed.
