import { Header } from "./header"

type Props = {
  children: React.ReactNode
}


export const Layout = ({ children }: Props) => {
  return (
    <div aria-label="root">
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}