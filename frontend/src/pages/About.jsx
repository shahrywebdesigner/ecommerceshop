import React from 'react'

const About = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              About Us
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight text-slate-950">
              We make online shopping simple, reliable, and comfortable.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              EcomShop is built for customers who want quality products, clear prices,
              and a smooth buying experience. Our goal is to bring useful products into
              one clean store where shopping feels fast and trustworthy.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <p className="text-3xl font-bold text-slate-950">10+</p>
                <p className="mt-1 text-sm text-slate-500">Product categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-950">24/7</p>
                <p className="mt-1 text-sm text-slate-500">Customer support</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-950">Fast</p>
                <p className="mt-1 text-sm text-slate-500">Delivery process</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Quality First',
              text: 'Products are selected with value, durability, and customer use in mind.',
            },
            {
              title: 'Clear Shopping',
              text: 'Simple pages, readable product details, and easy navigation.',
            },
            {
              title: 'Customer Care',
              text: 'We keep support approachable so buyers can shop with confidence.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default About
