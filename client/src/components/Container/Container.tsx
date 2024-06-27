interface Props {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className='mx-auto max-w-7xl px-4'>{children}</div>
}
export default Container
