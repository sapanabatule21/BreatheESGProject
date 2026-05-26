# Data Source Research & Realities

### Source 1: SAP ERP (Procurement/Fuel)
* **Real-World Shape**: Typically extracted via batch processing into flat text or CSV formats containing standard SAP technical column structures (e.g., `MATNR` for Material Number, `MENGE` for Quantity).
* **What Breaks**: Global variants often map local unit keys oddly (e.g., using corporate codes instead of ISO metrics). 

### Source 2: Utility Portals (Electricity)
* **Real-World Shape**: Exported portal summaries break readings down by meter numbers, recording total `kWh` over irregular calendar intervals.
* **What Breaks**: Mid-billing interval cycles clash directly with traditional standard calendar month reporting targets.

### Source 3: Corporate Travel Platforms (Concur/Navan)
* **Real-World Shape**: Flat-structured line items detailing traveler segments, cabin configurations (Economy vs. Business), and destination codes.
* **What Breaks**: Manual multi-segment changes or flight booking cancellations create duplicate rows that artificially inflate measured emission baselines if not de-duplicated.