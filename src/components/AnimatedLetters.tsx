import { useEffect, useState } from 'react'

interface AnimatedLettersProps {
  strArray: string[]
  idx?: number
  className?: string
}

export default function AnimatedLetters({ strArray, idx = 0, className = '' }: AnimatedLettersProps) {
  const [hoverReady, setHoverReady] = useState(false)

  useEffect(() => {
    // Enable hover effect after all letters have animated in
    const totalAnimTime = (strArray.length * 40) + 600
    const timer = setTimeout(() => setHoverReady(true), totalAnimTime)
    return () => clearTimeout(timer)
  }, [strArray.length])

  return (
    <span className={className}>
      {strArray.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`inline-block min-w-[10px] ${
            hoverReady
              ? 'letter-hover cursor-default transition-colors duration-200'
              : 'animate-[bounceIn_0.5s_forwards]'
          }`}
          style={!hoverReady ? { animationDelay: `${i * 0.04}s` } : undefined}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
