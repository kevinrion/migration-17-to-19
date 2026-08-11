# migration-17-to-19

IMPORTANT:
This project was created by ai as a clean v17.0.2 project with best practices for that era. I have then done several blind passes with telling ai to introduce bugs, errors, rushed 'friday afternoon' coding and other things to simulate a poorly maintained mid size legacy SAP. I told ai to not give me any hints or code comments, I need to come into this being oblivious to the changes.

It had requirements of still being able to run, but with a ton of realistic issues.

I will then be upgrading the project to latest v19 and tooling and fixing the errors by hand mostly without ai. This is a knowledge refresh project.

## Purpose

- Refresh legacy React knowledge
- Gain understanding of the differences between legacy React and modern (2026) React
- Versions before React 17 relied heavily on class components, which is largely outdated now — not necessary for this project unless working on a super-legacy React monolith

A simple single-page application built with React 17. It includes several pages with forms and interactive tools, using tooling and patterns typical of early 2021.

## Stack

- **React** 17.0.2
- **Create React App** (react-scripts 4.0.3)
- **React Router** 5.3.0
- Plain CSS (no Tailwind or CSS-in-JS)

## Pages

| Route | Description |
|---|---|
| `/` | Home — enter a name to receive a greeting |
| `/contact` | Contact form with name, email, subject, and message fields |
| `/profile` | Profile settings with text inputs, a country select, and a newsletter checkbox |
| `/tasks` | Task list with filters and reordering |
| `/search` | Team directory search |
| `/notes` | Notes board with pin/unpin |
| `/activity` | Activity feed with filter and sort |
| `/team` | Team roster management |
| `/help` | Help tips and session stats |

## Getting started

```bash
npm install
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Output is written to the `build/` directory.

## Project structure

```
src/
├── App.js              # Layout and routing
├── components/
│   ├── Navigation.js   # Top navigation links
│   └── FormField.js    # Reusable form input wrapper
└── pages/
    ├── Home.js
    ├── Contact.js
    ├── Profile.js
    ├── Tasks.js
    ├── Search.js
    ├── Notes.js
    ├── Activity.js
    ├── Team.js
    └── Help.js
```
