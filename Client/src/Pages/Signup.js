import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../scss/layouts/main.scss';
import '../scss/layouts/responsive.scss';
import '../scss/common/variables.scss';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import storage from '../firebaseConfig';
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import signup from '../Assets/image/signup.png'

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [img, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1)
    const nav = useNavigate();

    const handleNext = (e) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handlePrev = (e) => {
        e.preventDefault()
        setStep(step - 1)
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prevData) => ({ ...prevData, imgfile: files[0] }));
            setImg(URL.createObjectURL(files[0]));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.userName) errors.userName = "Name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.password) errors.password = "Password is required";
        if (!formData.confirmPassword) errors.confirmPassword = "Confirm Password is required";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
        if (!formData.imgfile) errors.photo = "Photo is required";
        if (!formData.phone) errors.phone = "Phone is required";
        if (!formData.age) errors.age = "Age is required";
        if (!formData.country) errors.country = "Country is required";
        if (!formData.state) errors.state = "State is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.pincode) errors.pincode = "Pincode is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const storageRef = ref(storage, `MajorProject/${formData.userName.split(" ").join("").toLowerCase()}.jpg`);
            const uploadTask = uploadBytesResumable(storageRef, formData.imgfile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error("Upload error:", error);
                    setError(error.message);
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        const response = await axios.post("http://localhost:7000/api/register", {
                            userID: formData.userID,
                            userName: formData.userName,
                            email: formData.email,
                            password: formData.password,
                            confirmPassword: formData.confirmPassword,
                            photo: downloadUrl,
                            photoUrlname: `${formData.userName.split(" ").join("").toLowerCase()}.jpg`,
                            phone: formData.phone,
                            age: formData.age,
                            country: formData.country,
                            state: formData.state,
                            city: formData.city,
                            pincode: formData.pincode
                        });

                        if (response.status === 200) {
                            alert("Registration Successful!");
                            nav('/');
                        } else {
                            console.error("Registration failed with status:", response.status);
                            alert("Registration failed. Please try again.");
                        }
                    } catch (error) {
                        console.error("API error:", error);
                        alert("Registration failed due to server error.");
                    }
                }
            );
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("Unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title" style={{ fontWeight: '900' }}>Sign up</h2>
                            <form onSubmit={handleSubmit} method="POST" className="register-form" id="register-form">
                                {step === 1 && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="text" onChange={handleChange} name="userName" id="name" placeholder="Your Name" />
                                            {errors.userName && <div className="error">{errors.userName}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="email" onChange={handleChange} name="email" id="email" placeholder="Your Email" />
                                            {errors.email && <div className="error">{errors.email}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="password" onChange={handleChange} name="password" id="pass" placeholder="Password" />
                                            {errors.password && <div className="error">{errors.password}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="password" onChange={handleChange} name="confirmPassword" id="re_pass" placeholder="Repeat your password" />
                                            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="file"><i className="zmdi zmdi-broken-image"></i></label>
                                            <input type="file" onChange={handleChange} name="photo" id="file" placeholder="Upload your photo" />
                                            {errors.photo && <div className="error">{errors.photo}</div>}
                                        </div>

                                        <div className="form-group column form-button">
                                            {/* <input type="submit" style={{backgroundColor:'#FFC72C',marginRight:'2em'}} name="signup" id="signup" className="form-submit" value="Register" /> */}
                                            <button onClick={handleNext} style={{ color: '#FFC72C', fontSize: '2rem', border: 'none', backgroundColor: 'transparent' }} class="fa fa-arrow-right" aria-hidden="true"></button>
                                            <Link className="d-flex justify-content-center" to={"/"}><p>Already Registered?</p></Link>
                                        </div>
                                    </>
                                )}


                                {step === 2 && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-phone"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="number" onChange={handleChange} name="phone" id="number" placeholder="Your Phone Number" />
                                            {errors.phone && <div className="error">{errors.phone}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-male-alt"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="number" onChange={handleChange} name="age" id="age" placeholder="Your Age" />
                                            {errors.age && <div className="error">{errors.age}</div>}
                                        </div>

                                        <div className="form-group column form-button">
                                            <button onClick={handlePrev} style={{ marginRight: '1em', color: '#FFC72C', fontSize: '2rem', border: 'none', backgroundColor: 'transparent' }} class="fa fa-arrow-left" aria-hidden="true"></button>
                                            <button onClick={handleNext} style={{ color: '#FFC72C', fontSize: '2rem', border: 'none', backgroundColor: 'transparent' }} class="fa fa-arrow-right" aria-hidden="true"></button>
                                            <Link className="d-flex justify-content-center" to={"/"}><p>Already Registered?</p></Link>
                                        </div>
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-airplane"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="text" onChange={handleChange} name="country" id="" placeholder="Your Country" />   
                                            {errors.country && <div className="error">{errors.country}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-railway"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="text" onChange={handleChange} name="state" id="" placeholder="Your State" />
                                            {errors.state && <div className="error">{errors.state}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-car"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="text" onChange={handleChange} name="city" id="" placeholder="Your City" />
                                            {errors.city && <div className="error">{errors.city}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-gps-dot"></i></label>
                                            <input style={{ backgroundColor: 'transparent' }} type="number" onChange={handleChange} name="pincode" id="" placeholder="Your Pin Code" />
                                            {errors.pincode && <div className="error">{errors.pincode}</div>}
                                        </div>

                                        <div className="form-group column form-button">
                                            <input type="submit" style={{backgroundColor:'#FFC72C',marginRight:'2em'}} name="signup" id="signup" className="form-submit" value="Register" />
                                            <button onClick={handlePrev} style={{ marginRight: '1em', color: '#FFC72C', fontSize: '2rem', border: 'none', backgroundColor: 'transparent' }} class="fa fa-arrow-left" aria-hidden="true"></button>
                                            <Link className="d-flex justify-content-center" to={"/"}><p>Already Registered?</p></Link>
                                        </div>
                                    </>
                                )}

                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={signup} alt="sign up" /></figure>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Signup;






// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../scss/layouts/main.scss';
// import '../scss/layouts/responsive.scss';
// import '../scss/common/variables.scss';
// import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import storage from '../firebaseConfig';
// import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

// const Signup = () => {
//     const [formData, setFormData] = useState({});
//     const [img, setImg] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const [error, setError] = useState('');
//     const nav = useNavigate();

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setFormData((prevData) => ({ ...prevData, imgfile: files[0] }));
//             setImg(URL.createObjectURL(files[0]));
//         } else {
//             setFormData((prevData) => ({ ...prevData, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.imgfile) {
//             alert("Select Image First");
//             return;
//         }

//         try {
//             const storageRef = ref(storage, `MajorProject/${formData.userName.split(" ").join("").toLowerCase()}.jpg`);
//             const uploadTask = uploadBytesResumable(storageRef, formData.imgfile);

//             uploadTask.on(
//                 "state_changed",
//                 (snapshot) => {
//                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     setProgress(progress);
//                 },
//                 (error) => {
//                     console.error("Upload error:", error);
//                     setError(error.message);
//                 },
//                 async () => {
//                     try {
//                         const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//                         const response = await axios.post("http://localhost:7000/api/register", {
//                             userID: formData.userID,
//                             userName: formData.userName,
//                             email: formData.email,
//                             password: formData.password,
//                             confirmPassword: formData.confirmPassword,
//                             photo: downloadUrl,
//                             photoUrlname: `${formData.userName.split(" ").join("").toLowerCase()}.jpg`,
//                         });

//                         if (response.status === 200) {
//                             alert("Registration Successful!");
//                             nav('/');
//                         } else {
//                             console.error("Registration failed with status:", response.status);
//                             alert("Registration failed. Please try again.");
//                         }
//                     } catch (error) {
//                         console.error("API error:", error);
//                         alert("Registration failed due to server error.");
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error("Unexpected error:", error);
//             alert("Unexpected error occurred. Please try again.");
//         }
//     };

//     return (
//         <section className="signup">
//             <div className="container">
//                 <div className="signup-content">
//                     <div className="signup-form">
//                         <h2 className="form-title" style={{ fontWeight: '900' }}>Sign up</h2>
//                         <form onSubmit={handleSubmit} method="POST" className="register-form" id="register-form">
//                             <div className="form-group">
//                                 <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
//                                 <input type="text" onChange={handleChange} name="userName" id="name" placeholder="Your Name" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
//                                 <input type="email" onChange={handleChange} name="email" id="email" placeholder="Your Email" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
//                                 <input type="password" onChange={handleChange} name="password" id="pass" placeholder="Password" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
//                                 <input type="password" onChange={handleChange} name="confirmPassword" id="re_pass" placeholder="Repeat your password" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="file"><i className="zmdi zmdi-broken-image"></i></label>
//                                 <input type="file" onChange={handleChange} name="photo" id="file" placeholder="Upload your photo" />
//                             </div>
//                             <div className="form-group">
//                                 <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
//                                 <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of service</a></label>
//                             </div>
//                             <div className="form-group form-button">
//                                 <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
//                             </div>
//                         </form>
//                     </div>
//                     <div className="signup-image">
//                         <figure><img src="/images/signup-image.jpg" alt="sign up" /></figure>
//                         <Link className="d-flex justify-content-center" to={"/"}><p>Already Registered?</p></Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Signup;





// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../scss/layouts/main.scss';
// import '../scss/layouts/responsive.scss';
// import '../scss/common/variables.scss';
// import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import storage from '../firebaseConfig';
// import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

// const Signup = () => {
//     const [formData, setFormData] = useState({});
//     const [img, setImg] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const [error, setError] = useState('');
//     const nav = useNavigate();

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setFormData((prevData) => ({ ...prevData, imgfile: files[0] }));
//             setImg(URL.createObjectURL(files[0]));
//         } else {
//             setFormData((prevData) => ({ ...prevData, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.imgfile) {
//             alert("Select Image First");
//             return;
//         }

//         try {
//             const storageRef = ref(storage, `MajorProject/${formData.userName.split(" ").join("").toLowerCase()}.jpg`);
//             const uploadTask = uploadBytesResumable(storageRef, formData.imgfile);

//             uploadTask.on(
//                 "state_changed",
//                 (snapshot) => {
//                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     setProgress(progress);
//                 },
//                 (error) => {
//                     console.error(error);
//                     setError(error.message);
//                 },
//                 async () => {
//                     const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//                     const response = await axios.post("http://localhost:7000/api/register", {
//                         userID: formData.userID,
//                         userName: formData.userName,
//                         email: formData.email,
//                         password: formData.password,
//                         confirmPassword: formData.confirmPassword,
//                         photo: downloadUrl,
//                         photoUrlname: `${formData.userName.split(" ").join("").toLowerCase()}.jpg`,
//                     });
//                     if (response.status === 200) {
//                         alert(response.statusText);
//                         alert("Registration Successful!");
//                         nav('/');
//                     } else {
//                         console.error(response.status);
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <section className="signup">
//                 <div className="container">
//                     <div className="signup-content">
//                         <div className="signup-form">
//                             <h2 className="form-title" style={{ fontWeight: '900' }}>Sign up</h2>
//                             <form onSubmit={handleSubmit} method="POST" className="register-form" id="register-form">
//                                 <div className="form-group">
//                                     <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
//                                     <input type="text" onChange={handleChange} name="userName" id="name" placeholder="Your Name" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
//                                     <input type="email" onChange={handleChange} name="email" id="email" placeholder="Your Email" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
//                                     <input type="password" onChange={handleChange} name="password" id="pass" placeholder="Password" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
//                                     <input type="password" onChange={handleChange} name="confirmPassword" id="re_pass" placeholder="Repeat your password" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="file"><i className="zmdi zmdi-broken-image"></i></label>
//                                     <input type="file" onChange={handleChange} name="photo" id="file" placeholder="Upload your photo" />
//                                 </div>
//                                 <div className="form-group">
//                                     <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
//                                     <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of service</a></label>
//                                 </div>
//                                 <div className="form-group form-button">
//                                     <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="signup-image">
//                             <figure><img src="/images/signup-image.jpg" alt="sign up" /></figure>
//                             <Link className="d-flex justify-content-center" to={"/"}><p>Already Registered?</p></Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Signup;


