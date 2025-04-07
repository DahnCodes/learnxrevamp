import { LuClipboardList } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
// import { SlScreenDesktop } from "react-icons/sl";

import Frame2017 from "../assets/Frame2017.png";
import Frame2016 from "../assets/Frame2016.png";
import Group151 from "../assets/Group151.png";
import { FaArrowRight } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { useState } from "react";
import "../styles/CustomCalendar.css";
import "../styles/Dashboardstyle.css";
import { CgScreen } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Week3Courses from "../components/Week3Courses";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // const [value, setvalue] = useState(new Date());
  // const [date, setDate] = useState(new Date(2025, 2, 14)); // Default to 14th March 2025
  const [currentTrack, setCurrentTrack] = useState("Your Course");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Format track name for display
  useEffect(() => {
    const selectedTrack = 
    user?.track || 
    localStorage.getItem("selected_course_track");
    
    const trackNames = {
      frontend: "frontend",
      backend: "backend",
      design: "Product Design",
      uiux: "UI/UX Design",
      machine: "AI and Machine Learning"
    };

    setCurrentTrack(
      selectedTrack ? trackNames[selectedTrack] || "Your Course" : "Your Course"
    );
  }, [user]);
  useEffect(() => {
    console.log("Current track sources:", {
      reduxUser: user,
      localStorageTrack: localStorage.getItem("selected_course_track"),
      currentTrack: currentTrack
    });
  }, [user, currentTrack]);
  return (
    <>
      <div className="dashboardfist">
        <div className="dashboardsec">
          <h3>Hi, {user?.firstname}</h3>

          <div className="dashboardflex">
            <div className="dashcard">
              <div>
              <p>{currentTrack} (Stats)</p>
                <hr />
              </div>

              <div className="dashp1">
                <LuClipboardList />
                <p> 18Hours|</p>
                <CiClock2 />
                <p>96Hours</p>
              </div>
              <div className="dashcarddiv">
                <div className="dashcarddiv2">
                  <h4>6 Hhrs</h4>
                  <h6>Total hours Completed</h6>
                </div>

                <div>
                  <img src={Frame2017} alt="" />
                </div>
              </div>
            </div>

            <div className="dashcard1">
              <div>
                <p>My Mentors</p>
                <hr />
              </div>

              <div className="meantorptag">
                <p className="ppp">3</p>
                <p>Assigned Mentors</p>
              </div>
              <div className="dashcarddiv22">
                <img src={Frame2016} alt="" />
                <img src={Frame2017} alt="" />
              </div>
            </div>

            <div className="dashcard2">
              <div>
                <p>Certification</p>
                <hr />
              </div>
              <div className="meantorptag">
                <p className="ppp">3/18</p>
                <p>Course completion</p>
              </div>
              <div className="dashcarddiv23">
                <img src={Group151} alt="" className="certimg" />
                <img src={Frame2017} alt="" className="certimg2" />
              </div>
            </div>
          </div>

          <div className="dashcourse">
            <div className="courz_container">
              <Week3Courses />
            </div>

            <div className="dashtopic">
              <div>
                <h3>This Week Topic</h3>
                <hr />
              </div>
              <div>
                <h3>Lesson 02: Ideation</h3>
                <p>
                  This course is highly interactive with project checklist ,
                  built to make it exciting and innovating.
                </p>
              </div>
              <div className="dashtopic2">
                <div>
                  <img src={<CgScreen />} alt="" />
                  <div>
                    <p>Few Mins</p>
                    <p>Duration</p>
                  </div>
                </div>

                <div>
                  <Link className="linktopic">
                    Start Course
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="communitydiv">
            <div>
              <p>Join Our LearnX Community</p>
              <hr />
            </div>
            <div>
              <p>Join Our community and interact with other LearnX interns</p>
            </div>
            <div>
              <button className="communitybut">Coming Soon</button>
            </div>
          </div>
        </div>

        <div className="calenderdiv">
          <div className="calle">
            <Calendar
              tileClassName={({ date, view }) => {
                // Highlight the default date
                if (
                  view === "month" &&
                  date.getDate() === 14 &&
                  date.getMonth() === 2 && // March (0-based index)
                  date.getFullYear() === 2025
                ) {
                  return "highlight-date";
                }
              }}
            />
          </div>

          <div className="dateandt">
            <h5>Date:</h5>
            <h5>Time:</h5>
          </div>

          <div>
            <hr />
            <div className="taskdead">
              <h5>
                Task Submission Deadline <br />
                (Wk2)
              </h5>

              <div>
                <h5>Date:</h5>
                <h5>Time:</h5>
              </div>
            </div>
          </div>

          <div className="subtask">
            <div>
              <h5>Task Link</h5>
            </div>
            <div className="subtask2">
              <input type="text" placeholder="Input Task link Here" />
              <button>Subit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
