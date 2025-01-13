import { BookProperties } from '@/components/ReadingSection/BookDetails';
import { truncateParagraph } from '@/utils/formatString';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface BookDisplayProps {
  setBookDetails: (book: BookProperties) => void;
  book: BookProperties;
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

export default BookDisplay;
