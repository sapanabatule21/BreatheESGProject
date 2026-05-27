# DECISIONS.md

# Overview

This document explains major implementation decisions, assumptions, and tradeoffs made during development.

# 1. SAP Data Handling

## Decision

Used CSV-style SAP export ingestion instead of live SAP integration.

## Why

Real SAP integrations using IDocs, BAPIs, or OData services require enterprise credentials and setup that are not practical within a 4-day prototype timeline.

CSV exports are realistic because many companies manually export SAP data for sustainability reporting.

## Assumptions

Handled:
- fuel procurement
- plant codes
- quantity
- units
- dates

Ignored:
- live SAP sync
- complex ERP mappings
- multilingual lookup tables

# 2. Utility Data Handling

## Decision

Used utility portal CSV export format.

## Why

Facilities teams commonly download monthly electricity consumption reports as CSV files from utility portals.

This was simpler and more realistic than building PDF parsing within the assignment timeline.

## Assumptions

Handled:
- billing period
- meter readings
- electricity units
- consumption values

Ignored:
- tariff calculations
- OCR/PDF extraction
- smart meter APIs

# 3. Travel Data Handling

## Decision

Used simplified corporate travel export structure inspired by Concur/Navan APIs.

## Why

Corporate travel systems usually expose:
- flights
- hotels
- taxis
- airport codes

This allowed realistic modeling of Scope 3 travel emissions.

## Assumptions

Handled:
- travel category
- airport codes
- distance
- travel dates

Ignored:
- real-time API authentication
- complex itinerary structures

# 4. File Upload Instead of API Sync

## Decision

Used file upload ingestion for all three source types.

## Why

File uploads are easier to demo and more realistic for a prototype with limited development time.

Many ESG onboarding processes initially rely on manual uploads before automation is added.

# 5. Separate Raw and Normalized Tables

## Decision

Stored raw records separately from normalized records.

## Why

This preserves the original source-of-truth data and improves auditability.

It also allows analysts to compare normalized values against the original uploaded payload.

# 6. Suspicious Record Flagging

## Decision

Added suspicious flags for unusual or incomplete data.

## Why

Analysts need visibility into records that may contain missing values, invalid units, or unusually large consumption numbers.


# 7. Scope Classification

## Decision

Mapped records into Scope 1, Scope 2, and Scope 3 categories.

## Why

This aligns with standard ESG and GHG reporting practices.


# Questions I Would Ask the PM

1. Which ERP export formats are most common among clients?
2. Are analysts allowed to edit normalized records?
3. Should approval workflows support multiple reviewer levels?
4. What emission factor provider should be used?
5. Should historical reprocessing be supported?

# What I Deliberately Simplified

- No real SAP authentication
- No OCR-based utility bill extraction
- No live Concur/Navan API integration
- No advanced emissions calculation engine
- Simple approval workflow only