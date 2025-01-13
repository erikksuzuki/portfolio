"use client";

import IconExternalPage from "@/assets/icons/common/IconExternalPage";
import Link from "next/link";

export interface BookProperties {
  coverSrc?: string;
  title?: string;
  author?: string;
  year?: string;
  description?: string;
  amazonLink?: string;
  "ISBN-10"?: string;
  pages?: number;
}

const BookDetails = (bookDetails: BookProperties) => {
  return (
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
          <h3 className="text-theme-sm capitalize">{bookDetails?.author}</h3>
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
  );
};

export default BookDetails;
