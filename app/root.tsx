import type { ReactNode } from 'react'
import { json, ErrorBoundaryComponent } from '@remix-run/cloudflare'
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import styles from './tailwind.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'My First Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
]

export const loader: LoaderFunction = async () => {
  return json({
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MY_ENV,
    },
  })
}

const Document = ({ children }: { children: ReactNode }) => {
  const { env } = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(env)}` }} />
      </body>
    </html>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }: { error: Error }) => {
  console.error(error)

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  )
}
