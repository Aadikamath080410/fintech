# FinBowl — Disbursement Dashboard

Pixel-perfect React implementation of the FinBowl RMS Disbursement module, built as part of the Gracia Global Advisory Front-End Developer assignment (Task 1).

## Live Demo

Run locally with `npm run dev` and open [http://localhost:5173](http://localhost:5173).

## Features

- **Disbursement List Page** — Summary stats, searchable/sortable data table, pagination, column visibility, saved views
- **Loan Detail Page** — Summary tiles, section navigation, accordion sections (Applicant, Loan Details, Disbursements, Commission, Broker, Notes, Documents)
- **Activity Log Drawer** — Slide-out panel with timeline of changes
- **Create Custom View Modal** — Save column configurations as named views
- **Real-world states** — Loading skeletons, error with retry, empty state
- **Responsive layout** — Adapts to smaller laptop screens with collapsible sidebar

## Tech Stack

- React 19 (function components + hooks)
- TypeScript
- React Router v7
- Tailwind CSS v4
- Lucide React (icons)
- Vite

## Getting Started

```bash
cd finbowl
npm install
npm run dev
```

## Routes

| Route | Page |
|---|---|
| `/rms/disbursement` | Disbursement list |
| `/rms/disbursement/:loanId` | Loan detail (click any Loan ID link) |

## Project Structure

```
src/
├── components/
│   ├── activity/       # Activity log drawer
│   ├── disbursement/   # Table, column selector, modals
│   ├── layout/         # Sidebar, header, app shell
│   ├── loan/           # Loan detail sections
│   └── ui/             # Reusable UI primitives
├── context/            # Disbursement state (views, columns, selection)
├── data/               # Mock data
├── hooks/              # Data fetching hooks with loading/error states
├── pages/              # Route-level page components
├── types/              # TypeScript interfaces
└── utils/              # Formatters and helpers
```

## Deploy to Vercel

```bash
npm run build
# Deploy the `dist` folder to Vercel, Netlify, or any static host
```

Or connect the repo to Vercel — no extra config needed for a Vite SPA.
