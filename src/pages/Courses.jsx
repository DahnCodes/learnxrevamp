import { useEffect, useState } from "react";
// import courseimg from "../assets/courseimg.png";
// import Group130 from "../assets/Group130.png";
// import Coursesdash from "../styles/Coursesdash.css";
import "../styles/Newcourse.css";

const Courses = () => {
  
  const [courses, setCourses] = useState([]);
  const [currentWeek, setCurrentWeek] = useState('Week 1');
  const [activePlayer, setActivePlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await fetch("https://learnx-official-api.onrender.com/api/v1/course/CourseForTrack", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch courses");

        const data = await response.json();
        console.log("Fetched Courses Data:", data);

        setCourses(data.allCourses || []);
        if (data.allCourses?.length > 0) {
          setCurrentWeek(`Week ${data.allCourses[0].week || '1'}`);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  const togglePlayer = (index, link) => {
    setActivePlayer(activePlayer === index ? null : index);
  };

  const renderPlayerContent = (link) => {
    if (!link) return <p>No content available</p>;

    // PDF files
    if (link.endsWith(".pdf")) {
      return (
        <div className="pdf-container">
          <embed 
            src={link} 
            type="application/pdf" 
            className="pdf-viewer" 
          />
          <button 
            onClick={() => {
              const container = document.querySelector('.pdf-container');
              if (container?.requestFullscreen) container.requestFullscreen();
            }}
            className="fullscreen-button"
          >
            Fullscreen
          </button>
        </div>
      );
    }
    
    // YouTube videos
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      const videoId = link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          className="video-iframe"
        />
      ) : (
        <p className="error-message">Invalid YouTube link</p>
      );
    }

    // Video files
    if (link.match(/\.(mp4|mov|mkv)$/)) {
      return (
        <video controls className="video-player">
          <source src={link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    // Word documents
    if (link.endsWith(".docx")) {
      return (
        <iframe 
          src={`https://docs.google.com/gview?url=${link}&embedded=true`}
          frameBorder="0"
          className="doc-iframe"
        />
      );
    }

    // Default case
    return (
      <iframe 
        src={link}
        frameBorder="0"
        className="generic-iframe"
      />
    );
  };

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>
      <div className="current-week">{currentWeek}</div>
      
      <div className="course-container">
        {courses.map((course, index) => (
          <div 
            key={index} 
            className={`course-card ${activePlayer === index ? 'expanded' : ''}`}
          >
            {activePlayer !== index ? (
              <div className="course-info">
                <img 
                  src={course.image || 'placeholder.jpg'} 
                  alt="Course Thumbnail" 
                />
                <h3>{course.title || 'Untitled Course'}</h3>
                <p>Category: {course.category || 'Unknown'}</p>
                <p>Type: {course.type || 'N/A'}</p>
                <p>Weekly Task: {course.weeklyTask || 'No task provided'}</p>
                <button 
                  className="view-course"
                  onClick={() => togglePlayer(index, course.Link)}
                >
                  View Course
                </button>
              </div>
            ) : (
              <div className="course-player">
                {renderPlayerContent(course.Link)}
                <button 
                  className="close-player"
                  onClick={() => togglePlayer(null)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
