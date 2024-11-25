"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isRange, setIsRange] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 text-gray-800">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start border border-b-4 border-gray-300 rounded-lg shadow-lg bg-white p-6 w-1/3">
        <div className="flex gap-4 p-4 bg-gray-200 rounded-lg shadow-md">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => {
              setIsRange(false);
            }}
          >
            Single
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
            onClick={() => setIsRange(true)}
          >
            Range
          </button>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-md">
          <label
            htmlFor="date-input"
            className="text-sm font-medium text-gray-600"
          >
            {isRange ? "Select start Date:" : "Select a Date:"}
          </label>
          <input
            id="date-input"
            type="date"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          {isRange && (
            <div>
              <label
                htmlFor="date-input"
                className="text-sm font-medium text-gray-600"
              >
                Select end Date:
              </label>
              <input
                id="date-input"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-violet-500 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Convert
          </button>
        </form>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-700">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-violet-500"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-violet-500"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-violet-500"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
