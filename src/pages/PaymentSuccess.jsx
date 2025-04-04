import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/paymentsuccess.css";

const PaymentSuccess = ({ frontendUrl = "/dashboard" }) => {
  const navigate = useNavigate();
  
  // Get reference from both URL params and localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get("reference") || localStorage.getItem("payment_reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        console.error("No payment reference found");
        navigate("/payment");
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
        } else {
          navigate("/payment");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/payment");
      }
    };

    verifyPayment();
  }, [reference, navigate]);

  return (
    <div className="payment-container">
      <h2>Payment was successful! 🎉</h2>
      <p>Click the button below to return to the dashboard.</p>
      <a href={frontendUrl} rel="noreferrer noopener">
        <button className="backbtns">
          Click here to return to the Homepage
        </button>
      </a>
    </div>
  );
};

PaymentSuccess.propTypes = {
  frontendUrl: PropTypes.string,
};

export default PaymentSuccess;