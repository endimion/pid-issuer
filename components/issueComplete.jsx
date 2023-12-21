import Link from "next/link";
import BackButton from "./backButton";

export default function IssueCompleted({ imageContent }) {
  return (
    <main className="mt-4 p-4 flex flex-col">
      <header className="mb-4 text-2xl font-semibold text-gray-900 text-center">
        Success
      </header>
      <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-white rounded-lg shadow-md">
        {imageContent}
        <div className="flex flex-col text-lg font-medium text-gray-900 md:ml-6 mt-4 md:mt-0">
          <h1 className="font-semibold">
            The Boarding Pass has been sent to your wallet
          </h1>
        </div>
      </div>
      <BackButton />
    </main>
  );
}
