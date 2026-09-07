import { useEffect, useState } from 'react'

interface CommitInfo {
  commitSha: string
  repoUrl: string
}

export default function Footer() {
  const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/commit-info.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch commit info')
        }
        return response.json()
      })
      .then(data => {
        setCommitInfo(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setCommitInfo(null)
      })
  }, [])

  if (error) {
    return (
      <div className="text-red-500 text-xs">
        Error loading commit info: {error}
      </div>
    )
  }

  if (!commitInfo) {
    return <div className="text-xs italic">Loading commit info...</div>
  }

  const { commitSha, repoUrl } = commitInfo
  const shortSha = commitSha.slice(0, 7)
  const commitUrl = `${repoUrl}/commit/${commitSha}`

  return (
    <footer className="mt-12 pt-6 border-t border-white/10 text-center">
      <p className="text-xs text-muted-foreground">
        Deployed from commit{' '}
        <a
          href={commitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          {shortSha}
        </a>
      </p>
    </footer>
  )
}