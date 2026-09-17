[ 🌐 عربي ](README.ar.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Plantilla Excel de Flujo de Caja de Construcción y Libro de Trabajo de Curva S Guiada por Cronograma

> **Una plantilla Excel gratuita de flujo de caja de construcción guiada por cronograma y un libro de trabajo basado en web. Convierte sin esfuerzo tu cronograma de construcción (EDT) y tu registro de partidas de licitación (Programa de Valores) en una curva S de proyecto automatizada, una previsión de costos distribuida en el tiempo y un rastreador de avance planificado — sin mantener modelos financieros y de programación separados.**

![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Project%20Controls%20%26%20Cost%20Forecasting-success.svg)

> **Prueba el panel interactivo basado en web que aparece a continuación. Si necesitas registros sin conexión, pistas de auditoría de facturación AIA y uso repetido en múltiples obras, descarga la implementación completa en Excel.**
>
> **🌐 Probar la aplicación web** → [Iniciar la aplicación web gratuita de flujo de caja de construcción](https://hyvoid.github.io/Schedule-Driven-Construction-Cash-Curve-Workbook/)
> 
> **📥 Descargar la plantilla** → [Descargar el libro de Excel reutilizable de flujo de caja de construcción (.xlsx)](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)

## Puntos de dolor del flujo de caja de construcción frente a soluciones

En lugar de un seguimiento manual, este libro de trabajo utiliza una correspondencia de “punto de dolor a solución” para automatizar el control de tu proyecto:

| Punto de dolor en la gestión de construcción (Lo que te cuesta trabajo) | Solución del panel guiado por cronograma (Lo que rastrea esta herramienta) |
| :--- | :--- |
| **Desconexión entre la programación del proyecto y la facturación** | **Partidas de licitación activas por período:** Alinea automáticamente las fechas planificadas de inicio y finalización con la línea de tiempo maestra del proyecto (EDT). |
| **Previsión inexacta de ingresos y costos** | **Valor del proyecto distribuido en el tiempo:** Calcula el valor planificado exacto liberado por mes/semana, reemplazando los promedios planos del contrato. |
| **Falta de visibilidad de la línea base** | **Avance planificado acumulado:** Traza cómo se espera que el proyecto avance físicamente del 0 % al 100 % de finalización. |
| **Déficits de caja y problemas de capital de trabajo** | **Identificación del pico de flujo de caja:** Resalta visualmente los períodos de actividad concentrada del proyecto y de alta demanda de caja/valor. |
| **Programa de Valores (SOV) desequilibrado** | **Conciliación automatizada de la licitación:** Incluye un estado de auditoría explícito para garantizar que el modelo distribuido en el tiempo cuadre perfectamente con el total original de la licitación. |
| **Silos de gestión de proyectos aislados** | **Motor de cálculo unificado:** Conecta el cronograma de construcción y la curva de caja directamente, asegurando que ambas vistas provengan del mismo conjunto de datos. |

## Cómo usar esta herramienta de previsión de costos de construcción (Guía de inicio rápido)

Sigue estos pasos para generar la línea base de tu proyecto. 

1. **Configurar los parámetros de la línea de tiempo y la moneda del proyecto**
   Configura tu moneda de reporte, la granularidad de la línea de tiempo (Semanal/Mensual) y el método de asignación de capital (Lineal vs. Período de finalización) en la pestaña de configuración. 

2. **Importar el Programa de Valores (SOV) y el registro de partidas de licitación**
   Pega los metadatos de tu proyecto y el presupuesto de construcción directamente en el área de entrada. Campos obligatorios principales: Código de partida, Descripción, Monto del contrato, Fecha de inicio planificada y Fecha de finalización planificada.

3. **Generar automáticamente la curva S de flujo de caja y la línea base de avance**
   Deja que el motor de cálculo construya dinámicamente la línea de tiempo de todo el proyecto. Identifica los períodos EDT activos, distribuye el valor planificado y agrega los datos en métricas de avance a nivel de proyecto.

4. **Revisar los análisis y exportar para el uso repetido del proyecto (CTA)**
   Revisa el Módulo A (Diagrama de Gantt de cronograma y avance) y el Módulo B (Valor distribuido en el tiempo y curva S). **[Descarga la versión del libro de Excel sin conexión](https://theseusworkshop.com/l/cfiphb?utm_source=github&utm_medium=GitHub%20README)** para guardar esta línea base específica del proyecto, mantener pistas de auditoría locales y reutilizar la plantilla en tu próxima licitación de construcción.

## ¿Por qué se creó esta herramienta de modelado financiero de construcción? (La brecha entre cronograma y costo)

En la gestión de proyectos de construcción, los cronogramas de ruta crítica (CPM) y las previsiones de valor del proyecto a menudo se mantienen como objetos analíticos completamente separados. 

Un cronograma de licitación le dice al equipo del proyecto **cuándo se espera que ocurra el trabajo**, mientras que una hoja de cálculo de flujo de caja separada estima **cuándo se espera que se libere el capital del proyecto**. El problema es que estos dos documentos inevitablemente sufren una desviación de la línea base.

* Una fecha de finalización cambia en el cronograma, pero el modelo de previsión de costos no se actualiza.
* Una orden de cambio (CO) modifica una partida de licitación, pero el modelo financiero todavía usa la base del valor de contrato anterior.
* Un gerente de proyecto presenta una curva S de Valor Ganado (EVM) que parece plausible, pero el total distribuido en el tiempo ya no cuadra con el Programa de Valores (SOV) original.

Este libro de trabajo trata el registro de partidas de licitación y las fechas planificadas como la **única fuente de verdad**, derivando tanto la vista del cronograma como la curva de caja/valor de esa misma fuente exacta. 

En lugar de tratar el Movimiento de Tierras como una previsión financiera mensual mantenida de forma independiente, este modelo se pregunta dinámicamente: *"¿Qué períodos del proyecto se superponen con las fechas del Movimiento de Tierras, y cómo debería liberarse su valor de contrato a lo largo de esos períodos?"*

## Superar los obstáculos comunes de la planificación de construcción 

| Desafío del control de proyectos | Hojas de cálculo manuales (Sin esta herramienta) | Panel automatizado de curva S (Con esta herramienta) |
| :--- | :--- | :--- |
| **Desviación entre cronograma y finanzas** | Las fechas y los períodos de facturación AIA fácilmente se desincronizan. | Ambas vistas se originan dinámicamente en la misma línea base de partidas de licitación. |
| **Previsión estática del contrato** | La programación del proyecto y las tasas de consumo mensuales permanecen invisibles. | El valor del contrato se distribuye automáticamente entre períodos granulares del proyecto. |
| **Cronogramas EDT complejos** | Requiere expansión manual de la línea de tiempo y copiado de fórmulas propenso a errores. | Las fórmulas de matriz dinámica generan y expanden la línea de tiempo a medida que el proyecto escala. |
| **Avance frente a valor real** | El seguimiento del avance requiere un ejercicio de ponderación manual y separado. | El valor del período se normaliza automáticamente en una contribución al avance planificado (%). |
| **Gestión de órdenes de cambio** | Las modificaciones a las partidas de licitación requieren actualizar múltiples pestañas posteriores. | La cadena de cálculo propaga instantáneamente los cambios de fecha y valor en todas las vistas. |
| **Errores de cálculo ocultos** | Una curva visual suave puede ocultar fácilmente errores críticos de conciliación. | Los totales de la licitación, los totales distribuidos en el tiempo, las variaciones y las métricas de 100 % de finalización se auditan explícitamente. |

## Casos de uso: ¿Quién necesita esta plantilla de cronograma de construcción y flujo de caja?

Este libro de trabajo está diseñado para profesionales de la construcción que necesitan una forma ligera y precisa de conectar un cronograma de partidas de licitación con la programación planificada del valor del proyecto, enfocándose específicamente en los siguientes roles y flujos de trabajo:

* **Contratistas generales y constructores:** Que buscan una *plantilla de cronograma de pagos al contratista* confiable para prever los pagos a subcontratistas frente a las facturaciones por avance del propietario.
* **Gerentes de proyecto de construcción (PM):** Que necesitan un *Excel de cronograma para gerentes de proyecto de construcción* para alinear el avance físico en obra con la línea base financiera sin abrir software empresarial pesado.
* **Estimadores y equipos de preconstrucción:** Que requieren una *herramienta de seguimiento de licitaciones y previsión de costos* para modelar los requerimientos de flujo de caja y las necesidades de capital antes de iniciar oficialmente la obra.
* **Control de proyectos y revisores financieros:** Que usan esto como un *panel de Gestión del Valor Ganado (EVM)* para auditar si el modelo distribuido en el tiempo cuadra limpiamente con los valores contractuales originales.

Es particularmente adecuado para proyectos donde la pregunta analítica recurrente es: **"Dada la programación planificada de cada partida EDT, ¿cómo debería aparecer el valor total del contrato a lo largo de la línea de tiempo del proyecto?"**

*(Nota: Esta herramienta es deliberadamente enfocada: un proyecto, una fuente de partidas de licitación, un motor de cálculo y dos vistas de gestión. No está diseñada para reemplazar Primavera P6, plataformas de contabilidad empresarial pesadas ni ERP de construcción de escala completa, sino para cerrar la brecha entre ellos sin problemas y sin requerir experiencia en ingeniería de hojas de cálculo.)*

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión basadas en Excel para situaciones con demasiadas piezas móviles como para mantenerlas en la cabeza de un gerente de proyecto, pero sin la complejidad suficiente para justificar un sistema empresarial completo.

La pregunta central es simple:

> **¿Qué información necesita estar en un solo lugar para tomar la siguiente decisión operativa con confianza?**

`Schedule-Driven Construction Cash Curve Workbook` aplica ese enfoque a la conexión entre la programación de la construcción, el avance planificado y la programación temporal del valor del proyecto.

Empaqueta un método analítico repetible en un libro de trabajo, en lugar de convertir el problema en un sistema de software más grande.

## Detalles técnicos

<details>
<summary>Para revisores técnicos, profesionales de Excel y colaboradores</summary>

### Arquitectura del libro de trabajo

El libro de trabajo utiliza una **arquitectura 1-1-2**:

* **1 capa de entrada** — `01_INPUT`
* **1 motor de cálculo** — `02_ENGINE`
* **2 vistas de presentación** — `03_MODULE_A` y `04_MODULE_B`
* **1 capa de configuración/control** — `00_CONFIG`

El principio de diseño central es que el motor de cálculo actúa como la **Única Fuente de Verdad (SSOT)** para el modelo del proyecto distribuido en el tiempo. El Módulo A y el Módulo B no reconstruyen de forma independiente el cronograma ni la curva de caja. Consumen las salidas del motor. 

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

### Capas del libro de trabajo

| Hoja          | Rol                | Usuario principal                               | Responsabilidad principal                                |
| ------------- | ------------------ | ----------------------------------------------- | -------------------------------------------------------- |
| `00_CONFIG`   | Capa de control    | Mantenedor del modelo / analista                | Parámetros centrales y umbrales de auditoría             |
| `01_INPUT`    | Capa de entrada de datos | Gerente de proyecto / estimador           | Metadatos del proyecto y cronograma de partidas          |
| `02_ENGINE`   | Capa de cálculo    | Backend protegido                               | Línea de tiempo, matriz de asignación, agregación, conciliación |
| `03_MODULE_A` | Capa de presentación | Gerente de proyecto / superintendente / revisor DOT | Vista de cronograma y avance estilo Gantt          |
| `04_MODULE_B` | Capa de presentación | Gerencia / propietario / finanzas              | Vista de valor planificado, período pico y curva S       |

El plano de origen separa explícitamente estas cinco hojas para evitar la contaminación entre capas y la entrada duplicada de datos. 

### Flujo de datos principal

El modelo sigue un pipeline unidireccional:

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

La capa de entrada contiene los metadatos del proyecto y la información de las partidas de licitación. Cada fila de entrada se valida antes de entrar en la capa de cálculo. El motor luego determina la línea de tiempo global del proyecto y asigna el valor de contrato de cada partida de licitación a los períodos activos según la regla de asignación configurada. 

### `00_CONFIG` — Capa de control

La capa de configuración centraliza cinco parámetros del modelo:

| Parámetro         | Propósito                 | Ejemplo  |
| ----------------- | ------------------------- | -------- |
| `CFG_CURRENCY`    | Símbolo de la moneda de reporte | `$`      |
| `CFG_TIME_SCALE`  | Granularidad de la línea de tiempo | `Weekly` |
| `CFG_ALLOC_RULE`  | Método de distribución en el tiempo | `1`      |
| `CFG_ROUND_TOLER` | Tolerancia de conciliación | `0.01`   |
| `CFG_WARN_LIMIT`  | Umbral de advertencia     | `0.00`   |

El principio de diseño es evitar incrustar constantes de negocio en todas las fórmulas posteriores. En su lugar, se hace referencia a los valores de configuración desde la capa de control. 

### `01_INPUT` — Entrada de proyecto y partidas de licitación

La hoja de entrada es la interfaz operativa habitual.

Los metadatos a nivel de proyecto incluyen:

* `Project_Name`
* `Contract_Number`
* `County_Location`
* `Contractor_Name`
* `Schedule_Data_Date`

La tabla de partidas de licitación contiene:

* `Bid_Item_Code`
* `Bid_Item_Description`
* `Bid_Item_Amount`
* `Planned_Start_Date`
* `Planned_Completion_Date`
* `Manual_Weight_Pct`

El sistema luego deriva:

* `Calculated_Duration_Days`
* `Calculated_Weight_Pct`
* `Row_Validation_Status`

El peso manual es opcional. Cuando se deja en blanco, el modelo puede derivar el peso efectivo a partir del valor de la partida de licitación. 

### Validación de entrada

La capa de validación a nivel de fila comprueba:

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

Esto evita que las filas malformadas se propaguen silenciosamente a la matriz de cálculo distribuida en el tiempo. 

### `02_ENGINE` — Fuente única de cálculo

El motor de cálculo realiza cuatro funciones principales:

1. Determinar la fecha de inicio planificada más temprana del proyecto.
2. Determinar la fecha de finalización planificada más tardía del proyecto.
3. Generar la línea de tiempo semanal o mensual del proyecto.
4. Asignar cada partida de licitación válida a los períodos resultantes.

También agrega los valores de los períodos, calcula los valores acumulados y los porcentajes de avance, y mantiene los controles de conciliación. 

Las salidas resultantes del motor incluyen:

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

### Generación dinámica de la línea de tiempo

La línea de tiempo del proyecto se genera horizontalmente usando matrices dinámicas.

```excel
=SEQUENCE(1, $C$3, 1, 1)
```

La fecha de inicio de cada período se deriva luego de la escala de tiempo configurada:

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

Los períodos semanales usan incrementos de siete días. Los períodos mensuales avanzan por mes calendario. Las fechas de fin de período se derivan luego usando `+6` días para períodos semanales o `EOMONTH` para períodos mensuales. 

### Asignación distribuida en el tiempo

Cada partida de licitación se evalúa frente a cada período del proyecto usando lógica de superposición de intervalos.

Para una partida de licitación:

```text
Item Start ───────────────────── Item Finish
                 │
                 │ overlap
                 ▼
Period Start ─────────────── Period End
```

Un período se considera activo cuando:

```text
Period End   >= Item Start
AND
Period Start <= Item Finish
```

El motor cuenta el número de períodos activos para cada partida y usa ese conteo como denominador para la asignación lineal. 

Se admiten dos reglas de asignación:

**Regla 1 — Prorrateo lineal**

```text
Period Allocation
=
Bid Item Amount
÷
Number of Active Periods
```

**Regla 2 — Suma global al finalizar**

```text
If the item's completion date
falls within the period:

Period Allocation = 100% of Item Amount

Otherwise:

Period Allocation = 0
```

La regla de asignación se controla de forma centralizada mediante `CFG_ALLOC_RULE`. 

### Matriz de asignación bidimensional

El motor principal usa `MAKEARRAY` para construir la matriz de partida por período.

Conceptualmente:

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

La implementación real determina dinámicamente el número de filas y columnas a partir de las matrices de entrada y de la línea de tiempo, evitando la expansión manual de fórmulas. 

### Agregación a nivel de período

Una vez que existe la matriz de partida por período, el motor agrega cada columna en el valor planificado total del proyecto para ese período.

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

Los valores de período resultantes se normalizan luego contra el valor total del contrato para derivar la contribución al avance planificado del período. 

### Datos de la curva S acumulada

El valor planificado acumulado se genera usando `SCAN`:

```excel
=LET(
    p_vals, I11#,
    SCAN(0, p_vals, LAMBDA(prev, curr, prev + curr))
)
```

El avance planificado acumulado se calcula luego dividiendo el valor planificado acumulado entre el valor total del contrato:

```excel
=LET(
    cum_vals, I13#,
    total_val, $B$6,
    IF(total_val>0, cum_vals / total_val, 0)
)
```

Esto produce los datos subyacentes para las curvas S de valor planificado acumulado y avance planificado del proyecto. 

### `03_MODULE_A` — Vista de cronograma / Gantt

El Módulo A convierte el cronograma distribuido en el tiempo del motor en una presentación orientada a la construcción.

Contiene:

* encabezados de proyecto y contrato;
* fecha de datos;
* estado de auditoría;
* línea de tiempo de períodos;
* avance planificado del período;
* avance planificado acumulado;
* cronograma de partidas de licitación;
* barras de Gantt dinámicas.

La visualización de Gantt se genera como una matriz de texto dinámica en lugar de una colección de objetos de dibujo posicionados manualmente. 

La lógica de renderizado principal es conceptualmente:

```text
If Period overlaps Item Schedule:
    render Gantt block

Otherwise:
    render blank
```

La matriz resultante se expande tanto verticalmente con partidas de licitación adicionales como horizontalmente con períodos de proyecto adicionales.

### `04_MODULE_B` — Vista de valor planificado / curva de caja

El Módulo B es la vista financiera orientada a la gerencia.

Sus KPI principales son:

* Valor total del contrato
* Duración del proyecto
* Valor planificado del período pico
* Estado de salud de la auditoría

Su tabla de reporte detallada contiene:

* etiqueta del período;
* rango de fechas del período;
* valor planificado del período;
* valor planificado acumulado;
* porcentaje planificado acumulado.

La salida horizontal del motor se transforma en una tabla de gestión vertical para que pueda leerse de forma más natural, exportarse o usarse como fuente de gráficos. 

### Transformación dinámica de reportes

La tabla de reporte del Módulo B usa una única construcción de matriz dinámica:

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

Esto mantiene el reporte de gestión sincronizado con la línea de tiempo subyacente del proyecto en lugar de requerir una tabla de reporte mantenida por separado. 

### Arquitectura de auditoría

El modelo trata la conciliación como parte del cálculo en lugar de como una revisión manual final.

El invariante principal es:

```text
Original Bid Total
        =
Time-Phased Engine Total
```

El modelo además espera que el avance planificado acumulado converja a:

```text
100.00%
```

La lógica de auditoría resultante puede representarse como:

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

El indicador de estado central combina la prueba de conciliación de valores con la prueba de convergencia del avance final. 

### Mapa de dependencias del libro de trabajo

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

## La lógica de negocio y la metodología

El libro de trabajo utiliza un principio comercial simple: **el valor del proyecto debe analizarse en la misma dimensión temporal que el trabajo que crea ese valor**.

En lugar de comenzar con una curva de caja y tratar por separado de explicar por qué se ve como se ve, el modelo parte de las partidas de licitación y sus ventanas de ejecución planificadas, y luego convierte esas ventanas en un perfil de valor del proyecto distribuido en el tiempo.

* **Asignación distribuida en el tiempo** convierte valores de contrato estáticos en valor planificado a nivel de período, haciendo visible la programación de la actividad del proyecto.
* **Vinculación cronograma-a-valor** mantiene el avance planificado y el valor planificado del proyecto derivados de la misma programación de trabajo subyacente, en lugar de dos previsiones independientes.
* **Análisis acumulado** convierte los valores a nivel de período en una curva S de todo el proyecto, facilitando la revisión de la aceleración, la concentración y la programación de la finalización.
* **Análisis del período pico** identifica los períodos con mayor liberación de valor planificado del proyecto, proporcionando un punto de referencia para la planificación de caja y ejecución.
* **Controles de conciliación** comparan el total original de la licitación con el total distribuido en el tiempo y verifican que el modelo acumulado alcance su estado final previsto antes de que la salida se considere internamente válida. 

El objetivo comercial no es predecir los recibos bancarios reales. Es establecer una **línea base de valor planificado guiada por el cronograma** que pueda usarse como referencia común para la planificación de la construcción, la revisión de la gerencia y el análisis financiero posterior.

---

## Otras herramientas de esta serie

Una pequeña colección de herramientas ligeras de apoyo a la decisión basadas en Excel y en el navegador que cubren estimación, presupuestación, análisis operativo y planificación financiera.

* **Project Operations & Job Costing Toolkit** — conecta los presupuestos del proyecto, los costos de ejecución y la revisión de rentabilidad.
* **Pricing & Break-even Decision Calculator** — evalúa escenarios de precios, margen, contribución y punto de equilibrio.
* **Manufacturing Labor Cost & Capacity Planning Toolkit** — conecta los requerimientos de mano de obra con la capacidad de producción disponible.

## Licencia

Este proyecto se publica bajo la **Licencia Apache 2.0**.

Consulta el archivo [`LICENSE`](LICENSE) para ver el texto completo de la licencia.
