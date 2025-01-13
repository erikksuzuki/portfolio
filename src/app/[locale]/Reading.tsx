'use client'
import KindleIcon from '@/assets/kindleicon.webp'

import * as AspectRatio from '@radix-ui/react-aspect-ratio'

import BookShelvesBG from '@/assets/bookcovers/ReadingSectionBG.jpg'

import clsx from 'clsx'
import { truncateParagraph } from '@/utils/formatString'
import { useEffect, useState } from 'react'
import { books } from 'src/data/books'
import BookDetails, {
  BookProperties,
} from '@/components/ReadingSection/BookDetails'
import BookDisplay from '@/components/ReadingSection/BookDisplay'

const bookList = books as BookProperties[]

const ReadingSection = () => {
  const [bookDetails, setBookDetails] = useState<BookProperties | null>(null)

  useEffect(() => {
    setBookDetails(bookList[0])
  }, [])

  return (
    <section
      className="bg-black py-24"
      style={{
        backgroundImage: `url(${BookShelvesBG.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="text-left px-0 md:px-4 grid grid-cols-1 md:grid-cols-2 w-full mx-auto max-w-[1024px] relative">
        <article className="rounded-lg border border-[rgba(255,255,255,0.1)] px-4 py-7 bg-acryllic-black">
          <header className="flex items-center justify-between">
            <div>
              <label className="uppercase text-[#ffc75f] text-[10px] tracking-widest font-semibold">
                What I&apos;ve Been Reading
              </label>
              <h1 className="text-theme-heading-xs font-poppins mb-7">
                Recommended Books
              </h1>
            </div>

            <img
              alt="Kindle Icon"
              src={KindleIcon.src}
              className="w-[24px] h-[24px] rounded-full"
            />
          </header>
          <ul className={clsx('w-full gap-3 grid grid-cols-2 md:grid-cols-3')}>
            {bookList.map((book) => (
              <BookDisplay
                key={book.title}
                book={book}
                setBookDetails={setBookDetails}
              />
            ))}
          </ul>
        </article>
        <BookDetails {...bookDetails} />
      </div>
    </section>
  )
}

export default ReadingSection
