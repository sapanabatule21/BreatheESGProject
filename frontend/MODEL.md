# MODEL.md

## Overview

The system is designed to ingest emissions and activity data from multiple enterprise sources such as SAP exports, utility electricity data, and corporate travel platforms. The main goal of the data model is to normalize inconsistent source data into a common structure while preserving auditability and source traceability.

---

# Core Design Goals

1. Support multiple client companies (multi-tenancy)
2. Track source-of-truth for every record
3. Normalize units and formats
4. Support Scope 1, Scope 2, and Scope 3 categorization
5. Allow analyst review and approval workflow
6. Maintain audit history for compliance and auditors

---

# Main Entities

## Company

Represents a client organization onboarded into the platform.

Fields:
- id
- company_name
- industry
- created_at

Reason:
Supports multi-tenancy by separating records for different enterprise clients.

---

## DataSource

Represents the origin of uploaded data.

Examples:
- SAP
- Utility Portal
- Corporate Travel Platform

Fields:
- id
- source_type
- upload_type
- uploaded_at

Reason:
Tracks where the data originated from and supports audit traceability.

---

## RawData

Stores original uploaded records before normalization.

Fields:
- id
- company
- data_source
- raw_payload
- ingestion_status
- uploaded_at

Reason:
Preserves original source records exactly as received for debugging and audit purposes.

---

## NormalizedRecord

Stores cleaned and standardized records.

Fields:
- id
- company
- source
- category
- activity_type
- normalized_value
- normalized_unit
- scope
- reporting_date
- status
- suspicious_flag
- created_at
- updated_at

Reason:
Creates a unified structure across all source systems.

---

## AuditLog

Tracks changes and analyst actions.

Fields:
- id
- record
- action
- performed_by
- timestamp

Reason:
Required for compliance and audit history.

---

# Scope Categorization

The system supports:

- Scope 1:
  Direct fuel combustion emissions

- Scope 2:
  Purchased electricity emissions

- Scope 3:
  Business travel and procurement emissions

Reason:
These are standard ESG emission reporting categories.

---

# Normalization Strategy

Different systems use inconsistent formats and units.

Examples:
- Liters vs Gallons
- kWh vs MWh
- Different date formats

The normalization layer converts all records into standardized units and formats before analyst review.

---

# Analyst Workflow

1. Data uploaded
2. Raw record stored
3. Data normalized
4. Suspicious rows flagged
5. Analyst reviews records
6. Approved records locked for audit

---

# Auditability

Every normalized record maintains:
- original source reference
- upload timestamp
- edit history
- approval status

This ensures traceability during ESG audits.

---

# Why This Model

This design was chosen because enterprise ESG systems typically receive inconsistent data from multiple disconnected systems. Separating raw ingestion from normalized records improves reliability, traceability, and analyst trust.