# 🛠️ Issue Board (React + TypeScript + Tailwind)

A Kanban-style issue board built with **React**, **TypeScript**, and **Tailwind CSS** — inspired by tools like Jira and GitHub Projects.

This is a **demo project** that uses **mocked JSON data** and local state. It simulates features like issue management, sorting, filtering, drag-and-drop, undo, role-based access, and polling.

🟢 **Live Demo:** [https://issue-board-app.vercel.app](https://issue-board-app.vercel.app)

---

## ✨ Features

- 🧩 **Kanban Columns**: Backlog, In Progress, Done
- 🔍 **Search & Filter**: Search by title or tags, filter by assignee or severity
- ⚖️ **Priority Score Sorting**:  
  `score = severity * 10 + (daysSinceCreated * -1) + userDefinedRank`
- 🖱️ **Drag & Drop**: Move issues between columns (admin only)
- 🕐 **Undo Changes**: Revert updates within 5 seconds
- 📌 **Recently Accessed Issues**: Tracks last 5 issues (stored in localStorage)
- 🔒 **Role-Based Access**: 
  - `admin`: Full access
  - `contributor`: Read-only view
- 🌘 **Dark Mode**: Toggle for light/dark theme
- 🔄 **Polling Support**: Simulated real-time updates every 10 seconds  
  > ⚠️ **Note**: Polling will reset all updated issues as it reloads the mock data.

---

## 👥 Login Instructions

You can log in using any of the following **mock users**:

| Username | Role         | Permissions                            |
|----------|--------------|----------------------------------------|
| `alice`  | **admin**     | ✅ Can move issues, update status/priority, and mark as resolved |
| `bob`    | contributor  | 🔒 Read-only access                    |
| `carol`  | contributor  | 🔒 Read-only access                    |

> 🔐 **Note**: There is no password. Just enter the username exactly as shown above to simulate login.

### Mocked User Data

## 👥 Mocked Users

```ts
const registeredUsers = [
  { id: 1, name: 'alice', role: 'admin' },
  { id: 2, name: 'bob', role: 'contributor' },
  { id: 3, name: 'carol', role: 'contributor' }
];
