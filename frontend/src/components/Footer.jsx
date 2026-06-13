import React from 'react'
import { Link } from 'react-router-dom'

const shopLinks = [
  { name: 'New Arrivals', path: '/shop' },
  { name: 'Best Sellers', path: '/shop' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/shop' },
]

const supportLinks = [
  { name: 'Contact Us', path: '/contact' },
  { name: 'Shipping Info', path: '/shipping' },
  { name: 'Returns', path: '/returns' },
  { name: 'FAQs', path: '/faqs' },
]

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="Go to homepage">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-lg font-bold text-slate-950">
                E
              </span>
              <span className="text-xl font-bold tracking-tight">EcomShop</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Quality products, simple shopping, and reliable delivery for your everyday needs.
            </p>
            <div className="mt-6 flex gap-3">
              {['f', 'x', 'in'].map((item) => (
                <a
                  key={item}
                  href="/"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-sm font-semibold text-slate-300 transition hover:border-white hover:text-white"
                  aria-label={`Visit our ${item} page`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Newsletter
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Get updates about new products, offers, and seasonal discounts.
            </p>
            <form className="mt-5 flex gap-2">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Join
              </button>
            </form>
            <p className="mt-4 text-sm text-slate-300">
              support@ecomshop.com
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} EcomShop. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
 