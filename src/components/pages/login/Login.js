
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "reactstrap";
import { API_URL } from '../../../Config';



const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const Navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [loginStatus, setLoginStatus] = useState("")
    const [forgotModal, setforgotModal] = useState(false);
    const forgotModalToggle = () => setforgotModal(!forgotModal);
    const [SuccessModal, setSuccessModal] = useState(false);
    const SuccessModalToggle = () => setSuccessModal(!SuccessModal);
    const [unsuccessModal, setUnsuccessModal] = useState(false);
    const unsuccessModalToggle = () => setUnsuccessModal(!unsuccessModal);
    const forgootEmail = useRef();

    const ForgotPassword = ()=>{
        let data ={};

        data['mail'] = forgootEmail.current.value;
        
       
    
        fetch(API_URL+"/forgot", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        SuccessModalToggle();
                       
                        
                    });
                }
                else {
                    unsuccessModalToggle();
                }
               
            })
    
          
       
    }

    const LoginUser = async () => {

        let formData = new FormData();


        formData.append('uname', email);
        formData.append('pass', password);
        formData.append('login', true);

        let result = await fetch(API_URL+'/login', {
            method: 'POST',
            body: formData,

        });

        result = await result.json();
        
        console.warn(result);
        setAlert(false);
        if (result.status == "Loggedin") {
           
            let url = encodeURI("https://e-campus.bp.edu/sales/loginRedirect.php?uname=" + encodeURIComponent(email) + "&pass=" + encodeURIComponent(password))
            window.location.replace(url)

        }
        else {
            setAlert(result.status);
        }
    }
    return (

        <div className='login-bg'>
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
                        <div className="forgot-p"><a href="#"  onClick={() => { forgotModalToggle();}}>Forgot Password</a></div>
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

            <Modal isOpen={forgotModal} toggle={forgotModalToggle} centered={true}>
                <ModalHeader toggle={forgotModalToggle}><span className="ml-1 roititle ">Forgot Password</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <div className="wrp-label">
                                <label>Email Address</label>
                                <input
                                    ref={forgootEmail}
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <button className="login-btn" type="submit" onClick={() => {forgotModalToggle(); ForgotPassword(); }} >submit </button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={SuccessModal} toggle={SuccessModalToggle} centered={true}>
                <ModalHeader toggle={SuccessModalToggle}><span className="ml-1 roititle">Submit Successfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>Please check your email and click on reset password</p>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={unsuccessModal} toggle={unsuccessModalToggle} centered={true}>
                <ModalHeader toggle={unsuccessModalToggle}><span className="ml-1 roititle">UnSuccessfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>your email not exit my database please register</p>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    );
}


export default Login;	