# 🌐 Global Pathogen Lines of Communication (LOC) — Interactive 3D Framework

**Live Demo:** [https://nrahaman1.github.io/loc-graphical-abstract/](https://nrahaman1.github.io/loc-graphical-abstract/)

---

## Overview

This is an interactive 3D graphical abstract visualizing the **Universal Physical Lines of Communication (PLOC) Framework** — a pathogen-agnostic spatial model developed as part of the DARPA Global Biosurveillance research initiative at **Mississippi State University**.

The visualization maps how pathogens (e.g., plant viruses, zoonotic diseases) can travel through interconnected global systems — from biological origin points through atmospheric, maritime, trade, and human movement vectors — to susceptible destination environments.

---

## 🧭 How to Use

| Action | Result |
|--------|--------|
| **Click** a category bubble | Expands its specific data process nodes |
| **Click** a process node | Opens a detail panel with full data, gaps, and candidate datasets |
| **Click** category bubble again | Collapses its child nodes |
| **"Expand All"** button | Shows all nodes simultaneously |
| **"Collapse All"** button | Returns to the clean category-only view |
| **Click + Drag** | Rotates the 3D universe |
| **Scroll** | Zooms in/out |
| **Hover** over a bubble | Shows the label tooltip |

---

## 🗂️ LOC Categories

| Color | Category |
|-------|----------|
| 🟢 Green | Biological |
| 🔵 Blue | Atmospheric |
| 🟡 Amber | Trade & Logistics |
| 🩷 Pink | Human & Operational |
| 🟣 Purple | Insect / Wildlife |
| 🔴 Red | Destination Susceptibility |
| 🩵 Cyan | Hydrospheric / Riverine |
| 🌸 Rose | Cross-Dependencies (GDELT, Seerist) |
| 🌕 Yellow | Bird Migration |
| 🟩 Lime | Soil / Terrestrial |
| 🟠 Orange | Generic Physical |

---

## 📊 Data Sources Represented

The framework integrates the following publicly available datasets and APIs:

- **NASA POWER** — Climate & solar irradiance
- **NASA PACE** — Coastal/ocean biogeochemical monitoring
- **Global HydroSHEDS** — River network and watershed data
- **FAF5 (Freight Analysis Framework)** — Domestic freight flow
- **Spire Maritime** — Global vessel tracking (AIS)
- **SPEI / Aridity Index** — Drought & moisture stress
- **LandScan** — Ambient population density
- **GDELT Project** — Global news & event knowledge graph
- **Seerist API** — Geopolitical risk intelligence
- **Global Shipping Traffic Density Rasters** — Maritime activity

---

## 🏗️ Technical Stack

- **[3d-force-graph](https://github.com/vasturiano/3d-force-graph)** — WebGL 3D physics-based graph engine
- **[Three.js](https://threejs.org/)** — 3D rendering backbone
- **Vanilla HTML/CSS/JS** — No frameworks, no build step required
- **Glassmorphism UI** — Dark mode, frosted glass panels

---

## 📁 File Structure

```
loc-graphical-abstract/
├── index.html          # Main page
├── css/
│   └── style.css       # Deep space + glassmorphism styles
├── js/
│   └── graph.js        # Force graph logic and interactivity
└── data/
    └── loc_graph.json  # Full graph data exported from Excel
```

---

## 🔬 Research Context

This framework was developed to support the identification of **measurement gaps** in global biosurveillance infrastructure and to visualize candidate datasets that could close those gaps. The visualization was derived from a structured Excel master document (`COMBINED LOCs&Gaps.xlsx`) maintained by the research team.

**Institution:** Mississippi State University  

---

## 📄 License

This visualization is intended for academic and research use. Please contact the authors before redistribution.
