# SOURCES.md

# Overview

This document explains the real-world source formats researched for the prototype and how those findings influenced the system design.

The goal was not to perfectly replicate enterprise systems but to model realistic ingestion challenges faced in ESG reporting workflows.

# 1. SAP Fuel and Procurement Data

## Research

Researched common SAP export patterns including:
- CSV exports
- flat files
- SAP OData services
- IDoc concepts

Observed that many sustainability and operations teams export procurement or fuel data manually into spreadsheets or CSV files.

Common issues found:
- inconsistent units
- plant codes
- non-standard date formats
- localized column names
- ERP-specific terminology

## Chosen Format

CSV-style SAP export.

Example fields:
- Plant Code
- Fuel Type
- Quantity
- Unit
- Posting Date
- Vendor

## Why This Was Chosen

CSV exports are realistic and common during ESG onboarding because many clients initially provide manually exported reports instead of live integrations.

## Sample Data Design

The sample data intentionally included:
- inconsistent units
- mixed date formats
- different fuel categories
- incomplete records

This reflects common enterprise data quality problems.

## What Would Break in Real Deployments

- multilingual SAP configurations
- custom ERP schemas
- live synchronization failures
- large-scale ingestion performance
- complex procurement hierarchies

# 2. Utility Electricity Data

## Research

Researched how facilities teams access utility consumption data.

Found common formats:
- utility portal CSV exports
- monthly billing spreadsheets
- PDF electricity bills
- smart meter APIs

Most practical onboarding workflows rely on CSV exports.

## Chosen Format

CSV utility consumption export.

Example fields:
- Meter ID
- Billing Start Date
- Billing End Date
- Consumption kWh
- Tariff Type

## Why This Was Chosen

CSV uploads are easier to validate and normalize than OCR-based PDF extraction.

The format also realistically represents operational workflows used by facilities teams.

## Sample Data Design

Included:
- billing periods crossing calendar months
- varying electricity consumption values
- missing readings
- inconsistent formatting

## What Would Break in Real Deployments

- utility-specific billing formats
- timezone issues
- tariff complexity
- OCR extraction inaccuracies
- missing meter mappings

# 3. Corporate Travel Data

## Research

Reviewed documentation and structures inspired by:
- SAP Concur
- Navan
- travel management platforms

Observed that travel systems commonly expose:
- airport codes
- flight segments
- hotel bookings
- taxi or rail categories

Distances are sometimes absent and inferred later.

## Chosen Format

Simplified CSV/API-inspired travel export.

Example fields:
- Employee ID
- Travel Type
- Origin Airport
- Destination Airport
- Distance
- Travel Date

## Why This Was Chosen

This structure realistically models Scope 3 business travel data while remaining simple enough for a prototype.

## Sample Data Design

Included:
- flights
- hotels
- taxis
- incomplete distance fields
- mixed transport categories

## What Would Break in Real Deployments

- multi-leg itineraries
- timezone normalization
- duplicate bookings
- missing airport mappings
- canceled travel events

# Overall Learning

The biggest challenge in ESG ingestion is not emissions calculation itself, but handling inconsistent operational data from disconnected enterprise systems.

This prototype focused on:
- ingestion realism
- normalization
- auditability
- analyst review workflows