# Clinical Handover Abbreviation Challenge

A React/Vite learning activity based on the supplied SPL 2 handover sheet. Students click each bold abbreviation or shorthand term, type its meaning, receive feedback, and unlock a four-digit Blackboard completion code after every learning item has been completed.

## What is included

- The supplied handover text reproduced in the activity.
- Interactive abbreviations and shorthand, including items such as `PMH`, `CVA`, `NEWS`, `4/12`, `in situ`, `c/o`, `abdo` and the `A–E` assessment headings. `15/15` remains visible in the handover but is explained as part of the `GCS` feedback rather than being a separate question.
- Repeated terms only need to be answered once; all matching occurrences are then marked complete.
- Tolerant spelling matching: a small spelling error can still be accepted when the intended answer is clear. The standard spelling is then shown to the learner.
- Short teaching feedback after each correct answer.
- Progress is saved in the browser using `localStorage`.
- A final completion modal reveals the Blackboard code only after all learning items are completed.
- Responsive layout and keyboard-focus support.
- A pre-built `/docs` folder ready for GitHub Pages.

## Blackboard completion code

The current code is:

**4827**

To change it, edit `BLACKBOARD_CODE` near the top of:

`src/data.js`

Then rebuild the app with:

```bash
npm run build
```

## Run locally

You need Node.js installed.

```bash
npm install
npm run dev
```

Vite will print the local address in the terminal.

## Build

```bash
npm install
npm run build
```

The production site is generated into the `/docs` folder. A ready-to-deploy `/docs` copy is already included in this package.

## Host on GitHub Pages

1. Create a GitHub repository and upload the contents of this project folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the files, usually `main`.
5. Select the `/docs` folder.
6. Save.

The included `/docs` version is ready to deploy to GitHub Pages. It loads React 18 from UNPKG. If you later run the Vite build locally, Vite will replace `/docs` with a fully bundled production build using relative asset paths.

## Editing the handover or learning items

The handover content, accepted answers, teaching explanations and learning-item definitions are all in:

`src/data.js`

Each learning item contains:

- `display` — what is shown in the handover/modal;
- `answer` — the standard answer shown after completion;
- `accepted` — alternative answers that should also be accepted;
- `explanation` — the short teaching note shown after a correct response.

## Important

This is a simulation learning resource. The handover remains labelled:

**SIMULATION DOCUMENT – NOT FOR REAL PATIENT CARE**
