# Student Performance App 📚📱

A **React Native (Expo)** application that allows teachers to track student performance across different **learning strands** and visualize their mastery levels.

## 🚀 Demo

* **APK Release (Preview)**: [Download APK](https://expo.dev/artifacts/eas/h3ANb52dptJup7bbZ6XVc3.apk)
* **Figma Design**: [Link to Figma Design](https://www.figma.com/proto/n29quPZxfRVRbBaPoUvzg8/Nyansapo-AI-Student-Performance?node-id=1-2&t=XGQOjwNJPBvj9HvK-1)
* **Video**: [Watch live demonstation](https://drive.google.com/file/d/1rHbPGx-tmWhha_MWqCrNpegB0gglbGL3/view?usp=sharing)
* **Backend API**: [Link to Backend API](https://student-performance-visualization.vercel.app)

---

## 📖 Features

### **Class Performance Overview**

* 🔍 Search bar to filter students.
* 📊 Overview of **4 learning strands**:

  * Letter Identification
  * Letter Naming
  * Letter Formation
  * Phonemic Awareness
* 🏅 Display of student **competence levels** using **Mastery Keys** (BE, AE, ME, EE).
* 📌 **Mastery Key panel** always fixed at the bottom for quick reference.

### **Student Detail Screen**

* 👤 Student profile with name and a **Download** button (shows a confirmation alert and a success message).
* 📈 Detailed progress per strand:

  * Current competence level (colored badge: BE, AE, ME, EE).
  * Work progress percentage with an animated **progress bar**.
* 📊 **Performance Summary** section:

  * Average progress across strands.
  * Count of strands per competence level.

---

## 🎨 Design Decisions

* **Custom Color Palette**:
  Inspired by the **Nyansapo AI** logo. Configured in `tailwind.config.js` with extended scales for **primary** (`#63A7C9`) and **secondary** (`#F8D632`), as well as full palettes for each competence level (**BE = red, AE = yellow, ME = green, EE = blue**).

* **Layout Choices**:

  * Fixed **header** at the top with title + search bar.
  * Fixed **Mastery Key** at the bottom for continuous visibility.
  * Scrollable **Learning Strands** section in between.
  * Mastery Key displayed as cards with code, meaning, and description for clarity.

* **Reusable Components**:

  * `CompetenceBadge` → shows competence code with custom colors and sizes.
  * `ProgressBar` → generic progress indicator with optional percentage text.
  * `StrandCard` → displays a learning strand with its title, overall progress bar, and a list of students (each with their competence badge).

* **Accessibility**:

  * Usage of `SafeAreaView`.
  * High contrast colors for readability.
  * Clear text hierarchy.

---

## 📝 Assumptions

* Student and strand data come from the provided backend (JSON Server).
* Each student always has **4 strands** (`letterIdentification`, `letterNaming`, `letterFormation`, `phonemicAwareness`).
* The **Download** button is a simulation: it shows an alert with confirmation and a success message, not a real file download.
* The app should run in **Expo Go** as well as in a **standalone APK**, which is why a deployed backend URL is configured.

---

## ⚙️ Setup & Installation

### 1. **Clone the repository**

```bash
git clone https://github.com/Charlot-DEDJINOU/Student-Performance-Visualization.git
cd frontend
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Set up environment variables**

Create a `.env` file at the root of `frontend/`:

```env
EXPO_PUBLIC_API_URL=https://student-performance-visualization.vercel.app
```

> ⚠️ For local development, you can run the provided backend:
>
> ```bash
> cd backend
> npm install -g json-server
> json-server --watch db.json --port 3000
> ```
>
> Then set `EXPO_PUBLIC_API_URL=http://localhost:3000`.

### 4. **Run the app**

```bash
npm run start
```

Scan the QR code with Expo Go (Android/iOS) to preview.
👉 Note: Expo may ask you to log in to your Expo account before running the preview on your device.

### 5. **Build APK (Preview)**

```bash
eas build -p android --profile preview
```

---

## 🧪 Testing

### Run tests

```bash
npm run test
```

### Tools

* **Jest and jest-expo** – testing framework.
* **@testing-library/react-native** – UI testing utilities.
* **axios-mock-adapter** – mocking HTTP requests in services.

### Covered test cases

* **Services (`studentService`)**:

  * Successfully fetch class profile and students.
  * Validate that the API returns an array.
  * Handle server errors (500).
* **Store (`useStudentStore`)**:

  * `fetchStudents` updates state correctly.
  * `getFilteredStudents` filters by search query.
* **UI Components**:

  * `CompetenceBadge` → renders the correct code with the expected Tailwind-based colors and sizes.  
  * `ProgressBar` → clamps progress values between 0–100 and displays the percentage text when enabled.  
  * `MasteryKey` → renders the "Mastery Key" header and displays 4 horizontal cards with the correct competence levels and descriptions.

* **Screens**:

  * `ClassOverviewScreen` shows strands, search bar, and Mastery Key.
  * `StudentDetailScreen`:

    * Displays loading spinner when fetching.
    * Shows error message with retry.
    * Handles “Student Not Found”.
    * Displays student details and strand performance.
    * **Download button** shows confirmation → success alert.
    * Pull-to-refresh triggers `clearError` + `fetchStudents`.

---

## 📂 Project Structure

```
frontend/
├── index.tsx                 # Entry point of the React Native app
├── app.json                # Expo app configuration
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
├── global.css              # Tailwind (NativeWind) global styles
├── tailwind.config.js      # Tailwind (NativeWind) Configuration
├── package.json            # Project dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── .env                    # Environment variables
├── assets                   # images folders
├── src/
│   ├── App.tsx         # Entry point of the React Native app
│   ├── components/         # Reusable UI components
│   │   ├── CompetenceBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StrandCard.tsx
│   │   ├── MasteryKey.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
|   |
│   │
│   ├── screens/            # App screens
│   │   ├── ClassOverviewScreen.tsx
│   │   └── StudentDetailScreen.tsx
│   │
│   ├── stores/             # Zustand global state management
│   │   └── useStudentStore.ts
│   │
│   ├── services/           # API service (axios + HttpError handling)
│   │   └── studentService.ts
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── education.ts
│   │   └── navigation.ts
│   │
│   ├── utils/              # Utility functions (e.g., getStrandDisplayName, competence classes)
│   │   └── competence.ts
│   │   └── strands.ts
│   │
│   └── __tests__/          # Unit tests
│       ├── studentService.test.ts
│       ├── useStudentStore.test.ts
│       ├── ClassOverviewScreen.test.tsx
│       ├── StudentDetailScreen.test.tsx
│       ├── CompetenceBadge.test.tsx
│       ├── MasteryKey.test.tsx
│       └── ProgressBar.test.tsx
└── backend/                # Provided JSON Server backend (db.json + setup)
```

---

## 🛠️ Tech Stack

* **React Native (Expo 53)** – Cross-platform mobile framework.
* **React Navigation** – Stack-based navigation.
* **Zustand** – Lightweight state management.
* **Axios** – HTTP client.
* **Tailwind (NativeWind)** – Utility-first styling.
* **React Native Reanimated** – Smooth animations.
* **Jest + Testing Library** – Unit and UI testing.
* **JSON Server (Backend)** – Mock API provider.

---

## ✅ Best Practices

* **Error Handling**:

  * Custom `HttpError` class.
  * `ErrorMessage` component with retry button.
  * Robust `try/catch` around API calls.

* **State Management**:

  * Centralized store using Zustand.
  * Selectors for filtering (`getFilteredStudents`, `getStudentById`).
  * Clear loading/error states.

* **Performance**:

  * `React.memo`, `useCallback`, `useMemo` used to avoid unnecessary re-renders.
  * `FlatList` with horizontal/vertical scroll optimizations.

* **UI/UX**:

  * Clean, consistent design following Figma.
  * Fixed header and bottom panel.
  * Accessible colors and typography.