import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-neutral-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-10 grid grid-cols-2 gap-5 text-center text-sm uppercase lg:grid-cols-4">
          <Link to="/">Chính sách bảo mật</Link>
          <Link to="/">Quy chế hoạt động</Link>
          <Link to="/">Chính sách vận chuyển</Link>
          <Link to="/">Chính sách trả hàng và hoàn tiền</Link>
        </div>
        
        <div className="mt-8 grid grid-cols-1 text-center">
          <p className="mt-2">
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p className="mt-2">Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</p>
          <p className="mt-2">
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </p>
          <p className="mt-2">© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
