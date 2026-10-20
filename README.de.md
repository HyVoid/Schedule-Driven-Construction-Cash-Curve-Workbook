[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Excel-Vorlage für Bau-Cashflow & zeitplangesteuerte S-Kurven-Arbeitsmappe

<img width="1920" height="828" alt="image" src="https://github.com/user-attachments/assets/3dedcabb-bf31-4cc6-8f10-513988fa20ed" />

> **Eine kostenlose, zeitplangesteuerte Excel-Vorlage für Bau-Cashflow und web-basierte Arbeitsmappe. Wandeln Sie Ihren Bauzeitplan (Projektstrukturplan, WBS) und Ihr Leistungsverzeichnis (SOV) nahtlos in eine automatisierte Projekt-S-Kurve, eine zeitphasierte Kostenprognose und einen Tracker für den Planfortschritt um — ohne separate Finanz- und Terminmodelle pflegen zu müssen.**

![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Project%20Controls%20%26%20Cost%20Forecasting-success.svg)

> **Testen Sie das interaktive web-basierte Dashboard unten. Wenn Sie Offline-Aufzeichnungen, AIA-Rechnungsprüfpfade und wiederholte Nutzung über mehrere Projekte hinweg benötigen, laden Sie die vollständige Excel-Implementierung herunter.**
>
> **🌐 Web-App testen** → [Kostenlose Bau-Cashflow-Webanwendung öffnen](https://hyvoid.github.io/Schedule-Driven-Construction-Cash-Curve-Workbook/)
> 
> **📥 Vorlage herunterladen** → [Wiederverwendbare Bau-Cashflow-Excel-Arbeitsmappe herunterladen (.xlsx)](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)

## Problemstellen beim Bau-Cashflow vs. Lösungen

Anstatt manueller Nachverfolgung verwendet diese Arbeitsmappe eine Zuordnung von „Problemstelle zu Lösung“, um Ihre Projektsteuerung zu automatisieren:

| Problemstelle im Baumanagement (womit Sie kämpfen) | Lösung der zeitplangesteuerten Dashboard-Lösung (was dieses Werkzeug verfolgt) |
| :--- | :--- |
| **Getrennte Projektterminierung und Abrechnung** | **Aktive Leistungspositionen pro Periode:** Richtet geplante Start- und Fertigstellungstermine automatisch am übergeordneten Projektzeitplan (Projektstrukturplan) aus. |
| **Ungenaue Umsatz- und Kostenprognosen** | **Zeitphasierter Projektwert:** Berechnet den exakten, pro Monat/Woche freigegebenen Planwert und ersetzt flache Vertragsdurchschnitte. |
| **Fehlende Transparenz der Baseline** | **Kumulativer Planfortschritt:** Zeigt auf, wie sich das Projekt voraussichtlich physisch von 0 % bis 100 % Fertigstellung bewegt. |
| **Cash-Defizite und Working-Capital-Probleme** | **Identifikation des Cashflow-Peaks:** Hebt Perioden konzentrierter Projektaktivität und hohen Geld-/Wertbedarfs visuell hervor. |
| **Unausgewogenes Leistungsverzeichnis (SOV)** | **Automatisierter Abgleich der Leistungspositionen:** Enthält einen expliziten Prüfstatus, der sicherstellt, dass das zeitphasierte Modell exakt mit der ursprünglichen Angebotssumme übereinstimmt. |
| **Isolierte Projektmanagement-Silos** | **Einheitliche Berechnungs-Engine:** Verbindet Bauzeitplan und Cash-Kurve direkt und stellt sicher, dass beide Ansichten aus dem identischen Datensatz stammen. |

## So verwenden Sie dieses Werkzeug zur Baukostenprognose (Schnellstartanleitung)

Befolgen Sie diese Schritte, um die Baseline Ihres Projekts zu erzeugen.

1. **Projektzeitplan und Währungsparameter konfigurieren**
   Richten Sie Ihre Berichtswährung, die Granularität der Zeitachse (wöchentlich/monatlich) und die Methode der Kapitalallokation (linear vs. Fertigstellungsperiode) im Konfigurations-Tab ein.

2. **Leistungsverzeichnis (SOV) und Leistungspositions-Register importieren**
   Fügen Sie Ihre Projektmetadaten und die Baukostenschätzung direkt in den Eingabebereich ein. Erforderliche Kernfelder: Positionscode, Beschreibung, Auftragssumme, geplantes Startdatum und geplantes Fertigstellungsdatum.

3. **Cashflow-S-Kurve und Fortschritts-Baseline automatisch erzeugen**
   Lassen Sie die Berechnungs-Engine den projektweiten Zeitplan dynamisch aufbauen. Sie identifiziert aktive PSP-Perioden, verteilt den Planwert und aggregiert Daten zu projektweiten Fortschrittskennzahlen.

4. **Analysen prüfen und für wiederholte Projektnutzung exportieren (Handlungsaufruf)**
   Prüfen Sie Modul A (Zeitplan- und Fortschritts-Gantt) und Modul B (zeitphasierter Wert und S-Kurve). **[Laden Sie die Offline-Excel-Arbeitsmappe herunter](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)**, um diese spezifische Projekt-Baseline zu speichern, lokale Prüfpfade zu pflegen und die Vorlage für Ihr nächstes Bauangebot wiederzuverwenden.

## Warum wurde dieses Werkzeug zur Finanzmodellierung im Bau entwickelt? (Die Lücke zwischen Zeitplan und Kosten)

In der Bauprojektsteuerung werden kritische-Pfad-Zeitpläne (CPM) und Prognosen des Projektwerts oft als völlig getrennte Analyseobjekte gepflegt.

Ein Angebotszeitplan sagt dem Projektteam **wann mit der Arbeit zu rechnen ist**, während eine separate Cashflow-Tabelle schätzt **wann das Projektkapital voraussichtlich freigegeben wird**. Das Problem ist, dass diese beiden Dokumente unweigerlich unter Baseline-Drift leiden.

* Ein Fertigstellungstermin ändert sich im Zeitplan, aber das Kostenprognosemodell wird nicht aktualisiert.
* Ein Änderungsauftrag (CO) verändert eine Leistungsposition, aber das Finanzmodell verwendet weiterhin die alte Vertragswertbasis.
* Ein Projektmanager präsentiert eine plausibel aussehende Earned-Value-(EVM)-S-Kurve, aber die zugrunde liegende zeitphasierte Summe stimmt nicht mehr mit dem ursprünglichen Leistungsverzeichnis (SOV) überein.

Diese Arbeitsmappe behandelt das Leistungspositions-Register und die geplanten Termine als **einzige Quelle der Wahrheit** und leitet sowohl die Zeitplanansicht als auch die Geld-/Wertkurve aus genau dieser Quelle ab.

Anstatt Erdarbeiten als unabhängig gepflegte Monatsprognose zu behandeln, fragt dieses Modell dynamisch: *„Welche Projektperioden überlappen die Erdarbeits-Termine, und wie sollte der Vertragswert über diese Perioden freigegeben werden?"*

## Überwindung häufiger Hürden in der Bauplanung

| Herausforderung der Projektsteuerung | Manuelle Tabellenkalkulation (ohne dieses Werkzeug) | Automatisches S-Kurven-Dashboard (mit diesem Werkzeug) |
| :--- | :--- | :--- |
| **Zeitplan- vs. Finanzdrift** | Termine und AIA-Abrechnungsperioden geraten leicht außer Takt. | Beide Ansichten stammen dynamisch aus derselben Baseline der Leistungspositionen. |
| **Statische Vertragsprognose** | Projekttiming und monatliche Verbrauchsraten bleiben unsichtbar. | Der Vertragswert wird automatisch über granulare Projektperioden verteilt. |
| **Komplexe PSP-Zeitpläne** | Erfordert manuelle Zeitleisten-Erweiterung und fehleranfälliges Formelkopieren. | Dynamische Array-Formeln erzeugen und erweitern den Zeitplan mit dem Projekt. |
| **Fortschritt vs. Ist-Wert** | Fortschrittsverfolgung erfordert eine separate manuelle Gewichtung. | Periodenwerte werden automatisch zu einem Beitrag zum Planfortschritt normalisiert (%). |
| **Änderungsauftrags-Management** | Änderungen an Leistungspositionen erfordern die Aktualisierung mehrerer nachgelagerter Tabs. | Die Berechnungskette propagiert Termin- und Wertänderungen sofort über alle Ansichten. |
| **Versteckte Berechnungsfehler** | Eine glatte visuelle Kurve kann kritische Abgleichsfehler leicht verbergen. | Angebotssummen, zeitphasierte Summen, Abweichungen und 100-%-Fertigstellungs-Kennzahlen werden explizit geprüft. |

## Anwendungsfälle: Wer braucht diese Vorlage für Bauzeitplan und Cashflow?

Diese Arbeitsmappe richtet sich an Bauprofis, die eine leichtgewichtige, präzise Methode benötigen, um einen Leistungspositions-Zeitplan mit dem geplanten Projektwert-Timing zu verbinden, und zielt speziell auf folgende Rollen und Workflows ab:

* **Generalunternehmer und Bauunternehmen:** Suchen zuverlässige *Vorlagen für Zahlungspläne* zur Prognose von Subunternehmer-Zahlungen gegenüber Eigentümer-Fortschrittsabrechnungen.
* **Bauprojektmanager (PMs):** Brauchen *Excel-Zeitpläne für Bauprojektmanager*, um den physischen Baufortschritt mit der finanziellen Baseline abzustimmen, ohne schwere Enterprise-Software zu öffnen.
* **Kalkulatoren und Teams der Bauvorbereitung:** Benötigen ein *Angebots-Tracker- und Kostenprognosewerkzeug*, um Cashflow-Anforderungen und Kapitalbedarf vor dem offiziellen Baubeginn zu modellieren.
* **Projektsteuerung und Finanzprüfer:** Verwenden dies als *Earned-Value-Management-(EVM)-Dashboard*, um zu prüfen, ob das zeitphasierte Modell sauber mit den ursprünglichen Vertragswerten übereinstimmt.

Besonders geeignet ist es für Projekte, bei denen die wiederkehrende Analysefrage lautet: **„Wie sollte der gesamte Vertragswert angesichts der geplanten Terminierung jeder PSP-Leistungsposition über die Projektzeitachse erscheinen?"**

*(Hinweis: Dieses Werkzeug ist bewusst fokussiert: ein Projekt, eine Leistungspositions-Quelle, eine Berechnungs-Engine und zwei Managementansichten. Es ist nicht dafür ausgelegt, Primavera P6, schwere Enterprise-Accounting-Plattformen oder vollständige Bau-ERPs zu ersetzen, sondern die Lücke zwischen ihnen nahtlos zu schließen, ohne dass Fachwissen zur Entwicklung von Tabellenkalkulationen erforderlich ist.)*

## Über

Ich entwickle leichtgewichtige Excel-basierte Entscheidungsunterstützungs-Werkzeuge für Situationen mit zu vielen beweglichen Teilen, als dass ein Projektmanager sie im Kopf behalten könnte, aber ohne genug Komplexität, um ein vollständiges Enterprise-System zu rechtfertigen.

Die zentrale Frage ist einfach:

> **Welche Informationen müssen an einem Ort sein, um die nächste operative Entscheidung sicher zu treffen?**

`Schedule-Driven Construction Cash Curve Workbook` wendet diesen Ansatz auf die Verbindung zwischen Bauzeitenplanung, geplantem Fortschritt und Projektwert-Timing an.

Es verpackt eine wiederholbare Analysemethode in einer Arbeitsmappe, anstatt das Problem in ein größeres Softwaresystem zu verwandeln.

## Technische Details

<details>
<summary>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</summary>

### Architektur der Arbeitsmappe

Die Arbeitsmappe verwendet eine **1-1-2-Architektur**:

* **1 Eingabeebene** — `01_INPUT`
* **1 Berechnungs-Engine** — `02_ENGINE`
* **2 Präsentationsansichten** — `03_MODULE_A` und `04_MODULE_B`
* **1 Konfigurations-/Steuerungsebene** — `00_CONFIG`

Das zentrale Designprinzip ist, dass die Berechnungs-Engine als **einzige Quelle der Wahrheit (SSOT)** für das zeitphasierte Projektmodell fungiert. Modul A und Modul B konstruieren den Zeitplan oder die Cash-Kurve nicht unabhängig neu. Sie konsumieren die Engine-Ausgaben.

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

### Ebenen der Arbeitsmappe

| Blatt         | Rolle               | Primärer Benutzer                            | Kernverantwortung                                      |
| ------------- | ------------------ | ------------------------------------------- | -------------------------------------------------------- |
| `00_CONFIG`   | Steuerungsebene    | Modellbetreuer / Analyst                    | Zentrale Parameter und Prüfschwellen                    |
| `01_INPUT`    | Dateneingabeebene  | Projektmanager / Kalkulator                 | Projektmetadaten und Leistungspositions-Zeitplan        |
| `02_ENGINE`   | Berechnungsebene   | Geschütztes Backend                         | Zeitachse, Verteilungsmatrix, Aggregation, Abgleich     |
| `03_MODULE_A` | Präsentationsebene | Projektmanager / Bauleiter / DOT-Prüfer     | Zeitplan- und Gantt-artige Fortschrittsansicht          |
| `04_MODULE_B` | Präsentationsebene | Management / Eigentümer / Finanzen          | Planwert, Spitzenperiode und S-Kurven-Ansicht           |

Der Quell-Blaupause trennt diese fünf Blätter explizit, um Kreuzkontamination zwischen Ebenen und doppelte Dateneingabe zu verhindern.

### Kerndatenfluss

Das Modell folgt einer einseitigen Pipeline:

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

Die Eingabeebene enthält Projektmetadaten und Leistungspositions-Informationen. Jede Eingabezeile wird validiert, bevor sie in die Berechnungsebene gelangt. Die Engine bestimmt dann die globale Projektzeitachse und verteilt den Vertragswert jeder Leistungsposition gemäß der konfigurierten Verteilungsregel auf die aktiven Perioden.

### `00_CONFIG` — Steuerungsebene

Die Konfigurationsebene zentralisiert fünf Modellparameter:

| Parameter         | Zweck                   | Beispiel  |
| ----------------- | ----------------------- | -------- |
| `CFG_CURRENCY`    | Symbol der Berichtswährung | `$`      |
| `CFG_TIME_SCALE`  | Granularität der Zeitachse | `Weekly` |
| `CFG_ALLOC_RULE`  | Zeitphasierungsmethode | `1`      |
| `CFG_ROUND_TOLER` | Abgleichstoleranz       | `0.01`   |
| `CFG_WARN_LIMIT`  | Warnschwelle            | `0.00`   |

Das Designprinzip ist es, Geschäftskonstanten nicht in allen nachgelagerten Formeln einzubetten. Stattdessen werden Konfigurationswerte aus der Steuerungsebene referenziert.

### `01_INPUT` — Projekt- und Leistungspositions-Eingabe

Das Eingabeblatt ist die routinemäßige Bedienoberfläche.

Projektweite Metadaten umfassen:

* `Project_Name`
* `Contract_Number`
* `County_Location`
* `Contractor_Name`
* `Schedule_Data_Date`

Die Leistungspositionstabelle enthält:

* `Bid_Item_Code`
* `Bid_Item_Description`
* `Bid_Item_Amount`
* `Planned_Start_Date`
* `Planned_Completion_Date`
* `Manual_Weight_Pct`

Das System leitet dann ab:

* `Calculated_Duration_Days`
* `Calculated_Weight_Pct`
* `Row_Validation_Status`

Die manuelle Gewichtung ist optional. Wenn sie leer bleibt, kann das Modell die effektive Gewichtung aus dem Leistungspositionswert ableiten.

### Eingabevalidierung

Die zeilenbasierte Validierungsebene prüft:

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

Dies verhindert, dass fehlerhafte Zeilen unbemerkt in die zeitphasierte Berechnungsmatrix gelangen.

### `02_ENGINE` — einzige Berechnungsquelle

Die Berechnungs-Engine erfüllt vier Kernfunktionen:

1. Das früheste geplante Startdatum des Projekts bestimmen.
2. Das späteste geplante Fertigstellungsdatum des Projekts bestimmen.
3. Den wöchentlichen oder monatlichen Projektzeitplan erzeugen.
4. Jede gültige Leistungsposition über die resultierenden Perioden verteilen.

Sie aggregiert auch Periodenwerte, berechnet kumulative Werte und Fortschrittsprozentsätze und pflegt die Abgleichskontrollen.

Die resultierenden Engine-Ausgaben umfassen:

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

### Dynamische Erzeugung der Zeitachse

Die Projektzeitachse wird horizontal mit dynamischen Arrays erzeugt.

```excel
=SEQUENCE(1, $C$3, 1, 1)
```

Das Startdatum jeder Periode wird dann aus der konfigurierten Zeitskala abgeleitet:

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

Wöchentliche Perioden verwenden Sieben-Tage-Schritte. Monatliche Perioden rücken um Kalendermonate vor. Periodenendtermine werden dann entweder mit `+6` Tagen für wöchentliche Perioden oder mit `EOMONTH` für monatliche Perioden abgeleitet.

### Zeitphasierte Verteilung

Jede Leistungsposition wird gegen jede Projektperiode mit Intervallüberlappungslogik bewertet.

Für eine Leistungsposition:

```text
Item Start ───────────────────── Item Finish
                 │
                 │ overlap
                 ▼
Period Start ─────────────── Period End
```

Eine Periode gilt als aktiv, wenn:

```text
Period End   >= Item Start
AND
Period Start <= Item Finish
```

Die Engine zählt die Anzahl der aktiven Perioden für jede Position und verwendet diese Anzahl als Nenner für die lineare Verteilung.

Es werden zwei Verteilungsregeln unterstützt:

**Regel 1 — lineare anteilige Verteilung**

```text
Period Allocation
=
Bid Item Amount
÷
Number of Active Periods
```

**Regel 2 — Pauschalbetrag bei Fertigstellung**

```text
If the item's completion date
falls within the period:

Period Allocation = 100% of Item Amount

Otherwise:

Period Allocation = 0
```

Die Verteilungsregel wird zentral über `CFG_ALLOC_RULE` gesteuert.

### Zweidimensionale Verteilungsmatrix

Die Kern-Engine verwendet `MAKEARRAY`, um die Positions-mal-Periode-Matrix zu konstruieren.

Konzeptionell:

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

Die tatsächliche Implementierung bestimmt dynamisch die Anzahl der Zeilen und Spalten aus den Eingabe- und Zeitachsen-Arrays und vermeidet manuelle Formelerweiterung.

### Aggregation auf Periodenebene

Sobald die Positions-mal-Periode-Matrix existiert, aggregiert die Engine jede Spalte zum gesamten geplanten Projektwert für diese Periode.

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

Die resultierenden Periodenwerte werden dann gegen den gesamten Vertragswert normalisiert, um den Beitrag der Periode zum Planfortschritt abzuleiten.

### Kumulative S-Kurven-Daten

Der kumulative Planwert wird mit `SCAN` erzeugt:

```excel
=LET(
    p_vals, I11#,
    SCAN(0, p_vals, LAMBDA(prev, curr, prev + curr))
)
```

Der kumulative Planfortschritt wird dann berechnet, indem der kumulative Planwert durch den gesamten Vertragswert geteilt wird:

```excel
=LET(
    cum_vals, I13#,
    total_val, $B$6,
    IF(total_val>0, cum_vals / total_val, 0)
)
```

Dies erzeugt die zugrunde liegenden Daten für die kumulativen Planwert- und Planfortschritts-S-Kurven des Projekts.

### `03_MODULE_A` — Zeitplan-/Gantt-Ansicht

Modul A wandelt den zeitphasierten Zeitplan der Engine in eine bauorientierte Präsentation um.

Sie enthält:

* Projekt- und Vertragsköpfe;
* Datumsstichtag;
* Prüfstatus;
* Periodenzeitachse;
* geplanten Periodenfortschritt;
* kumulativen Planfortschritt;
* Leistungspositions-Zeitplan;
* dynamische Gantt-Balken.

Die Gantt-Visualisierung wird als dynamische Textmatrix erzeugt, nicht als Sammlung manuell positionierter Zeichenobjekte.

Die Kern-Rendering-Logik ist konzeptionell:

```text
If Period overlaps Item Schedule:
    render Gantt block

Otherwise:
    render blank
```

Die resultierende Matrix dehnt sich vertikal mit zusätzlichen Leistungspositionen und horizontal mit zusätzlichen Projektperioden aus.

### `04_MODULE_B` — Planwert-/Cash-Kurven-Ansicht

Modul B ist die managementorientierte Finanzansicht.

Ihre wichtigsten KPIs sind:

* Gesamter Vertragswert
* Projektdauer
* Planwert der Spitzenperiode
* Prüfstatus

Ihre detaillierte Berichtstabelle enthält:

* Periodenbezeichnung;
* Periodenzeitraum;
* geplanten Periodenwert;
* kumulativen Planwert;
* kumulativen Planprozentsatz.

Die horizontale Engine-Ausgabe wird in eine vertikale Managementtabelle transformiert, damit sie natürlicher gelesen, exportiert oder als Diagrammquelle verwendet werden kann.

### Dynamische Berichtstransformation

Die Berichtstabelle von Modul B verwendet eine einzige Dynamische-Array-Konstruktion:

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

Dies hält den Managementbericht mit der zugrunde liegenden Projektzeitachse synchronisiert, anstatt eine separat gepflegte Berichtstabelle zu erfordern.

### Prüfarchitektur

Das Modell behandelt den Abgleich als Teil der Berechnung und nicht als abschließende manuelle Prüfung.

Die zentrale Invariante ist:

```text
Original Bid Total
        =
Time-Phased Engine Total
```

Das Modell erwartet zusätzlich, dass der kumulative Planfortschritt konvergiert zu:

```text
100.00%
```

Die resultierende Prüflogik kann dargestellt werden als:

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

Die zentrale Statusanzeige kombiniert den Wertabgleichstest mit dem Test der Endfortschritts-Konvergenz.

### Abhängigkeitskarte der Arbeitsmappe

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

## Die Geschäftslogik und Methodik

Die Arbeitsmappe verwendet ein einfaches kaufmännisches Prinzip: **Der Projektwert sollte in derselben Zeitdimension analysiert werden wie die Arbeit, die diesen Wert schafft**.

Anstatt mit einer Cash-Kurve zu beginnen und separat zu erklären, warum sie so aussieht, beginnt das Modell mit den Leistungspositionen und ihren geplanten Ausführungsfenstern und wandelt diese Fenster dann in ein zeitphasiertes Projektwertprofil um.

* **Zeitphasierte Verteilung** wandelt statische Vertragswerte in Perioden-Planwerte um und macht das Timing der Projektaktivität sichtbar.
* **Zeitplan-zu-Wert-Verknüpfung** hält Planfortschritt und geplanten Projektwert aus demselben zugrunde liegenden Arbeitstiming abgeleitet, anstatt aus zwei unabhängigen Prognosen.
* **Kumulative Analyse** verwandelt Periodenwerte in eine projektweite S-Kurve und erleichtert die Prüfung von Beschleunigung, Konzentration und Fertigstellungstiming.
* **Spitzenperioden-Analyse** identifiziert die Perioden mit der höchsten geplanten Projektwertfreigabe und bietet einen Referenzpunkt für Cash- und Ausführungsplanung.
* **Abgleichskontrollen** vergleichen die ursprüngliche Angebotssumme mit der zeitphasierten Summe und prüfen, ob das kumulative Modell seinen beabsichtigten Endzustand erreicht, bevor die Ausgabe als intern valide behandelt wird.

Das kommerzielle Ziel ist nicht die Prognose tatsächlicher Bankeingänge. Es ist die Etablierung einer **zeitplangesteuerten Planwert-Baseline**, die als gemeinsame Referenz für Bauplanung, Managementprüfung und weitere Finanzanalyse dienen kann.

---

## Weitere Werkzeuge dieser Reihe

Eine kleine Sammlung leichtgewichtiger Excel- und browserbasierter Entscheidungsunterstützungs-Werkzeuge für Schätzung, Budgetierung, Betriebsanalyse und Finanzplanung.

* **Project Operations & Job Costing Toolkit** — verbindet Projektschätzungen, Ausführungskosten und Rentabilitätsprüfung.
* **Pricing & Break-even Decision Calculator** — bewertet Szenarien für Preisgestaltung, Marge, Beitrag und Break-even.
* **Manufacturing Labor Cost & Capacity Planning Toolkit** — verbindet Personalbedarf mit verfügbarer Produktionskapazität.

## Lizenz

Dieses Projekt wird unter der **Apache License 2.0** veröffentlicht.

Siehe die Datei [`LICENSE`](LICENSE) für den vollständigen Lizenztext.
