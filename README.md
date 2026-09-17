

## About

I build lightweight Excel-based decision-support tools for situations with too many moving parts to hold in a project manager's head but not enough complexity to justify a full enterprise system.

The central question is simple:

> **What information needs to be in one place to make the next operational decision confidently?**

`Schedule-Driven Construction Cash Curve Workbook` applies that approach to the connection between construction scheduling, planned progress, and project-value timing.

It packages a repeatable analytical method into a workbook rather than turning the problem into a larger software system.

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

The workbook uses a **1-1-2 architecture**:

* **1 input layer** — `01_INPUT`
* **1 calculation engine** — `02_ENGINE`
* **2 presentation views** — `03_MODULE_A` and `04_MODULE_B`
* **1 configuration/control layer** — `00_CONFIG`

The central design principle is that the calculation engine acts as the **Single Source of Truth (SSOT)** for the time-phased project model. Module A and Module B do not independently reconstruct the schedule or cash curve. They consume the engine outputs. 

```text
                    External Bid / Schedule Data
                              │
                              ▼
                 ┌──────────────────────────┐
                 │       01_INPUT           │
                 │   Bid Items & Dates      │
                 └────────────┬─────────────┘
                              │
                              │ referenced
                              ▼
        ┌───────────────────────────────────────────┐
        │                02_ENGINE                   │
        │                                             │
        │  Unified Timeline                           │
        │  Time-Phased Allocation                     │
        │  Progress Aggregation                       │
        │  Reconciliation & Integrity Checks          │
        └───────────────────┬─────────────────────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
       ┌──────────────────┐   ┌─────────────────────┐
       │ 03_MODULE_A      │   │ 04_MODULE_B         │
       │ Schedule / Gantt │   │ Value / Cash Curve  │
       │ Planned Progress │   │ Period Value / S    │
       └──────────────────┘   └─────────────────────┘

                 ▲
                 │
       ┌─────────┴─────────┐
       │    00_CONFIG      │
       │ Currency          │
       │ Time Scale        │
       │ Allocation Rule   │
       │ Tolerance         │
       │ Warning Limit     │
       └───────────────────┘
```

### Workbook Layers

| Sheet         | Role               | Primary User                                    | Core Responsibility                                      |
| ------------- | ------------------ | ----------------------------------------------- | -------------------------------------------------------- |
| `00_CONFIG`   | Control Layer      | Model maintainer / analyst                      | Central parameters and audit thresholds                  |
| `01_INPUT`    | Data Input Layer   | Project manager / estimator                     | Project metadata and bid-item schedule                   |
| `02_ENGINE`   | Calculation Layer  | Protected backend                               | Timeline, allocation matrix, aggregation, reconciliation |
| `03_MODULE_A` | Presentation Layer | Project manager / superintendent / DOT reviewer | Schedule and Gantt-style progress view                   |
| `04_MODULE_B` | Presentation Layer | Management / owner / finance                    | Planned value, peak period, and S-curve view             |

The source blueprint explicitly separates these five sheets to prevent cross-layer contamination and duplicate data entry. 

### Core Data Flow

The model follows a one-directional pipeline:

```text
Configuration
     │
     ▼
Input & Validation
     │
     ▼
Timeline Generation
     │
     ▼
Item × Period Allocation Matrix
     │
     ├───────────────┐
     ▼               ▼
Progress View     Cash/Value View
     │               │
     └───────┬───────┘
             ▼
       Audit / Reconciliation
```

The input layer contains project metadata and bid-item information. Each input row is validated before entering the calculation layer. The engine then determines the global project timeline and allocates each bid item's contract value to active periods according to the configured allocation rule. 

### `00_CONFIG` — Control Layer

The configuration layer centralizes five model parameters:

| Parameter         | Purpose                   | Example  |
| ----------------- | ------------------------- | -------- |
| `CFG_CURRENCY`    | Reporting currency symbol | `$`      |
| `CFG_TIME_SCALE`  | Timeline granularity      | `Weekly` |
| `CFG_ALLOC_RULE`  | Time-phasing method       | `1`      |
| `CFG_ROUND_TOLER` | Reconciliation tolerance  | `0.01`   |
| `CFG_WARN_LIMIT`  | Warning threshold         | `0.00`   |

The design principle is to avoid embedding business constants throughout downstream formulas. Configuration values are referenced from the control layer instead. 

### `01_INPUT` — Project and Bid-Item Input

The input sheet is the routine operating interface.

Project-level metadata includes:

* `Project_Name`
* `Contract_Number`
* `County_Location`
* `Contractor_Name`
* `Schedule_Data_Date`

The bid-item table contains:

* `Bid_Item_Code`
* `Bid_Item_Description`
* `Bid_Item_Amount`
* `Planned_Start_Date`
* `Planned_Completion_Date`
* `Manual_Weight_Pct`

The system then derives:

* `Calculated_Duration_Days`
* `Calculated_Weight_Pct`
* `Row_Validation_Status`

The manual weight is optional. When it is left blank, the model can derive the effective weight from bid-item value. 

### Input Validation

The row-level validation layer checks for:

```text
Missing description
        │
        ├── FAIL → "Item description missing"
        │
Valid amount?
        │
        ├── FAIL → "Amount must be > 0"
        │
Valid dates?
        │
        ├── FAIL → "Start/end date missing"
        │
Completion >= Start?
        │
        ├── FAIL → "Completion before start"
        │
        ▼
      PASS
```

This prevents malformed rows from silently propagating into the time-phased calculation matrix. 

### `02_ENGINE` — Single Calculation Source

The calculation engine performs four core functions:

1. Determine the project's earliest planned start date.
2. Determine the project's latest planned completion date.
3. Generate the weekly or monthly project timeline.
4. Allocate every valid bid item across the resulting periods.

It also aggregates period values, calculates cumulative values and progress percentages, and maintains the reconciliation controls. 

The resulting engine outputs include:

```text
Project_Min_Start
Project_Max_Finish
Project_Total_Periods

Timeline_Period_Index
Timeline_Period_Start
Timeline_Period_End

Period_Total_Planned_Value
Period_Total_Planned_Weight

Cumulative_Planned_Value
Cumulative_Progress_Pct

Audit_Bid_Total
Audit_Engine_Total
Audit_Variance_Amount
Audit_Final_Pct
Audit_System_Status
```

### Dynamic Timeline Generation

The project timeline is generated horizontally using dynamic arrays.

```excel
=SEQUENCE(1, $C$3, 1, 1)
```

The start date of each period is then derived from the configured time scale:

```excel
=LET(
    p_seq, I8#,
    scale, '00_CONFIG'!$C$4,
    IF(
        scale="Weekly",
        $B$3 + (p_seq - 1) * 7,
        EDATE(DATE(YEAR($B$3), MONTH($B$3), 1), p_seq - 1)
    )
)
```

Weekly periods use seven-day increments. Monthly periods advance by calendar month. Period end dates are then derived using either `+6` days for weekly periods or `EOMONTH` for monthly periods. 

### Time-Phased Allocation

Each bid item is evaluated against each project period using interval-overlap logic.

For a bid item:

```text
Item Start ───────────────────── Item Finish
                 │
                 │ overlap
                 ▼
Period Start ─────────────── Period End
```

A period is considered active when:

```text
Period End   >= Item Start
AND
Period Start <= Item Finish
```

The engine counts the number of active periods for each item and uses that count as the denominator for linear allocation. 

Two allocation rules are supported:

**Rule 1 — Linear Pro-Rata**

```text
Period Allocation
=
Bid Item Amount
÷
Number of Active Periods
```

**Rule 2 — Lump-Sum at Completion**

```text
If the item's completion date
falls within the period:

Period Allocation = 100% of Item Amount

Otherwise:

Period Allocation = 0
```

The allocation rule is controlled centrally through `CFG_ALLOC_RULE`. 

### Two-Dimensional Allocation Matrix

The core engine uses `MAKEARRAY` to construct the item-by-period matrix.

Conceptually:

```text
                         Project Period
                 W1       W2       W3       W4
              ┌────────┬────────┬────────┬────────┐
Item 001      │ value  │ value  │ value  │   0    │
              ├────────┼────────┼────────┼────────┤
Item 002      │   0    │ value  │ value  │ value  │
              ├────────┼────────┼────────┼────────┤
Item 003      │ value  │ value  │   0    │   0    │
              └────────┴────────┴────────┴────────┘
```

The actual implementation dynamically determines the number of rows and columns from the input and timeline arrays, avoiding manual formula expansion. 

### Period-Level Aggregation

Once the item-by-period matrix exists, the engine aggregates each column into total planned project value for that period.

```excel
=LET(
    n_cols, COLUMNS(I8#),
    n_rows, ROWS(A17#),
    matrix, TAKE(
        I17:INDEX(17:1048576, 17+n_rows-1, 9+n_cols-1),
        n_rows,
        n_cols
    ),
    BYCOL(matrix, LAMBDA(col, SUM(col)))
)
```

The resulting period values are then normalized against total contract value to derive planned period progress contribution. 

### Cumulative S-Curve Data

Cumulative planned value is generated using `SCAN`:

```excel
=LET(
    p_vals, I11#,
    SCAN(0, p_vals, LAMBDA(prev, curr, prev + curr))
)
```

Cumulative planned progress is then calculated by dividing cumulative planned value by the total contract value:

```excel
=LET(
    cum_vals, I13#,
    total_val, $B$6,
    IF(total_val>0, cum_vals / total_val, 0)
)
```

This produces the underlying data for the project's cumulative planned-value and planned-progress S-curves. 

### `03_MODULE_A` — Schedule / Gantt View

Module A converts the engine's time-phased schedule into a construction-oriented presentation.

It contains:

* project and contract headers;
* data date;
* audit status;
* period timeline;
* planned period progress;
* cumulative planned progress;
* bid-item schedule;
* dynamic Gantt bars.

The Gantt visualization is generated as a dynamic text matrix rather than a collection of manually positioned drawing objects. 

The core rendering logic is conceptually:

```text
If Period overlaps Item Schedule:
    render Gantt block

Otherwise:
    render blank
```

The resulting array expands both vertically with additional bid items and horizontally with additional project periods.

### `04_MODULE_B` — Planned Value / Cash Curve View

Module B is the management-facing financial view.

Its principal KPIs are:

* Total contract value
* Project duration
* Peak period planned value
* Audit health status

Its detailed reporting table contains:

* period label;
* period date range;
* planned period value;
* cumulative planned value;
* cumulative planned percentage.

The horizontal engine output is transformed into a vertical management table so that it can be read more naturally, exported, or used as a chart source. 

### Dynamic Reporting Transformation

The Module B reporting table uses a single dynamic-array construction:

```excel
=LET(
    p_seq, TRANSPOSE('02_ENGINE'!$I$8#),
    p_starts, TRANSPOSE('02_ENGINE'!$I$9#),
    p_ends, TRANSPOSE('02_ENGINE'!$I$10#),
    period_vals, TRANSPOSE('02_ENGINE'!$I$11#),
    cum_vals, TRANSPOSE('02_ENGINE'!$I$13#),
    cum_pcts, TRANSPOSE('02_ENGINE'!$I$14#),
    p_labels, "Week " & p_seq,
    date_ranges,
        TEXT(p_starts, "yyyy-mm-dd")
        & " ~ "
        & TEXT(p_ends, "yyyy-mm-dd"),
    HSTACK(
        p_labels,
        date_ranges,
        period_vals,
        cum_vals,
        cum_pcts
    )
)
```

This keeps the management report synchronized with the underlying project timeline rather than requiring a separately maintained reporting table. 

### Audit Architecture

The model treats reconciliation as part of the calculation rather than as a final manual review.

The principal invariant is:

```text
Original Bid Total
        =
Time-Phased Engine Total
```

The model additionally expects the cumulative planned progress to converge to:

```text
100.00%
```

The resulting audit logic can be represented as:

```text
                    ┌───────────────────────┐
                    │ Original Bid Total    │
                    └──────────┬────────────┘
                               │
                               ▼
                    ┌───────────────────────┐
                    │ Time-Phased Total     │
                    └──────────┬────────────┘
                               │
                               ▼
                    ┌───────────────────────┐
                    │ Variance within       │
                    │ configured tolerance? │
                    └──────────┬────────────┘
                               │
                               ▼
                    ┌───────────────────────┐
                    │ Final cumulative      │
                    │ progress = 100%?      │
                    └──────────┬────────────┘
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
                  PASS                 CHECK
```

The central status indicator combines the value-reconciliation test with the final-progress convergence test. 

### Workbook Dependency Map

```text
00_CONFIG
    │
    ├── Currency
    ├── Time Scale
    ├── Allocation Rule
    ├── Reconciliation Tolerance
    └── Warning Threshold
             │
             ▼
01_INPUT
    │
    ├── Project Metadata
    └── Bid Items
             │
             ▼
02_ENGINE
    │
    ├── Global Dates
    ├── Timeline
    ├── Active Period Counts
    ├── Allocation Matrix
    ├── Period Planned Value
    ├── Cumulative Value
    ├── Cumulative Progress
    └── Audit Status
             │
       ┌─────┴─────┐
       ▼           ▼
03_MODULE_A   04_MODULE_B
 Schedule      Planned Value
 Gantt         Cash Curve
 Progress      S-Curve
```

</details>

## The Business Logic & Methodology

The workbook uses a simple commercial principle: **project value should be analyzed in the same time dimension as the work that creates that value**.

Instead of starting with a cash curve and separately trying to explain why it looks the way it does, the model starts with the bid items and their planned execution windows, then converts those windows into a time-phased project-value profile.

* **Time-phased allocation** converts static contract values into period-level planned value, making the timing of project activity visible.
* **Schedule-to-value linkage** keeps planned progress and planned project value derived from the same underlying work timing rather than two independent forecasts.
* **Cumulative analysis** turns period-level values into a project-wide S-curve, making acceleration, concentration, and completion timing easier to review.
* **Peak-period analysis** identifies the periods with the highest planned project-value release, providing a reference point for cash and execution planning.
* **Reconciliation controls** compare the original bid total with the time-phased total and check that the cumulative model reaches its intended final state before the output is treated as internally valid. 

The commercial objective is not to predict actual bank receipts. It is to establish a **schedule-driven planned-value baseline** that can be used as a common reference for construction planning, management review, and further financial analysis.

---

*Part 1 ends here. The `Technical Details` parent `<details>` is intentionally left structurally open across the README parts; `Formula Reference` and `Validation Rules` must remain inside this same block, and it should only close immediately before `Other Tools in This Series`.*
