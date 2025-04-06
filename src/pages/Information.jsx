import { useEffect, useState } from "react";
import "../styles/Information.css";
import learnxx from "../assets/learnxx.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Information = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dayofbirth: "",
    monthofbirth: "",
    yearofbirth: "",
    gender: "",
    phone: "",
    address: "",
    track: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "https://learnx-official-api.onrender.com/api/v1/enroll/signUp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if ([200, 201].includes(response.status)) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const options = [
    "frontend",
    "backend",
    "product-design",
    "data-analysis",
    "artificial-intelligence",
  ];

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="form-container">
      <div className="form-header">
        <img src={learnxx} alt="Logo" className="form-logo" />
        <h2>Information Data</h2>
        <p>Complete your registration to get started</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="formgroup">
          <div className="formgroupfist">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formgroupfist">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="display_none">
            <input
              type="hidden"
              name="email"
              value={formData.email}
            />
          </div>
        </div>

        {/* Date of Birth Fields */}
        <div className="formgroupsec">
          <div className="groupagecon">
            <label>Date of Birth</label>
            <div className="formgroupage">
              <input
                type="text"
                name="dayofbirth"
                placeholder="DD"
                value={formData.dayofbirth}
                onChange={handleChange}
                maxLength="2"
                required
              />
              <input
                type="text"
                name="monthofbirth"
                placeholder="MM"
                value={formData.monthofbirth}
                onChange={handleChange}
                maxLength="2"
                required
              />
              <input
                type="text"
                name="yearofbirth"
                placeholder="YYYY"
                value={formData.yearofbirth}
                onChange={handleChange}
                maxLength="4"
                required
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="gendercon">
            <label>Gender</label>
            <div className="formgroupgender">
              <div className="genderoptions">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    required
                  />
                  Man
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Woman
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="formgroup">
          <div className="formgroupfist">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formgroupfist">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Track Selection */}
        <div>
          <div className="divinfoinput">
            <select
              name="track"
              value={formData.track}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select an option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option.split("-").map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button type="submit" className="submitbtninfo" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Information;