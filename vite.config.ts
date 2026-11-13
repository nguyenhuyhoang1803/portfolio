import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// Index local assets so missing optional files never trigger network requests.
function portfolioMedia(): Plugin {
  const moduleId = '\0virtual:portfolio-media'
  const publicDirectory = resolve('public')

  return {
    name: 'portfolio-media',
    resolveId(id) {
      if (id === 'virtual:portfolio-media') return moduleId
    },
    load(id) {
      if (id !== moduleId) return
      const files = ['media', 'documents'].flatMap((folder) => {
        const directory = resolve(publicDirectory, folder)
        if (!existsSync(directory)) return []
        return readdirSync(directory, { recursive: true, withFileTypes: true })
          .filter((entry) => entry.isFile())
          .map((entry) => resolve(entry.parentPath, entry.name)
            .slice(publicDirectory.length + 1).replaceAll('\\', '/'))
      })
      return `export default ${JSON.stringify(files)}`
    },
    configureServer(server) {
      const refresh = (path: string) => {
        if (!path.startsWith(publicDirectory)) return
        const module = server.moduleGraph.getModuleById(moduleId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh).on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioMedia()],
})
