import SearchHeader from './SearchHeader'
import TopHeader from './TopHeader'

const Header = () => {
  return (
    <div className=" bg-gradient-to-b from-[#f53d2d] to-[#f63] pb-4 pt-2 text-xs text-white">
      <TopHeader />
      <SearchHeader className="py-2 " />
    </div>
  )
}

export default Header
