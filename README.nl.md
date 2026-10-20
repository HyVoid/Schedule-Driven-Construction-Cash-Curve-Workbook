[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Excel-sjabloon voor bouwcashflow & S-curve-werkmap gestuurd door planning

<img width="1920" height="828" alt="image" src="https://github.com/user-attachments/assets/3dedcabb-bf31-4cc6-8f10-513988fa20ed" />

> **Een gratis, planningsgestuurd Excel-sjabloon voor bouwcashflow en webgebaseerde werkmap. Zet uw bouwplanning (projectstructuurplan, WBS) en overzicht van waarden (SOV) naadloos om in een geautomatiseerde project-S-curve, een tijdsgefaseerde kostenprognose en een tracker voor de geplande voortgang — zonder aparte financiële en planingsmodellen te onderhouden.**

![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Project%20Controls%20%26%20Cost%20Forecasting-success.svg)

> **Probeer het interactieve webgebaseerde dashboard hieronder. Als u offline gegevens, AIA-factureringsaudittrails en herhaaldelijk gebruik bij meerdere projecten nodig hebt, download dan de volledige Excel-implementatie.**
>
> **🌐 Probeer de web-app** → [Open de gratis webapplicatie voor bouwcashflow](https://hyvoid.github.io/Schedule-Driven-Construction-Cash-Curve-Workbook/)
> 
> **📥 Sjabloon downloaden** → [Download de herbruikbare Excel-werkmap voor bouwcashflow (.xlsx)](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)

## Pijnpunten bij bouwcashflow vs. oplossingen

In plaats van handmatige bijhouding gebruikt deze werkmap een koppeling van „pijnpunt tot oplossing“ om uw projectbeheersing te automatiseren:

| Pijnpunt in bouwmanagement (waarmee u worstelt) | Oplossing van het planningsgestuurde dashboard (wat dit hulpmiddel volgt) |
| :--- | :--- |
| **Losgekoppelde projecttiming en facturatie** | **Actieve posten per periode:** stemt geplande start- en opleveringsdata automatisch af op de hoofdplanning van het project (projectstructuurplan). |
| **Onnauwkeurige omzet- en kostenprognoses** | **Tijdsgefaseerde projectwaarde:** berekent de exacte geplande waarde die per maand/week wordt vrijgegeven, en vervangt platte contractgemiddelden. |
| **Gebrek aan zicht op de basislijn** | **Cumulatieve geplande voortgang:** beeldt uit hoe het project fysiek van 0 % naar 100 % oplevering zou moeten bewegen. |
| **Cashtekorten en problemen met werkend kapitaal** | **Identificatie van cashflowpieken:** benadrukt visueel perioden met geconcentreerde projectactiviteit en hoge behoefte aan liquiditeit/waarde. |
| **Ongebalanceerd overzicht van waarden (SOV)** | **Geautomatiseerde afstemming van posten:** bevat een expliciete auditstatus die waarborgt dat het tijdsgefaseerde model exact afstemt op het oorspronkelijke totaal van de opdracht. |
| **Geïsoleerde projectmanagement-silo's** | **Uniforme rekenmotor:** verbindt bouwplanning en cashcurve direct, zodat beide weergaven uit de identieke dataset voortkomen. |

## Zo gebruikt u dit hulpmiddel voor bouwkostenprognoses (snelstartgids)

Volg deze stappen om de basislijn van uw project te genereren.

1. **Projecttijdlijn en valutaparameters configureren**
   Stel uw rapportagevaluta, de granulariteit van de tijdlijn (wekelijks/maandelijks) en de methode voor kapitaaltoewijzing (lineair vs. opleveringsperiode) in op het configuratietabblad.

2. **Overzicht van waarden (SOV) en postenregister importeren**
   Plak uw projectmetadata en de bouwkostenschatting direct in het invoergebied. Verplichte kernvelden: postcode, beschrijving, opdrachtbedrag, geplande startdatum en geplande opleveringsdatum.

3. **Cashflow-S-curve en voortgangsbasislijn automatisch genereren**
   Laat de rekenmotor de projectbrede tijdlijn dynamisch opbouwen. Zij identificeert actieve PSP-perioden, verdeelt de geplande waarde en aggregeert gegevens tot projectbrede voortgangsindicatoren.

4. **Analyses beoordelen en exporteren voor herhaaldelijk projectgebruik (actieoproep)**
   Beoordeel module A (planning- en voortgangs-Gantt) en module B (tijdsgefaseerde waarde en S-curve). **[Download de offline Excel-werkmapversie](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)** om deze specifieke projectbasislijn op te slaan, lokale audittrails te onderhouden en het sjabloon te hergebruiken voor uw volgende bouwaanbesteding.

## Waarom is dit hulpmiddel voor financiële modellering in de bouw gebouwd? (De kloof tussen planning en kosten)

In bouwprojectmanagement worden planningen volgens de kritieke-pad-methode (CPM) en prognoses van projectwaarde vaak als volledig gescheiden analyseobjecten onderhouden.

Een opdrachtplanning vertelt het projectteam **wanneer het werk naar verwachting plaatsvindt**, terwijl een aparte cashflowtabel schat **wanneer het projectkapitaal naar verwachting wordt vrijgegeven**. Het probleem is dat deze twee documenten onvermijdelijk lijden onder basislijndrift.

* Een opleveringsdatum verandert in de planning, maar het kostenprognosemodel wordt niet bijgewerkt.
* Een wijzigingsopdracht (CO) past een post aan, maar het financiële model gebruikt nog steeds de oude contractwaardebasis.
* Een projectmanager presenteert een plausibel ogende earned-value-(EVM)-S-curve, maar het onderliggende tijdsgefaseerde totaal stemt niet meer af op het oorspronkelijke overzicht van waarden (SOV).

Deze werkmap behandelt het postenregister en de geplande data als de **enige bron van waarheid** en leidt zowel de planningweergave als de liquiditeits-/waardecurve uit precies die bron af.

In plaats van grondwerk als een onafhankelijk onderhouden maandelijkse financiële prognose te behandelen, vraagt dit model dynamisch: *„Welke projectperioden overlappen de grondwerkdata, en hoe zou de contractwaarde over die perioden moeten worden vrijgegeven?"*

## Veelvoorkomende hindernissen in de bouwplanning overwinnen

| Uitdaging in projectbeheersing | Handmatige spreadsheets (zonder dit hulpmiddel) | Geautomatiseerd S-curve-dashboard (met dit hulpmiddel) |
| :--- | :--- | :--- |
| **Planning- vs. financële drift** | Data en AIA-factureringsperioden raken gemakkelijk uit synchronisatie. | Beide weergaven komen dynamisch uit dezelfde postenbasislijn. |
| **Statische contractprognose** | Projecttiming en maandelijkse verbruikssnelheden blijven onzichtbaar. | De contractwaarde wordt automatisch over granularere projectperioden verdeeld. |
| **Complexe PSP-planningen** | Vereist handmatige uitbreiding van de tijdlijn en foutgevoelig kopiëren van formules. | Dynamische arrayformules genereren en breiden de tijdlijn uit naarmate het project groeit. |
| **Voortgang vs. werkelijke waarde** | Voortgangsbijhouding vereist een aparte handmatige weging. | Periodewaarden worden automatisch genormaliseerd naar een bijdrage aan de geplande voortgang (%). |
| **Beheer van wijzigingsopdrachten** | Aanpassingen aan posten vereisen het bijwerken van meerdere downstream tabbladen. | De rekenketen propageert datum- en waardewijzigingen direct over alle weergaven. |
| **Verborgen rekenfouten** | Een gladde visuele curve kan kritieke afstemmingsfouten gemakkelijk verbergen. | Opdrachttotalen, tijdsgefaseerde totalen, varianten en 100-%-opleveringsindicatoren worden expliciet geaudit. |

## Toepassingen: wie heeft dit sjabloon voor bouwplanning en cashflow nodig?

Deze werkmap is ontworpen voor bouwprofessionals die een lichte, nauwkeurige manier nodig hebben om een postenplanning te koppelen aan de geplande projectwaardetiming, en richt zich specifiek op de volgende rollen en workflows:

* **Aannemers en bouwers:** zoeken een betrouwbaar *sjabloon voor een betalingsregeling* om uitbetalingen aan onderaannemers te voorspellen tegenover voortgangsfacturatie aan de opdrachtgever.
* **Bouwprojectmanagers (PM's):** hebben een *Excel-planning voor bouwprojectmanagers* nodig om de fysieke bouwvoortgang af te stemmen op de financiële basislijn zonder zware enterprise-software te openen.
* **Calculators en bouwvoorbereidingsteams:** vereisen een *aanbestedingstracker en kostenprognosehulpmiddel* om cashflowbehoeften en kapitaalbehoeften te modelleren voordat de bouw officieel start.
* **Projectbeheersing en financiële beoordelaars:** gebruiken dit als een *earned-value-management-(EVM)-dashboard* om te auditeren of het tijdsgefaseerde model netjes afstemt op de oorspronkelijke contractwaarden.

Het is bijzonder geschikt voor projecten waarin de terugkerende analysevraag luidt: **„Gezien de geplande timing van elke PSP-post, hoe zou de totale contractwaarde over de projecttijdlijn moeten verschijnen?"**

*(Opmerking: dit hulpmiddel is bewust gericht: één project, één postenbron, één rekenmotor en twee managementweergaven. Het is niet ontworpen om Primavera P6, zware enterprise-accountingplatforms of volledige bouw-ERP's te vervangen, maar om de kloof daartussen naadloos te overbruggen, zonder dat expertise in spreadsheet-engineering vereist is.)*

## Over

Ik bouw lichtgewicht, op Excel gebaseerde hulpmiddelen voor besluitvorming voor situaties met te veel bewegende delen om in het hoofd van een projectmanager te houden, maar zonder genoeg complexheid om een volledig enterprise-systeem te rechtvaardigen.

De centrale vraag is simpel:

> **Welke informatie moet op één plaats staan om de volgende operationele beslissing zelfverzekerd te nemen?**

`Schedule-Driven Construction Cash Curve Workbook` past die aanpak toe op de verbinding tussen bouwplanning, geplande voortgang en projectwaardetiming.

Het verpakt een herhaalbare analysemethode in een werkmap in plaats van het probleem om te vormen tot een groter softwaresysteem.

## Technische details

<details>
<summary>Voor technische beoordelaars, Excel-practitioners en medewerkers</summary>

### Architectuur van de werkmap

De werkmap gebruikt een **1-1-2-architectuur**:

* **1 invoerlaag** — `01_INPUT`
* **1 rekenmotor** — `02_ENGINE`
* **2 presentatieweergaven** — `03_MODULE_A` en `04_MODULE_B`
* **1 configuratie-/controlelaag** — `00_CONFIG`

Het centrale ontwerpprincipe is dat de rekenmotor fungeert als de **enige bron van waarheid (SSOT)** voor het tijdsgefaseerde projectmodel. Module A en module B reconstrueren de planning of cashcurve niet onafhankelijk. Zij consumeren de uitvoer van de motor.

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

### Lagen van de werkmap

| Blad          | Rol               | Primaire gebruiker                            | Kernverantwoordelijkheid                               |
| ------------- | ------------------ | -------------------------------------------- | -------------------------------------------------------- |
| `00_CONFIG`   | Controlelaag       | Modelonderhouder / analist                   | Centrale parameters en auditdrempels                    |
| `01_INPUT`    | Gegevensinvoerlaag | Projectmanager / calculator                  | Projectmetadata en postenplanning                       |
| `02_ENGINE`   | Rekenlaag          | Beschermde backend                            | Tijdlijn, toewijzingsmatrix, aggregatie, afstemming     |
| `03_MODULE_A` | Presentatielaag    | Projectmanager / bouwleider / DOT-beoordelaar | Weergave van planning en Gantt-achtige voortgang |
| `04_MODULE_B` | Presentatielaag    | Management / opdrachtgever / financiën       | Geplande waarde, piekperiode en S-curve-weergave        |

Het bronontwerp scheidt deze vijf bladen expliciet om kruisbesmetting tussen lagen en dubbele gegevensinvoer te voorkomen.

### Kerndataflow

Het model volgt een eenrichtingspipeline:

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

De invoerlaag bevat projectmetadata en postinformatie. Elke invoerregel wordt gevalideerd voordat zij de rekenlaag binnenkomt. De motor bepaalt vervolgens de globale projecttijdlijn en verdeelt de contractwaarde van elke post over de actieve perioden volgens de geconfigureerde toewijzingsregel.

### `00_CONFIG` — controlelaag

De configuratielaag centraliseert vijf modelparameters:

| Parameter         | Doel                   | Voorbeeld  |
| ----------------- | ---------------------- | -------- |
| `CFG_CURRENCY`    | Symbool van rapportagevaluta | `$`      |
| `CFG_TIME_SCALE`  | Granulariteit van de tijdlijn | `Weekly` |
| `CFG_ALLOC_RULE`  | Tijdsfaseringsmethode | `1`      |
| `CFG_ROUND_TOLER` | Afstemmingstolerantie  | `0.01`   |
| `CFG_WARN_LIMIT`  | Waarschuwingsdrempel   | `0.00`   |

Het ontwerpprincipe is om bedrijfsconstanten niet in alle downstream formules in te bedden. In plaats daarvan worden configuratiewaarden vanuit de controlelaag gerefereerd.

### `01_INPUT` — project- en posteninvoer

Het invoerblad is de routinematige bedieningsinterface.

Projectbrede metadata omvat:

* `Project_Name`
* `Contract_Number`
* `County_Location`
* `Contractor_Name`
* `Schedule_Data_Date`

De postentabel bevat:

* `Bid_Item_Code`
* `Bid_Item_Description`
* `Bid_Item_Amount`
* `Planned_Start_Date`
* `Planned_Completion_Date`
* `Manual_Weight_Pct`

Het systeem leidt vervolgens af:

* `Calculated_Duration_Days`
* `Calculated_Weight_Pct`
* `Row_Validation_Status`

De handmatige weging is optioneel. Wanneer deze leeg wordt gelaten, kan het model de effectieve weging uit de postwaarde afleiden.

### Invoervalidatie

De validatielaag op regelniveau controleert:

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

Dit voorkomt dat misvormde regels stilzwijgend in de tijdsgefaseerde rekenmatrix terechtkomen.

### `02_ENGINE` — enkele berekeningsbron

De rekenmotor vervult vier kernfuncties:

1. De vroegste geplande startdatum van het project bepalen.
2. De laatste geplande opleveringsdatum van het project bepalen.
3. De wekelijkse of maandelijkse projecttijdlijn genereren.
4. Elke geldige post over de resulterende perioden verdelen.

Zij aggregeert ook periodewaarden, berekent cumulatieve waarden en voortgangspercentages, en onderhoudt de afstemmingscontroles.

De resulterende motoruitvoer omvat:

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

### Dynamische tijdlijn generatie

De projecttijdlijn wordt horizontaal gegenereerd met dynamische arrays.

```excel
=SEQUENCE(1, $C$3, 1, 1)
```

De startdatum van elke periode wordt vervolgens afgeleid uit de geconfigureerde tijdsschaal:

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

Wekelijkse perioden gebruiken stappen van zeven dagen. Maandelijkse perioden schrijven per kalendermaand. Einddata van perioden worden vervolgens afgeleid met ofwel `+6` dagen voor wekelijkse perioden ofwel `EOMONTH` voor maandelijkse perioden.

### Tijdsgefaseerde toewijzing

Elke post wordt tegen elke projectperiode beoordeeld met behulp van intervaloverlap-logica.

Voor een post:

```text
Item Start ───────────────────── Item Finish
                 │
                 │ overlap
                 ▼
Period Start ─────────────── Period End
```

Een periode wordt als actief beschouwd wanneer:

```text
Period End   >= Item Start
AND
Period Start <= Item Finish
```

De motor telt het aantal actieve perioden voor elke post en gebruikt dat aantal als noemer voor de lineaire toewijzing.

Er worden twee toewijzingsregels ondersteund:

**Regel 1 — lineaire pro-rata toewijzing**

```text
Period Allocation
=
Bid Item Amount
÷
Number of Active Periods
```

**Regel 2 — forfait bij oplevering**

```text
If the item's completion date
falls within the period:

Period Allocation = 100% of Item Amount

Otherwise:

Period Allocation = 0
```

De toewijzingsregel wordt centraal geregeld via `CFG_ALLOC_RULE`.

### Tweedimensionale toewijzingsmatrix

De kernmotor gebruikt `MAKEARRAY` om de post-bij-periode-matrix te construeren.

Conceptueel:

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

De feitelijke implementatie bepaalt dynamisch het aantal rijen en kolommen uit de invoer- en tijdlijnarrays, waardoor handmatige formule-uitbreiding wordt vermeden.

### Aggregatie op periodeniveau

Zodra de post-bij-periode-matrix bestaat, aggregeert de motor elke kolom tot de totale geplande projectwaarde voor die periode.

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

De resulterende periodewaarden worden vervolgens genormaliseerd tegen de totale contractwaarde om de bijdrage van de periode aan de geplande voortgang af te leiden.

### Cumulatieve S-curve-data

De cumulatieve geplande waarde wordt gegenereerd met `SCAN`:

```excel
=LET(
    p_vals, I11#,
    SCAN(0, p_vals, LAMBDA(prev, curr, prev + curr))
)
```

De cumulatieve geplande voortgang wordt vervolgens berekend door de cumulatieve geplande waarde te delen door de totale contractwaarde:

```excel
=LET(
    cum_vals, I13#,
    total_val, $B$6,
    IF(total_val>0, cum_vals / total_val, 0)
)
```

Dit produceert de onderliggende gegevens voor de cumulatieve geplandewaarde- en geplandevoortgang-S-curves van het project.

### `03_MODULE_A` — planning-/Gantt-weergave

Module A zet de tijdsgefaseerde planning van de motor om in een bouwgerichte presentatie.

Zij bevat:

* project- en contractkoppen;
* de datumgegevens;
* de auditstatus;
* de periodetijdlijn;
* de geplande periodevoortgang;
* de cumulatieve geplande voortgang;
* de postenplanning;
* dynamische Gantt-balken.

De Gantt-visualisatie wordt gegenereerd als een dynamische tekstmatrix in plaats van een verzameling handmatig gepositioneerde tekenobjecten.

De kernrenderlogica is conceptueel:

```text
If Period overlaps Item Schedule:
    render Gantt block

Otherwise:
    render blank
```

De resulterende matrix breidt verticaal uit met extra posten en horizontaal met extra projectperioden.

### `04_MODULE_B` — weergave geplande waarde / cashcurve

Module B is de managementgerichte financiële weergave.

Haar belangrijkste KPI's zijn:

* de totale contractwaarde;
* de projectduur;
* de geplande waarde van de piekperiode;
* de auditgezondheidsstatus.

Haar gedetailleerde rapportagetabel bevat:

* de periodelabel;
* het periode datumbereik;
* de geplande periodewaarde;
* de cumulatieve geplande waarde;
* het cumulatieve geplande percentage.

De horizontale motoruitvoer wordt getransformeerd naar een verticale managementtabel, zodat deze natuurlijker kan worden gelezen, geëxporteerd of als grafiekbron kan worden gebruikt.

### Dynamische rapportagetransformatie

De rapportagetabel van module B gebruikt één enkele dynamische-array-constructie:

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

Dit houdt het managementrapport gesynchroniseerd met de onderliggende projecttijdlijn in plaats van een apart onderhouden rapportagetabel te vereisen.

### Auditarchitectuur

Het model behandelt afstemming als onderdeel van de berekening en niet als een laatste handmatige beoordeling.

De centrale invariant is:

```text
Original Bid Total
        =
Time-Phased Engine Total
```

Het model verwacht bovendien dat de cumulatieve geplande voortgang convergeert naar:

```text
100.00%
```

De resulterende auditlogica kan als volgt worden weergegeven:

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

De centrale statusindicator combineert de waardestatustest met de test van de eindvoortgangsconvergentie.

### Afhankelijkheidskaart van de werkmap

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

## De bedrijfslogica en methodologie

De werkmap gebruikt een eenvoudig commercieel principe: **projectwaarde moet in dezelfde tijddimensie worden geanalyseerd als het werk die waarde creëert**.

In plaats van te beginnen met een cashcurve en afzonderlijk te proberen uit te leggen waarom die er zo uitziet, begint het model met de posten en hun geplande uitvoeringsvensters, en zet die vensters vervolgens om in een tijdsgefaseerd projectwaardeprofiel.

* **Tijdsgefaseerde toewijzing** zet statische contractwaarden om in geplande waarden op periodeniveau, waardoor de timing van projectactiviteit zichtbaar wordt.
* **Planning-naar-waarde-koppeling** houdt geplande voortgang en geplande projectwaarde afgeleid uit dezelfde onderliggende werktiming in plaats van uit twee onafhankelijke prognoses.
* **Cumulatieve analyse** verandert periodewaarden in een projectbrede S-curve, waardoor versnelling, concentratie en opleveringstiming gemakkelijker te beoordelen zijn.
* **Piekperiode-analyse** identificeert de perioden met de hoogste geplande projectwaardevrijgave, en biedt een referentiepunt voor cash- en uitvoeringsplanning.
* **Afstemmingscontroles** vergelijken het oorspronkelijke opdrachttotaal met het tijdsgefaseerde totaal en controleren of het cumulatieve model zijn beoogde eindtoestand bereikt voordat de uitvoer als intern geldig wordt behandeld.

Het commerciële doel is niet het voorspellen van werkelijke bankontvangsten. Het is het vaststellen van een **planningsgestuurde geplandewaarde-basislijn** die als gemeenschappelijke referentie kan dienen voor bouwplanning, managementbeoordeling en verdere financiële analyse.

---

## Andere hulpmiddelen in deze serie

Een kleine collectie van lichtgewicht, op Excel en browser gebaseerde hulpmiddelen voor besluitvorming over schatting, budgettering, operationele analyse en financiële planning.

* **Project Operations & Job Costing Toolkit** — verbindt projectschattingen, uitvoeringskosten en rentabiliteitsbeoordeling.
* **Pricing & Break-even Decision Calculator** — evalueert scenario's voor prijsstelling, marge, bijdrage en break-even.
* **Manufacturing Labor Cost & Capacity Planning Toolkit** — verbindt arbeidsbehoeften met beschikbare productiecapaciteit.

## Licentie

Dit project wordt uitgegeven onder de **Apache License 2.0**.

Zie het bestand [`LICENSE`](LICENSE) voor de volledige licentietekst.
