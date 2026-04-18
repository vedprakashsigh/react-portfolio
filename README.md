# Ved Prakash - Portfolio 2.0

A high-performance, dynamic portfolio website and content management system, completely rewritten using a modern web stack.

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
- **Animations:** Custom CSS Keyframes, Interactive Particle Canvas

### Backend & Database
- **BaaS:** Supabase
- **Database:** PostgreSQL (Projects, Experience, Education, Skills, Certifications)
- **Authentication:** Supabase Auth (Admin dashboard access)
- **Storage:** Supabase Storage buckets (Resume PDF hosting)

### Testing
- **Test Runner:** Vitest
- **DOM Testing:** React Testing Library + Happy DOM

---

## ✨ Features

- **"Neural Dark" Aesthetic:** Custom designed highly interactive particle neural network background using HTML5 canvas.
- **Dynamic Content:** All data (projects, skills, education, experience) is securely fetched from a Supabase backend.
- **Admin Dashboard:** A custom-built, authenticated CMS that allows real-time Create, Read, Update, and Delete operations for portfolio configuration.
- **Live LeetCode Stats:** A fully integrated widget pulling live real-time problem-solving metrics directly from LeetCode. 
- **Resume Hosting:** Dedicated frontend interface allowing visitors to view and download an up-to-date Resume PDF loaded directly from Supabase Storage buckets.

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
1. Run `supabase-schema.sql` to initialize all relational database tables.
2. Run `seed-data.sql` to populate the frontend with baseline mock data.
3. Create a Supabase Storage bucket named `uploads` and make it public to host the resume PDF.

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
