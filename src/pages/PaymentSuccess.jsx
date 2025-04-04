import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/paymentsuccess.css";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ frontendUrl = "/dashboard" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationError, setVerificationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = localStorage.getItem("payment_reference");
      const token = localStorage.getItem("token");
      
      if (!reference) {
        setVerificationError("Payment reference missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://learnx-official-api.onrender.com/api/v1/payment/verify/${reference}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` // Add authorization header
            }
          }
        );


        const data = await response.json();
        console.log("Verification response:", data);

        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Payment verification failed");
        }

        // If we get here, verification was successful
        localStorage.removeItem("payment_reference");
        localStorage.setItem("payment_verified", "true");
      } catch (err) {
        console.error("Verification error:", err);
        setVerificationError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="payment-container">
        <h2>Verifying your payment...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      {verificationError ? (
        <>
          <h2>Payment Successful!</h2>
          <p className="error-message">
            Note: Verification encountered an issue - {verificationError}
          </p>
          <p>Your payment was processed successfully, but we couldnt verify it.</p>
        </>
      ) : (
        <>
          <h2>Payment was successful! 🎉</h2>
          <p>Thank you for your purchase.</p>
        </>
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