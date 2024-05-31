import Link from "next/link";
import BackButton from "./backButton";

export default function QRPrompt({ qrContent, Continue }) {
  let credTtype = Continue ? "PID" : "ePassport";

  return (
    <main className="flex flex-col items-center justify-center w-full  p-12 bg-gray-100">
      <header className="mb-8 text-3xl font-semibold text-gray-900 text-center">
        Scan the QR code with your wallet to receive your {`${credTtype}`}
      </header>
      <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        {qrContent}
        <div className="flex flex-col text-lg font-medium text-gray-900 md:ml-6 mt-4 md:mt-0">
          <h1 className="font-semibold text-purple-900">
            Don&apos;t have a Wallet yet? Follow the next steps:
          </h1>
          <ul className="list-decimal list-inside mt-4">
            <li>
              Download an EWC Conformant Wallet app
              <Link className="underline text-blue-500 ml-1" href="#">
                HERE
              </Link>
            </li>
            <li className="mt-2">
              With the newly installed EWC conformant Wallet, scan the QR code
              on the left to accept the {`${credTtype}`} Credential on your
              mobile device.
            </li>
          </ul>
        </div>
      </div>
      <BackButton className="mt-8" />
    </main>
  );
}
