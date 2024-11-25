"use client";

import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

type HeDateParts = {
  y: string;
  m: string;
  d: string;
};

type ApiResponse = {
  gy: number;
  gm: number;
  gd: number;
  afterSunset: boolean;
  hy: number;
  hm: string;
  hd: number;
  hebrew: string;
  heDateParts: HeDateParts;
  events: string[];
};
type Hdates = {
  [key: string]: {
    hy: number;
    hm: string;
    hd: number;
    hebrew: string;
    heDateParts: HeDateParts;
    events: string[];
  };
};

type HebrewDateRange = {
  start: string;
  end: string;
  locale: string;
  hdates: Hdates;
};
export default function Home() {
  const [isRange, setIsRange] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [responseRange, setResponseRange] = useState<HebrewDateRange | null>(
    null
  );
  const [error, setError] = useState<any>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!selectedDate) {
      setError({
        selectedDate: "Date cannot be empty",
      });
      return;
    }

    setError({});
    if (isRange) {
      if (!toDate) {
        setError({
          toDate: "Date cannot be empty",
        });
        return;
      }
      axios
        .get(
          `http://localhost:3000/api/convertDate/range?startDate=${selectedDate}&toDate=${toDate}`
        )
        .then((res) => {
          setResponse(null);
          setResponseRange(res.data);
        })
        .catch((err) => {});
    } else {
      axios
        .get(`http://localhost:3000/api/convertDate?date=${selectedDate}`)
        .then((res) => {
          setResponseRange(null);
          setResponse(res.data);
        })
        .catch((err) => {});
    }
  };

  const handleClear = () => {
    setResponse(null);
    setResponseRange(null);
    setSelectedDate("");
    setToDate("");
    setError({});
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 text-gray-800">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start border border-b-4 border-gray-300 rounded-lg shadow-lg bg-white p-6 w-1/3">
        <div className="flex gap-4 p-4 bg-gray-200 rounded-lg shadow-md">
          <button
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 ${
              !isRange
                ? "bg-violet-400 hover:bg-violet-600"
                : "bg-slate-400 hover:bg-slate-600"
            }`}
            onClick={() => {
              setIsRange(false);
              handleClear();
            }}
          >
            Single
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 ${
              isRange
                ? "bg-violet-400 hover:bg-violet-600"
                : "bg-slate-400 hover:bg-slate-600"
            }`}
            onClick={() => {
              setIsRange(true);
              handleClear();
            }}
          >
            Range
          </button>
        </div>

        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="date-input"
            className="text-sm font-medium text-gray-600"
          >
            {isRange ? "Select start Date:" : "Select a Date:"}
          </label>
          <input
            value={selectedDate}
            id="date-input"
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.selectedDate}</p>
          )}
          {isRange && (
            <div>
              <label
                htmlFor="date-input"
                className="text-sm font-medium text-gray-600"
              >
                Select end Date:
              </label>
              <input
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                id="date-input"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              {error && (
                <p className="text-sm text-red-500 mt-1">{error.toDate}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-violet-500 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Convert
          </button>
        </form>

        {response && (
          <div>
            <h3>Hebrew Date: {response.hebrew}</h3>
            <p>Events: {response.events.join(", ")}</p>
          </div>
        )}
        {responseRange &&
          responseRange.hdates &&
          Object.entries(responseRange.hdates).map(([key, value]) => {
            return (
              <div key={key}>
                <div>
                  {key}: <h3>Hebrew Date: {value.hebrew}</h3>
                  <p>Events: {value.events.join(", ")}</p>
                </div>
              </div>
            );
          })}

        {(response || responseRange) && (
          <button
            onClick={handleClear}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Clear
          </button>
        )}
      </main>
    </div>
  );
}
