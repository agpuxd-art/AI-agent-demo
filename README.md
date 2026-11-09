# Orbito — Project Governance AI Agent

An interactive enterprise UI prototype showcasing **Orbito**, an agentic AI system designed to navigate and resolve **cascading multi-level policy conflicts** during professional services project closeouts and workload rebalancing.

---

## 🎯 Executive Overview & UX Case Study

In modern enterprise project management and client onboarding platforms, wrapping up complex project phases or rebalancing workloads forces Project Managers and Delivery Leads to context-switch across dozens of boards, timesheets, and milestone phases.

Standard bulk-update tools act merely as basic property editors that blindly toggle checkboxes without policy validation—frequently resulting in premature milestone sign-offs, unbilled hours, and broken project accounting.

**Orbito** introduces an intent-driven governance co-pilot that:
1. **Translates Macro Intent into Safe Execution**: Converts high-level natural language instructions (*e.g., "Mark all my projects as completed"*) into auditable, batch operations.
2. **Intercepts Cascading Policy Blockers**: Proactively surfaces 4-level deep dependency chains before any database commit occurs.
3. **Maintains Human-in-the-Loop Control**: Offers both 1-click autonomous resolutions and granular inline overrides, backed by a **5-second deferred execution Undo safety net**.
4. **Reduces Clicks and Eliminates Context-Switching**: Eliminates tab-jumping across screens, reducing clicks from 85+ down to **3 clicks** within a single conversational workspace.

---

## 🛡️ Core Governance Policies Enforced

The agent natively enforces four core enterprise governance policies:

* **Policy 1 (Project Level)**: A project cannot be marked *Completed* unless all milestone tasks within it are completed.
* **Policy 2 (Milestone Level)**: A milestone task cannot be marked *Completed* if it has subtasks that are still open.
* **Policy 3 (Subtask Level)**: A task cannot be marked *Completed* if it has predecessor tasks that are not yet completed.
* **Policy 4 (Root Cause Level)**: A task cannot be marked *Completed* if no time has been logged against it.

### The 4-Level Cascading Conflict Hierarchy:
$$\text{L1 Project (PRJ-005)} \longleftarrow \text{L2 Milestone (MST-021)} \longleftarrow \text{L3 Subtask (TSK-0003)} \longleftarrow \text{L4 Root Cause (TSK-0004: 0.00h logged)}$$

Resolving the root cause at **Level 4** automatically triggers the upstream cascade, satisfying Policies 4, 3, 2, and 1 in sequence.

---

## 🚀 Running the Prototype Locally

### 1. Prerequisites
* Node.js (v18+ recommended)
* npm or pnpm

### 2. Install & Start
```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev

# Build for production
npm run build
```
The prototype runs locally at **`http://localhost:5173/`**.

---

## 🧪 Interactive Walkthrough

### Scenario 1: Project Closeout Audit ("Mark all the projects completed")
1. In the chat interface, enter: `Mark all the projects completed` (or click the sample prompt pill).
2. Orbito audits all 31 projects (325 tasks) across the portfolio and intercepts closeout by rendering the **Project Closeout Audit** card.
3. Observe the sleek **Portfolio Audit Bar** displaying verified portfolio findings:
   - 🕒 **210** unlogged tasks
   - 🔗 **48** dependencies
   - 💎 **6** billing milestones
   - 🛡️ **Primary Blocker**: 1 critical 4-level cascade on `PRJ-005`
4. Choose one of two available decision branches:
   * **Branch A (Granular Inspection & Override)**:
     - Click **Inspect PRJ-005 details**.
     - Review the 4-level **Conflict Matrix (Triage Flow)**.
     - In the Level 4 row (`TSK-0004`), adjust the time input (e.g. `02:30`) and click **Resolve**.
     - Notice the **5-second Undo Toast** safety banner at the bottom with live progress bar and `Undo` option.
     - When committed, the cascade triggers, marks all active projects as completed, and displays the emerald **Resolved State Matrix** alongside the post-execution **Micro-Survey**.
   * **Branch B (1-Click Autonomous Resolution)**:
     - Click **Auto-resolve blockers & complete**.
     - The agent calculates the historical pace average (`02:30`), auto-logs time across all 210 unlogged tasks, satisfies 48 dependencies, clears 6 milestones, engages the 5-second Undo Toast, and archives the portfolio.
5. Click **See all Projects** to verify that all 31 projects now dynamically display **100% progress and 'Completed' status** in the Projects List.
6. If you re-run `"Mark all the projects completed"`, the agent recognizes the clean state: *"All projects across your portfolio are already completed and archived."*

---

### Scenario 2: Workload Rebalancing ("Wrap Lisa's work within this week")
1. In the chat interface, enter: `Wrap lisa's work with in end of the week`.
2. Orbito audits Lisa Allen's assignments on `PRJ-028` and surfaces **Lisa's Workload Audit** card (3 priority tasks).
3. Test either branch:
   * **Option A (Autonomous Distribution)**: Click **Auto-assign to team**. Orbito redistributes tasks to available peers (`Cameron Fisher`, `April Frost`) based on bandwidth, logs time, and renders the **Task Reassignment Matrix**.
   * **Option B (Inspection & Override)**: Click **Inspect & adjust Lisa's tasks**. Adjust hours and select teammates from the capacity dropdowns, then click **Submit and wrap**.
4. Test the integration fallback: Type `Notify Lisa via Slack`. Orbito checks third-party connection and displays a safe, non-blocking fallback warning.

---

### Scenario 3: Portfolio Compliance & Governance Health ("Check portfolio compliance")
1. In the chat interface, enter: `Check portfolio compliance` (or click the top Demo Runner button: `▶ 3: Compliance Health`).
2. Orbito evaluates all 31 projects across 4 policy dimensions and renders the executive **Portfolio Compliance & Governance Health** scorecard:
   * **Health Score**: **96.8% Compliant** (30 of 31 projects healthy).
   * **4 Policy Tiles**: Real-time status for Milestones (6 open), Subtasks (39 tracked), Dependencies (48 links), and Timesheets (210 tasks pending time).
   * **Active Highlight**: Pinpoints `PRJ-005`'s cascading timesheet violation on `TSK-0004` blocking milestone `MST-021`.
   * **Quick Actions**: 1-click links to resolve `PRJ-005` or rebalance team workloads.

---

### 💡 Interactive Guided Demo Runner & Built-in Case Study
* **Top Demo Runner Bar**: Evaluators can run any scenario in 1 click using the persistent top bar pills.
* **In-App Case Study Drawer**: Click **`✨ UX Case Study`** in the header or sidebar to open the slide-over presentation covering design rationale, architectural tradeoffs, and click-reduction metrics (85+ clicks → 3 clicks).

---

## 🎨 Design System & Legend

### Task Status
* **To Do**: Blue open circle.
* **In Progress**: Green timer/clock.
* **Completed**: Green checkmark circle.
* **Blocked**: Gray 'Ban' symbol.

### Milestones
* Standard tasks use circular status markers; tasks marked as a **Billing Milestone** in the database use a rotated **Diamond icon**.

### Subtasks
* Indicated by a **Network (Tree) icon** displaying the completion ratio (`[Completed] / [Total]`).
