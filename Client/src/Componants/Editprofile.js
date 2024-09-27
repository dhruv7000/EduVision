import React, { useState } from 'react';
import '../scss/layouts/Editprofile.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Editprofile = () => {
    const navigate = useNavigate(); 
    const storage = getStorage();
    const [profile, setProfile] = useState({
        _id: localStorage.getItem('_id') || '', // Ensure _id is fetched from localStorage
        userName: localStorage.getItem('userName') || '',
        email: localStorage.getItem('email') || '',
        phone: '',
        age: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        photo: localStorage.getItem('photo') || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `profilePhotos/${file.name}`);

        await uploadBytes(storageRef, file);
        
        const downloadURL = await getDownloadURL(storageRef);
        
        setProfile({
            ...profile,
            photo: downloadURL,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:7000/api/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                const updatedProfile = await response.json();
                localStorage.setItem('userName', profile.userName);
                localStorage.setItem('email', profile.email);
                localStorage.setItem('photo', profile.photo);
                localStorage.setItem('phone', profile.phone);
                localStorage.setItem('age', profile.age);
                localStorage.setItem('country', profile.country);
                localStorage.setItem('state', profile.state);
                localStorage.setItem('city', profile.city);
                localStorage.setItem('pincode', profile.pincode);
                localStorage.setItem('_id', profile._id);

                navigate('/profile');
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update profile: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile');
        }
    };

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <Link to={"/profile"}>
                            <i className="fa fa-arrow-left" aria-hidden="true" style={{ scale: '2', color: "#0066b2" }}></i>
                        </Link>
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src={profile.photo}
                            alt="Profile"
                        />
                        <span className="font-weight-bold">{profile.userName}</span>
                        <span className="text-black-50">{profile.email}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <span className="labels">Name</span >
                                <input type="text" className="form-control" placeholder="Enter Your Name" name="userName" value={profile.userName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <span className="labels">Mobile Number</span >
                                <input type="text" className="form-control" placeholder="Enter Your Number" name="phone" value={profile.phone} onChange={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <span className="labels">Age</span >
                                <input type="text" className="form-control" placeholder="Enter Your Age" name="age" value={profile.age} onChange={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <span className="labels">Email ID</span >
                                <input type="text" className="form-control" placeholder="Enter Your Email" name="email" value={profile.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <span className="labels">Country</span >
                                <input type="text" className="form-control" placeholder="Country" name="country" value={profile.country} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <span className="labels">State/Region</span >
                                <input type="text" className="form-control" placeholder="State" name="state" value={profile.state} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" style={{ backgroundColor: "#0066b2" }} type="button" onClick={handleSubmit}>Save Profile</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <br />
                        <div className="col-md-12">
                            <span className="labels">City</span >
                            <input type="text" className="form-control" placeholder="Enter Your City" name="city" value={profile.city} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="col-md-12">
                            <span className="labels">Pin Code</span >
                            <input type="text" className="form-control" placeholder="Enter Your Pin Code" name="pincode" value={profile.pincode} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-4">
                            <span className="labels">Change Your Profile Photo</span >
                            <label htmlFor="file"><i className="zmdi zmdi-broken-image"></i></label>
                            <input type="file" name="photo" id="file" placeholder="Upload your photo" onChange={handlePhotoChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editprofile;
