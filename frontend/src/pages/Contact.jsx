import React from 'react'

const Contact = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Get In Touch
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Have a question about orders, delivery, or products? Send us a message and
            our team will get back to you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-slate-950">Email</h2>
              <p className="mt-2 text-sm text-slate-600">support@ecomshop.com</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-slate-950">Phone</h2>
              <p className="mt-2 text-sm text-slate-600">+92 300 1234567</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-slate-950">Address</h2>
              <p className="mt-2 text-sm text-slate-600">Main Market, Lahore, Pakistan</p>
            </div>
          </div>

          <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">Subject</span>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="How can we help?"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                rows="6"
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="Write your message..."
              />
            </label>

            <button
              type="submit"
              className="mt-6 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact
