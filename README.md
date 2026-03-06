# PULSEIQ – Clinical Decision Support System

PULSEIQ is a **modern Clinical Decision Support System (CDSS)** designed to assist healthcare professionals in monitoring patient conditions, prioritizing critical cases, and maintaining efficient clinical workflows.

The system integrates a **patient-facing portal**, an **AI-assisted symptom triage engine**, and a **doctor dashboard** that enables real-time monitoring of patient conditions and clinical notes management.

Built using **React, Firebase, Tailwind CSS, and Framer Motion**, PULSEIQ emphasizes:

* Fast and responsive UI
* Real-time medical data synchronization
* Intelligent patient prioritization
* Clean clinical user experience

The platform aims to **streamline medical triage, improve patient-doctor communication, and support faster clinical decision making.**

---

# 🏗️ System Architecture

PULSEIQ follows a **modular client–server architecture**, where patient interactions feed into a centralized backend system that processes and distributes relevant clinical data to healthcare providers.

The architecture separates the application into **three primary layers**:

### 1️⃣ Presentation Layer (User Interface)

The presentation layer consists of two distinct interfaces:

#### Patient Interface

Patients interact with the system through a **guided chatbot-based symptom intake system**. This interface allows users to:

* Log symptoms
* Submit basic health parameters
* Provide condition updates
* Store data securely in Firebase

The chatbot simplifies medical data collection by **converting conversational input into structured medical information**.

#### Doctor Interface

Doctors access a **clinical dashboard** where they can:

* View patient records
* Analyze reported symptoms
* Monitor priority alerts
* Add medical notes
* Track high-risk patients

This separation ensures **clean role-based access and workflow optimization.**

---

### 2️⃣ Application Logic Layer

The application logic layer contains the **core medical processing logic** responsible for evaluating patient data.

The most critical component in this layer is the **Triage Engine**, which performs:

* Symptom analysis
* Health condition evaluation
* Priority scoring
* Risk categorization

Based on patient inputs, the triage engine assigns priority levels such as:

* 🔴 Critical
* 🟠 High Risk
* 🟡 Moderate
* 🟢 Stable

These results are then displayed to doctors in a **prioritized patient queue**, allowing healthcare providers to **focus on the most urgent cases first**.

---

### 3️⃣ Data Layer (Backend Infrastructure)

PULSEIQ uses **Firebase** as its backend infrastructure.

Firebase provides:

* Real-time database synchronization
* Secure authentication
* Cloud data storage
* Instant updates between patient and doctor interfaces

When a patient submits symptoms:

1. Data is stored in Firebase
2. The triage engine processes the condition
3. The doctor dashboard receives updated patient information instantly

This architecture ensures **low latency and real-time medical monitoring**.

---

# 📂 Project Structure

```
PULSEIQ/
├── public/
│   ├── favicon
│   └── manifest files
│
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── GlobalActions.jsx
│   │
│   ├── screens/
│   │   ├── doctors/
│   │   │   ├── doctorDashboard.jsx
│   │   │   ├── doctorHighRisk.jsx
│   │   │   ├── doctorNotes.jsx
│   │   │   ├── doctorCaseViewing.jsx
│   │   │   ├── doctorLogin.jsx
│   │   │   ├── PatientDetailsModal.jsx
│   │   │   └── data/mockPatients.js
│   │
│   │   └── patient/
│   │       ├── patientLogin.jsx
│   │       ├── patientProfile.jsx
│   │       ├── patientSymptoms.jsx
│   │       └── triageEngine.js
│   │
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

# 🧩 Core Modules

## 1️⃣ Patient Symptom Collection Module

The **Patient Module** acts as the entry point of medical data into the system.

Patients interact with a **guided chatbot or form-based interface** that collects:

* Symptoms
* Duration of illness
* Severity levels
* Basic health indicators

This information is then sent to the **triage engine**, which evaluates the patient's health condition.

The design focuses on **simplicity and accessibility**, ensuring patients can quickly report symptoms without requiring medical knowledge.

---

## 2️⃣ Triage Decision Engine

The **Triage Engine** is the decision-making component of the system.

Located in:

```
src/screens/patient/triageEngine.js
```

This module processes incoming symptom data and applies **predefined medical rules** to determine patient risk levels.

Example evaluation logic may include:

* Fever + breathing difficulty → High risk
* Chest pain + high heart rate → Critical
* Mild cough + normal vitals → Moderate

The engine generates a **priority score**, which is stored alongside patient records.

This mechanism ensures doctors can **quickly identify patients who require immediate attention.**

---

## 3️⃣ Doctor Dashboard Module

The **Doctor Dashboard** provides a centralized view of patient data.

Doctors can:

* Monitor incoming patient cases
* View symptom summaries
* Identify high-risk cases
* Open detailed patient records

The dashboard is optimized for **quick scanning and rapid decision making**, ensuring critical cases are highlighted clearly.

---

## 4️⃣ Priority-Based Patient Queue

The **High Risk Queue** automatically organizes patients based on triage results.

Priority levels include:

| Priority | Description                                    |
| -------- | ---------------------------------------------- |
| Critical | Immediate medical attention required           |
| High     | Serious symptoms requiring urgent consultation |
| Moderate | Non-critical but needs monitoring              |
| Stable   | Low risk symptoms                              |

This queue helps doctors **handle emergency cases efficiently**.

---

## 5️⃣ Clinical Notes System

Doctors can maintain **temporary or persistent clinical notes** for each patient.

Features include:

* Quick note creation
* Editable notes
* Structured clinical observations
* Scratchpad interface for temporary remarks

This allows doctors to **record observations during diagnosis or consultation**.

---

## 🎨 Design System

The UI design follows a **clean clinical interface** with a light color palette.

Primary Theme Colors:

```
Background  → #FAF9FF
Surface     → #FFFFFF
Primary     → #9173E6
Warning     → #F59E0B
Danger      → #EF4444
Success     → #10B981
```

These colors help visually distinguish:

* Critical alerts
* Warnings
* Normal conditions

The interface uses **Tailwind CSS v4 utilities and reusable design tokens**.

---

# 🚀 Development Setup

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Configure Firebase

Create a `.env` file with Firebase credentials.

Example:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

---

### 3️⃣ Start development server

```
npm run dev
```

---

### 4️⃣ Build production version

```
npm run build
```

---

# 🔮 Future Improvements

Potential improvements for the platform include:

### AI Medical Assistance

Integrating machine learning models to improve symptom analysis.

### Appointment Scheduling

Allow patients to schedule consultations directly with doctors.

### Medical History Tracking

Maintain long-term patient health records.

### Notification System

Send alerts for high-risk patients.

### Telemedicine Integration

Enable video consultations between patients and doctors.

---

# 💡 Extra Ideas to Make Your README Stronger

Add these sections:

### 📸 Screenshots

Show the UI.

```
Patient Chatbot
Doctor Dashboard
High Risk Queue
Notes System
```

---

### 🛠 Tech Stack

```
Frontend
React
Vite
Tailwind CSS

Backend
Firebase

Animations
Framer Motion

Icons
Lucide React
```

---

### 🔐 Security

Explain briefly:

* Firebase authentication
* Secure patient data storage
* Role-based access

---

### 📊 Project Motivation

Explain:

Why this system was built.

Example:

> Hospitals often face delays in identifying urgent patient cases. PULSEIQ aims to automate symptom triage and help doctors prioritize patients efficiently.



# Clinical Workflow

Explain this flow:

```
Patient enters symptoms
↓
Data stored in Firebase
↓
Triage Engine processes symptoms
↓
Priority level assigned
↓
Doctor dashboard receives real-time updates
↓
Doctor reviews case and adds notes
```
