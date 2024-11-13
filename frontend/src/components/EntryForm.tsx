import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { Entry } from "../@types/context";

interface EntryFormProps {
  entry: Entry;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  toastMessage?: string;
}

export default function EntryForm({ entry, onChange, onSubmit, buttonText, toastMessage }: EntryFormProps) {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    onSubmit(e);
    setShowToast(true); // Show toast on submission
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onSubmit(event as unknown as MouseEvent<HTMLButtonElement>);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSubmit]);

  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-800 p-8 rounded-md">
      {showToast && (
        <div className="absolute bottom-12 right-1/2 translate-x-1/2 mt-4 mr-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg">
          {toastMessage}
        </div>
      )}
      <input
        className="p-3 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        type="text"
        placeholder="Title"
        name="title"
        value={entry.title}
        onChange={onChange}
      />
      <textarea
        className="p-3 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        placeholder="Description"
        name="description"
        value={entry.description}
        onChange={onChange}
      />
      <div>
        <p className="text-sm my-2">Created At:</p>
        <input
          className="p-3 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          type="date"
          name="created_at"
          value={new Date(entry.created_at).toISOString().split("T")[0]}
          onChange={onChange}
        />
      </div>
      <div>
        <p className="text-sm my-2">Due Date:</p>
        <input
          className="p-3 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
          type="date"
          name="scheduled_date"
          value={new Date(entry.scheduled_date).toISOString().split("T")[0]}
          onChange={onChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700 font-semibold text-white p-3 rounded-md"
      >
        {buttonText}
      </button>
    </section>
  );
}
