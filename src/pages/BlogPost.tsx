import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Clock, User, Calendar, Heart, MessageCircle, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import ParticleCanvas from '@/components/ParticleCanvas'
import { getBlogBySlug, getBlogLikes, hasUserLiked, toggleLike, getBlogComments, addBlogComment, type Blog, type BlogComment } from '@/lib/supabase'

// Custom markdown components for enhanced rendering without external dependencies
const markdownComponents = {
  // Enhanced table styling
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border bg-card/50 backdrop-blur-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-muted/50">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider border-b border-border bg-primary/5">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-3 text-sm text-foreground/90 align-top">{children}</td>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),
  // Enhanced code blocks
  code: ({ inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-primary/10 text-cyan-300 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        className={`block overflow-x-auto p-4 rounded-lg bg-slate-900/80 text-sm font-mono leading-relaxed ${className || ''}`}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }: any) => (
    <pre className="my-4 rounded-lg shadow-lg shadow-black/20">{children}</pre>
  ),
  // Enhanced blockquotes (callouts)
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary bg-primary/5 rounded-r-lg px-4 py-3 my-6 not-italic [&>p]:m-0 [&>p]:text-foreground/90">
      {children}
    </blockquote>
  ),
  // Better heading spacing
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border/50 flex items-center gap-2">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3 flex items-center gap-2">
      {children}
    </h3>
  ),
  // Better paragraph spacing
  p: ({ children }: any) => (
    <p className="my-4 leading-7 text-foreground/90">{children}</p>
  ),
  // Better list styling
  ul: ({ children }: any) => (
    <ul className="my-4 space-y-2 pl-2 list-disc list-inside marker:text-primary">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-4 space-y-2 pl-2 list-decimal list-inside marker:text-primary">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-7 text-foreground/90">{children}</li>
  ),
  // Enhanced links
  a: ({ href, children }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted underline-offset-4 transition-colors"
    >
      {children}
    </a>
  ),
  // Inline code in headings/lists handled above; strong emphasis
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  hr: () => <hr className="my-8 border-border" />,
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [commentName, setCommentName] = useState('')
  const [commentMessage, setCommentMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentSuccess, setCommentSuccess] = useState(false)

  // Get or create session ID for anonymous likes
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('blog_session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('blog_session_id', sessionId)
    }
    return sessionId
  }

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      const data = await getBlogBySlug(slug)
      setBlog(data)

      if (data) {
        const sessionId = getSessionId()
        const [likeCount, userLiked, blogComments] = await Promise.all([
          getBlogLikes(data.id),
          hasUserLiked(data.id, sessionId),
          getBlogComments(data.id)
        ])
        setLikes(likeCount)
        setLiked(userLiked)
        setComments(blogComments)
      }
      setLoading(false)
    }

    fetchBlog()
  }, [slug])

  const handleLike = async () => {
    if (!blog) return
    const sessionId = getSessionId()
    const result = await toggleLike(blog.id, sessionId)
    setLiked(result.liked)
    setLikes(result.totalLikes)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blog || !commentName.trim() || !commentMessage.trim()) return

    setSubmitting(true)
    const success = await addBlogComment(blog.id, commentName.trim(), commentMessage.trim())
    setSubmitting(false)

    if (success) {
      setCommentSuccess(true)
      setCommentName('')
      setCommentMessage('')
      // Refresh comments
      const updated = await getBlogComments(blog.id)
      setComments(updated)
      setTimeout(() => setCommentSuccess(false), 3000)
    } else {
      alert('Name already used for a comment on this post. Please use a different name.')
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <>
        <ParticleCanvas />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </>
    )
  }

  if (!blog) {
    return (
      <>
        <ParticleCanvas />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Card className="glass">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Post not found</h2>
              <Link to="/blog" className="text-primary hover:text-cyan-300">
                ← Back to blog
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <ParticleCanvas />

      <div className="relative z-10 min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter">
        <div className="container mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Cover image */}
          {blog.cover_image && (
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {blog.read_time_minutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(blog.published_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {blog.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {blog.title}
          </h1>

          {/* Like button */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`gap-2 ${liked ? 'text-red-500 border-red-500/50' : ''}`}
            >
              <Heart size={16} className={liked ? 'fill-current' : ''} />
              {likes}
            </Button>
          </div>

          <Separator className="mb-8" />

          {/* Markdown Content */}
          <article className="prose prose-invert prose-cyan max-w-none mb-12">
            <ReactMarkdown components={markdownComponents}>
              {blog.content}
            </ReactMarkdown>
          </article>

          <Separator className="mb-8" />

          {/* Comments Section */}
          <div id="comments">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageCircle size={24} />
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <Card className="glass glow-border mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleComment} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Your Name</label>
                      <Input
                        placeholder="John Doe"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Your Comment</label>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={commentMessage}
                      onChange={(e) => setCommentMessage(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="btn-shimmer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Post Comment
                      </>
                    )}
                  </Button>
                  {commentSuccess && (
                    <p className="text-green-400 text-sm">Comment posted successfully!</p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="glass">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{comment.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}