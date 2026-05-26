# Product & Technical Decisions

## Ambiguity Resolutions

### 1. SAP Integration Boundary
* **Ambiguity**: PM noted "data sitting in SAP". SAP supports IDocs, OData APIs, or flat file exports.
* **Resolution**: Modeled ingestion assuming a **SAP AL11 Flat File (CSV)** export format containing internal German transaction columns (`MENGE`, `MEINS`). This reflects standard corporate realities without over-engineering an enterprise RFC/BAPI broker interface within 4 days.

### 2. Electricity Tariff Discrepancies
* **Ambiguity**: Mid-month billing adjustments and shifting utility portal configurations.
* **Resolution**: Standardized calculations directly by mapping timestamp raw consumption ranges directly down to uniform average monthly units based on the `created_at` log context.

### 3. Missing Corporate Flight Geocoding
* **Ambiguity**: Corporate travel tools output airport origin/destination codes (e.g., BOM -> DXB) instead of absolute distances.
* **Resolution**: Programmed fallback lookups using standard routing approximations or assigned a static safety-conservative emissions metric if mileage figures aren't present.