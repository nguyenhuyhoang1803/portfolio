import { Users, GitFork, Camera, BriefcaseBusiness, Mail } from 'lucide-react'
import { contact, emailLink, webLink } from '../data/portfolio'

export const channels = [
  { label: 'Email', Icon: Mail, href: emailLink(contact.email), external: false },
  { label: 'GitHub', Icon: GitFork, href: webLink(contact.github), external: true },
  { label: 'LinkedIn', Icon: BriefcaseBusiness, href: webLink(contact.linkedin), external: true },
  { label: 'Facebook', Icon: Users, href: webLink(contact.facebook), external: true },
  { label: 'Instagram', Icon: Camera, href: webLink(contact.instagram), external: true },
]
