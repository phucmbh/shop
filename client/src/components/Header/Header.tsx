import { Container } from '../Container'
import SearchHeader from './SearchHeader'
import TopHeader from './TopHeader'

const Header = () => {
  return (
    <div className=" bg-gradient-to-b from-[#f53d2d] to-[#f63] pb-4 pt-2 text-xs text-white">
      <Container>
        <TopHeader />
        <SearchHeader />
      </Container>
    </div>
  )
}

export default Header
