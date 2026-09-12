import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  pathname?: string // Optional override for canonical URL
  structuredData?: Record<string, unknown>
}

const SEO = ({ title, description, pathname, structuredData }: SEOProps) => {
  const location = useLocation()
  const currentPath = pathname ?? location.pathname

  // Base URL for your site
  const BASE_URL = 'https://vedprakash.me'

  useEffect(() => {
    // Update document title
    document.title = `${title} | Ved Prakash`

    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    if (description) {
      metaDescription.setAttribute('content', description)
    }

    // Create or update canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE_URL}${currentPath.replace(/\/+$/, '') || '/'}`)

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', title)

    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    if (description) {
      ogDescription.setAttribute('content', description)
    }

    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute('content', `${BASE_URL}${currentPath.replace(/\/+$/, '') || '/'}`)

    let ogType = document.querySelector('meta[property="og:type"]')
    if (!ogType) {
      ogType = document.createElement('meta')
      ogType.setAttribute('property', 'og:type')
      document.head.appendChild(ogType)
    }
    ogType.setAttribute('content', 'website')

    // Twitter card
    let twitterCard = document.querySelector('meta[name="twitter:card"]')
    if (!twitterCard) {
      twitterCard = document.createElement('meta')
      twitterCard.setAttribute('name', 'twitter:card')
      document.head.appendChild(twitterCard)
    }
    twitterCard.setAttribute('content', 'summary_large_image')

    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta')
      twitterTitle.setAttribute('name', 'twitter:title')
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute('content', title)

    let twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta')
      twitterDescription.setAttribute('name', 'twitter:description')
      document.head.appendChild(twitterDescription)
    }
    if (description) {
    twitterDescription.setAttribute('content', description)
    }

    let schema = document.querySelector('script[data-seo-schema="person"]') as HTMLScriptElement | null
    if (!schema) {
      schema = document.createElement('script')
      schema.type = 'application/ld+json'
      schema.dataset.seoSchema = 'person'
      document.head.appendChild(schema)
    }
    schema.text = JSON.stringify(structuredData ?? {
      '@context': 'https://schema.org', '@type': 'Person', name: 'Ved Prakash', url: BASE_URL,
      jobTitle: 'AI Automation Engineer', sameAs: ['https://www.linkedin.com/in/vedprakashsigh', 'https://github.com/vedprakashsigh'],
      knowsAbout: ['AI automation', 'RAG systems', 'document processing', 'LangGraph'],
    })
  }, [title, description, currentPath, structuredData])

  return null
}

export default SEO
