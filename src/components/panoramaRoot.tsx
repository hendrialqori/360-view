type Props = {
  children: React.ReactNode
}

export const PanoramaRoot: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex grow w-full min-h-[100vh]">
      {children}
    </div>
  )
}