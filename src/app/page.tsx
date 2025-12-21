import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border-b border-gray-200 pb-6 mb-12">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          LexNova Legal&nbsp;
          <code className="font-bold">Phase 0</code>
        </p>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Project Scaffold Ready
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          The Next.js 15 (App Router) + Tailwind CSS + TypeScript environment is successfully initialized.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Ready for Phase 1: Landing Page & Core UI.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/docs/00-product-brief.md"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
