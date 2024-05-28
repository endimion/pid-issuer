"use client";

import { useState } from "react";

export default function FullConsentModal({initialState, consentClose}) {
  const [shouldHide, setShouldHide] = useState(!initialState);

  const onClose = () => {
    if(consentClose) consentClose()
    setShouldHide(true);
  };

  const handleAgreeAndProceed = () => {
    console.log("User agreed and wants to proceed.");
    onClose();
  };


  if (shouldHide) return null;

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
        alignItems: "flex-start", // changed from center to flex-start
        justifyContent: "center",
        zIndex: 1000,
        overflowY: "auto", // Add this line to enable vertical scrolling if needed
        paddingTop: "10vh", // Add some padding at the top so the modal doesn't stick to the top of the screen
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
          overflowY: "auto",
        }}
      >
        <h2
          style={{ color: "#E31B23", textAlign: "center", fontSize: "x-large" }}
        >
          Data Protection and Privacy Disclaimer
        </h2>
        <p style={{paddingTop: "1rem"}}>
          Welcome to the <span style={{fontWeight:600 }}>University of the Aegean `&apos;` s Verifiable Credentials
          Issuance Service for Ferry Boarding passes</span>. Our commitment to your
          privacy and the protection of your personal data is paramount. This
          disclaimer outlines our practices in collecting, using, and
          safeguarding your data in compliance with the General Data Protection
          Regulation (GDPR), with a special emphasis on our data minimization
          practices.
        </p>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Collection and Use:</h3>
        <ul>
          <li>
            To issue your verifiable boarding pass, we require you to submit
            your booking reference (PNR) and surname. This information is used
            exclusively during your current session for the purpose of verifying
            your booking with Cyclades Fast Ferries and issuing the relevant
            boarding pass as a verifiable credential directly to your wallet.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Processing:</h3>
        <ul>
          <li>
            Your personal data is processed in real-time and is not stored in
            any of our systems beyond the duration of your session. Our
            processing is strictly limited to the verification and issuance
            operations necessary to provide you with the boarding pass.
          </li>
          <li>
            We ensure that data is handled securely and transiently, with no
            permanent records made of your personal information.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Sharing:</h3>
        <ul>
          <li>
            Your data is shared only with Cyclades Fast Ferries for the sole
            purpose of verifying your booking.
          </li>
          <li>
            We do not retain, share, or use your data for any other purposes.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Security:</h3>
        <ul>
          <li>
            Despite not storing your data, we implement robust security measures
            during the processing to protect your data from unauthorized access
            or misuse.
          </li>
          <li>
            Access to data during processing is restricted to authorized
            personnel committed to confidentiality.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Legal Basis and Your Rights:</h3>
        <ul>
          <li>
            The processing of your data is based on your explicit consent,
            required for the issuance of your verifiable boarding pass.
          </li>
          <li>
            You retain full rights under GDPR, including the right to access,
            rectify, or object to the processing of your personal data. Given
            our non-storage policy, some rights such as deletion are inherently
            respected by the design of our service.
          </li>
        </ul>

        <p style={{fontWeight:600, paddingTop: "1rem"}}>Changes to Our Disclaimer:</p>
        <p>
          This disclaimer may be updated to reflect changes in our processing
          activities or in response to legal requirements. We encourage you to
          review it regularly.
        </p>

        <p>
          By using our service, you acknowledge that you have read and
          understood this data protection and privacy disclaimer.
        </p>
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
