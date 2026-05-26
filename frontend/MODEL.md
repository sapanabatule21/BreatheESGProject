# Data Architecture & Modeling Choices

## Entity Relationship Summary
To support multi-tenancy securely and guarantee accurate audit trails, we implement strict relational separation between raw source data formats and our unified emission model.


### 1. Multi-Tenancy Architecture
* **Company Model**: Acts as our core tenant isolation anchor. Every database record queries downstream filters matched against a tenant context `company_id`.
* **Data Isolation**: Row-level query filtering is handled inside Django ViewSets using `self.request.user.company` to ensure Tenant A can never view data from Tenant B under any circumstance.

### 2. Scope & Normalization Tracking
* **Source-of-Truth Integrity**: The `Source` model tracks the originating ingest instance (e.g., "SAP Production Dump v2"). 
* **Double-Entry Fields**: We maintain both raw inputs (`activity_value`, `unit`) alongside our calculated, standardized evaluations (`normalized_value`, `normalized_unit`). This ensures transparency if auditors challenge emission factors later.

### 3. Audit Trail Schema
* `status`: State machine transition constraints (`PENDING` -> `APPROVED` or `REJECTED`).
* `locked`: Once transitioned to `APPROVED`, rows become immutable at the database application layer (`save()` method override prevents further edits).