/// <reference types="vite/client" />

declare module "@vitejs/plugin-react" {
  import type { Plugin } from "vite";
  const react: (options?: { include?: string; babel?: object }) => Plugin;
  export default react;
}
