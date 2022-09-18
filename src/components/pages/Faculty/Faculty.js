
import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";




const Faculty = (props) => {

    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const Navigate = useNavigate();
    const [alert, setAlert] = useState(false);

    const LoginUser = async () => {
        let result = await fetch('http://localhost:5000/api/login', {
            method: 'POST',

            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        setAlert(false);
        if (result.length > 0) {
            localStorage.setItem("user_id", JSON.stringify(result));
            Navigate('/');
        }
        else {
            setAlert(true);
        }
    }
    useEffect(() => {

        changePickupStoreMenu();

        function changePickupStoreMenu() {

        }


    }, [])

    const auth = localStorage.getItem('user_id');

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
           <div className="container-fluid">
           <div className='lg-box-wrap'>
                <div className='container-fluid'>
                    {/* <div className='lg-box'>
                        <div className='lg-cont'>
                            <h1>EXISTING STUDENT/FACULTY</h1>
                        </div>
                        <div className='login-but'>
                            <a href='#' onClick={successToggleModal}>Login</a>
                        </div>
                    </div> */}
                     <p className='text-white mb-0 text-center p-0 neoro-p' style={{"line-height": "10px"}}>{props.message}</p>
                </div>
            </div>
           </div>

            <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Login</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <div className="wrp-login">

                                <div className="login-content">
                                   
                                    <div className="wrp-label">
                                        <label>Email Address</label>
                                        <input
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="wrp-label mrt-input">
                                        <label>Password</label>
                                        <input
                                            value={password} onChange={(e) => setpassword(e.target.value)}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>

                                    {
                                        alert &&
                                        <Alert color="danger">
                                            Invalid Login
                                        </Alert>
                                    }

                                    <button className="login-btn" type="submit" onClick={LoginUser} >Login </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>


        </div>
    );

}


export default Faculty;

