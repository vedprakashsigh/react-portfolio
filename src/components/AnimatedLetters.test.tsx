import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedLetters from './AnimatedLetters';

describe('AnimatedLetters component', () => {
  it('renders all characters in the string array', () => {
    const letters = ['T', 'e', 's', 't'];
    const { getByText, container } = render(
      <AnimatedLetters strArray={letters} idx={1} />
    );

    // Each letter is rendered inside its own span
    letters.forEach(char => {
      // By mapping multiple instances of same char might exist, 
      // but testing library container checks text content.
      expect(container.textContent).toContain('Test');
    });

    // We can also verify the number of child spans
    const rootSpan = container.firstChild as HTMLElement;
    expect(rootSpan.childNodes.length).toBe(letters.length);
  });

  it('applies the optional className to root span', () => {
    const letters = ['A'];
    const { container } = render(
      <AnimatedLetters strArray={letters} className="test-class" />
    );

    const rootSpan = container.firstChild as HTMLElement;
    expect(rootSpan.className).toContain('test-class');
  });
});
