import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";

import { useContext } from "react";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();

  if (entries.length === 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5 dark:text-gray-200">You don't have any cards</h1>
        <p className="text-center font-medium text-md dark:text-gray-400">
          Lets{" "}
          <Link className="text-blue-400 underline underline-offset-1 dark:text-blue-300" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className="bg-gray-300 break-words shadow-md shadow-gray-500 m-3 p-4 rounded flex flex-col justify-between dark:bg-gray-800 dark:shadow-gray-700"
          >
            <h1 className="font-bold text-sm md:text-lg dark:text-gray-100">{entry.title}</h1>
            <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3 dark:text-gray-300">
              {entry.description}
            </p>
            <section className="flex items-center justify-center flex-col md:flex-row md:flex-wrap pt-2 md:pt-0">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800"
                >
                  ✖
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
                >
                  🖊
                </button>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 mr-4 min-w-[60px] text-right">Created:</span>
                  <time className="text-right text-sm dark:text-gray-400">
                    {new Date(entry.created_at.toString()).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 mr-4 min-w-[60px] text-right">Due:</span>
                  <time className="text-right text-sm dark:text-gray-400">
                    {new Date(entry.scheduled_date.toString()).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
}
