import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/paymentsuccess.css";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ frontendUrl = "/dashboard" }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = localStorage.getItem("payment_reference");
      
      if (!reference) {
        setError("No payment reference found");
        return;
      }

      try {
        const response = await fetch(
          `https://learnx-official-api.onrender.com/api/v1/payment/verify/${reference}`
        );

        if (!response.ok) {
          throw new Error("Payment verification failed");
        }

        const data = await response.json();
        console.log("Payment Verification Data:", data);

        if (data.status === "success") {
          setIsVerified(true);
          // Clear the reference after successful verification
          localStorage.removeItem("payment_reference");
          
          // Store payment verification in localStorage
          localStorage.setItem("payment_verified", "true");
        } else {
          throw new Error(data.message || "Payment verification unsuccessful");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(err.message);
        // Removed the navigate("/payment") call here
      }
    };

    verifyPayment();
  }, [navigate]);

  if (error) {
    return (
      <div className="payment-container">
        <h2>Payment Verification Failed</h2>
        <p className="error-message">{error}</p>
        <button 
          className="backbtns"
          onClick={() => navigate("/payment")}
        >
          Return to Payment
        </button>
        <button 
          className="backbtns"
          onClick={() => navigate(frontendUrl)}
          style={{ marginTop: "10px" }}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="payment-container">
        <h2>Verifying your payment...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Payment was successful! 🎉</h2>
      <p>Click the button below to return to the dashboard.</p>
      <button 
        className="backbtns"
        onClick={() => navigate(frontendUrl)}
      >
        Click here to return to the Homepage
      </button>
    </div>
  );
};

PaymentSuccess.propTypes = {
  frontendUrl: PropTypes.string,
};

export default PaymentSuccess;