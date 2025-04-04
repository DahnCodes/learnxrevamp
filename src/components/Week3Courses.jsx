import "../styles/Week3Courses.css";

const courses = [
  { name: "Front End", color: "#c653ff", skill: "JavaScript" },
  { name: "Product Design", color: "#ff4d4d", skill: "Ideation" },
  { name: "Back End", color: "#00cc66", skill: "JavaScript" },
  { name: "Data Analysis", color: "#6699ff", skill: "Spreadsheets" },
  { name: "AI/ Machine.L", color: "#ffcc33", skill: "Probability" },
];

const Week3Courses = () => {
  return (
    <div className="courses-container">
      <h2 className="title">Week 2 Courses</h2>
      <hr />

      <div className="course-content">
        {/* Course List */}
        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <span>
                <span
                  className="dot"
                  style={{ backgroundColor: course.color }}
                ></span>
                <span className="course-name">{course.name}</span>
              </span>
              <span className="skills-item">• {course.skill}</span>
            </li>
          ))}
        </ul>

        {/* Skills List */}
        {/* <ul className="skills-list">
          {courses.map((course, index) => (
            <li key={index} className="skills-item">
              • {course.skill}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Week3Courses;
