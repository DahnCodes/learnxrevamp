import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paymentsuccess.css";

const PaymentSuccess = ({ frontendUrl = "/dashboard" }) => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  
  // Get reference from both URL params and localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get("reference") || localStorage.getItem("payment_reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        console.error("No payment reference found");
        setVerificationStatus("missing_reference");
        return;
      }

      try {
        const response = await fetch(
          `https://learnx-official-api.onrender.com/api/v1/payment/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          // Update user payment status
          const userData = JSON.parse(localStorage.getItem("user"));
          if (userData) {
            userData.isPaid = true;
            localStorage.setItem("user", JSON.stringify(userData));
          }
          localStorage.removeItem("payment_reference");
          setVerificationStatus("verified");
        } else {
          setVerificationStatus("verification_failed");
          console.warn("Verification failed:", data.message);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="payment-container">
      <h2>Payment was successful! 🎉</h2>
      
      {verificationStatus === "verifying" && (
        <p>Verifying your payment... <span className="loading-spinner"></span></p>
      )}
      
      {verificationStatus === "verified" && (
        <p>Your payment has been successfully verified!</p>
      )}
      
      {(verificationStatus === "verification_failed" || 
        verificationStatus === "error" ||
        verificationStatus === "missing_reference") && (
        <p className="warning-message">
          Note: We couldnt verify your payment, but it was successful. Please contact support if you encounter any issues.
        </p>
      )}
 
      <button 
        className="backbtns"
        onClick={() => navigate(frontendUrl)}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

PaymentSuccess.propTypes = {
  frontendUrl: PropTypes.string,
};

export default PaymentSuccess;