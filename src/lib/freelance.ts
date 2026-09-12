const publicUrl = (value: string | undefined) => {
  try {
    const url = new URL(value?.trim() || '')
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

export const freelanceConfig = {
  email: 'hi@vedprakash.me',
  bookingUrl: publicUrl(import.meta.env.VITE_BOOKING_URL),
  upworkUrl: publicUrl(import.meta.env.VITE_UPWORK_URL),
  fiverrUrl: publicUrl(import.meta.env.VITE_FIVERR_URL),
  emailJsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || 'service_phbyyuk',
  emailJsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || 'template_qrvz1rc',
  emailJsAutoReplyTemplateId: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID?.trim() || '',
  emailJsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '',
} as const

export const hiringLinks = [
  { label: 'Upwork', href: freelanceConfig.upworkUrl },
  { label: 'Fiverr', href: freelanceConfig.fiverrUrl },
].filter((link) => Boolean(link.href))

export type CaseStudyMeta = {
  confidentialityLabel: string
  proofType: string
  outcome: string
  cta: string
}
