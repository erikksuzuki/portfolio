"use client";
import KindleIcon from "@/assets/kindleicon.webp";
import PerennialPhilosophy from "@/assets/bookcovers/perennialphilosophy.jpg";
import Gold from "@/assets/bookcovers/gold.jpg";
import DiamondCutter from "@/assets/bookcovers/diamondcutter.jpg";
import LastDefenderOfCamelot from "@/assets/bookcovers/lastdefenderofcamelot.jpg";
import LordOfLightCover from "@/assets/bookcovers/LordOfLightCover.jpg";
import Kybalion from "@/assets/bookcovers/kybalion.jpg";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import BookShelvesBG from "@/assets/bookcovers/ReadingSectionBG.jpg";

import clsx from "clsx";
import { truncateParagraph } from "@/utils/formatString";
import { useEffect, useState } from "react";
import Link from "next/link";
import IconExternalPage from "@/assets/icons/common/IconExternalPage";

const bookList = [
  {
    coverSrc: PerennialPhilosophy.src,
    title:
      "The Perennial Philosophy: An Interpretation of the Great Mystics, East and West",
    author: "Aldous Huxley",
    year: "1945",
    description: `"The Perennial Philosophy," Aldous Huxley writes, "may be found among the traditional lore of peoples in every region of the world, and in its fully developed forms it has a place in every one of the higher religions."`,
    amazonLink: `https://www.amazon.com/Perennial-Philosophy-Aldous-Huxley/dp/0061724947/`,
    "ISBN-10": "0061724947",
    pages: 352,
  },
  {
    coverSrc: Gold.src,
    title: "Gold: The Final Science Fiction Collection",
    author: "Isaac Asimov",
    year: "1992",
    description: `Gold is the final and crowning achievement of the fifty-year career of science fiction's transcendent genius, the world-famous author who defined the field of science fiction for its practitioners, its millions of readers, and the world at large.\n\nThe first section contains stories that range from the humorous to the profound, at the heart of which is the title story, "Gold," a moving and revealing drama about a writer who gambles everything on a chance at immortality: a gamble Asimov himself made -- and won. \n\nThe second section contains the grand master's ruminations on the SF genre itself. And the final section is comprised of Asimov's thoughts on the craft and writing of science fiction.`,
    amazonLink:
      "https://www.amazon.com/Gold-Final-Science-Fiction-Collection/dp/0060556528",
    "ISBN-10": "0060556528",
    pages: 416,
  },
  {
    coverSrc: DiamondCutter.src,
    title:
      "The Diamond Cutter: The Buddha on Managing Your Business and Your Life",
    author: "Geshe Michael Roach, Lama Christie McNally",
    year: "2009",
    description: `With a unique combination of ancient and contemporary wisdom from Tibetan Buddhism, The Diamond Cutter presents readers with empowering strategies for success in their personal and professional lives.\n\nThe book is presented in three layers. The first is a translation of The Diamond Sutra, an ancient text of conversations between the Buddha and his close disciple, Subhuti. The second contains quotes from some of the best commentaries in the Tibetan Buddhist tradition. And the third layer, the main text, is the practical application of Buddhist philosophies to the world of business, based upon Geshe Michael Roach's seventeen-years of experience as an employee of the Andin International Diamond Corporation, a company that grew during his tenure from four employees to a world leader in the jewelry industry.\n\nRoach’s easy style and spiritual understanding make The Diamond Cutter an invaluable source of timeless wisdom for those familiar or unfamiliar with Tibetan Buddhism. His focus on practical personal and business applications has resonated with and changed the lives of hundreds of thousands of individuals the world over since its original publication.`,
    amazonLink: `https://www.amazon.com/Diamond-Cutter-Buddha-Managing-Business/dp/038552868X/`,
    "ISBN-10": "9780385528689",
    pages: 288,
  },
  {
    coverSrc: LordOfLightCover.src,
    title: "Lord of Light",
    author: "Roger Zelazny ",
    year: "1967",
    description: `Earth is long since dead. On a colony planet, a band of men has gained control of technology, made themselves immortal, and now rule their world as the gods of the Hindu pantheon.\n\nOnly one dares oppose them: he who was once Siddhartha and is now Mahasamatman. Binder of Demons, Lord of Light.\n\nHis followers called him Mahasamatman and said he was a god. He preferred to drop the Maha- and the -atman, however, and called himself Sam. He never claimed to be a god, but then he never claimed not to be a god.\n\nA holy war rages across the heavens and mankind’s fate hangs in the balance.`,
    amazonLink: `https://www.amazon.com/Lord-Light-Roger-Zelazny/dp/0060567236/`,
    "ISBN-10": "0060567236",
    pages: 304,
  },
  {
    coverSrc: LastDefenderOfCamelot.src,
    title: "Last Defender of Camelot",
    author: "Roger Zelazny",
    year: "2003",
    description: `A collection of short fiction by the Hugo and Nebula Award-winning author includes the never-before-collected "Come Back to the Killing Ground, Alice, My Love," as well as "For a Breath I Tarry," "Go Starless in the Night," "Unicorn Variations," "Permafrost," "Home Is the Hangman," and "24 Views of Mt. Fuji, by Hokusai."`,
    amazonLink: `https://www.amazon.com/Last-Defender-Camelot-Roger-Zelazny/dp/074347970X/`,
    "ISBN-10": "074347970X",
    pages: 416,
  },
  {
    coverSrc: Kybalion.src,
    title: "The Kybalion: Centenary Edition",
    author: "Three Initiates",
    year: "2018",
    description: `For generations, readers have debated the origins and studied the knowledge of this mysterious exploration of Hermetic wisdom, attributed to "Three Initiates."\n\nNow in its second century, The Kybalion is restored to hardcover in a commemorative volume that evokes the appearance of the occult landmark's first edition.\n\nThe new introduction by Richard Smoley, a celebrated scholar of mystical traditions, makes this a historical keepsake.`,
    amazonLink: `https://www.amazon.com/Kybalion-Centenary-Three-Initiates/dp/0143131680/`,
    "ISBN-10": "0143131680",
    pages: 176,
  },
];

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
  const amazonLink = book.amazonLink ?? "";
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
              <div className="block">
                <h3 className="text-theme-sm capitalize">
                  {bookDetails?.author}
                </h3>
              </div>
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
