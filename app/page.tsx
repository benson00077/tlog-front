'use client'

import PageTransition from 'app/_components/PageTransition/PageTransition'

const Page = () => {
  return (
    <PageTransition>
      <section className="flex justify-center h-[80vh]">
        <div className="flex flex-col justify-around w-4/6 text-center h-5/6">
          <h1 className="font-bold text-7xl">Hi, I&apos;m Benson</h1>
          <div>
            <p className="mb-6 text-xl font-normal">
              This site hosts my writing and notes on web development, Korean translation and who knows what else.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Page
