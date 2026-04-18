import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  acceptanceRate: number
}

interface LeetCodeStatsProps {
  username?: string
}

export default function LeetCodeStats({ username = 'vedprakashsigh' }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profileRes, solvedRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
        ])
        const profile = await profileRes.json()
        const solved = await solvedRes.json()

        const totalSubmissions = solved.totalSubmissionNum?.find((s: any) => s.difficulty === 'All')
        const totalAccepted = solved.acSubmissionNum?.find((s: any) => s.difficulty === 'All')

        setStats({
          totalSolved: solved.solvedProblem || 0,
          easySolved: solved.easySolved || 0,
          mediumSolved: solved.mediumSolved || 0,
          hardSolved: solved.hardSolved || 0,
          ranking: profile.ranking || 0,
          acceptanceRate: totalSubmissions && totalAccepted
            ? Math.round((totalAccepted.submissions / totalSubmissions.submissions) * 1000) / 10
            : 0,
        })
      } catch (err) {
        console.error('Failed to fetch LeetCode stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [username])

  if (loading) {
    return (
      <Card className="glass glow-border">
        <CardContent className="p-6 flex items-center justify-center h-32">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!stats) return null

  const difficultyBars = [
    { label: 'Easy', count: stats.easySolved, total: 873, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    { label: 'Medium', count: stats.mediumSolved, total: 1826, color: 'bg-amber-500', textColor: 'text-amber-400' },
    { label: 'Hard', count: stats.hardSolved, total: 801, color: 'bg-red-500', textColor: 'text-red-400' },
  ]

  return (
    <Card className="glass glow-border group hover:border-primary/20 transition-all">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.893.785a1.378 1.378 0 0 0 1.948-.073 1.38 1.38 0 0 0-.06-1.946l-.893-.785c-2.064-1.814-5.166-1.639-7.055.372l-.896.961 5.406-5.791a1.38 1.38 0 0 0-.476-2.254A1.374 1.374 0 0 0 13.483 0zM19.25 6.966a1.374 1.374 0 0 0-.944.398l-5.406 5.791.896-.961c1.889-2.011 4.99-2.187 7.055-.372l.893.785a1.374 1.374 0 0 0 1.946.06 1.38 1.38 0 0 0 .073-1.948l-.893-.785a5.21 5.21 0 0 0-.127-.108.807.807 0 0 1-.038-.033L18.43 5.6a5.938 5.938 0 0 0-1.271-1.818 5.83 5.83 0 0 0-.349-1.017 5.527 5.527 0 0 0-.062-2.362c.036.168.062.34.076.513a5.266 5.266 0 0 0 1.209-2.104z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">LeetCode</h3>
              <p className="text-[10px] text-muted-foreground font-mono">@{username}</p>
            </div>
          </div>
          <a
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View LeetCode profile"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 rounded-lg bg-background/50">
            <p className="text-2xl font-bold text-gradient">{stats.totalSolved.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Solved</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/50">
            <p className="text-2xl font-bold text-foreground">{stats.ranking.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Ranking</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/50">
            <p className="text-2xl font-bold text-foreground">{stats.acceptanceRate}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Accept</p>
          </div>
        </div>

        {/* Difficulty bars */}
        <div className="space-y-2.5">
          {difficultyBars.map(({ label, count, total, color, textColor }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium ${textColor}`}>{label}</span>
                <span className="text-xs text-muted-foreground font-mono">{count}/{total}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
                  style={{ width: `${Math.min((count / total) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
