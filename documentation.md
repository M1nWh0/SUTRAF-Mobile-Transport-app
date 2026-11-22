# SUTRAF --- Transportation App

## Product & Technical Documentation

**Document status:** Initial project specification\
**Product type:** Mobile-first transportation information app\
**Target market:** Algeria\
**Platforms:** Android and iOS, with a web preview\
**Languages:** Arabic and English\
**Frontend:** SvelteKit, Svelte, Tailwind CSS, shadcn-svelte\
**Mapping:** MapLibre GL JS with OpenStreetMap-derived map tiles\
**Mobile packaging:** Capacitor\
**Initial data strategy:** Structured mock data; no backend initially\
**Deployment target:** Vercel for the web application

------------------------------------------------------------------------

# 1. Product Overview

## 1.1 Product idea

SUTRAF is a mobile-first transportation application for people
travelling within Algerian cities and between wilayas.

The application brings urban transport information and intercity trip
information into one interface. Passengers can explore bus routes,
stops, stations, buses and estimated arrival times. They can also search
for intercity trips, inspect departure schedules and view the stops
along a journey.

The application is a frontend learning project. Its first version will
use realistic, structured mock data and simulated interactions. It
should look and behave like a coherent transportation product, without
claiming to provide real-time transport operations.

## 1.2 Product vision

Make public transportation information easier to understand and navigate
through a clear, map-centred mobile experience.

## 1.3 Product goals

-   Present urban bus routes and stops on a geographical map.
-   Show simulated bus positions and estimated arrival times.
-   Make route, stop, bus and station information easy to inspect.
-   Allow passengers to search intercity trips between Algerian wilayas.
-   Present trip schedules, operators, prices and intermediate stops.
-   Display traffic incidents and their effect on estimated arrival
    times.
-   Provide a company/driver area for managing that operator's mock
    transport data.
-   Provide an administration area for managing the application's mock
    data.
-   Support Arabic RTL and English LTR interfaces.
-   Provide a polished mobile experience that can be packaged for
    Android and iOS.

## 1.4 Project boundaries

This is a presentation and learning application, not a production
transport-management platform.

The initial version will **not** provide: - Real GPS tracking of buses
or drivers. - Real-time feeds from transport operators. - Real ticket
purchasing, payment processing or QR validation. - Real passenger
accounts or secure authentication. - Live traffic detection or external
traffic feeds. - A production backend or database. - Official transport
schedules or guaranteed arrival times.

All displayed operational information must be understood as
demonstration data.

------------------------------------------------------------------------

# 2. Product Requirements Document (PRD)

## 2.1 Target users

### Passenger

A person who wants to understand available transportation options.

Primary needs: - Find a bus stop or route. - See which buses serve a
route. - Inspect a bus or stop and its estimated arrival. - Understand
whether an incident is affecting a route. - Search for a trip between
two wilayas. - Inspect departure time, arrival time, operator, price and
intermediate stops. - View demonstration tickets or subscriptions.

### Company and Driver

The **Company** and **Driver** roles share the exact same underlying operator workspace and management logic. The **sole difference** between them is the fleet management scope:
- A **Company** user manages and checks **multiple buses** (a fleet of vehicles).
- A **Driver** user manages and checks **only one bus** (their single assigned vehicle).

Both users view operational information, route assignments, scheduled segments, and simulated operational status, but a Driver's view is scoped to a single vehicle while a Company user's view is scoped to the operator's multi-vehicle fleet.

Primary needs:
- View assigned bus(es) (1 bus for Driver, multiple buses for Company).
- Add or edit bus information (Company adds/edits across fleet; Driver checks/updates their assigned bus).
- Assign buses to routes or view current route assignment.
- Update mock bus status and estimated timing information.
- View the routes and schedules associated with the operator.

> [!NOTE]
> **Future Authentication & Role Boundary Architecture Note:**
> In the production architecture, Passenger, Driver, Company, and Global Admin are distinct user types. Users will register or sign in as one specific user type and will only be granted access to their designated workspace; cross-role switching will not be permitted.
> The three preview buttons currently visible in the top demo banner (`Passenger`, `Company / Driver`, `Global Admin`) are provided strictly for demonstration, evaluation, and rapid testing during development phases. **In the future, these three role-switching buttons will be removed** once real registration and authentication flows are introduced. (They are retained for current demo phases until explicit instruction to remove them).

### Global Admin

An administrator responsible for the overall application data.

Primary needs: - Manage cities and wilayas. - Manage urban routes and
stops. - Manage intercity trips and schedules. - Manage operators and
buses. - Create, edit or deactivate mock traffic incidents. - Review and
manage the application's demonstration data.

## 2.2 Core product modules

### A. Urban transportation

The passenger can: - Select a city. - Browse the city map. - View
available routes and their paths. - See stops along a route. - Select a
stop to inspect its information and estimated arrivals. - Select a bus
to inspect its route, direction, status and next stop. - See simulated
bus movement. - See active incidents and estimated delays.

### B. Intercity transportation

The passenger can: - Select an origin wilaya. - Select a destination
wilaya. - Select a travel date. - Search available mock trips. - Compare
departure and arrival times, operator and price. - Expand a trip to
inspect its intermediate stops and scheduled times. - Open a trip detail
view.

The initial intercity experience is schedule- and itinerary-centred. It
does not need to reproduce urban live-style bus tracking.

### C. Routes and lines

The passenger can browse urban lines and inspect: - Route name or
number. - Origin and destination. - Stops in order. - Operating
information and displayed fare, where mock data is available. - The
route on the map.

### D. Tickets and subscriptions

The prototype includes an area for: - Urban subscription information. -
Subscription validity and remaining time. - Intercity ticket details. -
A demonstration QR code or ticket reference.

These are display-only demonstration features. There is no payment,
booking, ticket issuance or validation integration.

### E. Company / Driver workspace

The operator-side user can: - View the company's buses. - Add a bus to
the company's fleet. - Edit bus details and status. - Assign a bus to
one of the routes available to that company. - Update demonstration
schedule or timing data. - Inspect the routes associated with its buses.

The user must not be able to edit another company's buses or records.

### F. Global administration

The administrator can manage: - Cities and wilayas. - Urban routes and
route geometry. - Stops and stations. - Intercity trips and stop
sequences. - Companies/operators. - Buses. - Traffic incidents. - Mock
schedules and demonstration data.

## 2.3 Functional requirements

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  FR-01                               The application shall support
                                      Arabic and English.

  FR-02                               The layout shall switch correctly
                                      between RTL and LTR.

  FR-03                               The passenger shall be able to
                                      choose or change the active city.

  FR-04                               The passenger shall be able to
                                      browse urban routes and stops on a
                                      map.

  FR-05                               Selecting a stop shall display its
                                      details and mock arrival estimates.

  FR-06                               Selecting a bus shall display its
                                      details and route information.

  FR-07                               Bus markers shall move along
                                      predefined mock route coordinates.

  FR-08                               The application shall calculate
                                      coherent mock ETAs from route
                                      segments and incidents.

  FR-09                               The passenger shall be able to
                                      search intercity trips by origin,
                                      destination and date.

  FR-10                               Search results shall display trip
                                      schedules, operators and prices
                                      where available.

  FR-11                               The passenger shall be able to
                                      inspect a trip's intermediate stops
                                      and times.

  FR-12                               The application shall display mock
                                      tickets and subscriptions.

  FR-13                               A company/driver user shall manage
                                      only records belonging to its own
                                      company.

  FR-14                               A global admin shall manage the
                                      full demonstration dataset.

  FR-15                               The application shall provide
                                      empty, loading, error and success
                                      states where appropriate.

  FR-16                               The application shall remain usable
                                      when location permission is denied.
  -----------------------------------------------------------------------

## 2.4 Non-functional product requirements

-   **Usability:** Main passenger tasks should be understandable without
    instructions.
-   **Responsive behaviour:** The interface must adapt to different
    phone sizes and orientations.
-   **Mobile-first:** The primary layout is designed for phone use.
-   **Desktop preview:** On desktop, the passenger experience may be
    presented in a centred mobile-sized viewport. Admin screens may use
    the available desktop width.
-   **Consistency:** Repeated components and interaction patterns should
    behave consistently.
-   **Accessibility:** Use readable contrast, meaningful labels,
    keyboard-accessible controls and suitable touch targets.
-   **Performance:** Avoid unnecessary map reinitialization and
    excessive component updates.
-   **Honesty:** Clearly label simulated or estimated information so it
    is not mistaken for live operational data.

------------------------------------------------------------------------

# 3. Technical Requirements Document (TRD)

## 3.1 Technology stack

  -----------------------------------------------------------------------
  Area                    Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Application framework   SvelteKit               Routing, layouts and
                                                  application structure

  UI framework            Svelte 5                Components and reactive
                                                  interface

  Styling                 Tailwind CSS            Layout, spacing,
                                                  responsive styling and
                                                  design tokens

  Component library       shadcn-svelte           Accessible, reusable UI
                                                  component patterns

  Theme                   mode-watcher            Light and dark theme
                                                  handling

  Mapping                 MapLibre GL JS          Interactive
                                                  geographical map

  Map data                GeoJSON                 Route lines, stops and
                                                  geographic features

  Basemap                 OpenStreetMap-derived   Streets and
                          tiles                   geographical context

  Mobile packaging        Capacitor               Android and iOS
                                                  application shells

  Web deployment          Vercel                  Hosting the web version
  -----------------------------------------------------------------------

The exact map tile provider is a deployment decision that remains open.
OpenStreetMap is map data, not a promise of free, unlimited production
tile hosting. Select a provider whose usage terms, limits, attribution
requirements and pricing fit the project.

## 3.2 Application architecture

The initial application is a frontend-only system.

``` text
SUTRAF
│
├── Passenger application
│   ├── Urban transport
│   ├── Intercity transport
│   ├── Routes and stops
│   ├── Tickets and subscriptions
│   └── Profile and preferences
│
├── Company / Driver workspace
│   ├── Company overview
│   ├── Fleet management
│   ├── Bus details
│   └── Route and schedule management
│
├── Global Admin workspace
│   ├── Dashboard
│   ├── Cities and wilayas
│   ├── Routes and stops
│   ├── Companies and buses
│   ├── Intercity trips
│   └── Traffic incidents
│
└── Shared application layer
    ├── Mock data
    ├── Domain logic
    ├── ETA simulation
    ├── Map utilities
    ├── Localization
    └── Reusable UI components
```

### Important architectural rule

Keep mock data and domain logic separate from Svelte components.

Components should display data and forward user actions. They should not
contain large hardcoded datasets or independently invent ETA
calculations. This separation will make it possible to replace mock data
with API responses in a later learning phase.

A future backend is not part of the initial implementation. Do not
create unnecessary server endpoints or database infrastructure now.

## 3.3 Suggested source organization

The exact structure can evolve during implementation, but
responsibilities should remain separated.

``` text
src/
├── lib/
│   ├── components/
│   │   ├── ui/
│   │   ├── navigation/
│   │   ├── map/
│   │   ├── transport/
│   │   └── forms/
│   ├── data/
│   │   ├── cities.js
│   │   ├── urban-routes.js
│   │   ├── stops.js
│   │   ├── buses.js
│   │   ├── companies.js
│   │   ├── intercity-trips.js
│   │   └── incidents.js
│   ├── services/
│   │   ├── urban-transport.js
│   │   ├── intercity-transport.js
│   │   └── eta-simulator.js
│   ├── map/
│   │   ├── map-config.js
│   │   └── geojson.js
│   ├── i18n/
│   └── utils/
│
├── routes/
│   ├── (passenger)/
│   ├── (company)/
│   ├── (admin)/
│   └── ...
│
└── app.html
```

This is a responsibility guide, not a requirement to create every file
immediately.

## 3.4 Mock data model

The initial data should represent the entities below. IDs should be
stable and references between entities should use IDs rather than
duplicated objects.

  -----------------------------------------------------------------------
  Entity                              Important fields
  ----------------------------------- -----------------------------------
  City                                id, name, wilayaId,
                                      centreCoordinates

  Wilaya                              id, name, nameArabic

  Company                             id, name, contactDetails, status

  User                                id, displayName, email, role,
                                      companyId

  UrbanRoute                          id, cityId, name, code, stopIds,
                                      geometry, segmentDurations

  Stop                                id, cityId, name, coordinates,
                                      routeIds

  Bus                                 id, companyId, routeId, label,
                                      status, currentPosition

  IntercityTrip                       id, companyId, originWilayaId,
                                      destinationWilayaId, date,
                                      departureTime, arrivalTime, price,
                                      stops

  Incident                            id, routeId, affectedSegment,
                                      delayMinutes, description, status

  Subscription                        id, passengerId, planName,
                                      validUntil, status

  Ticket                              id, passengerId, tripId, reference,
                                      status
  -----------------------------------------------------------------------

### Geographic representation

-   A stop stores latitude and longitude.
-   An urban route stores an ordered geographic path.
-   Route geometry should follow the road shape rather than use straight
    lines between stops.
-   GeoJSON should be used for route lines and geographical features
    displayed by MapLibre.
-   Bus positions should be generated along the route's coordinate
    sequence.

### ETA and delay model

Use fixed mock durations for each route segment under normal conditions.

Example:

  Segment             Normal duration
  ----------------- -----------------
  Stop A → Stop B           4 minutes
  Stop B → Stop C           6 minutes
  Stop C → Stop D           3 minutes

If an incident affects Stop B → Stop C and adds five minutes, that
segment becomes eleven minutes for the affected simulation.

The ETA calculation should consider: 1. The bus's current position along
its route. 2. The remaining time on the current segment. 3. The normal
durations of upcoming segments. 4. Active incident delays affecting
those segments.

The same segment should retain the same normal duration in repeated
calculations. Do not generate a completely random travel time on every
render. If variation is desired, introduce it through a controlled
simulation state.

### Simulated bus movement

A bus should have a route, a direction, a simulation start point and a
progression value.

The simulation advances the bus along the route's coordinate sequence.
The map marker is updated from the calculated geographic position. The
movement should be repeatable and visually plausible.

This is a frontend simulation, not a representation of a real bus
location.

## 3.5 Map implementation

### Recommended approach

Use MapLibre GL JS with an OpenStreetMap-derived basemap.

Use: - MapLibre for map rendering, zooming, panning, layers, markers and
popups. - GeoJSON LineString features for route paths. - GeoJSON Point
features or map layers for stops. - A bus marker or symbol layer for
simulated bus positions. - Map popups or application panels for selected
stop and bus details.

### Map behaviour

-   Centre the map on the selected city.
-   Fit the map to a selected route when the user opens route details.
-   Display route paths and stops.
-   Allow selecting a stop or bus.
-   Update simulated bus positions without recreating the entire map.
-   Display active incidents on or near affected route segments.
-   Keep map controls usable on small screens.

### Map provider considerations

-   Display the required OpenStreetMap attribution when using OSM data.
-   Follow the chosen tile provider's caching, rate-limit and
    attribution rules.
-   Do not bulk-download or prefetch tiles from the public OpenStreetMap
    tile servers.
-   Keep the tile provider configurable so it can be changed without
    rewriting the map features.

The initial project can use a development-friendly tile source. Before
public deployment, confirm that the selected provider permits the
intended usage.

## 3.6 Location handling

Location is helpful but must not block the application.

Recommended flow: 1. Open the app with a default or previously selected
city. 2. When location is useful, explain why the app is requesting it.
3. Request permission only when the user chooses a location-dependent
action or opts into location detection. 4. If permission is granted,
estimate the user's city. 5. Ask the user to confirm the detected city.
6. If permission is denied or unavailable, let the user choose a city
manually. 7. Always allow the user to change the selected city.

The selected transport city is a browsing preference; it is not
necessarily the user's physical location.

## 3.7 Authentication and role simulation

There is no real authentication in the initial learning version.

For development, evaluation, and presentation purposes, a top demonstration banner provides role preview switching between:
- **Passenger**: Explores urban maps, intercity trips, lines, tickets and user settings.
- **Company / Driver**: Shared operator workspace. Company manages multiple buses; Driver manages only one bus.
- **Global Admin**: Manages network entities (wilayas, lines, buses, incidents).

### Operator Scoping (Company vs Driver)
Company and Driver operate in the same domain workspace. The only difference is fleet scale:
- A **Company** user checks and manages **multiple buses** ($N > 1$).
- A **Driver** user checks and manages **only one bus** ($1$ assigned vehicle).

### Future Registration and Authentication Model
> [!IMPORTANT]
> **Future Architecture Note:**
> In a production release, Passenger, Driver, Company, and Global Admin are distinct user types. Users will register and authenticate as one specific user type and will only have access to their designated workspace; they will not be able to access or switch to other roles.
> The three preview buttons (`Passenger`, `Company / Driver`, `Global Admin`) currently available in the demo banner will be **removed in the future** when real authentication and user registration are introduced. (They are retained for current demo phases until explicit instruction to remove them).

## 3.8 Capacitor and SvelteKit

Capacitor packages the web application inside native Android and iOS
shells. It does not automatically turn SvelteKit server functionality
into a local native backend.

For the initial project: - Keep the application frontend-focused. -
Avoid depending on server-only SvelteKit features for core local UI
behaviour. - Configure a build/output approach compatible with the
chosen Capacitor workflow. - Keep any future API independent from the
mobile application bundle. - Test MapLibre rendering and performance
inside the Capacitor WebView.

The web version can be deployed to Vercel. The mobile builds can use the
same frontend code through Capacitor.

------------------------------------------------------------------------

# 4. Application Workflow

## 4.1 First launch

``` text
Launch
  ↓
Load language and theme preferences
  ↓
Choose or confirm language
  ↓
Choose a city manually OR opt into location detection
  ↓
Passenger home
```

Location permission is optional. The passenger must be able to continue
without granting it.

## 4.2 Passenger --- urban transport

``` text
Home
  ↓
Select Urban
  ↓
View city map and available routes
  ↓
Select a route, stop or bus
  ↓
Open details
  ├── Stop → estimated arrivals and served routes
  ├── Bus → route, direction, next stop and ETA
  └── Route → path, ordered stops and buses
  ↓
Inspect incident information when present
```

## 4.3 Passenger --- intercity transport

``` text
Home
  ↓
Select Intercity
  ↓
Choose origin wilaya
  ↓
Choose destination wilaya
  ↓
Choose travel date
  ↓
Search
  ↓
View matching mock trips
  ↓
Select a trip
  ↓
Inspect schedule, operator, price and intermediate stops
  ↓
View demonstration ticket details if included
```

## 4.4 Company / Driver

``` text
User signs in / Demo role preview
  ↓
Operator workspace
  ↓
View assigned fleet/bus:
  ├── Company: views and manages multiple buses (N > 1)
  └── Driver: views and manages single assigned bus (1)
  ↓
Manage operational records:
  ├── Add bus (Company scope)
  ├── Edit bus details
  ├── Change mock bus status (Active / In Depot / Delayed)
  └── Assign bus to an available company route
  ↓
View and update schedule / timing data
```

The company/driver user manages exclusively their own operator records and cannot view or edit another company's records. (Note: in future production, users register strictly as Passenger, Driver, Company, or Admin, and the demo role switcher will be removed).

## 4.5 Global Admin

``` text
Demo sign-in / role selection
  ↓
Admin dashboard
  ├── Manage cities and wilayas
  ├── Manage routes and route geometry
  ├── Manage stops and stations
  ├── Manage companies
  ├── Manage buses
  ├── Manage intercity trips and schedules
  └── Manage traffic incidents
```

Admin changes should update the shared in-memory mock dataset during the
session. Optional local persistence may be added for demonstration
continuity, but it is not a backend or a source of truth.

------------------------------------------------------------------------

# 5. Pages and Navigation

The exact visual navigation can evolve, but the following page
responsibilities define the intended application.

## 5.1 Passenger pages

  -----------------------------------------------------------------------
  Page                    Purpose                 Main content and
                                                  actions
  ----------------------- ----------------------- -----------------------
  Home                    Main passenger entry    Urban/intercity switch,
                          point                   city context and
                                                  primary search

  Urban Map               Explore city transport  Map, route paths,
                                                  stops, bus markers and
                                                  incidents

  Stop Details            Inspect a selected stop Stop name, served
                                                  routes and estimated
                                                  arrivals

  Bus Details             Inspect a selected bus  Bus label, route,
                                                  direction, next stop
                                                  and simulated ETA

  Route Details           Understand an urban     Route path, ordered
                          route                   stops and buses on the
                                                  route

  Intercity Search        Search between wilayas  Origin, destination and
                                                  date

  Intercity Results       Compare trips           Departure, arrival,
                                                  operator, price and
                                                  trip details

  Trip Details            Inspect one trip        Stop sequence,
                                                  scheduled times and
                                                  operator information

  Tickets & Subscriptions View demonstration      Mock subscription,
                          travel documents        ticket and QR
                                                  presentation

  Profile & Settings      Manage local            Language, theme,
                          preferences             selected city and demo
                                                  account
  -----------------------------------------------------------------------

## 5.2 Company / Driver pages

  -----------------------------------------------------------------------
  Page                    Purpose                 Main content and
                                                  actions
  ----------------------- ----------------------- -----------------------
  Company Dashboard       Overview of the         Fleet summary, route
                          operator's data         summary and quick
                                                  actions

  Fleet                   Manage the company's    Bus list, status and
                          buses                   add/edit actions

  Bus Form                Create or edit a bus    Bus label, route
                                                  assignment and status

  Schedules               View and edit mock      Company schedules and
                          timing information      trip timing

  Company Profile         Display company         Company name and
                          information             demonstration details
  -----------------------------------------------------------------------

## 5.3 Global Admin pages

  -----------------------------------------------------------------------
  Page                    Purpose                 Main content and
                                                  actions
  ----------------------- ----------------------- -----------------------
  Admin Dashboard         Overview of mock system Counts and shortcuts to
                          data                    management areas

  Cities & Wilayas        Manage geographical     Add/edit city and
                          areas                   wilaya records

  Routes                  Manage urban routes     Route metadata, stop
                                                  order and geometry

  Stops & Stations        Manage stopping points  Names, city,
                                                  coordinates and route
                                                  associations

  Companies               Manage operators        Company records and
                                                  status

  Buses                   Manage all buses        Fleet records and route
                                                  assignments

  Intercity Trips         Manage intercity        Origin, destination,
                          schedules               date, stops and timings

  Incidents               Manage traffic          Affected route/segment,
                          disruptions             delay and status
  -----------------------------------------------------------------------

## 5.4 Navigation principles

-   Passenger navigation should remain simple and mobile-oriented.
-   Urban and intercity are two modes within the passenger experience,
    not two unrelated applications.
-   Selected city and language should remain consistent while
    navigating.
-   Company and admin workspaces should have navigation appropriate to
    their tasks.
-   Do not expose administrative actions in the passenger interface.
-   Use clear back navigation from detail views to their originating
    list or map.

------------------------------------------------------------------------

# 6. UX, Visual Design and Localization

## 6.1 Design direction

The interface should feel like a credible transportation product rather
than a generic dashboard template.

Design priorities: - Map-led urban experience. - Clear hierarchy for
departure times, arrival estimates and route numbers. - Compact,
readable information cards. - Distinct visual treatment for buses, stops
and incidents. - Consistent spacing, typography, icons and interaction
states. - Restrained use of colour: colour should communicate meaning,
not decorate every element. - Light and dark themes. - Purposeful motion
only where it helps communicate state, such as a bus moving along a
route.

The supplied SUTRAF prototype is the initial product reference for the
urban/intercity switch, route cards, trip search, tickets/subscriptions
and profile navigation. Its fixed phone frame and CSS-positioned
illustrative map are prototype techniques, not the final implementation
architecture.

## 6.2 Arabic and English

The application supports: - Arabic with RTL layout. - English with LTR
layout.

Changing language must update more than translated text. It must also
update: - Document direction. - Text alignment and layout flow. -
Navigation placement where appropriate. - Form and icon alignment. -
Date and number presentation. - Map popup and detail panel layout.

Avoid hardcoding directional spacing that breaks when switching
direction.

## 6.3 Responsive behaviour

-   Design phone layouts first.
-   Support common Android and iOS viewport sizes.
-   Use safe-area insets where necessary.
-   On desktop, the passenger application may be shown in a centred
    mobile-sized shell for presentation.
-   Do not rely on device detection to decide whether the application
    works. Use responsive layout rules.
-   Admin tables and management screens may use wider desktop layouts
    while remaining usable on tablets.

## 6.4 Loading, empty and error states

Provide deliberate states for: - Map loading. - No routes available in
the selected city. - No buses currently shown on a route. - No intercity
trips matching a search. - Invalid or incomplete search fields. -
Missing route geometry. - Location permission denied. - A selected bus
or stop that no longer exists in the current mock dataset. - Successful
mock create/update/delete actions.

------------------------------------------------------------------------

# 7. Mock Simulation Rules

The simulation should be deterministic enough to feel coherent.

## 7.1 Bus positions

-   Each simulated bus belongs to one route.
-   Each route has an ordered path.
-   Bus position is calculated along that path.
-   The marker should move smoothly between geographic coordinates.
-   A bus should not jump randomly to unrelated locations.
-   A bus's direction and next stop should agree with its position.

## 7.2 Arrival estimates

-   Store normal durations for route segments.
-   Calculate remaining time from the current position and upcoming
    segments.
-   Add delays only when an active incident affects the relevant
    segment.
-   Recalculate when the simulation advances or an incident changes.
-   Avoid changing the displayed ETA on every component render.

## 7.3 Traffic incidents

An incident should identify: - The affected route. - The affected
segment or geographical area. - A delay value. - A short
passenger-facing description. - An active/inactive status.

For the initial version, incidents are created and controlled by the
Global Admin. They do not come from a real traffic service.

## 7.4 Time handling

Use a consistent time model for schedules and simulation. Avoid mixing
arbitrary hardcoded clock strings with unrelated timers. The application
should make clear whether a time is a scheduled time, a simulated
estimate or a calculated delay.

------------------------------------------------------------------------

# 8. Scope and Delivery Phases

## Phase 1 --- Foundation

-   Create the SvelteKit application.
-   Configure Tailwind CSS and shadcn-svelte.
-   Configure light/dark theme.
-   Establish Arabic/English localization and RTL/LTR layout.
-   Build the shared application shell and navigation.
-   Add structured mock data.

## Phase 2 --- Passenger urban experience

-   Integrate MapLibre.
-   Display a city basemap.
-   Render route geometry and stops from GeoJSON.
-   Add stop and bus selection.
-   Add route, stop and bus detail panels.
-   Implement simulated bus movement.

## Phase 3 --- ETA and incidents

-   Implement fixed route-segment durations.
-   Implement ETA calculation.
-   Add mock incidents and segment delays.
-   Connect incident state to displayed ETAs.

## Phase 4 --- Intercity experience

-   Build origin, destination and date search.
-   Display mock trip results.
-   Build trip details and intermediate stop timeline.
-   Add validation and empty states.

## Phase 5 --- Company / Driver workspace

-   Add demonstration role selection.
-   Build fleet list and bus forms.
-   Add company-scoped mock data operations.
-   Add mock schedule management.

## Phase 6 --- Global Admin workspace

-   Build admin dashboard.
-   Add management pages for routes, stops, companies, buses, trips and
    incidents.
-   Connect admin actions to the shared mock data layer.

## Phase 7 --- Presentation features and polish

-   Add mock tickets and subscriptions.
-   Refine responsive layouts and desktop preview.
-   Test Arabic and English layouts.
-   Complete loading, empty, error and success states.
-   Polish animations, accessibility and visual consistency.

## Phase 8 --- Mobile packaging

-   Configure Capacitor.
-   Test Android and iOS builds.
-   Verify MapLibre inside the native WebView.
-   Check permissions, safe areas and navigation behaviour.
-   Deploy the web version to Vercel.

------------------------------------------------------------------------

# 9. Risks and Design Decisions

  -----------------------------------------------------------------------
  Concern                             Decision / mitigation
  ----------------------------------- -----------------------------------
  Public OSM tile servers are not a   Select a suitable OSM-derived tile
  production tile-hosting guarantee   provider before deployment and
                                      follow its terms

  Map data can become difficult to    Keep coordinates and route geometry
  maintain if embedded in components  in structured data files

  Random ETAs look unreliable         Use fixed segment durations and
                                      explicit incident delays

  Company users could edit other      Scope every company operation to
  operators' data                     its company ID in the mock domain
                                      layer

  Frontend role checks are not secure Treat roles as demo-only; real
                                      authorization requires a backend

  Location permission can block first Make it optional and provide manual
  use                                 city selection

  A fixed phone mockup does not       Use responsive layouts and an
  represent real responsive behaviour optional desktop presentation shell

  Capacitor does not provide a        Keep the initial app frontend-only
  SvelteKit server                    and choose a compatible build
                                      strategy

  Urban and intercity journeys have   Use distinct flows while keeping a
  different information needs         shared passenger application

  Ticket UI may imply real            Label tickets and subscriptions as
  transactions                        demonstrations; do not imply real
                                      payment or validation
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 10. Acceptance Criteria

The initial project can be considered functionally complete when:

-   A passenger can switch between urban and intercity transport.
-   The passenger can select a city without granting location
    permission.
-   The urban map displays a real basemap with mock route geometry and
    stops.
-   Selecting a stop or bus opens the correct information.
-   Simulated buses move along their assigned route.
-   Normal segment durations remain consistent.
-   Active incidents add delays to affected ETAs.
-   Intercity search returns coherent mock trips for the selected
    criteria.
-   Trip details show the ordered intermediate stops and their times.
-   Passenger ticket and subscription screens display clearly identified
    mock content.
-   Company/Driver users can manage their own mock fleet without editing
    another company's records through the interface.
-   Global Admin can manage the mock system dataset.
-   Arabic RTL and English LTR layouts both work correctly.
-   Light and dark themes work across the main pages.
-   The application adapts to phone sizes and has a usable desktop
    presentation.
-   The web application can be deployed and the mobile application can
    be packaged with Capacitor.

------------------------------------------------------------------------

# 11. Explicitly Deferred

The following are outside the initial project scope and should not be
added unless the project direction changes:

-   Production backend and database.
-   Real account registration and authentication.
-   Server-enforced role authorization.
-   Real GPS tracking and driver devices.
-   Live traffic data.
-   Official operator integrations.
-   Real reservations and ticket purchasing.
-   Payment gateway integration.
-   QR ticket validation.
-   Push notifications.
-   Production analytics and monitoring.

These can be considered later as separate backend or integration
learning projects.

------------------------------------------------------------------------

# 12. Reference Prototype

The initial HTML/CSS/JavaScript prototype provides visual and product
references for: - The SUTRAF identity. - Urban/intercity switching on
the home page. - An urban map with route, stops, user location and bus
information. - Intercity origin/destination search and trip cards. -
Route/line browsing. - Ticket and subscription presentation. - Profile
navigation.

The final Svelte implementation should preserve the useful product ideas
while replacing prototype-only techniques: - Replace the fixed 370 × 780
CSS phone frame with responsive application layouts. - Replace the
grid/SVG illustrative map and absolute-positioned markers with MapLibre
and geographic data. - Replace CSS-only bus animation with
route-coordinate simulation. - Replace hardcoded page content with
structured mock data and reusable components. - Implement the referenced
interactions as real frontend state transitions.

------------------------------------------------------------------------

**End of document.**
