"use client";

import Link from "next/link";

export default function MobileSideBar({ windowSize, isMenuOpen, pathname }) {
  const homeLinkText = (
    <>
      {IconSearch()}
      <span
        className="truncate mx-4 font-medium text-black text-xl"
        style={{
          color: ` ${pathname === "/" ? "white" : ""}`,
        }}
      >
        Search
      </span>
    </>
  );

  const generateTicketsLink = (
    <>
      {IconTicket()}

      <span
        className="truncate mx-4 font-medium text-black text-xl"
        style={{
          color: ` ${pathname === "/tickets/viewTickets" ? "white" : ""}`,
        }}
      >
        Tickets
      </span>
    </>
  );

  const generateBoardingPassLink = (
    <>
      {IconQrcode()}
      <span
        className="truncate mx-4 font-medium text-black text-xl"
        style={{
          color: ` ${pathname === "/tickets/issue" ? "white" : ""}`,
        }}
      >
        B.Pass
      </span>
    </>
  );

  function IconQrcode(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </svg>
    );
  }

  function IconTicket(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </svg>
    );
  }

  function IconSearch(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-20 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className={`mt-4 px-6 sm:block`}>
        <Link
          className={`flex items-center mt-4 py-2 px-6 dark:bg-opacity-25 ${
            pathname === "/" ? "bg-blue-950 dark:bg-blue-950 text-white" : ""
          }`}
          href="/"
          style={{
            backgroundColor: ` ${pathname === "/" ? "#1e1854" : ""}`,
          }}
        >
          {homeLinkText}
        </Link>
        <Link
          className={`flex items-center mt-4 py-2 px-6 dark:bg-opacity-25 ${
            pathname === "/tickets/viewTickets" ? "bg-gray-300 text-white" : "" // Highlight the active link
          }`}
          href="/tickets/viewTickets"
          style={{
            backgroundColor: ` ${
              pathname === "/tickets/viewTickets" ? "#1e1854" : ""
            }`,
          }}
        >
          {generateTicketsLink}
        </Link>
        <Link
          className={`flex items-center mt-4 py-2 px-6 dark:bg-opacity-25 ${
            pathname === "/tickets/issue" ? "bg-gray-300 text-white" : "" // Highlight the active link
          }`}
          href="#"
          style={{
            backgroundColor: ` ${
              pathname === "/tickets/issue" ? "#1e1854" : ""
            }`,
          }}
        >
          {generateBoardingPassLink}
        </Link>
        {/* Add more menu items as needed */}
      </nav>
    </aside>
  );
}
