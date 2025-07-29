# 🛠️ Issue Board (React + TypeScript + Tailwind)

A Kanban-style issue board built with **React**, **TypeScript**, and **Tailwind CSS** — inspired by tools like Jira and GitHub Projects.

This is a demo project with mocked data and local state. It simulates features like issue management, sorting, filtering, drag-and-drop, undo, role-based access, and polling.

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
- 🔄 **Polling Support**: Simulated real-time updates every 10s (can be toggled). Note: Polling will reset the updated issues

---

## 👥 Mocked Users

```ts

registeredUsers = [
  { id: 1, name: 'alice', role: 'admin' },
  { id: 2, name: 'bob', role: 'contributor' },
  { id: 3, name: 'carol', role: 'contributor' }
];

To login use the above names
