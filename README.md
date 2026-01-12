# Class Schedule Builder

A web-based application built with Python (Flask) and JavaScript to create, manage, and export weekly class timetables.

## Features

*   **Drag & Drop Interface**: Easily arrange subjects into time slots.
*   **Customizable Time Slots**: Add or remove slots and define custom durations.
*   **Break Management**: Insert breaks (e.g., Lunch) automatically into the schedule.
*   **Subject Pool**: Color-coded subjects for easy visual distinction.
*   **Lab Support**: Handle multi-slot sessions (e.g., 2-hour or 3-hour labs).
*   **Export**: Generate an Excel (`.xlsx`) file of your schedule.
*   **Persistence**: Auto-saves your progress to the browser's Local Storage.
*   **Undo/Redo**: Full history support for changes.
*   **Dark Mode**: Built-in theme toggle.

## Installation

1.  **Clone or Download** the repository.
2.  **Install Dependencies**:
    Ensure you have Python installed, then run:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1.  **Start the Server**:
    ```bash
    python app.py
    ```
2.  **Open in Browser**:
    Navigate to `http://localhost:5000`.
3.  **Create Schedule**:
    *   Add subjects in the "Subject Pool".
    *   Drag them onto the grid.
    *   Click "Generate Timetable" to view the final layout.
    *   Click "Export to Excel" to download.

## Project Structure

*   `app.py`: Main Flask application entry point.
*   `timetable_core.py`: Logic for processing form data and generating Excel files.
*   `templates/`: HTML templates (`index.html`, `timetable.html`).
*   `static/`: CSS styles and static assets.