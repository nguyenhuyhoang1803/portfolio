const motionPreference = new URLSearchParams(window.location.search).get('motion')
const preferenceKey = 'portfolio-motion-preference'

function animationsEnabled() {
  try {
    if (motionPreference === 'preview') localStorage.setItem(preferenceKey, 'enabled')
    if (motionPreference === 'system') localStorage.setItem(preferenceKey, 'system')
    return motionPreference !== 'system' && localStorage.getItem(preferenceKey) !== 'system'
  } catch {
    return motionPreference !== 'system'
  }
}

export const previewMotion = animationsEnabled()
