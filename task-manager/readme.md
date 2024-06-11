# Task Manager

This is a simple Task Manager web application that allows users to add, edit, delete, and search for tasks. The application uses a PHP backend to handle API requests and a frontend built with HTML, CSS, and JavaScript.

## Features

- View a list of tasks
- Add new tasks
- Edit existing tasks
- Delete tasks
- Search tasks by ID
- Responsive design compatible with desktop and mobile devices

## Prerequisites

- PHP (>= 7.0)
- A web server (e.g., Apache, Nginx)
- A web browser

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. **Set up the backend:**

    - Make sure you have a web server running with PHP support.
    - Place the `back-end/api.php` file in your web server's document root or configure your server to serve this directory.

3. **Set up the frontend:**

    - Ensure the `index.html`, `styles.css`, and `app.js` files are in the same directory.
    - Update the fetch URLs in `app.js` to point to the correct location of your `api.php` file if necessary.

## Running the Application

1. **Start your web server** if it's not already running.

2. **Open `index.html` in your web browser:**

    You can do this by navigating to the directory containing `index.html` and opening it with your browser, or by setting up your web server to serve the directory and navigating to the appropriate URL (e.g., `http://localhost/task-manager/`).

## Usage

- **Viewing Tasks:**
  - The application will display a list of tasks on load. If no tasks are available, a message will indicate this.

- **Adding a Task:**
  - Click the "Add Task" button to toggle the task form.
  - Fill in the task details and click "Submit" to add the task.
  - The task list will refresh to show the newly added task.

- **Editing a Task:**
  - Click the "Edit" button next to a task to load its details into the form.
  - Modify the details and click "Submit" to update the task.
  - The task list will refresh to show the updated task.

- **Deleting a Task:**
  - Click the "Delete" button next to a task to remove it.
  - The task list will refresh to reflect the deletion.

- **Searching for a Task:**
  - Click the "Search Task" button to toggle the search form.
  - Enter the task ID and click "Search" to find the task.
  - If the task exists, its details will be displayed. If not, a message will indicate that the task ID does not exist.

## Files

- `fron-end/index.html`: The main HTML file for the application.
- `fron-end/styles.css`: The CSS file for styling the application.
- `fron-end/app.js`: The JavaScript file containing the frontend logic.
- `back-end/api.php`: The PHP backend file handling API requests.
- `back-end/db.php`: The PHP file for database connection.

## Files Structure
task-manager/
├── back-end/
│   ├── api.php
│   └── db.php
├── front-end/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── sql/
    └── tasks.sql

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project uses [Bootstrap](https://getbootstrap.com/) for responsive design.
- Background gradient created with [CSS Gradient](https://cssgradient.io/).


