import  { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/courses.css";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState('Week 1');
  const [activePlayer, setActivePlayer] = useState(null);
  const [fullscreenPdf, setFullscreenPdf] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "https://learnx-official-api.onrender.com/api/v1/course/CourseForTrack",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.allCourses) {
          setCourses(response.data.allCourses);
          if (response.data.allCourses.length > 0? courses.length: "") {
            setCurrentWeek(`Week ${response.data.allCourses[0].week || '1'}`);
          }
        } else {
          throw new Error("Invalid course data structure");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleCoursePlayer = (index) => {
    setActivePlayer(activePlayer === index ? null : index);
  };

  const toggleFullscreen = () => {
    setFullscreenPdf(!fullscreenPdf);
    if (!fullscreenPdf) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const renderCourseContent = (course, index) => {
    if (activePlayer !== index) return null;

    const embedStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '8px'
    };

    if (course.Link?.endsWith(".pdf")) {
      return (
        <div className={`pdf-container ${fullscreenPdf ? 'fullscreen-pdf' : ''}`} 
             style={{ position: 'relative', width: '100%', height: '500px' }}>
          <embed 
            src={course.Link} 
            type="application/pdf" 
            style={{ ...embedStyle, overflow: 'auto' }} 
          />
          <button 
            onClick={toggleFullscreen}
            style={{ position: 'absolute', top: '10px', right: '10px', 
                    padding: '8px 12px', background: 'black', 
                    color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {fullscreenPdf ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      );
    }

    if (course.Link?.includes("youtube.com") || course.Link?.includes("youtu.be")) {
      const videoId = course.Link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? (
        <iframe 
          style={embedStyle}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title="YouTube video player"
        />
      ) : (
        <p style={{ color: 'red' }}>Invalid YouTube link</p>
      );
    }

    if (course.Link?.match(/\.(mp4|mov|mkv)$/)) {
      return (
        <video controls style={embedStyle}>
          <source src={course.Link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (course.Link?.endsWith(".docx")) {
      return (
        <iframe 
          src={`https://docs.google.com/gview?url=${course.Link}&embedded=true`}
          style={embedStyle}
          frameBorder="0"
          title="Word document viewer"
        />
      );
    }

    return (
      <iframe 
        src={course.Link}
        style={embedStyle}
        frameBorder="0"
        title="Course content"
      />
    );
  };

  if (loading) {
    return <div className="loading-message">Loading courses...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="course-page">
      <h1>Available Courses</h1>
      <div className="current-week">{currentWeek}</div>
      
      <div className="course-container">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div 
              key={index} 
              className={`course-card ${activePlayer === index ? 'active' : ''}`}
            >
              <div className="course-info" style={{ display: activePlayer === index ? 'none' : 'block' }}>
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
                  onClick={() => toggleCoursePlayer(index)}
                >
                  {activePlayer === index ? 'Hide Course' : 'View Course'}
                </button>
              </div>
              
              <div className="course-player" style={{ display: activePlayer === index ? 'block' : 'none' }}>
                {renderCourseContent(course, index)}
              </div>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;