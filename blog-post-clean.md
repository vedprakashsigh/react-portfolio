---
id: 49bca408-4f5c-41b8-8e8b-791c0fabc444
title: Building a Dynamic, Print-Ready Resume Section in React: Moving Beyond Static PDFs
slug: building-dynamic-print-ready-resume-react
excerpt: Learn how to create a resume section that looks identical in browser and print views while maintaining accessibility, SEO, and easy updates—no static PDFs required.
cover_image: https://images.unsplash.com/photo-1581091860013-8866563d84b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQ2NzN8MHwxfHNlYXJjaHwxfHxSZXN1bWUlMjBXZWJ8ZW58MHx8fHwxNjYyNjY4NjQw&ixlib=rb-1.2.1&q=80&w=1080
author: Ved Prakash
published_at: 2026-08-23T14:00:00.000Z
created_at: 2026-08-23T14:00:00.000Z
is_published: true
read_time_minutes: 12
---

# Building a Dynamic, Print-Ready Resume Section in React: Moving Beyond Static PDFs

## Introduction: The Static PDF Problem

For years, the standard approach to displaying resumes on personal websites has been simple: embed a static PDF or link to a downloadable file. While this approach guarantees pixel-perfect design control, it creates several significant drawbacks:

- **Poor accessibility**: Screen readers struggle with PDFs, and text isn't selectable
- **SEO limitations**: Search engines can't index the content effectively
- **No dynamic updates**: Changing your resume means regenerating and replacing the entire file
- **Broken web experience**: Users get pulled out of your website context

Recently, while refining my own React portfolio (specifically commits [21c5809](https://github.com/vedprakash007/react-portfolio/commit/21c5809), [5624ff5](https://github.com/vedprakash007/react-portfolio/commit/5624ff5), and [ce09505](https://github.com/vedprakash007/react-portfolio/commit/ce09505)), I tackled this challenge head-on: creating a resume section that looks identical in browser and print views while maintaining all the benefits of dynamic web content.

## Technical Approach Overview

Instead of fighting the web's nature, I embraced it by building a resume section that:

1. **Uses semantic HTML** for accessibility and SEO
2. **Leverages React's component model** for maintainability
3. **Implements specialized print CSS** to achieve pixel-perfect output
4. **Stores data structurally** for easy updates

The resume section breaks down into three main components:
- `<ResumeSection>`: Main container handling layout and print styles
- `<ExperienceItem>`: Individual role/company entries with bullet points
- `<SkillsGrid>`: Dynamic skills categorization and display

## Key Implementation Details

### Dynamic Data Structure

Rather than hardcoding resume content, I structured it as consumable JSON-like objects that map cleanly to Supabase tables:

```typescript
// Experience data structure (matches Supabase 'experience' table)
interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[] // Bullet points as array
  sort_order: number
}

// Skills data structure (matches Supabase 'skills' table)
interface Skill {
  id: string
  category: string // e.g., "Technical", "Soft Skills", "Tools"
  items: string[] // Individual skill items
  sort_order: number
}
```

This approach (visible in [src/lib/supabase.ts](https://github.com/vedprakash007/react-portfolio/blob/main/src/lib/supabase.ts)) means updating your resume is as simple as editing database entries—no code changes needed.

### Reusable Experience Component

Each experience item maps over the bullet points array, creating semantic `<ul>`/`<li>` structures:

```tsx
const ExperienceItem = ({ experience }: { experience: Experience }) => (
  <section className="mb-6 last:mb-0">
    <div className="flex items-start space-x-4">
      <div className="shrink-0">
        <div className="h-2.5 w-2.5 bg-primary rounded-full" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{experience.role}</h3>
        <p className="text-muted-foreground">{experience.company}</p>
        <p className="text-xs text-muted-foreground">{experience.period}</p>
      </div>
    </div>
    <ul className="mt-2 space-y-1 pl-4 list-disc">
      {experience.description.map((bullet, index) => (
        <li key={index} className="text-muted-foreground">
          {bullet}
        </li>
      ))}
    </ul>
  </section>
);
```

Notice how the bullet points come directly from the `description` array—this makes content updates trivial.

### Skills Visualization: From Consolidation to Display

One of my recent improvements ([commit 21c5809](https://github.com/vedprakash007/react-portfolio/commit/21c5809)) was consolidating the skills and certifications section. This translated directly to the resume section through the `<SkillsGrid>` component:

```tsx
const SkillsGrid = ({ skills }: { skills: Skill[] }) => (
  <div className="grid gap-6 md:grid-cols-2">
    {skills.map((skill) => (
      <div key={skill.id} className="space-y-2">
        <h3 className="font-semibold text-foreground">{skill.category}</h3>
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span key={item} className="px-2 py-0.5 bg-muted rounded text-xs">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
```

The flex-wrap ensures skills flow nicely on different screen sizes while maintaining consistent spacing.

### Print Optimization: Making Browser Match PDF

The real magic happens in the print CSS. My goal was to make the printed output indistinguishable from a carefully crafted PDF. Here's how I achieved it:

```css
/* src/index.css - Print-specific styles */
@media print {
  /* Remove interactive elements */
  .no-print, 
  .btn-shimmer,
  .glass.glow-border {
    display: none !important;
  }
  
  /* Reset to print-friendly defaults */
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.4;
  }
  
  /* Ensure experience items don't break across pages awkwardly */
  .experience-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  /* Adjust spacing for compactness */
  section {
    margin-bottom: 0.75in !important;
  }
  
  h1, h2, h3 {
    page-break-after: avoid;
  }
  
  /* Remove background colors, keep essential styling */
  * {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
}
```

Key techniques used:
- `break-inside: avoid` prevents experience items from splitting mid-entry
- Aggressive reset of backgrounds/colors for ink efficiency
- Precise margin control to fit everything on one page
- Hiding interactive elements (buttons, hover states) that don't make sense in print

## Challenges & Solutions I Faced

### Challenge: Font Awesome Icons Not Printing Correctly

After implementing the initial version, I noticed that Font Awesome icons (used for skills categories) weren't appearing in print preview. This is a common issue with icon fonts in print CSS.

**Solution**: Following the approach in [commit 5624ff5](https://github.com/vedprakash007/react-portfolio/commit/5624ff5), I switched from font-based icons to inline SVGs for critical print elements, ensuring they render reliably regardless of print settings:

```tsx
// Instead of: <FontAwesomeIcon icon={faCode} />
// Use inline SVG:
<svg 
  width="16" 
  height="16" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M4 4c1.1 0 2 .9 2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H4z" 
        fill="currentColor"/>
</svg>
```

### Challenge: Condensing to One Page Without Losing Readability

My initial draft ran long—over 1.5 pages when printed. Following the philosophy in [commit ce09505](https://github.com/vedprakash007/react-portfolio/commit/ce09505), I implemented several condensation strategies:

1. **Progressive bullet point detail**: More recent/relevant roles get 4-5 bullets; older roles get 2-3
2. **Strategic abbreviation**: Using widely-recognized acronyms (AWS, CI/CD, REST) after first definition
3. **Tightened line spacing**: Print CSS uses `line-height: 1.4` vs 1.6 on screen
4. **Skills consolidation**: Grouping similar technologies (e.g., "React, Vue, Angular" → "Modern Frontend Frameworks")

The result? A dense but scannable single-page resume that maintains readability.

### Challenge: Dynamic Content Layout Shifts

As data loads from Supabase, there was a risk of content shifting as sections populated, causing poor UX.

**Solution**: I implemented skeleton loaders and defined minimum heights for sections based on content type, preventing layout shifts during data fetching.

## Lessons Learned & Improvements

### What I'd Do Differently Next Time

- **CSS Variables for print/screen**: Instead of duplicating values, use CSS properties that change in `@media print`
- **Component-level print styles**: Move print-specific styles closer to components using `style` tags or CSS modules
- **More granular data modeling**: Separate "core resume" data from "portfolio website" data in the database

### Accessibility Considerations Addressed

- Semantic HTML (`<section>`, `<h2>`, `<h3>`, `<ul>/<li>`) for screen reader navigation
- Sufficient color contrast ratios (tested with WebAIM contrast checker)
- Keyboard-navigable interactive elements (though hidden in print)
- ARIA labels where semantic elements weren't sufficient

### Performance Benefits Over Iframed PDFs

- **Initial load**: ~40KB JSON data vs 500KB+ PDF
- **Updates**: Instant database edits vs regenerating/replacing files
- **Bandwidth**: Only transfers actual content changes, not entire files
- **SEO**: Content is indexable and contributes to page relevance

## Conclusion & Live Demo

This approach transforms the resume from a static document into a living, breathing part of your website that:
- Maintains pixel-perfect print output when needed
- Provides superior accessibility and SEO
- Makes updates trivial and instantaneous
- Keeps visitors engaged within your website experience

You can see the live implementation in the [Resume section](/resume) of my portfolio. Try printing it (Cmd+P/Ctrl+P) to see how the print stylesheet creates a clean, professional PDF-like output directly from the browser.

The source code for this implementation is available in:
- `src/components/resume/` (Resume components)
- `src/lib/supabase.ts` (Data layer)
- `src/index.css` (Print stylesheet)

**Challenge for readers**: Try implementing this approach for your own portfolio. Start by structuring your resume data as JSON, then build React components to map over it. The print CSS is where you'll spend most of your time tweaking—use browser print preview extensively to iterate!

What techniques have you used for handling resumes on personal websites? Share your experiences in the comments below—I'd love to learn from your approaches as well.