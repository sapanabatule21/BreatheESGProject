# Engineering Tradeoffs

The following items were intentionally excluded from this prototype phase to preserve high architectural code quality within the short 4-day sprint:

1. **Automated PDF Scraping for Utility Bills**
   * *Why*: Scraping complex PDF components with libraries like PyPDF or OCR tools introduces brittle failure vectors. Instead, we prioritized processing an explicit CSV layout structure derived from utility account portals.
2. **Dynamic Live Emission Factor APIs**
   * *Why*: Integrating dynamic external lookup API requests adds latency overheads and rate-limiting failure points. We implemented a reliable local seed registry table reflecting current static IPCC and GHG Protocol coefficients.
3. **Granular Role-Based Access Control (RBAC)**
   * *Why*: Implementing discrete field editing workflows across Data Ingestion clerks vs. Compliance Managers would clutter core data definitions. We simplified verification into a uniform global `Analyst` approval step.