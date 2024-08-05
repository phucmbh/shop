import { PATH } from '@/constants'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4  text-7xl font-extrabold tracking-tight text-orange lg:text-9xl">404</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-600 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <Link
            to={PATH.HOME}
            className="ont-medium rounded bg-orange px-5 py-2.5 text-sm text-white hover:bg-orange/90 focus:ring-4 focus:ring-orange/60"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
export default NotFound
