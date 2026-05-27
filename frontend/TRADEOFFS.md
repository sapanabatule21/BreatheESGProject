# TRADEOFFS.md

# Overview

This document explains features and capabilities intentionally not implemented in the prototype due to time constraints, complexity, and scope prioritization.

The goal of the project was to build a realistic and understandable ESG ingestion prototype rather than a production-grade enterprise platform.

# 1. No Live Enterprise Integrations

## Not Built
- Real SAP integration
- Real utility APIs
- Real Concur/Navan authentication

## Why

Enterprise integrations require:
- authentication setup
- enterprise credentials
- API contracts
- secure networking
- long implementation timelines

For a 4-day prototype, CSV/file-based ingestion provided a simpler and more realistic demonstration of ingestion workflows.

## Tradeoff

The system demonstrates ingestion logic but does not support real-time synchronization.


# 2. No OCR or PDF Parsing Pipeline

## Not Built
Automatic extraction from electricity bill PDFs.

## Why

PDF parsing and OCR introduce:
- inconsistent layouts
- extraction errors
- document-processing complexity

Most facilities teams also provide CSV exports from utility portals, which are easier to normalize and validate.

## Tradeoff

The prototype handles structured CSV uploads only and does not process scanned utility bills.


# 3. Simplified Approval Workflow

## Not Built
- multi-level approvals
- role-based workflow routing
- reviewer escalation logic

## Why

The assignment focused more on:
- data modeling
- normalization
- auditability

A basic approve/reject workflow was sufficient to demonstrate analyst review functionality.

## Tradeoff

The system supports only a single-stage review process.


# Additional Simplifications

- No advanced emissions calculation engine
- No historical data versioning
- No background job queue
- No advanced anomaly detection using ML
- No enterprise SSO authentication
- No tenant-level permissions system


# Why These Tradeoffs Were Chosen

The assignment emphasized:
- judgment
- realistic modeling
- explainable design decisions

The implementation focused on building a clean ingestion and review workflow that could realistically evolve into a larger ESG platform.