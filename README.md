# Kanban UI Prototype

This project is an interactive UI prototype for a Kanban-style project management board, built with React and Vite.

## Legends & Terminology

### 1. Task Status
Tasks are categorized into four core statuses, indicated by the following icons and colors:
- **To Do**: Represented by a **blue open circle**. Indicates tasks that have not yet been started.
- **In Progress (Doing)**: Represented by a **green timer/clock**. Indicates work is actively happening.
- **Completed**: Represented by a **green checkmark circle**. Indicates the task is fully done.
- **Blocked**: Represented by a **gray 'Ban' (stop) symbol**. Indicates work is halted due to a dependency or impediment.

### 2. Task Types (Milestones)
Tasks can be either standard tasks or billing milestones:
- **Standard Tasks**: Use the default circle/timer/ban icons described above.
- **Milestones**: Tasks marked as a "Billing Milestone" in the database use a **Diamond icon** (a square rotated 45 degrees). The diamond will adopt the color of the task's current status (e.g., green for completed milestones, blue for upcoming milestones).

### 3. Phases & Phase Status
The Kanban board is divided into distinct project **Phases** (e.g., Discovery & Planning, Configuration, Data migration).
Each column header displays an aggregated **Phase Status**, calculated dynamically based on the tasks within it:
- **Completed**: Every task in the phase is marked "Completed". (Green Checkmark)
- **Blocked**: At least one task in the phase is "Blocked". (Gray Stop/Ban icon)
- **In Progress**: At least one task is "In Progress", or there is a mix of Completed and To Do tasks. (Green Timer)
- **To Do**: All tasks in the phase are still in the "To Do" state. (Blue Circle)

### 4. Subtasks
If a task acts as a parent for other tasks (indicated by `ParentTaskId` relationships in the data), the task card displays a **Subtask Indicator**. 
- It uses a **Network (Tree)** icon at the bottom of the card.
- It shows the completion ratio: `[Completed Subtasks] / [Total Subtasks]` (e.g., `0/2`).

### 5. Dates & At-Risk Indicators
- Standard task dates are shown in dark gray.
- If a task is completed, its dates turn **green**.
- If a task is marked as "At Risk" in the database, its dates turn **red** to highlight urgency.
