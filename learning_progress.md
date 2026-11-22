# SUTRAF --- Learning Progress Tracker

Track understanding, not merely whether a feature exists.

**Status legend** - \[ \] Not studied - \[\~\] Studied; understanding is
incomplete - \[x\] Can explain and modify independently - \[?\] Need to
revisit or ask a question

For each phase, do not mark every item complete just because the
implementation agent explained it. You should be able to explain it in
your own words and make a small change.

## Phase 1 --- Project foundation and application shell

-   [ ] I understand the SvelteKit project structure.
-   [ ] I can explain file-based routing.
-   [ ] I understand root layouts and page components.
-   [ ] I can explain how shared components are composed.
-   [ ] I understand the purpose of package scripts and dependencies.
-   [ ] I can run the dev server and production build.
-   [ ] I understand the difference between Tailwind CSS and
    shadcn-svelte.
-   [ ] I can add a simple page in the correct location.
-   [ ] I can trace a navigation action to its rendered route.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 2 --- Responsive shell, localization and theme

-   [ ] I understand mobile-first responsive design.
-   [ ] I can explain how Tailwind breakpoints work.
-   [ ] I understand `dir="rtl"` and `dir="ltr"`.
-   [ ] I understand why RTL requires layout changes, not only text
    alignment.
-   [ ] I understand translation dictionaries and lookup keys.
-   [ ] I can trace language state to the rendered UI.
-   [ ] I understand how theme state is managed by mode-watcher.
-   [ ] I understand how preferences persist after refresh.
-   [ ] I can add a translated label and test both directions.
-   [ ] I can add/use a semantic theme token.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 3 --- Domain model and structured mock data

-   [ ] I understand each core entity and its responsibility.
-   [ ] I understand stable IDs and references.
-   [ ] I can explain why related records are referenced by ID.
-   [ ] I can trace Bus → Company and Bus → Route.
-   [ ] I understand route stop ordering.
-   [ ] I understand the difference between coordinates and screen
    pixels.
-   [ ] I understand the basic GeoJSON structures used.
-   [ ] I understand the purpose of the service layer.
-   [ ] I can add a mock record and connect its references correctly.
-   [ ] I can identify where data ends and UI begins.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 4 --- Passenger urban map and exploration

-   [ ] I understand what MapLibre is responsible for.
-   [ ] I understand the role of the tile source/style.
-   [ ] I can explain map centre, zoom and bounds.
-   [ ] I understand GeoJSON Point and LineString.
-   [ ] I can trace route data into a rendered map layer.
-   [ ] I can trace a stop click into selected UI state.
-   [ ] I understand why map initialization belongs in a lifecycle-aware
    location.
-   [ ] I understand map cleanup and duplicate-instance risks.
-   [ ] I understand map attribution and tile-provider constraints.
-   [ ] I can add or modify a simple map feature.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 5 --- Bus simulation, ETA and traffic incidents

-   [ ] I understand the simulation state for a bus.
-   [ ] I understand route progress and direction.
-   [ ] I understand how coordinate interpolation works conceptually.
-   [ ] I can explain how progress becomes a map position.
-   [ ] I understand timer/update-loop lifecycle and cleanup.
-   [ ] I can calculate a simple ETA from segment durations.
-   [ ] I understand how an incident affects a specific segment.
-   [ ] I understand why random values during rendering are problematic.
-   [ ] I can trace simulation state to marker and ETA UI.
-   [ ] I can modify a segment duration or incident and predict the
    result.

## **Questions / confusing concepts:**

## **Manual ETA calculation:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 6 --- Intercity search and trip details

-   [ ] I understand controlled form state.
-   [ ] I understand input validation versus data filtering.
-   [ ] I can explain how search criteria filter trips.
-   [ ] I understand how intermediate stops affect matching.
-   [ ] I understand derived search results.
-   [ ] I can trace a selected trip to its detail view.
-   [ ] I understand empty and invalid states.
-   [ ] I can add a mock trip and make it appear in search results.
-   [ ] I can change a filter without needing a tutorial for the whole
    feature.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 7 --- Passenger routes, tickets, subscriptions and profile

-   [ ] I understand how shared route data is reused across pages.
-   [ ] I understand selected-entity/detail view patterns.
-   [ ] I understand ticket/subscription presentation versus real
    transactions.
-   [ ] I can explain which preferences are shared application state.
-   [ ] I understand empty states for user-owned data.
-   [ ] I can add a mock ticket/subscription and trace where it appears.
-   [ ] I can explain how profile settings update the rest of the UI.
-   [ ] I can identify and avoid duplicated component logic.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 8 --- Demo roles and Company / Driver workspace

-   [ ] I understand the demo role-selection flow.
-   [ ] I can explain how the selected user determines company context.
-   [ ] I understand conditional rendering for role-specific UI.
-   [ ] I understand the CRUD flow from form to updated list.
-   [ ] I can trace the company ownership check.
-   [ ] I understand why frontend role checks are not security.
-   [ ] I can explain how shared mock state updates.
-   [ ] I can switch demo companies and predict which buses each can
    see.
-   [ ] I can make a small change to a form or service safely.

## **Questions / confusing concepts:**

## **Cross-company test performed:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 9 --- Global Admin workspace

-   [ ] I understand the admin page structure.
-   [ ] I understand reusable CRUD patterns.
-   [ ] I understand referential integrity between entities.
-   [ ] I can explain the consequences of deleting/editing a referenced
    record.
-   [ ] I understand confirmation for destructive actions.
-   [ ] I can trace admin changes into passenger/company views.
-   [ ] I can trace an incident change into ETA output.
-   [ ] I understand the route geometry editing approach.
-   [ ] I can add or edit a mock entity and verify its dependants.

## **Questions / confusing concepts:**

## **Small change I made myself:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase 10 --- Integration, quality, Capacitor and deployment readiness

-   [ ] I understand the production build process.
-   [ ] I can distinguish dev-server success from production-build
    success.
-   [ ] I understand the relevant SvelteKit adapter/output constraints.
-   [ ] I understand how Capacitor wraps the web app.
-   [ ] I understand what runs inside the WebView.
-   [ ] I understand why MapLibre needs native-WebView testing.
-   [ ] I understand the difference between Vercel web hosting and
    mobile packaging.
-   [ ] I can run through the main user workflows manually.
-   [ ] I can inspect console/build errors and identify their source.
-   [ ] I can explain what is still missing before a real
    backend/production system.

## **Questions / confusing concepts:**

## **Small change or diagnostic I performed:**

**Phase confidence (1--5):**

------------------------------------------------------------------------

## Phase review record

  ----------------------------------------------------------------------------
  Phase          Implementation   Learning       Independent    Ready for next
                 complete?        reviewed?      change done?   phase?
  -------------- ---------------- -------------- -------------- --------------
  1                                                             

  2                                                             

  3                                                             

  4                                                             

  5                                                             

  6                                                             

  7                                                             

  8                                                             

  9                                                             

  10                                                            
  ----------------------------------------------------------------------------
