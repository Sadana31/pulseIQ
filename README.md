# PULSEIQ: Clinical Decision Support System

PULSEIQ is a comprehensive, React-based Clinical Decision Support System (CDSS) designed to streamline medical triage, patient symptom tracking, and doctor workflows. Built with a modern technology stack leveraging Vite, React, Tailwind CSS v4, and Firebase, the architecture enforces modularity and separation of concerns between patient-facing portals and clinical dashboard environments.

---

## 🏗️ System Architecture

*   **Core Framework:** React 18+ powered by Vite for exceptionally fast HMR and optimized production builds.
*   **Routing:** Client-side routing to handle discrete workflows for Patients and Doctors.
*   **Styling Engine:** Tailwind CSS v4 utilizing `@theme` and `@utility` directives for a cohesive, standardized aesthetic (enforcing a clean, light-theme clinical design system with purple `#9173e6` primary branding).
*   **Backend/BaaS:** Firebase integration (`firebase.js`) handling real-time data synchronization, authentication, and persistent state management.
*   **Animation Engine:** Framer Motion utilized for physics-based micro-interactions, layout transitions, and seamless modal operations (e.g., slide-over triage details).

---

## 📂 Project Structure

The codebase is organized by functional domain to ensure scalable maintainability:

```text
PULSEIQ/
├── public/                 # Static assets (favicons, manifest)
├── src/                    # Source Code
│   ├── components/         # Reusable UI primitives and layouts
│   │   ├── GlobalActions.jsx   # Contextual global floating actions
│   │   ├── Layout.jsx          # Root layout shell (Header/Nav wrapper)
│   │   └── Sidebar.jsx         # Context-aware navigation sidebar
│   │
│   ├── screens/            # Route-level Page Components
│   │   ├── doctors/        # Clinical/Provider Dashboard Views
│   │   │   ├── data/
│   │   │   │   └── mockPatients.js       # Seed data for triage testing
│   │   │   ├── doctorCaseViewing.jsx     # Deep-dive medical case analysis
│   │   │   ├── doctorDashboard.jsx       # Primary provider landing view
│   │   │   ├── doctorHighRisk.jsx        # High-priority patient triage queue
│   │   │   ├── doctorLogin.jsx           # Provider authentication flow
│   │   │   ├── doctorNotes.jsx           # Interactive clinical scratchpad
│   │   │   └── PatientDetailsModal.jsx   # Slide-over CDSS rule/warning panel
│   │   │
│   │   └── patient/        # Patient-Facing Portal
│   │       ├── patientLogin.jsx          # Patient authentication flow
│   │       ├── patientProfile.jsx        # PHI and demographic management
│   │       ├── patientSymptoms.jsx       # Symptom intake and self-reporting
│   │       └── triageEngine.js           # Core algorithmic rules engine for priority calculation
│   │
│   ├── App.jsx             # Application root, routing config, Provider wrapping
│   ├── firebase.js         # Firebase initialization and service exports
│   ├── index.css           # Global CSS, Tailwind base layers, and custom utilities
│   └── main.jsx            # React entry point & DOM attachment
│
├── eslint.config.js        # ESLint flat config for code quality enforcement
├── index.html              # HTML shell
├── package.json            # Dependency manifest & npm scripts
└── vite.config.js          # Vite build configuration (assumed)
```

---

## 🧩 Core Modules

### 1. The Doctors Module (`src/screens/doctors/`)
This secure area provides the operational interface for clinical staff.
*   **`doctorHighRisk.jsx`**: A specialized triage view rendering a prioritized list of cases (Critical, High, Moderate). It interfaces directly with the `PatientDetailsModal.jsx` to display contextual warnings and AI-driven clinical recommendations based on vitals.
*   **`doctorNotes.jsx`**: A masonry/grid-based UI for temporary clinical scratchpads. Supports full CRUD operations with inline state editing and Framer Motion layout animations.
*   **`PatientDetailsModal.jsx`**: An isolated, highly interactive component that mounts via an `AnimatePresence` portal. It digests patient payload data to render vital anomalies and rule-based system warnings.

### 2. The Patient Module (`src/screens/patient/`)
The entry point for patient data ingestion.
*   **`patientSymptoms.jsx`**: The interactive form/flow where patients log their current symptoms.
*   **`triageEngine.js`**: The critical business logic module. It evaluates the raw data collected from `patientSymptoms.jsx` against predefined clinical rules, assigning a respective priority score that populates the `doctorHighRisk.jsx` queue.

### 3. Global Infrastructure (`src/components/`, `src/App.jsx`)
*   **`Sidebar.jsx` & `Layout.jsx`**: Construct the application shell, maintaining visual hierarchy and providing uninterrupted navigation between dashboard views.
*   **`firebase.js`**: Serves as the data layer bridging the Patient Module's inputs with the Doctors Module's outputs via real-time listeners.

---

## 🎨 Design System Integration

The application relies on a unified CSS architecture located in `src/index.css`.
When integrating UI components, ensure the following theme variables are present to maintain the clinical aesthetic:

```css
@theme {
  --color-background: #FaF9FF; /* Soothing base */
  --color-surface: #ffffff;    /* Card backgrounds */
  --color-primary: #9173e6;    /* Core Application Purple */
  --color-primary-light: #eaddff;
  --color-danger: #ef4444;     /* Critical alerts */
  --color-warning: #f59e0b;    /* High-priority alerts */
  --color-success: #10b981;
}

@utility glass-panel {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(145, 115, 230, 0.15);
  box-shadow: 0 10px 25px -5px rgba(145, 115, 230, 0.1);
}
```

*Note: All Lucide React icons and customized Framer Motion components reference these color variables to ensure consistency across the platform.*

---

## 🚀 Development Quick Start

**Prerequisites:** Node.js (v18+) and npm.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Ensure `lucide-react`, `framer-motion`, `clsx`, and `tailwind-merge` are present).*

2.  **Environment Setup:**
    Create a `.env` file at the project root mirroring your Firebase configuration credentials before executing.

3.  **Start Development Server:**
    ```bash
    npm run dev
    ```

4.  **Production Build:**
    To compile optimized static assets to the `dist/` directory:
    ```bash
    npm run build
    ```
