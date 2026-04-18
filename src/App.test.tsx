import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// We mock ParticleCanvas because canvas is hard to test in JSDOM
// and it's a visual-only element.
vi.mock('@/components/ParticleCanvas', () => {
  return {
    default: () => <div data-testid="mock-particle-canvas" />
  };
});

// Mock LeetCodeStats to prevent external network calls failing during test teardown
vi.mock('@/components/LeetCodeStats', () => {
  return {
    default: () => <div data-testid="mock-leetcode-stats" />
  };
});

// We need to mock supabase to avoid real network calls
vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
      }
    },
    getSkills: vi.fn(() => Promise.resolve([])),
    getExperience: vi.fn(() => Promise.resolve([])),
    getProjects: vi.fn(() => Promise.resolve([])),
    getEducation: vi.fn(() => Promise.resolve([])),
    getCertifications: vi.fn(() => Promise.resolve([])),
    getProfile: vi.fn(() => Promise.resolve({
      id: 1, name: 'Ved Prakash', title: 'Agentic AI Engineer'
    }))
  };
});

describe('App Routing', () => {
  it('renders the Home page layout by default', () => {
    // MemoryRouter uses in-memory history instead of the browser
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verify layout wrapper exists
    expect(document.getElementById('main-content')).toBeInTheDocument();
    
    // Check for Home page specific elements
    expect(screen.getByText('Agentic AI Engineer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-particle-canvas')).toBeInTheDocument();
  });

  it('renders the About page when navigating to /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText('What I Do')).toBeInTheDocument();
  });
});
