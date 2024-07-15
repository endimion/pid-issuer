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
          Welcome to the <span style={{fontWeight:600 }}> EWCs Verifiable Credentials
          Issuance Service</span>. Our commitment to your
          privacy and the protection of your personal data is paramount. This
          disclaimer outlines our practices in collecting, using, and
          safeguarding your data in compliance with the General Data Protection
          Regulation (GDPR), with a special emphasis on our data minimization
          practices.
        </p>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Collection and Use:</h3>
        <ul>
          <li>
            To issue your Verifiable Credentials no personal identification information are requested.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Processing:</h3>
        <ul>
          <li>
            Your personal data is nor requested nor processed or stored by this service. 
          </li>
          <li>
            We ensure that data is handled securely and transiently, with no
            records made of your personal information.
          </li>
        </ul>

        <h3 style={{fontWeight:600, paddingTop: "1rem"}}>Data Sharing:</h3>
        <ul>
          <li>
            We do not retain, share, or use your data for any  purposes.
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
