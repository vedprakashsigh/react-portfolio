# Ved Prakash - Portfolio: Agentic AI Engineer

A high-performance, dynamic portfolio website completely rewritten to showcase production-grade multi-agent AI systems, end-to-end architectures, and full-stack engineering capabilities.

🚀 **Live Site:** [https://vedprakash.me/](https://vedprakash.me/)

![Portfolio Preview](./public/vite.svg) (*Preview Image to be added*)

## 🛠️ Tech Stack

### Frontend Architecture
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6

### Design System & UI
- **Styling:** Vanilla CSS + Tailwind CSS (v3)
- **Component Library:** ShadCN UI (Radix UI primitives)
- **Aesthetic:** Neural Dark (Glassmorphism, deep dark backgrounds with cyan/violet accents)
- **Animations:** Custom CSS Keyframes, CSS Graph Connectors, Interactive Particle Canvas (with `prefers-reduced-motion` support)

### Backend & Database
- **BaaS:** Supabase
- **Database:** PostgreSQL (Rich project metadata, Experience, Education, Skills, Certifications)
- **Authentication:** Supabase Auth (Admin dashboard access)
- **Storage:** Supabase Storage buckets (Resume PDF hosting)

### Testing
- **Test Runner:** Vitest
- **DOM Testing:** React Testing Library + Happy DOM

---

## ✨ Features

- **Agentic AI Focus:** Engineered to highlight complex, multi-agent AI workflows and enterprise AI solutions over simple frontend apps.
- **Proof-of-Engineering Case Studies:** AI projects feature comprehensive breakdowns including 'Why I Built This', 'Key Challenges', and 'Architecture Decisions'.
- **Interactive Graph Diagrams:** Custom HTML/CSS component (`AgentFlowDiagram`) to visually represent stateful, cyclical agent pipelines (e.g., LangGraph).
- **"Neural Dark" Aesthetic:** Highly interactive and dynamic particle neural network background using HTML5 canvas.
- **Admin Dashboard:** Authenticated custom CMS that permits real-time CRUD operations to adjust project context and portfolio structure.
- **Live LeetCode Stats:** fully integrated widget pulling live real-time problem-solving metrics directly from LeetCode.

---

## 🚀 Local Development

### Prerequisites
You will need Node.js (v20+ recommended) and an active Supabase project.

### Environment Setup
Create a `.env` file at the root of the project with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

### Database Initialization
Execute the included SQL scripts on your Supabase SQL Editor:
1. Run `supabase-schema.sql` to initialize all relational database tables on a fresh project.
2. Run `seed-data.sql` to populate the frontend with baseline mock data.
3. If upgrading an existing db, run `migration-add-project-fields.sql` to add AI engineering fields.
4. Create a Supabase Storage bucket named `uploads` and make it public to host the resume PDF.

### Installation

```bash
# Clone the repository
git clone https://github.com/vedprakashsigh/react-portfolio.git

# Navigate into directory
cd react-portfolio

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### Running Tests

```bash
# Execute test suite
npm run test

# Execute test suite with Visual UI
npm run test:ui
```

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
