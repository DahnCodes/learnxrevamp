import { Link, useNavigate } from "react-router-dom";
import learnxx from "../assets/learnxx.png";
import { useState } from "react";
import axios from "axios";


const Register = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    try {
        event.preventDefault();
        console.log(inputs);
        const response = await axios.post("https://learnx-official-api.onrender.com/api/v1/user/signUp/", inputs, {
            headers: {
                "Content-Type": "application/json",  // Specify JSON format
                "Accept": "application/json",  // Ensure JSON response
            }
        })
        if (response.status === 200 || response.status === 201) {
            console.log(response.data);
            navigate("/complete-registration");
            setLoading(false);
        }
    } catch (error) {
        console.log(error);
        // console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
        setLoading(false);
        


    }
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <>
      <div className="auth_layout111">
      <div className="signup">
        <div className="signup__header">
          <img src={learnxx} alt="" className="loginimg" />
          <div className="signup__header__text">
          <h4> Sign Up with LearnX</h4>
          <p>Please fill the forms below to get enrolled.</p>
          </div>
        </div>
        <form className="signup_form" onSubmit={handleSubmit}>
        <div className="errorsigin">{errorMessage}</div>
          <div className="input">
            <label htmlFor="">First name</label>
            <input
              name="firstname"
              type="text"
              placeholder="Enter firstname"
              className="inputlogin"
              value={inputs.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="">Lastname</label>
            <input
              name="lastname"
              type="text"
              placeholder="Enter Lastname"
              className="inputlogin"
              value={inputs.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder=" enter email address"
              className="inputlogin"
              value={inputs.email}
              onChange={handleChange}
              

            />
          </div>

          <div className="input">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              placeholder=" enter password"
              className="inputlogin"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <label htmlFor="">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder=" enter password"
              value={inputs.confirmPassword}
              onChange={handleChange}
              className="inputlogin"
            />
          </div>

          <div className="inputdiv">
            <button className="signup__btn" type="submit">
            {loading ? "signing up..." : "sign up"}
            </button>
          </div>

          <div className="login_link">
            <p>Already have an account? </p>
            <Link to="/signin" className="loginlink">
              sign in
            </Link>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;
