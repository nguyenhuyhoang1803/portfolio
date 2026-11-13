const motionPreference = new URLSearchParams(window.location.search).get('motion')
const preferenceKey = 'portfolio-motion-preview'

function readMotionPreference() {
  try {
    if (motionPreference === 'preview') localStorage.setItem(preferenceKey, 'enabled')
    if (motionPreference === 'system') localStorage.removeItem(preferenceKey)
    return localStorage.getItem(preferenceKey) === 'enabled'
  } catch {
    return false
  }
}

const savedPreference = readMotionPreference()
export const previewMotion = motionPreference === 'preview' ||
  (motionPreference !== 'system' && savedPreference)
