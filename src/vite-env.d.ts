/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GEMINI_API_KEY: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}