interface Props {
  children: React.ReactNode
}

const Banner = ({ children }: Props) => {
  return (
    <div className="bg-slate-100 lg:bg-[#D20504]">
      <div className="mx-auto w-auto lg:w-[1040px]">
        <div
          className={
            'grid h-[600px] w-full grid-cols-1 items-center bg-none  bg-auto py-10 lg:grid-cols-5 lg:place-items-center lg:bg-[url("/register-background.jpg")] '
          }
        >
          <div className="mx-5 rounded border border-gray-200 shadow-sm lg:col-span-2 lg:col-start-4 lg:mx-0 lg:w-[400px] lg:border-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner
