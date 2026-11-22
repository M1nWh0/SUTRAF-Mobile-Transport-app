# SUTRAF Mock Data Layer (Phase 3)

## 📌 Architecture & Design Principles

This directory contains pure JavaScript mock-data modules and schemas for SUTRAF.
In accordance with project rules:
1. **Stable IDs & Normalized References**: Entities reference other records by foreign ID (`wilayaId`, `cityId`, `companyId`, `routeId`, `stopIds`) rather than duplicating nested objects.
2. **GeoJSON Geographic Accuracy**: All coordinates use GeoJSON standard format: `[longitude, latitude]` (e.g. Algiers center: `[3.0588, 36.7538]`).
3. **Deterministic ETA & Duration Model**: Every route segment defines an explicit, fixed normal duration in minutes (`durationMinutes`). Delays are injected strictly through active incidents.
4. **Company vs Driver Scoping**:
   - Company and Driver share the exact same operator domain.
   - **Company** manages multiple buses (`fleetSize > 1`).
   - **Driver** manages exactly one assigned bus (`assignedBusId`).
5. **No Backend / Database**: All data is structured in frontend-safe ES modules.

---

## 🗂️ Entity Registry

| Entity | Primary ID Key | Description & Key Foreign Keys |
| :--- | :--- | :--- |
| `wilayas` | `id` (e.g. `'16'`, `'31'`) | All 58 Algerian wilayas with English & Arabic names. |
| `cities` | `id` (e.g. `'city-alger'`) | Urban centers with center coords; references `wilayaId`. |
| `companies`| `id` (e.g. `'comp-etusa'`) | Transit operators (ETUSA, SOGRAL, ETO, El Ghazala). |
| `users` | `id` (e.g. `'user-driver-1'`) | Demo users (Passenger, Driver, Company, Admin). |
| `stops` | `id` (e.g. `'stop-alg-martyrs'`)| Urban bus stops with GeoJSON coords; references `cityId`. |
| `routes` | `id` (e.g. `'route-etusa-04'`)| Lines with ordered `stopIds`, segments & GeoJSON paths. |
| `buses` | `id` (e.g. `'bus-16-042'`) | Fleet vehicles with `companyId`, `routeId`, `status`. |
| `trips` | `id` (e.g. `'trip-alg-ora-01'`)| Long-distance intercity trips with intermediate stops. |
| `incidents`| `id` (e.g. `'inc-01'`) | Traffic delays affecting specific route segments. |
| `tickets` | `id` (e.g. `'tkt-2026-8819'`)| Demo passes and tickets with QR code references. |

---

## ⚠️ Deliberate Mock Simplifications

- **Coordinate Paths**: Urban route GeoJSON coordinates represent authentic Algiers roads (Tafourah, Bab El Oued, Grande Poste, Ruisseau, Bab Ezzouar) but are simplified down to key waypoints for lightweight rendering.
- **Trip Schedules**: Intercity timetables and fares reflect realistic Algerian long-distance coach travel (SOGRAL / Caroubier terminal departures), but are demonstration data and not official transport schedules.
- **Tickets & Passes**: Display-only representations; no real payment, ticketing API, or banking gateways exist.
