[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Excel de flux de trésorerie de construction et classeur de courbe en S guidé par le planning

<img width="1920" height="828" alt="image" src="https://github.com/user-attachments/assets/3dedcabb-bf31-4cc6-8f10-513988fa20ed" />

> **Un modèle Excel gratuit de flux de trésorerie de construction guidé par le planning et un classeur basé sur le web. Convertissez sans effort votre planning de construction (structure de découpage du projet, WBS) et votre bordereau des valeurs (SOV) en une courbe en S de projet automatisée, une prévision de coûts échelonnée dans le temps et un suivi de l'avancement planifié — sans avoir à maintenir des modèles financiers et de planning séparés.**

![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Project%20Controls%20%26%20Cost%20Forecasting-success.svg)

> **Essayez le tableau de bord interactif basé sur le web ci-dessous. Si vous avez besoin de conservations hors ligne, de pistes d'audit de facturation AIA et d'une utilisation répétée sur plusieurs chantiers, téléchargez l'implémentation Excel complète.**
>
> **🌐 Essayez l'application web** → [Ouvrir l'application web gratuite de flux de trésorerie de construction](https://hyvoid.github.io/Schedule-Driven-Construction-Cash-Curve-Workbook/)
> 
> **📥 Télécharger le modèle** → [Télécharger le classeur Excel de flux de trésorerie de construction réutilisable (.xlsx)](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)

## Difficultés du flux de trésorerie de construction vs. solutions

Au lieu d'un suivi manuel, ce classeur utilise une correspondance « difficulté-solution » pour automatiser le contrôle de votre projet :

| Difficulté de gestion de construction (ce qui vous pose problème) | Solution du tableau de bord guidé par le planning (ce que cet outil suit) |
| :--- | :--- |
| **Déconnexion entre calendrier projet et facturation** | **Postes actifs par période :** aligne automatiquement les dates de début et d'achèvement planifiées sur la chronologie principale du projet (structure de découpage du projet). |
| **Prévisions de revenus et de coûts imprécises** | **Valeur de projet échelonnée dans le temps :** calcule la valeur planifiée exacte libérée chaque mois/semaine, en remplaçant les moyennes contractuelles uniformes. |
| **Manque de visibilité sur la référence** | **Avancement planifié cumulé :** montre comment le projet devrait physiquement progresser de 0 % à 100 % d'achèvement. |
| **Déficits de trésorerie et problèmes de fonds de roulement** | **Identification des pics de trésorerie :** met visuellement en évidence les périodes d'activité projet concentrée et les besoins élevés en liquidités/valeur. |
| **Bordereau des valeurs (SOV) déséquilibré** | **Rapprochement automatisé des postes :** intègre un statut d'audit explicite garantissant que le modèle échelonné dans le temps se rapproche parfaitement du total de l'offre initiale. |
| **Silos de gestion de projet isolés** | **Moteur de calcul unifié :** relie directement le planning de construction et la courbe de trésorerie, garantissant que les deux vues proviennent du jeu de données identique. |

## Comment utiliser cet outil de prévision des coûts de construction (guide de démarrage rapide)

Suivez ces étapes pour générer la référence de votre projet.

1. **Configurer la chronologie du projet et les paramètres de devise**
   Définissez votre devise de reporting, la granularité de la chronologie (hebdomadaire/mensuelle) et la méthode d'allocation du capital (linéaire vs. période d'achèvement) dans l'onglet de configuration.

2. **Importer le bordereau des valeurs (SOV) et le registre des postes**
   Collez directement les métadonnées de votre projet et l'estimation de construction dans la zone de saisie. Champs obligatoires principaux : code du poste, description, montant du contrat, date de début planifiée et date d'achèvement planifiée.

3. **Générer automatiquement la courbe en S de trésorerie et la référence d'avancement**
   Laissez le moteur de calcul construire dynamiquement la chronologie à l'échelle du projet. Il identifie les périodes actives de la structure de découpage du projet, répartit la valeur planifiée et agrège les données en indicateurs d'avancement à l'échelle du projet.

4. **Examiner les analyses et exporter pour une utilisation répétée du projet (appel à l'action)**
   Examinez le module A (Gantt de planning et d'avancement) et le module B (valeur échelonnée dans le temps et courbe en S). **[Téléchargez la version classeur Excel hors ligne](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)** pour conserver cette référence de projet spécifique, maintenir les pistes d'audit locales et réutiliser le modèle pour votre prochaine offre de construction.

## Pourquoi cet outil de modélisation financière de la construction a-t-il été conçu ? (L'écart entre planning et coûts)

Dans la gestion de projets de construction, les plannings par la méthode du chemin critique (CPM) et les prévisions de valeur de projet sont souvent maintenus comme des objets analytiques complètement séparés.

Un planning d'offre indique à l'équipe projet **quand les travaux sont censés avoir lieu**, tandis qu'un tableur de flux de trésorerie séparé estime **quand le capital du projet devrait être libéré**. Le problème est que ces deux documents finissent inévitablement par souffrir de dérive de la référence.

* Une date d'achèvement change dans le planning, mais le modèle de prévision des coûts n'est pas mis à jour.
* Un avenant (CO) modifie un poste d'offre, mais le modèle financier utilise encore l'ancienne base de valeur contractuelle.
* Un chef de projet présente une courbe en S de valeur acquise (EVM) d'apparence plausible, mais le total échelonné dans le temps sous-jacent ne se rapproche plus du bordereau des valeurs (SOV) initial.

Ce classeur traite le registre des postes et les dates planifiées comme la **source unique de vérité**, en dérivant à la fois la vue planning et la courbe liquidités/valeur de cette source exacte.

Plutôt que de traiter les terrassements comme une prévision financière mensuelle maintenue indépendamment, ce modèle demande dynamiquement : *« Quelles périodes du projet chevauchent les dates de terrassement, et comment la valeur du contrat devrait-elle être libérée sur ces périodes ? »*

## Surmonter les obstacles courants de la planification de construction

| Défi de contrôle de projet | Tableurs manuels (sans cet outil) | Tableau de bord de courbe en S automatisé (avec cet outil) |
| :--- | :--- | :--- |
| **Dérive planning vs. finances** | Les dates et les périodes de facturation AIA se désynchronisent facilement. | Les deux vues proviennent dynamiquement de la même référence de postes. |
| **Prévision contractuelle statique** | Le calendrier du projet et les taux de consommation mensuels restent invisibles. | La valeur du contrat est automatiquement répartie sur des périodes de projet granulaires. |
| **Plannings de structure de découpage complexes** | Nécessite une expansion manuelle de la chronologie et une copie de formules sujette aux erreurs. | Les formules de tableau dynamique génèrent et étendent la chronologie à mesure que le projet se développe. |
| **Avancement vs. valeur réelle** | Le suivi de l'avancement nécessite un exercice de pondération manuel séparé. | La valeur de période est automatiquement normalisée en contribution à l'avancement planifié (%). |
| **Gestion des avenants** | Les modifications aux postes nécessitent la mise à jour de plusieurs onglets en aval. | La chaîne de calcul propage instantanément les changements de dates et de valeurs sur toutes les vues. |
| **Erreurs de calcul cachées** | Une courbe visuelle lisse peut facilement masquer des erreurs de rapprochement critiques. | Les totaux d'offre, les totaux échelonnés dans le temps, les écarts et les indicateurs d'achèvement à 100 % sont explicitement audités. |

## Cas d'usage : qui a besoin de ce modèle de planning de construction et de flux de trésorerie ?

Ce classeur est conçu pour les professionnels de la construction qui ont besoin d'une méthode légère et précise pour relier un planning de postes au calendrier de la valeur de projet planifiée, en ciblant spécifiquement les rôles et flux de travail suivants :

* **Entrepreneurs généraux et constructeurs :** recherchent un *modèle fiable d'échéancier de paiement entrepreneur* pour prévoir les paiements des sous-traitants par rapport à la facturation d'avancement du maître d'ouvrage.
* **Chefs de projet de construction (PM) :** ont besoin d'un *planning Excel pour chef de projet de construction* pour aligner l'avancement physique du chantier sur la référence financière sans ouvrir de logiciels d'entreprise lourds.
* **Métreurs et équipes de pré-construction :** requièrent un *outil de suivi des offres et de prévision des coûts* pour modéliser les besoins de trésorerie et les besoins en capital avant le démarrage officiel du chantier.
* **Contrôle de projet et réviseurs financiers :** utilisent ce classeur comme un *tableau de bord de gestion de la valeur acquise (EVM)* pour vérifier si le modèle échelonné dans le temps se rapproche proprement des valeurs contractuelles initiales.

Il convient particulièrement aux projets où la question analytique récurrente est : **« Compte tenu du calendrier planifié de chaque poste de la structure de découpage du projet, comment la valeur totale du contrat devrait-elle apparaître sur la chronologie du projet ? »**

*(Remarque : cet outil est délibérément ciblé : un projet, une source de postes, un moteur de calcul et deux vues de gestion. Il n'est pas conçu pour remplacer Primavera P6, les plateformes comptables d'entreprise lourdes ou les ERP de construction à grande échelle, mais plutôt pour combler harmonieusement le fossé entre eux, sans nécessiter d'expertise en ingénierie de tableurs.)*

## À propos

Je conçois des outils d'aide à la décision légers basés sur Excel pour des situations comptant trop de pièces mobiles pour tenir dans la tête d'un chef de projet, mais sans suffisamment de complexité pour justifier un système d'entreprise complet.

La question centrale est simple :

> **Quelles informations doivent être réunies au même endroit pour prendre la prochaine décision opérationnelle en confiance ?**

`Schedule-Driven Construction Cash Curve Workbook` applique cette approche au lien entre la planification de construction, l'avancement planifié et le calendrier de la valeur de projet.

Il conditionne une méthode analytique reproductible dans un classeur plutôt que de transformer le problème en un système logiciel plus vaste.

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens d'Excel et les collaborateurs</summary>

### Architecture du classeur

Le classeur utilise une **architecture 1-1-2** :

* **1 couche de saisie** — `01_INPUT`
* **1 moteur de calcul** — `02_ENGINE`
* **2 vues de présentation** — `03_MODULE_A` et `04_MODULE_B`
* **1 couche de configuration/contrôle** — `00_CONFIG`

Le principe de conception central est que le moteur de calcul agit comme la **source unique de vérité (SSOT)** du modèle de projet échelonné dans le temps. Le module A et le module B ne reconstruisent pas indépendamment le planning ou la courbe de trésorerie. Ils consomment les sorties du moteur.

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

### Couches du classeur

| Feuille        | Rôle               | Utilisateur principal                          | Responsabilité principale                              |
| ------------- | ------------------ | --------------------------------------------- | -------------------------------------------------------- |
| `00_CONFIG`   | Couche de contrôle | Mainteneur du modèle / analyste               | Paramètres centraux et seuils d'audit                   |
| `01_INPUT`    | Couche de saisie   | Chef de projet / métreur                      | Métadonnées du projet et planning des postes             |
| `02_ENGINE`   | Couche de calcul   | Back-end protégé                              | Chronologie, matrice de répartition, agrégation, rapprochement |
| `03_MODULE_A` | Couche de présentation | Chef de projet / conducteur de travaux / réviseur DOT | Vue de planning et d'avancement de type Gantt |
| `04_MODULE_B` | Couche de présentation | Direction / maître d'ouvrage / finances    | Valeur planifiée, période de pic et vue courbe en S      |

Le plan source sépare explicitement ces cinq feuilles pour éviter la contamination entre couches et la double saisie des données.

### Flux de données principal

Le modèle suit un pipeline unidirectionnel :

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

La couche de saisie contient les métadonnées du projet et les informations sur les postes. Chaque ligne de saisie est validée avant d'entrer dans la couche de calcul. Le moteur détermine ensuite la chronologie globale du projet et répartit la valeur du contrat de chaque poste sur les périodes actives selon la règle de répartition configurée.

### `00_CONFIG` — couche de contrôle

La couche de configuration centralise cinq paramètres du modèle :

| Paramètre         | Objet                   | Exemple  |
| ----------------- | ----------------------- | -------- |
| `CFG_CURRENCY`    | Symbole de la devise de reporting | `$`      |
| `CFG_TIME_SCALE`  | Granularité de la chronologie | `Weekly` |
| `CFG_ALLOC_RULE`  | Méthode d'échelonnement dans le temps | `1`      |
| `CFG_ROUND_TOLER` | Tolérance de rapprochement | `0.01`   |
| `CFG_WARN_LIMIT`  | Seuil d'alerte          | `0.00`   |

Le principe de conception est d'éviter d'intégrer des constantes métier dans toutes les formules en aval. Les valeurs de configuration sont référencées depuis la couche de contrôle à la place.

### `01_INPUT` — saisie du projet et des postes

La feuille de saisie est l'interface d'exploitation courante.

Les métadonnées au niveau du projet comprennent :

* `Project_Name`
* `Contract_Number`
* `County_Location`
* `Contractor_Name`
* `Schedule_Data_Date`

Le tableau des postes contient :

* `Bid_Item_Code`
* `Bid_Item_Description`
* `Bid_Item_Amount`
* `Planned_Start_Date`
* `Planned_Completion_Date`
* `Manual_Weight_Pct`

Le système dérive ensuite :

* `Calculated_Duration_Days`
* `Calculated_Weight_Pct`
* `Row_Validation_Status`

La pondération manuelle est optionnelle. Lorsqu'elle est laissée vide, le modèle peut dériver la pondération effective de la valeur du poste.

### Validation des saisies

La couche de validation au niveau de la ligne vérifie :

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

Cela empêche les lignes malformées de se propager silencieusement dans la matrice de calcul échelonnée dans le temps.

### `02_ENGINE` — source de calcul unique

Le moteur de calcul remplit quatre fonctions principales :

1. Déterminer la date de début planifiée la plus précoce du projet.
2. Déterminer la date d'achèvement planifiée la plus tardive du projet.
3. Générer la chronologie hebdomadaire ou mensuelle du projet.
4. Répartir chaque poste valide sur les périodes résultantes.

Il agrège également les valeurs de période, calcule les valeurs cumulées et les pourcentages d'avancement, et maintient les contrôles de rapprochement.

Les sorties du moteur qui en résultent comprennent :

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

### Génération dynamique de la chronologie

La chronologie du projet est générée horizontalement à l'aide de tableaux dynamiques.

```excel
=SEQUENCE(1, $C$3, 1, 1)
```

La date de début de chaque période est ensuite dérivée de l'échelle de temps configurée :

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

Les périodes hebdomadaires utilisent des incréments de sept jours. Les périodes mensuelles avancent par mois calendaire. Les dates de fin de période sont ensuite dérivées en utilisant soit `+6` jours pour les périodes hebdomadaires, soit `EOMONTH` pour les périodes mensuelles.

### Répartition échelonnée dans le temps

Chaque poste est évalué par rapport à chaque période du projet à l'aide d'une logique de chevauchement d'intervalles.

Pour un poste :

```text
Item Start ───────────────────── Item Finish
                 │
                 │ overlap
                 ▼
Period Start ─────────────── Period End
```

Une période est considérée comme active lorsque :

```text
Period End   >= Item Start
AND
Period Start <= Item Finish
```

Le moteur compte le nombre de périodes actives pour chaque poste et utilise ce nombre comme dénominateur pour la répartition linéaire.

Deux règles de répartition sont prises en charge :

**Règle 1 — répartition linéaire au prorata**

```text
Period Allocation
=
Bid Item Amount
÷
Number of Active Periods
```

**Règle 2 — montant forfaitaire à l'achèvement**

```text
If the item's completion date
falls within the period:

Period Allocation = 100% of Item Amount

Otherwise:

Period Allocation = 0
```

La règle de répartition est contrôlée de manière centralisée via `CFG_ALLOC_RULE`.

### Matrice de répartition bidimensionnelle

Le moteur central utilise `MAKEARRAY` pour construire la matrice poste-par-période.

Conceptuellement :

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

L'implémentation réelle détermine dynamiquement le nombre de lignes et de colonnes à partir des tableaux de saisie et de chronologie, évitant ainsi l'expansion manuelle des formules.

### Agrégation au niveau de la période

Une fois la matrice poste-par-période établie, le moteur agrège chaque colonne en valeur de projet planifiée totale pour cette période.

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

Les valeurs de période résultantes sont ensuite normalisées par rapport à la valeur totale du contrat pour dériver la contribution de la période à l'avancement planifié.

### Données de courbe en S cumulées

La valeur planifiée cumulée est générée à l'aide de `SCAN` :

```excel
=LET(
    p_vals, I11#,
    SCAN(0, p_vals, LAMBDA(prev, curr, prev + curr))
)
```

L'avancement planifié cumulé est ensuite calculé en divisant la valeur planifiée cumulée par la valeur totale du contrat :

```excel
=LET(
    cum_vals, I13#,
    total_val, $B$6,
    IF(total_val>0, cum_vals / total_val, 0)
)
```

Cela produit les données sous-jacentes des courbes en S de valeur planifiée cumulée et d'avancement planifié du projet.

### `03_MODULE_A` — vue planning / Gantt

Le module A convertit le planning échelonné dans le temps du moteur en une présentation orientée construction.

Il contient :

* les en-têtes de projet et de contrat ;
* la date des données ;
* le statut d'audit ;
* la chronologie des périodes ;
* l'avancement planifié par période ;
* l'avancement planifié cumulé ;
* le planning des postes ;
* les barres de Gantt dynamiques.

La visualisation Gantt est générée comme une matrice de texte dynamique plutôt que comme une collection d'objets graphiques positionnés manuellement.

La logique de rendu principale est conceptuellement :

```text
If Period overlaps Item Schedule:
    render Gantt block

Otherwise:
    render blank
```

La matrice résultante s'étend verticalement avec les postes supplémentaires et horizontalement avec les périodes de projet supplémentaires.

### `04_MODULE_B` — vue valeur planifiée / courbe de trésorerie

Le module B est la vue financière destinée à la direction.

Ses principaux KPI sont :

* la valeur totale du contrat ;
* la durée du projet ;
* la valeur planifiée de la période de pic ;
* le statut de santé de l'audit.

Son tableau de reporting détaillé contient :

* l'étiquette de période ;
* la plage de dates de la période ;
* la valeur planifiée de la période ;
* la valeur planifiée cumulée ;
* le pourcentage planifié cumulé.

La sortie horizontale du moteur est transformée en un tableau de gestion vertical afin qu'il puisse être lu plus naturellement, exporté ou utilisé comme source de graphique.

### Transformation dynamique du rapport

Le tableau de reporting du module B utilise une seule construction de tableau dynamique :

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

Cela maintient le rapport de gestion synchronisé avec la chronologie sous-jacente du projet plutôt que d'exiger un tableau de reporting maintenu séparément.

### Architecture d'audit

Le modèle traite le rapprochement comme une partie du calcul plutôt que comme une revue manuelle finale.

L'invariant principal est :

```text
Original Bid Total
        =
Time-Phased Engine Total
```

Le modèle s'attend en outre à ce que l'avancement planifié cumulé converge vers :

```text
100.00%
```

La logique d'audit qui en résulte peut être représentée comme suit :

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

L'indicateur de statut central combine le test de rapprochement des valeurs avec le test de convergence de l'avancement final.

### Carte des dépendances du classeur

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

## La logique métier et la méthodologie

Le classeur utilise un principe commercial simple : **la valeur du projet devrait être analysée dans la même dimension temporelle que le travail qui crée cette valeur**.

Au lieu de partir d'une courbe de trésorerie et d'essayer séparément d'expliquer pourquoi elle a cette forme, le modèle part des postes et de leurs fenêtres d'exécution planifiées, puis convertit ces fenêtres en un profil de valeur de projet échelonné dans le temps.

* **La répartition échelonnée dans le temps** convertit les valeurs contractuelles statiques en valeur planifiée au niveau de la période, rendant visible le calendrier de l'activité du projet.
* **Le lien planning-valeur** maintient l'avancement planifié et la valeur de projet planifiée dérivés du même calendrier de travail sous-jacent plutôt que de deux prévisions indépendantes.
* **L'analyse cumulée** transforme les valeurs de période en une courbe en S à l'échelle du projet, facilitant l'examen de l'accélération, de la concentration et du calendrier d'achèvement.
* **L'analyse des périodes de pic** identifie les périodes de libération de valeur de projet planifiée les plus élevées, fournissant un point de référence pour la planification des liquidités et de l'exécution.
* **Les contrôles de rapprochement** comparent le total de l'offre initiale au total échelonné dans le temps et vérifient que le modèle cumulé atteint son état final prévu avant que la sortie ne soit traitée comme valide en interne.

L'objectif commercial n'est pas de prédire les encaissements bancaires réels. Il est d'établir une **référence de valeur planifiée guidée par le planning** qui peut servir de référence commune pour la planification de construction, la revue de direction et l'analyse financière ultérieure.

---

## Autres outils de cette série

Une petite collection d'outils d'aide à la décision légers basés sur Excel et sur le web, couvrant l'estimation, la budgétisation, l'analyse opérationnelle et la planification financière.

* **Project Operations & Job Costing Toolkit** — relie les estimations de projet, les coûts d'exécution et la revue de rentabilité.
* **Pricing & Break-even Decision Calculator** — évalue les scénarios de tarification, de marge, de contribution et de seuil de rentabilité.
* **Manufacturing Labor Cost & Capacity Planning Toolkit** — relie les besoins en main-d'œuvre à la capacité de production disponible.

## Licence

Ce projet est publié sous la **Apache License 2.0**.

Voir le fichier [`LICENSE`](LICENSE) pour le texte complet de la licence.
