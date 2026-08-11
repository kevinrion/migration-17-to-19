# migration-17-to-19

## Purpose

- Refresh legacy React knowledge
- Gain understanding of the differences between legacy React and modern (2026) React
- Versions before React 17 relied heavily on class components, which is largely outdated now — not necessary for this project unless working on a super-legacy React monolith

A simple single-page application built with React 17. It includes three pages with basic user input forms, using tooling and patterns typical of early 2021.

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
    └── Profile.js
```
