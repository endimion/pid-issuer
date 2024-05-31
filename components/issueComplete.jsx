"use client"

import Link from "next/link";
import BackButton from "./backButton";

export default function IssueCompleted({
  imageContent,
  Continue,
  id,
  Terminate,
}) {
  let button = Continue ? (
    <Link href={`/passports?id=${id}`} passHref>
      <button
        className={`mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
      >
        Issue Passport &rarr;
      </button>
    </Link>
  ) : (
    <BackButton />
  );
  if (Terminate) {
    button = (
      <Link href={`https://stg-ewcpilot-staging.kinsta.cloud/`} passHref>
        <button
          className={`mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
        >
          Return to Mirco-site &rarr;
        </button>
      </Link>
    );
  }

  let completeMessage = Continue
    ? " The PID Credential has been sent to your wallet"
    : " The ePassport Credential has been sent to your wallet";

  return (
    <main className="mt-4 p-4 flex flex-col items-center justify-center">
      <header className="mb-4 text-2xl font-semibold text-gray-900 text-center">
        Success
      </header>
      <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-white rounded-lg shadow-md">
        {imageContent}
        <div className="flex flex-col text-lg font-medium text-gray-900 md:ml-6 mt-4 md:mt-0">
          <h1 className="font-semibold">{completeMessage}</h1>
        </div>
      </div>
      <div className="mt-4 flex justify-center">{button}</div>
    </main>
  );
}
