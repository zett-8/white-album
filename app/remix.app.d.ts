export {}

declare global {
  const MY_ENV: string

  interface Window {
    env: {
      NODE_ENV: string
      MY_ENV: string
    }
  }
}
