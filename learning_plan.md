# SUTRAF --- Learning Plan

**Purpose:** Explain what to learn while implementing each phase. This
is a learning project, not merely a code-generation exercise.

## How to use this plan

For every implementation phase:

1.  Let the implementation agent complete only that phase.
2.  Review the implementation agent's report and changed files.
3.  Give the report, relevant code changes and this learning plan to the
    teaching agent.
4.  Study the explanation before moving on.
5.  Open the actual files and trace the important data and event flow.
6.  Make at least one small change yourself or answer the teaching
    agent's questions.
7.  Update `learning_progress.md`.

You do not need to memorize every API or CSS utility. You should
understand the architecture, state flow, data flow, lifecycle and
trade-offs well enough to modify and debug the feature.

## Learning expectations

For each phase, aim to understand: - **What was built:** the feature and
its responsibility. - **Why it is structured this way:** the
architectural reasoning. - **How data flows:** from data source/service
to component and back. - **How state changes:** what triggers updates
and what depends on them. - **Lifecycle and cleanup:** what starts,
updates and stops. - **Failure cases:** what can go wrong and how the UI
responds. - **Trade-offs:** why this approach was selected and what
alternatives exist.

------------------------------------------------------------------------

# Phase 1 --- Project foundation and application shell

### Learn

-   SvelteKit project structure and file-based routing.
-   Root layout versus page components.
-   Svelte components and component composition.
-   Shared layouts and reusable UI.
-   The role of `package.json`, scripts and dependencies.
-   Development server versus production build.
-   How Tailwind and shadcn-svelte fit into the UI architecture.
-   The difference between a component library and a styling framework.

### Understand deeply

-   How a URL maps to a SvelteKit route.
-   How shared layout content surrounds page content.
-   Why the root layout should not contain every page's business logic.
-   How reusable components reduce duplication without hiding important
    behaviour.

### Practical learning task

Trace one navigation action from the clicked navigation item to the
displayed route. Identify which files define the route, shared layout
and visible component.

### Ready to continue when

You can add a simple page, place it inside the correct layout and
explain how the application renders it.

------------------------------------------------------------------------

# Phase 2 --- Responsive shell, localization and theme

### Learn

-   Responsive design and mobile-first CSS.
-   Tailwind breakpoints and layout primitives.
-   CSS logical properties and why they help RTL/LTR.
-   HTML `lang` and `dir` attributes.
-   Translation dictionaries and key-based text lookup.
-   Svelte reactive state for language and theme.
-   Persistent browser preferences and the difference between in-memory
    and persisted state.
-   Light/dark theme tokens and CSS variables.
-   How `mode-watcher` manages theme state.

### Understand deeply

-   Why RTL is not simply right-aligned text.
-   How direction affects flex/grid order, spacing, icons and form
    controls.
-   How theme state reaches components.
-   How a persisted preference is restored after refresh.
-   Why responsive layouts should use viewport/layout rules rather than
    user-agent detection.

### Practical learning task

Add a new translated navigation label and verify both directions. Add
one semantic colour token and use it in a component.

### Ready to continue when

You can explain where language/theme state lives, how it is persisted
and how direction changes the layout.

------------------------------------------------------------------------

# Phase 3 --- Domain model and structured mock data

### Learn

-   Domain modelling and entity relationships.
-   Stable IDs and references.
-   Normalization versus duplicated nested data.
-   JavaScript modules and exports.
-   Separation of data, domain logic and UI.
-   Service/helper functions.
-   GeoJSON basics: Feature, FeatureCollection, Point and LineString.
-   Data validation and defensive handling of missing references.

### Understand deeply

-   Why a Bus references a route by ID rather than copying the entire
    route.
-   How Company ownership is represented.
-   How route stop order differs from a generic list of stops.
-   Why geographic coordinates are not ordinary screen pixels.
-   Why mock data should have the same conceptual shape as future API
    data.

### Practical learning task

Follow one bus ID to its company and route, then follow the route to its
ordered stops. Add one new mock stop and connect it correctly.

### Ready to continue when

You can explain the core entities and trace their relationships without
relying on component code.

------------------------------------------------------------------------

# Phase 4 --- Passenger urban map and exploration

### Learn

-   MapLibre GL JS fundamentals.
-   Map viewport, centre, zoom and bounds.
-   Raster/vector tile concepts at a practical level.
-   Map style and tile source configuration.
-   GeoJSON sources and map layers.
-   Markers, popups and feature selection.
-   Svelte component lifecycle and browser-only APIs.
-   Why maps should initialize after the component mounts.
-   Cleanup of map instances and event listeners.
-   Map attribution and tile-provider constraints.

### Understand deeply

-   The difference between geographic coordinates and CSS positioning.
-   How GeoJSON route geometry becomes a visible line.
-   How a stop point becomes a map feature.
-   How a click on a map feature becomes selected application state.
-   Why recreating the map on every state update is a performance and
    lifecycle problem.
-   Why the map provider is configurable.

### Practical learning task

Change the initial map centre or add a mock stop feature and trace how
it appears on the map. Explain the path from data file to GeoJSON source
to map layer.

### Ready to continue when

You can explain how the map is created, how data is rendered, how
selection works and how the map is cleaned up.

------------------------------------------------------------------------

# Phase 5 --- Bus simulation, ETA and traffic incidents

### Learn

-   Simulation state and deterministic logic.
-   Timers and update loops.
-   Component/service separation.
-   Coordinate interpolation.
-   Route progress and direction.
-   ETA calculation from segment durations.
-   Incident effects and derived values.
-   Svelte reactivity and efficient UI updates.
-   Timer cleanup and memory-leak prevention.

### Understand deeply

-   Why a bus marker should be derived from route progress rather than
    arbitrary CSS animation.
-   How a progress value maps to a geographic coordinate.
-   How remaining segment time and upcoming segments contribute to ETA.
-   How an incident changes only the affected segment's duration.
-   Why random values during rendering cause unstable UI.
-   The difference between simulation time and wall-clock time.

### Practical learning task

Choose a sample route and manually calculate an ETA. Activate an
incident on one segment and explain exactly which arrivals change and
why.

### Ready to continue when

You can trace a bus from simulation state to map position and calculate
an arrival estimate by hand for a simple case.

------------------------------------------------------------------------

# Phase 6 --- Intercity search and trip details

### Learn

-   Controlled form inputs and form state.
-   Validation and user feedback.
-   Filtering and searching arrays of structured objects.
-   Date values and date comparison.
-   Derived state for search results.
-   Empty/loading/success/error UI states.
-   Rendering ordered timelines and nested trip stops.

### Understand deeply

-   How search criteria are transformed into a filter.
-   How a trip with intermediate stops relates to an origin/destination
    query.
-   Why the results must be derived from data rather than hardcoded for
    each search.
-   How form validation differs from filtering.
-   How the selected trip ID drives the details view.

### Practical learning task

Add or modify a mock trip, then search for it using its origin,
destination and date. Explain why it matches.

### Ready to continue when

You can modify the search criteria or filtering rule without needing a
tutorial for the overall flow.

------------------------------------------------------------------------

# Phase 7 --- Passenger routes, tickets, subscriptions and profile

### Learn

-   Reusing shared components across pages.
-   Detail views and selected entity state.
-   Presentation of status and validity information.
-   Empty states.
-   Local preferences and settings.
-   UI-only QR/reference presentation versus actual QR validation.
-   Component composition and avoiding duplicated page logic.

### Understand deeply

-   How route detail views reuse the same route/stop data as the map.
-   Why ticket display does not imply a booking or payment system.
-   How profile settings connect to shared language/theme/city state.
-   Which state belongs globally and which belongs only to a page.

### Practical learning task

Add one mock subscription or ticket and trace where it appears. Change a
preference and confirm all relevant UI responds.

### Ready to continue when

You can explain how the passenger pages share data and shared
preferences without duplicating their logic.

------------------------------------------------------------------------

# Phase 8 --- Demo roles and Company / Driver workspace

### Learn

-   Role-based UI composition.
-   Conditional rendering.
-   Demo account selection and session state.
-   CRUD operations in frontend state.
-   Form validation and controlled updates.
-   Ownership and tenant scoping.
-   Service-layer enforcement of company ownership.
-   Why frontend authorization is not security.

### Understand deeply

-   How the selected demo user determines the company context.
-   How a bus is checked against the selected company.
-   Why hiding another company's record in the UI is not enough for real
    security.
-   How create/update operations change shared mock state.
-   How components, services and data records interact during a CRUD
    operation.

### Practical learning task

Switch between two company demo accounts and verify that each sees and
edits only its own fleet through the application's service layer.
Inspect where the ownership check happens.

### Ready to continue when

You can trace an edit operation from form submission through validation
and ownership checks to the updated list.

------------------------------------------------------------------------

# Phase 9 --- Global Admin workspace

### Learn

-   Admin information architecture.
-   CRUD patterns and reusable data tables/forms.
-   Referential integrity in frontend data.
-   Cascading consequences of editing/deleting related entities.
-   Destructive-action confirmation.
-   Editing structured geographic data.
-   Shared application state and cross-workspace updates.
-   Dashboard metrics derived from datasets.

### Understand deeply

-   How admin changes affect passenger and company screens.
-   Why deleting a route referenced by buses/stops needs a deliberate
    policy.
-   How an incident update propagates into ETA calculations.
-   Why validation should protect relationships, not only individual
    form fields.
-   How reusable CRUD components can help without making every entity
    form identical.

### Practical learning task

Create or edit an incident and trace its effect through the incident
data, ETA service and passenger UI. Then edit a route's stop order and
inspect the affected route display.

### Ready to continue when

You can explain the consequences of modifying a shared entity and
identify which dependent views/services need to update.

------------------------------------------------------------------------

# Phase 10 --- Integration, quality, Capacitor and deployment readiness

### Learn

-   End-to-end workflow testing.
-   Responsive and cross-direction testing.
-   Browser console and build diagnostics.
-   Accessibility checks.
-   SvelteKit build and adapter concepts.
-   Capacitor architecture: web app inside a native shell.
-   WebView constraints and native platform permissions.
-   Vercel deployment basics.
-   Environment configuration and secrets.
-   Difference between web hosting and native app packaging.

### Understand deeply

-   Which SvelteKit features require a server and why that matters to a
    static/native build.
-   How Capacitor loads the frontend.
-   Why MapLibre must be tested inside the WebView.
-   Which settings are safe to expose in a frontend bundle and which are
    not.
-   Why a successful local dev server does not guarantee a production
    build.

### Practical learning task

Run the production build, inspect any warnings, and explain the path
from SvelteKit build output to the Capacitor app shell. Verify the web
deployment configuration without publishing.

### Ready to finish when

You can explain the application's runtime architecture on web and
mobile, identify its remaining limitations and diagnose common
build/runtime failures.

------------------------------------------------------------------------

## Final learning outcome

By the end, you should be able to: - Navigate and extend a SvelteKit
application. - Build reusable Svelte components and manage reactive
state. - Structure a frontend around domain data and services. - Render
and interact with geographic data. - Implement controlled simulations
and derived calculations. - Build search and CRUD workflows. - Model
roles and ownership in a frontend demo. - Understand the limits of
frontend-only authorization. - Test and prepare a mobile-first frontend
for web and native packaging.

This project does not, by itself, demonstrate backend readiness. It
builds the frontend architecture and integration knowledge that will
make the later backend phase more meaningful.
