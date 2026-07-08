<div align="center">

# 🦷 SmileBook

### Redefining Digital Dental Care Excellence
*A modern, high-performance dental clinic management platform built to streamline practice operations, enhance client bookings, and elevate patient care.*

[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vite.dev)

</div>

---

## 🌟 Overview

**SmileBook** is a state-of-the-art practice management software designed specifically for modern dental clinics. Leveraging seamless client-side state management, responsive designs, and tailored user-role experiences, SmileBook reduces administrative friction while maximizing patient engagement.

---

## ✨ Core Features

### 💻 Dynamic Role-Based Experiences
*   **Clinic Staff View**: High-level access to the analytical dashboard, comprehensive calendar grids, staff schedules, booking rules, and practice activity logs.
*   **Patient Portal**: A simplified, focused gateway enabling patients to easily explore registered doctors, schedule cleaning or restoration slots, view pre-visit guides, and track their personalized session histories.

### 📊 Comprehensive Operational Dashboard
*   **Key Performance Indicators (KPIs)**: Instantly track daily check-ins, active practitioners, and occupancy metrics.
*   **Real-time Activity Logs**: A system-wide journal recording newly booked appointments, patient status updates, practitioner registrations, and payment events.
*   **Quick Actions & Notifications**: Direct paths to schedule bookings, message patients, or modify practitioner duty status on the fly.

### 📅 Advanced Scheduler & Calendar
*   **Time-Block Allocation**: Set and configure custom duration rules (e.g., 30, 45, or 60-minute blocks).
*   **Conflict Prevention**: Built-in logic enforcing room allocations and concurrent booking ceilings.
*   **Doctor Availability**: Manage specific working hours, break periods, and late-duty shifts individually.

### 📋 Full-Scale Appointment Details
*   **Pre-Visit Protocols**: Automated custom instructions based on the service selected (e.g., fasting, medication, x-ray preparations).
*   **Interactive Treatment Timeline**: Visual tracking of when the slot was created, confirmed, reminders sent, or completed.
*   **Detailed Financial Breakdowns**: Standard cleanings, x-rays, and platform service fees aggregated dynamically.

### 🌐 Built-In Internationalization (i18n)
*   Full support for localization, enabling clinics to switch languages dynamically through a unified localization context.

---

## 🛠️ Built With

*   **Core Framework**: [React 19](https://react.dev) & [TypeScript](https://www.typescriptlang.org) — delivering a type-safe, component-driven, and lightning-fast user experience.
*   **Build Engine**: [Vite 6](https://vite.dev) — ensuring instant hot builds and optimized single-page asset deliveries.
*   **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com) — employing a modern, highly custom utility-first theme with unified fluid-scaling palettes.
*   **Motion**: [Motion](https://motion.dev) — handling smooth state handshakes, staggered list entries, and responsive page fade transitions.
*   **Iconography**: [Lucide React](https://lucide.dev) — precise and crisp outline vector components.
*   **Storage Mechanics**: Native [LocalStorage Engine](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — immediately persisting practice records, schedules, clinic states, and active logins across tabs and sessions safely offline.

---

## 📂 Project Architecture

```bash
/
├── README.md               # Extensive project documentation
├── index.html              # Core single-page template container
├── metadata.json           # Application metadata and permissions
├── package.json            # Dependencies and development scripts
├── vite.config.ts          # Optimized bundler configuration
├── tsconfig.json           # Compiler rules and module path resolutions
└── src/
    ├── main.tsx            # Main application bootstrapper
    ├── App.tsx             # Root layout and global state coordinator
    ├── index.css           # Global custom theme rules and Tailwind v4 imports
    ├── types.ts            # Type-safe schemas (Doctors, Appointments, Logs)
    ├── data.ts             # Initial curated mock records
    ├── i18n.ts             # Localization strings
    ├── i18nContext.tsx     # Unified localization state provider
    └── components/         # Modular user interface components
        ├── SignIn.tsx              # Portal authentication gate
        ├── Header.tsx              # Responsive navigation header with language switcher
        ├── Sidebar.tsx             # Interactive, responsive drawer navigation
        ├── Dashboard.tsx           # Metrics, Quick Actions, and Activity feeds
        ├── ClinicSettings.tsx      # Clinic hours, custom booking logic, and doctor registers
        └── AppointmentDetails.tsx  # In-depth appointment specifications and clinical timeline
```

---

## 🚀 Getting Started

To run the SmileBook clinical suite on your local development machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Retrieve all package structures, styles, and animation modules:
```bash
npm install
```

### 3. Run the Development Server
Fire up the local instance:
```bash
npm run dev
```

The application will be accessible at:
*   [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
Bundle the single-page application into highly optimized assets inside the `dist/` folder:
```bash
npm run build
```

---

## 🛡️ Privacy & Compliance Note
SmileBook supports fully localized structures and handles patient data locally via client-side states, ensuring quick prototypes can be built safely and previewed prior to permanent databases or cloud sync integrations.
