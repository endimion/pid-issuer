"use client";

import { useEffect, useState } from "react";
import FullConsentModal from "./fullConsentModal.jsx";
import Cookies from "js-cookie";

export default function ConsentModalMinimal() {
  const [userConsent, setUserConsent] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [showFullConsent, setShowFullConset] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const consent = Cookies.get("consent"); // Access cookies on the client-side only
    if (consent) {
      setUserConsent(true);
    }
    // Set isChecking to false regardless of the cookie's value to complete the check
    setIsChecking(false);
  }, []); // Empty dependency array to run only once on component mount

  const onClose = () => {
    setShouldHide(true);
  };

  const handleAgreeAndProceed = () => {
    console.log("User agreed and wants to proceed.");
    Cookies.set("consent", true);
    setUserConsent(true);
    onClose();
  };

  const handleReadDisclaimer = () => {
    console.log("User wants to read the full disclaimer.");
    // Implement the redirect or modal display logic here
    setShouldHide(true);
    setShowFullConset(true);
  };

  // Render nothing or a loader until the check is complete
  if (isChecking) {
    return null; // or replace with a loader if desired
  }

  if (shouldHide || userConsent) {
    if (showFullConsent) {
      return <FullConsentModal initialState={true} />;
    } else return null;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          width: "500px",
          padding: "20px",
          border: "none",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "justify", // Text is justified
          fontFamily: "'Arial', sans-serif",
          color: "#333",
        }}
      >
        <h2
          style={{ color: "#E31B23", textAlign: "center", fontSize: "x-large" }}
        >
          Privacy Notice
        </h2>
        <p>
          Before you proceed, we want to ensure you `&apos;`re informed about how we
          handle your data in compliance with the GDPR:
        </p>
        <ul style={{ textAlign: "left" }}>
          {" "}
          {/* Use unordered list for bullet points */}
          <li style={{ paddingTop: "1rem" }}>
            <strong>Your Privacy Matters:</strong> We only use your booking
            reference (PNR) and surname to verify your booking and issue your
            boarding pass. Your data is processed securely and not stored beyond
            your session.
          </li>
          <li style={{ paddingTop: "1rem" }}>
            <strong>Consent is Key:</strong> By using our service, you consent
            to this limited use of your personal data. You have rights under the
            GDPR, including withdrawing your consent at any time.
          </li>
          <li style={{ paddingTop: "1rem" }}>
            <strong>Learn More:</strong> We encourage you to read our full Data
            Protection and Privacy Disclaimer for detailed information on our
            data handling practices.
          </li>
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <button
            onClick={handleAgreeAndProceed}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#E31B23",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            I Agree and Proceed
          </button>
          <button
            onClick={handleReadDisclaimer}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#0056B3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Read Full Disclaimer
          </button>
        </div>
      </div>
    </div>
  );
}
