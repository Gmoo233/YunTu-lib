/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.png' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
