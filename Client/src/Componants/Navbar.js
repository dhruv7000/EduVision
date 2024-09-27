  import React, { useState, useRef, useEffect } from 'react';
  import 'font-awesome/css/font-awesome.min.css';
  import '../scss/layouts/navbar.scss';
  import logo from '../Assets/image/logo.png'
  import { Link } from 'react-router-dom';

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Manage collapse state
    const navbarRef = useRef(null);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      const nav = navbarRef.current;

      const handleMouseEnter = (event) => {
        const dropdown = event.target.closest('.dropdown');
        if (dropdown) {
          dropdown.classList.add('show');
          const dropdownToggle = dropdown.querySelector('> a');
          const dropdownMenu = dropdown.querySelector('.dropdown-menu');
          if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'true');
          if (dropdownMenu) dropdownMenu.classList.add('show');
        }
      };

      const handleMouseLeave = (event) => {
        const dropdown = event.target.closest('.dropdown');
        if (dropdown) {
          dropdown.classList.remove('show');
          const dropdownToggle = dropdown.querySelector('> a');
          const dropdownMenu = dropdown.querySelector('.dropdown-menu');
          if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
          if (dropdownMenu) dropdownMenu.classList.remove('show');
        }
      };

      nav.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', handleMouseEnter);
        dropdown.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        nav.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.removeEventListener('mouseenter', handleMouseEnter);
          dropdown.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, []);

    return (


      <div className="container" style={{ marginTop: '1em' }}>
        <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar" style={{ borderRadius: '50px' }} ref={navbarRef}>
          <div className="container">
            <a className="navbar-brand" href="index.html"><img src={logo} style={{ width: '50px', overflow: 'hidden', scale: '2.5' }}></img></a><h3 style={{ marginTop: '6px', fontFamily: 'cursive' }}>EduVision</h3>
            <button className="navbar-toggler" type="button" aria-controls="ftco-nav" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={toggleNavbar}>
              <span className="fa fa-bars"></span> Menu
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="ftco-nav">
              <ul className="navbar-nav ml-auto mr-md-3">
                <li className="nav-item active"><a href="#" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Work</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>

                <Link className="" to={"/profile"}><i className="fas fa-user-circle" style={{ color: "#0066b2",scale:'2',width:'20px',marginLeft:'2em' }}></i></Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>

    );
  };

  export default Navbar;









