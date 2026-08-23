import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, User, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import ParticleCanvas from '@/components/ParticleCanvas'
import { getBlogs, type Blog } from '@/lib/supabase'

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data)
      setLoading(false)
    })
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <ParticleCanvas />

      <div className="relative z-10 min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="blog-page">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            <AnimatedLetters strArray={['B', 'l', 'o', 'g']} idx={1} />
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Thoughts on Agentic AI, LangGraph, and building production-grade systems
          </p>
          <Separator className="mb-10" />

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            </div>
          ) : blogs.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <FileText size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for articles on AI engineering and multi-agent systems.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="glass glow-border hover:border-primary/30 transition-all duration-300 group"
                >
                  {blog.cover_image && (
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {blog.read_time_minutes} min read
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {blog.author}
                      </span>
                      <span>•</span>
                      <span>{formatDate(blog.published_at)}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-cyan-300 transition-colors"
                    >
                      Read more
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}