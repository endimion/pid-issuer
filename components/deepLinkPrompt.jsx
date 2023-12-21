import Link from "next/link";
import BackButton from "./backButton";
import { Button } from "./ui/button";

export default function DeeplinkPrompt({ deepLink }) {
  return (
    <main className="mt-4 p-4 flex flex-col">
      <header className="mb-4 text-2xl font-semibold text-gray-900 text-center">
        Click the "Connect Wallet" button to open your EUDI Wallet and receive
        your Boarding Pass.
      </header>
      <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-white rounded-lg shadow-md">
        <Button
          className="mt-4 bg-blue-950 text-white"
          variant="outline"
          onClick={ ()=>{
            window.location=deepLink
          }}
        >
          Connect Wallet
        </Button>

        <div className="flex flex-col text-lg font-medium text-gray-900 md:ml-6 mt-4 md:mt-0">
          <h1 className="font-semibold">
            Don't have a Wallet yet? Follow the next steps:
          </h1>
          <ul className="list-decimal list-inside mt-4">
            <li>
              Download the GATACA Wallet app from the
              <div className="mt-2 flex flex-col md:flex-row">
                <Link className="underline text-blue-500" href="#">
                  Google Play Store
                </Link>
                <span className="mx-2 hidden md:inline">or</span>
                <Link className="underline text-blue-500" href="#">
                  Apple App Store
                </Link>
              </div>
            </li>
            <li>
              With the GATACA Wallet installed, click the "Connect Wallet" button to receive your 
              Boarding Pass.
            </li>
          </ul>
        </div>
      </div>
      <BackButton />
    </main>
  );
}
