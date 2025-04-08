import { FaArrowRight } from "react-icons/fa";

import Ellipse2 from "./assets/Ellipse2.png";
import Ellipse22 from "./assets/Ellipse22.png";
import Ellipse222 from "./assets/Ellipse222.png";
import Ellipse23 from "./assets/Ellipse23.png";
import Ellipse24 from "./assets/Ellipse24.png";

import "./App.css";

// import Ada from "./assets/Ada.png";
// import book from "./assets/book.png";
// import teacher from "./assets/teacher.png";
// import monitor from "./assets/monitor.png";
// import brifecase from "./assets/brifecase.png";
// import Ellipse11 from "./assets/Ellipse11.png";
// import Ellipse12 from "./assets/Ellipse12.png";
import heroo from "./assets/bghero.png";
import sides from "./assets/sides.png";
import young from "./assets/young.png";
import smiley from "./assets/smiley.png";
import { FaRegPlayCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Man2 from "./assets/Man2.png";
import Vector6 from "./assets/Vector6.png";
import fill1 from "./assets/fill1.png";
import fill2 from "./assets/fill2.png";
import fill from "./assets/fill.png";
import Group88 from "./assets/Group88.png";
import frontend from "./assets/frontend.png";
import backend from "./assets/backend.png";
import data from "./assets/data.png";
import machine from "./assets/machine.png";
import product from "./assets/product.png";
import caser from "./assets/case.png";
import { FaArrowRightLong } from "react-icons/fa6";

function Landingpage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="landing">
        <div className="Divland">
          <div className="side-container">
            <div className="side-illu">
              <img src={sides} className="sides" />
            </div>
          </div>
          <div className="Divland1">
            <div className="Div">
              <h1>Learn, Grow, Succeed</h1>

              <p>
                Are you in interested in learning a digital skill to sharpen
                your Knowledge and get you prepared for a skilled work career?
              </p>
            </div>
            <div className="Divland2">
              <button className="Buta" onClick={() => navigate("/signup")}>
                Get Started <FaArrowRightLong />
              </button>
              <button className="Butb">Get free trial</button>
            </div>
            <div className="Divland3">
              <div className="Divland6">
                <h5>5+</h5>
                <p>Courses to choose from </p>
              </div>
              <div className="Divland6">
                <h5>2700+</h5>
                <p>Students Trained </p>
              </div>

              <div className="Divland6">
                <h5>2k+</h5>
                <p>Successful Stories</p>
              </div>
            </div>
          </div>

          <div className="hero-container">
            <img src={heroo} className="heroo" />
          </div>
          {/* <div className="Divland4">
            <img src={Ada} alt="" className="img11" />
            <img src={book} alt="" className="img12" />
            <img src={brifecase} alt="" className="img13" />
            <img src={teacher} alt="" className="img14" />
            <img src={monitor} alt="" className="img15" />
            <img src={Ellipse11} alt="" className="img16" />
            <img src={Ellipse11} alt="" className="img17" />
            <img src={Ellipse11} alt="" className="img18" />
            <img src={Ellipse11} alt="" className="img19" />
            <img src={Ellipse12} alt="" className="img20" />
            <img src={Ellipse12} alt="" className="img21" />
            <img src={Ellipse12} alt="" className="img22" />
            <img src={Ellipse12} alt="" className="img23" />
          </div> */}
        </div>

        <div className="dozi">
          <div className="dozi1">
            <h3>About Us</h3>
            <h2>Unlock your potential with LearnX</h2>
            <p>
              LearnX, an initiative of Genesys academy , it is a 6 months
              internship program designed to raise{" "}
            </p>
            <p className="about_p">
              world class talents in the tech and innovation industry.
            </p>
          </div>

          <div className="about_img">
            <div>
              <img src={young} alt="" className="about2" />
            </div>
            <div className="about33">
              <div className="about4">
              <img src={caser} className="case"/>
                {/* <h4>What we do</h4> */}
                <p>
                  We primarily educate and groom software developers and
                  designers, preparing them for the industry, with flexible
                  learning paths, interactive contents and user- friendly
                  interface, we ensure that each Clients have the opportunity to
                  thrive at their own pace.
                </p>
              </div>
            </div>
            <div className="about5">
              <img src={smiley} alt="" className="about3" />
              <button className="aboutb">
                Play demo <FaRegPlayCircle className="play"/>{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="explore">
          <h2>Explore our courses</h2>
          <div className="explore2">
            <p>
              We offer the best trending courses for training individuals in
              search of a digital skill that{" "}
            </p>
            <p>are currently in demand.</p>
          </div>
          <div className="courses">
            <div className="card_container">
              <div className="card">
                <img src={product} alt="" className="cardimg1" />

                <div className="card-text">
                  <h5>Product Design</h5>
                  <p>
                    Learn to transform ideas into digital <br /> solutions with
                    good asthetics{" "}
                  </p>
                  <Link to={"/product-design"} className="link">
                    View more <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card_container">
              <div className="card">
                <img src={frontend} alt="" className="cardimg1" />
                <div className="card-text">
                <h5>Front End Development</h5>
                <p>
                  Learn Javascript, HTML ,CSS etc to <br />
                  develop amazing websites
                </p>
                <Link to={"Frontend"} className="link">
                  View more <FaArrowRight />
                </Link>

                </div>
              </div>
            </div>

            <div className="card_container">
              <div className="card">
                <img src={backend} alt="" className="cardimg1" />

                <div className="card-text">
                <h5>Back End Development</h5>
                <p>
                  Learn Design patterns, API’s, OOP and <br />
                  advanced topics for web development
                </p>
                <Link
                  to={"/Backend"}
                  className="link"
                  onClick={() => navigate("/backend")}
                >
                  View more <FaArrowRight />
                </Link>

                </div>
              </div>
            </div>

            <div className="card_container">
              <div className="card">
                <img src={data} alt="" className="cardimg1" />
                <div className="card-text">
                <h5>Data Analysis</h5>
                <p>
                  Learn to use statistics and data <br />
                  visualization to make real world impact
                </p>
                <Link to={"/Dataanalysis"} className="link">
                  View more <FaArrowRight />
                </Link>

                </div>
              </div>
            </div>

            <div className="card_container">
              <div className="card">
                <img src={machine} alt="" className="cardimg1" />
                <div className="card-text">
                <h5>AI & Machine Learning</h5>
                <p>
                  Learn to use data into computer <br />
                  programs that form realistic figures
                </p>
                <Link to={"AIMachineLearning"} className="link">
                  View more <FaArrowRight />
                </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="choose">
          <div className="choose1">
            <div className="choose2">
              <h4>Why choose us</h4>
              <h3>Benefits of choosing LearnX </h3>
              <p>
                With LearnX you get th best of academic minds and quality
                learning at its Peak and
              </p>
              <p>so much more.</p>
            </div>
          </div>

          <div className="choose3">
            <div>
              <img src={Man2} alt="" className="man2" />
            </div>

            <div className="choose4">
              <div className="expert">
                <div className="expert_container">
                  <img src={Vector6} alt="" className="expert1" />
                </div>
                <div className="expert-text">
                  <h5>Expert Instructors</h5>
                  <p>Learn from industry experts dedicated to your success.</p>
                </div>
              </div>
              <div className="expert">
                <div className="expert_container">
                  <img src={fill1} alt="" className="expert1" />
                </div>
                <div className="expert-text">
                  <h5>Flexible Schedule</h5>
                  <p>Learn at your own pace with flexible scheduling.</p>
                </div>
              </div>

              <div className="expert">
                <div className="expert_container">
                  <img src={Group88} alt="" className="expert1" />
                </div>
                <div className="expert-text">
                  <h5>Certification</h5>
                  <p>Earn a recognized certificate upon course completion.</p>
                </div>
              </div>

              <div className="expert">
                <div className="expert_container">
                  <img src={fill2} alt="" className="expert1" />
                </div>
                <div className="expert-text">
                  <h5>Engaging Sessions</h5>
                  <p>Having study sessions that are engaging and concise.</p>
                </div>
              </div>

              <div className="expert">
                <div className="expert_container">
                  <img src={fill} alt="" className="expert1" />
                </div>
                <div className="expert-text">
                  <h5>Affordability</h5>
                  <p>
                    Learn at an affordable price in order for you to pursue you
                  career goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials">
          <div className="testimonials1">
            <h4>Testimonials</h4>
            <h3>What Our Students Say ?</h3>
          </div>
          <div className="testimonials2">
            <div className="testimonials3">
              <div className="testimonials4">
                <img src={Ellipse2} alt="" />
                <div>
                  <p>Malcom Anthony</p>
                  <img src={Ellipse24} alt="" />
                </div>
              </div>
              <div className="testimonials5">
                <p>
                  {" "}
                  I learnt so much during the duration of my course, the
                  instructors are clear and concise. I can develop web app and
                  websites thanks to LearnX.
                </p>
              </div>
            </div>

            <div className="testimonials3">
              <div className="testimonials4">
                <img src={Ellipse22} alt="" />
                <div>
                  <p>Samantha Albert</p>
                  <img src={Ellipse24} alt="" />
                </div>
              </div>
              <div className="testimonials5">
                <p>
                  {" "}
                  The UI/UX courses are always engaging, making you think hard
                  and deep for solutions. i am glad am better than when i first
                  got in thanks to LearnX program.
                </p>
              </div>
            </div>

            <div className="testimonials3">
              <div className="testimonials4">
                <img src={Ellipse222} alt="" />
                <div>
                  <p>Chimaobi Daniel</p>
                  <img src={Ellipse24} alt="" />
                </div>
              </div>
              <div className="testimonials5">
                <p>
                  {" "}
                  The program helped me understand CapCu and Canva. the
                  instructor and study materials made everything easy, Highly
                  Recommendable.{" "}
                </p>
              </div>
            </div>

            <div className="testimonials3">
              <div className="testimonials4">
                <img src={Ellipse23} alt="" />
                <div>
                  <p>Princess Mathew</p>
                  <img src={Ellipse24} alt="" />
                </div>
              </div>
              <div className="testimonials5">
                <p>
                  {" "}
                  This program is amazing, i learn Ai machine and now i can
                  apply it in my business and make more profit, i highly
                  recommend this program.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="subscribe1">
          <div className="subscribe">
            <h3>Subscribe for LearnX updates</h3>
            <p>
              Join our mailing list to receive information about our work and
              new learning opportunities.
            </p>
          </div>
          <form className="subscribe_form">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
