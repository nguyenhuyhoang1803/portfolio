import files from 'virtual:portfolio-media'

interface Project {
  title: string
  category: string
  description: string
  cover: string
  screenshots: { src: string; alt: string }[]
  role?: string
  stack: string[]
  repositoryUrl?: string
  demoUrl?: string
  highlights: string[]
  caseStudy?: { problem?: string; contribution?: string; solution?: string; result?: string }
}

export const profile = {
  name: 'Nguyễn Huy Hoàng',
  role: 'Aspiring Backend Developer',
  description: 'I’m an IT student based in Vietnam, interested in how web applications work behind the scenes.',
  university: 'Ho Chi Minh City University of Industry and Trade (HUIT)',
  degree: 'Bachelor of Software Engineering',
  statement: 'I enjoy building practical web systems and improving my skills through hands-on projects.',
  portrait: '/media/profile/portrait.webp',
  video: '/media/profile/intro.mp4',
  poster: '/media/profile/intro-poster.webp',
  cv: '/documents/CV.pdf',
  cvFallback: '/documents/Nguyen-Huy-Hoang-CV-OA.pdf',
  copyrightYear: 2026,
}

export const project: Project = {
  title: 'InternBridge',
  category: 'Graduation Thesis',
  description: 'A platform connecting students and employers through internship and recruitment workflows.',
  cover: '/media/projects/internbridge-cover.webp',
  screenshots: [
    { src: '/media/projects/internbridge-01.webp', alt: 'InternBridge screenshot 1' },
    { src: '/media/projects/internbridge-02.webp', alt: 'InternBridge screenshot 2' },
  ],
  role: '',
  stack: [],
  repositoryUrl: '',
  demoUrl: '',
  highlights: [],
  caseStudy: {
    problem: 'Students need to find internship opportunities, while employers need a way to recruit interns.',
    solution: 'InternBridge brings internship and recruitment workflows into one platform.',
  },
}

export const contact = {
  description: "Let's build something meaningful together.",
  email: 'nhhoanga9.2020c3locthanh@gmail.com',
  github: '',
  linkedin: 'https://www.linkedin.com/in/nhhoang1803/',
  facebook: 'https://www.facebook.com/nguyen.hoang.909585',
  instagram: 'https://www.instagram.com/nhh1803/',
}

const fileSet = new Set(files)

export function localMedia(path: string) {
  const file = path.replace(/^\//, '')
  return fileSet.has(file) ? import.meta.env.BASE_URL + file : undefined
}

export function webLink(value?: string) {
  if (!value) return
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch {
    return
  }
}

export function emailLink(value: string) {
  const email = value.trim()
  if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(email)) {
    return `mailto:${encodeURIComponent(email).replace('%40', '@')}`
  }
}
