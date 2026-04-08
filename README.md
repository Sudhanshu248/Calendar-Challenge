# Interactive React Calendar Challenge

## Overview
This project is an advanced, fully interactive React calendar built to transcend basic date-picking requirements. It features a modern, premium "wall calendar" aesthetic with smooth page-flipping animations, dynamic color themes based on the month, persistent note-taking functionality, and detailed holiday markers.

## Basic Feature Requirements Satisfied
- Built using **React.js** (via Vite).
- Styled heavily utilizing **Tailwind CSS v4**.
- Employs an elegant base **Blue** color palette.
- Fully responsive design, adapting perfectly from vertical mobile layouts to split-pane wide desktop screens.
- Core logic to easily navigate between months.

## Extra Features & "Wow Factor" 🚀
To make this project truly stand out among candidates, several advanced, premium features were engineered into the application:

1. **Dynamic Theming Engine:** Rather than sticking to just blue, the entire user interface (buttons, outlines, text colors, and selection highlights) dynamically transitions its primary color palette based on the current month (e.g., Ocean Blue for January, Pink for February, Amber for April).
2. **Context-Aware Hero Imagery:** The hero image banner automatically changes to high-quality Unsplash photography perfectly mapped to each month's specific color theme and seasonal feeling.
3. **Framer Motion 3D Flipping:** Flipping between months triggers a gorgeous 3D page-flip animation on the calendar grid, replicating the physical feeling of turning a real wall calendar.
4. **Range Selection & Persistent Notes:** Users can select robust date ranges by clicking a start and end date (complete with hover-path visual previews). Notes and memos typed into the sidebar for any specific day or range are automatically saved to `localStorage` and persist upon refresh.
5. **Interactive Indian Holiday Markers:** Major festivals and national holidays (like Diwali, Republic Day, Independence Day, Holi) are mapped onto the calendar grid with elegant animated emoji indicators. Hovering over a marked day triggers an intelligent pop-up tooltip.
6. **Dark Mode Integration:** Full support for sleek manual dark/light mode toggling, utilizing Tailwind v4's custom variant configurations.
7. **Fast Year Navigation:** Custom double-chevron buttons (`<<` and `>>`) empower users to skip forward or backward by full 12-month jumps instantly.

## Technologies Used
- **React** (Component Architecture & UI State)
- **Tailwind CSS v4** (Utility-first styling & Dark Mode engine)
- **Framer Motion** (Physics-based page flip animations)
- **Date-fns** (Robust date math, localized formatting, and interval calculation)
- **Lucide React** (Standardized, scalable SVG iconography)

## How to Run Locally

Follow these steps to experience the calendar on your local machine:

1. **Prerequisites:** Ensure you have Node.js installed on your system.
2. **Navigate to the Project:** Open your terminal and change into the project directory:
   ```bash
   cd calendar-app
   ```
3. **Install Dependencies:** Download all necessary node modules required for the app to function:
   ```bash
   npm install
   ```
4. **Launch the Development Server:** Start Vite's lightning-fast dev server:
   ```bash
   npm run dev
   ```
5. **View in Browser:** The terminal will output a local network address (usually `http://localhost:5173`). Ctrl+Click that link to open the calendar in your default web browser!
