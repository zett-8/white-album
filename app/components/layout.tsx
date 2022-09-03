import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={'w-full min-h-screen grid grid-cols-1 grid-rows-fh'}>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}
