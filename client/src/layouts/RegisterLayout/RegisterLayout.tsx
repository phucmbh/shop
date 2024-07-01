import { Footer, RegisterHeader } from "@/components"

interface Props {
  children: React.ReactNode
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
export default RegisterLayout
