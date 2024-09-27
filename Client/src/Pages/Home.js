import React from 'react'
import Navbar from '../Componants/Navbar'
import education from '../Assets/image/education.png'
import '../scss/layouts/responsive.scss'
import Footer from '../Componants/Footer'

const Home = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className='disc'>
        <div className='img' >
          <img style={{display:'block',margin:'auto'}} src={education} />
        </div>
        <div className='text' style={{ width: '80%', textAlign: 'center', display: 'block', margin: 'auto' }}>
          <h3 style={{ fontFamily: 'cursive' }}>Welcome to EduVision
            Empowering educational institutions with a modern, easy-to-use management system. From student records to communication, our platform simplifies every aspect of school and college administration, helping you focus on what truly matters—education.</h3></div>
      </div>

      <div className="container" style={{ marginTop: '3em' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            {/* Section Heading */}
            <div
              className="section_heading text-center wow fadeInUp"
              data-wow-delay="0.2s"
              style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}
            >
              <h3>
                Our Creative <span>Team</span>
              </h3>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Single Advisor */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.2s"
              style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}
            >
              {/* Team Thumb */}
              <div className="advisor_thumb">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                {/* Social Info */}
                <div className="social-info">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              {/* Team Details */}
              <div className="single_advisor_details_info">
                <h6>Harsh Purabia</h6>
                <p className="designation">Founder &amp; CEO</p>
              </div>
            </div>
          </div>
          {/* Single Advisor */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.3s"
              style={{ visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp' }}
            >
              {/* Team Thumb */}
              <div className="advisor_thumb">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                {/* Social Info */}
                <div className="social-info">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              {/* Team Details */}
              <div className="single_advisor_details_info">
                <h6>Dhruv Modi</h6>
                <p className="designation">UI Designer</p>
              </div>
            </div>
          </div>
          {/* Single Advisor */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.4s"
              style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}
            >
              {/* Team Thumb */}
              <div className="advisor_thumb">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                {/* Social Info */}
                <div className="social-info">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              {/* Team Details */}
              <div className="single_advisor_details_info">
                <h6>Kushal Patel</h6>
                <p className="designation">Developer</p>
              </div>
            </div>
          </div>
          {/* Single Advisor */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.5s"
              style={{ visibility: 'visible', animationDelay: '0.5s', animationName: 'fadeInUp' }}
            >
              {/* Team Thumb */}
              <div className="advisor_thumb">
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                {/* Social Info */}
                <div className="social-info">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              {/* Team Details */}
              <div className="single_advisor_details_info">
                <h6>Rohan Thakor</h6>
                <p className="designation">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home







