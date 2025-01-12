"use client";
import KindleIcon from "@/assets/kindleicon.webp";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import BookShelvesBG from "@/assets/bookcovers/ReadingSectionBG.jpg";

import clsx from "clsx";
import { truncateParagraph } from "@/utils/formatString";
import { useEffect, useState } from "react";
import Link from "next/link";
import IconExternalPage from "@/assets/icons/common/IconExternalPage";
import { books } from "src/data/books";

const bookList = books as BookDetails[];

interface BookDetails {
  coverSrc?: string;
  title?: string;
  author?: string;
  year?: string;
  description?: string;
  amazonLink?: string;
  "ISBN-10"?: string;
  pages?: number;
}
interface BookDisplayProps {
  setBookDetails: (book: BookDetails) => void;
  book: BookDetails;
}

const BookDisplay = ({ book, setBookDetails }: BookDisplayProps) => {
  const coverSrc = book.coverSrc;
  const title = book.title;
  const author = book.author;
  const year = book.year;
  const bookCoverCaption = `${title} by ${author}, ${year}`;
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setBookDetails(book);
      }}
    >
      <figure className="border-white mb-2">
        <AspectRatio.Root ratio={2 / 3} className="rounded-sm overflow-hidden">
          <img alt={title} src={coverSrc} className="w-full h-full" />
        </AspectRatio.Root>
      </figure>
      <figcaption className="text-theme-xs">
        {truncateParagraph(bookCoverCaption, 48, true)}
      </figcaption>
    </div>
  );
};

const ReadingSection = () => {
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  useEffect(() => {
    setBookDetails(bookList[0]);
  }, []);

  return (
    <section
      className="bg-black py-24"
      style={{
        backgroundImage: `url(${BookShelvesBG.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
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
          <ul className={clsx("w-full gap-3 grid grid-cols-2 md:grid-cols-3")}>
            {bookList.map((book) => (
              <BookDisplay
                key={book.title}
                book={book}
                setBookDetails={setBookDetails}
              />
            ))}
          </ul>
        </article>
        <aside className="w-full hidden md:flex items-center justify-center bg-acryllic-black rounded-lg border border-[rgba(255,255,255,0.1)]">
          <div className="md:px-8 px-4 py-8 w-full max-w-[460px]">
            {bookDetails?.["ISBN-10"] && (
              <div className="text-theme-xs opacity-40">
                ISBN-10: {bookDetails["ISBN-10"]}
              </div>
            )}
            <h2 className="text-theme-md capitalize font-bold mb-3">
              {bookDetails?.title}
            </h2>
            <div className="flex flex-row justify-between gap-x-8 items-end mb-3">
              <h3 className="text-theme-sm capitalize">
                {bookDetails?.author}
              </h3>
              <p className="text-theme-xs whitespace-nowrap">
                Published in {bookDetails?.year}
              </p>
            </div>
            <p className="text-theme-sm mb-3 whitespace-pre-line">
              {bookDetails?.description}
            </p>
            {bookDetails?.amazonLink && (
              <footer>
                <Link
                  className="text-theme-xs flex items-center justify-start gap-x-2 text-[#ffc75f] hover:text-[rgba(255,255,255,0.8)]"
                  href={bookDetails.amazonLink}
                  target="_blank"
                >
                  View book on Amazon <IconExternalPage className="w-3 h-3" />
                </Link>
              </footer>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ReadingSection;
