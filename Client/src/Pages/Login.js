import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import '../scss/layouts/main.scss';
import '../scss/layouts/responsive.scss';
import '../scss/common/variables.scss';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login from '../Assets/image/login.png'

const Login = () => {
    const [formData, setFormData] = useState({ userName: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // Log form data for debugging

        if (!formData.userName || !formData.password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:7000/api/login", formData);
            console.log('Response:', response);
            if (response.status === 200) {
                const { token , result } = response.data;
                localStorage.setItem('token', token); // Save token in local storage
                localStorage.setItem('userName', formData.userName);
                localStorage.setItem('email', result.email);
                localStorage.setItem('_id', result._id);
                localStorage.setItem('photo', result.photo)
                localStorage.setItem('phone', result.phone)
                localStorage.setItem('age', result.age)
                localStorage.setItem('country', result.country)
                localStorage.setItem('state', result.state)
                localStorage.setItem('city', result.city)
                localStorage.setItem('pincode', result.pincode)
                alert("Login Successful!");
                navigate('/home'); // Redirect to the homepage or another page
            } else {
                setError("Login failed. Please check your username and password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError("Login failed due to server error.");
            }
        }
    };

    return (
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={login} alt="sign up image" /></figure>
                        <p>Create an account <Link to={"/signup"} className="link-danger">Register</Link></p>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title" style={{ fontWeight: '900' }}>Login</h2>
                        <form onSubmit={handleSubmit} method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" style={{ backgroundColor: 'transparent' }} onChange={handleChange} name="userName" value={formData.userName} id="your_name" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" style={{ backgroundColor: 'transparent' }} onChange={handleChange} name="password" value={formData.password} id="your_pass" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;

