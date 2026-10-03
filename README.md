# Yahya Mohamed — Data Engineer Portfolio

A clean, minimalist personal portfolio website built for **Yahya Mohamed**, a data engineering intern and IoT systems student. The visual architecture, layout, typography, and warm monochromatic color palette are closely modeled after the modern **Velora Framer template**.

---

## 🎨 Visual Reference & Design System

- **Aesthetic**: Monochromatic warm neutral tones (`#f7f5f2` warm stone canvas, `#ffffff` card surfaces, deep charcoal `#151515` typography, and `#9e8867` warm bronze/taupe accents).
- **Typography**: Clean sans-serif hierarchy utilizing [Inter](https://fonts.google.com/specimen/Inter) for headings and UI, paired with [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for code snippets, database schemas, and metrics.
- **Micro-Interactions**:
  - Sticky frosted navigation bar (`backdrop-filter: blur(14px)`) with active scroll-tracking (ScrollSpy).
  - Subtle hover lift on the hero photo and project cards.
  - Interactive project detail modal popups + standalone detail pages for every practice project.
  - Skill cards rebuilt as Velora's sticky stacked service cards (number label, title + description, media panel) with scroll-triggered staggered reveals.
  - Word-by-word blur-and-rise animation on section intro paragraphs.
  - Native CSS & JavaScript scroll-triggered fade-in animations (`IntersectionObserver`).
  - Fully responsive design optimized for Mobile, Tablet, and Desktop.

---

## 📂 Project Structure

```text
Data engineer portfolio/
├── assets/
│   ├── css/
│   │   └── style.css                   # Complete design system & responsive styling
│   ├── js/
│   │   └── main.js                    # Mobile drawer, modal system & scroll animations
│   └── images/
│       ├── yahya-portrait.jpg          # Professional hero portrait (suit & tie, beige background)
│       ├── project-etl.svg             # Sales ETL Pipeline cover graphic
│       ├── project-dashboard.svg       # Sales Performance Dashboard cover graphic
│       ├── project-api.svg             # Public API Collector cover graphic
│       ├── skill-python.svg            # Python card media panel
│       ├── skill-sql.svg               # SQL card media panel
│       ├── skill-viz.svg               # Data Visualization card media panel
│       └── skill-learning.svg          # Kafka / Azure / Docker card media panel
├── projects/
│   ├── sales-etl-pipeline.html         # Dedicated detail page for ETL project
│   ├── sales-dashboard.html            # Dedicated detail page for BI dashboard
│   └── api-data-collector.html         # Dedicated detail page for API collector
├── index.html                          # Primary one-page portfolio
└── README.md                           # Documentation & deployment instructions
```

---

## 🚀 How to Run Locally

You can preview the portfolio using any of the following methods:

### Method 1: Python Built-in Server (Recommended)
1. Open PowerShell or Terminal in the project directory:
   ```powershell
   cd "C:\Users\seifm\OneDrive\Desktop\Data engineer portfolio"
   ```
2. Start the local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Method 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Method 3: Direct Browser Launch
- Double-click `index.html` in Windows File Explorer to open it directly in Chrome, Edge, or Firefox.

---

## 🌐 How to Deploy for Free

### Option A: GitHub Pages (Recommended)

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Yahya Mohamed Data Engineer Portfolio"
   ```

2. **Push to GitHub**:
   - Create a new public repository on [GitHub](https://github.com/new) named `portfolio` or `data-engineer-portfolio`.
   - Link and push your code:
     ```bash
     git remote add origin https://github.com/Yahyabdelkader/data-engineer-portfolio.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Branch**, select `main` and root `/ (root)`.
   - Click **Save**. Within 1–2 minutes, your website will be live at:
     ```
     https://yahyabdelkader.github.io/data-engineer-portfolio/
     ```

---

### Option B: Netlify (Fast & Zero-Config)

1. Sign up or log into [Netlify](https://app.netlify.com/).
2. **Drag & Drop**:
   - Drag the entire `Data engineer portfolio` folder into the Netlify dashboard's "Sites" area.
   - It deploys instantly with a free SSL certificate.
3. **Or Connect via Git**:
   - Click **"Add new site"** &rarr; **"Import an existing project"**.
   - Connect your GitHub repository. Netlify will automatically build and publish any new commits.

---

### Option C: Vercel

1. Install the Vercel CLI (`npm i -g vercel`) or log in to [Vercel](https://vercel.com).
2. Run `vercel` in the project root directory and follow the short prompts.

---

## 🛠️ Personal Details & Contacts Configured

- **Name**: Yahya Mohamed
- **Role**: Data Engineer Intern / IoT Systems Student
- **Email**: [yehiabdelkader@gmail.com](mailto:yehiabdelkader@gmail.com)
- **Phone**: +20 01022023941
- **LinkedIn**: [Yahya Abdelkader](https://www.linkedin.com/in/yahya-abdelkader-b049a2380)
- **GitHub**: [Yahyabdelkader](https://github.com/Yahyabdelkader)
- **Education / Timeline**:
  - `2026 - Present`: Data Engineer Track | DEPI (Digital Egypt Pioneers Initiative)
  - `Summer 2025`: Mobile Application Development with Flutter | NTI
  - `2022 - 2026`: IoT Systems Student | Menofia University
