interface Props {
  children: React.ReactNode
}

const Banner = ({ children }: Props) => {
  return (
    <div className="bg-[#D20504]">
      <div className="mx-auto w-[1040px]">
        <div
          className={
            'grid h-[600px] w-full grid-cols-1 items-center bg-[url("/register-background.jpg")] bg-auto py-10 lg:grid-cols-5 lg:place-items-center'
          }
        >
          <div className="lg:col-span-2 lg:col-start-4 lg:w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default Banner
