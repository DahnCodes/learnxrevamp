// import { Link, useNavigate } from "react-router-dom";
// import learnxx from "../assets/learnxx.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { login } from "../redux/slice/authSlice";
import "../styles/Payment.css";

const Payment = () => {
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initializePayment = async () => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Auth Token:", token);
      if (!token) {
        throw new Error("User not authenticated");
      }

      const amountInKobo = formData.amount * 100;

      const response = await axios.post(
        "https://learnx-official-api.onrender.com/api/v1/payment/pay",
        {
          email: formData.email,
          amount: amountInKobo,
          course: formData.course, // Changed from metadata.course to match typical backend expectations
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reference = response.data.data.reference; // Adjust based on actual response structure
      localStorage.setItem("payment_reference", reference);

      const successUrl = `${window.location.origin}/payment-success?reference=${reference}&email=${encodeURIComponent(formData.email)}`;
      const authorizationUrl = `${
        response.data.data.authorization_url
      }&callback_url=${encodeURIComponent(successUrl)}`;

      window.location.href = authorizationUrl

      console.log("Full API Response:", response); // Debug entire response

      if (!response.data?.data?.authorization_url) {
        // Check both common response structures
        const paymentUrl =
          response.data?.authorization_url ||
          response.data?.data?.authorization_url;

        if (!paymentUrl) {
          console.error("Unexpected response structure:", response.data);
          throw new Error(
            "Payment service unavailable. Please try again later."
          );
        }

        window.location.href = paymentUrl;
      } else {
        window.location.href = response.data.data.authorization_url;
      }
    } catch (err) {
      console.error("Detailed payment error:", {
        error: err,
        response: err.response?.data,
      });

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Payment failed. Please contact support.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initializePayment();
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <div className="modal-header">
          <h2>LearnX Payment Plan</h2>
        </div>
        <p>Kindly make tuition payment here.</p>

        <form className="payment-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Payment Amount (in Naira)</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={45000000 / 100} // Convert back to Naira
            readOnly
            onChange={handleChange}
            required
             // Shows as ₦500 (converted from kobo)
           
            min="100" // Minimum amount (₦100)
          />

          <label>What is your desired Learning course?</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a Track Option</option>
            <option value="frontend">Front-End Development</option>
            <option value="backend">Back-End Development</option>
            <option value="design">Product Design</option>
            <option value="uiux">UI/UX Design</option>
            <option value="machine">AI and Machine learning</option>
          </select>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="pay-button" disabled={isLoading}>
            {isLoading ? "Processing..." : "Make Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
