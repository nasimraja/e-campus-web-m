import React, { Component, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import { Link, Router } from 'react-router-dom';
import cirlogo from '../images/cir-logo.png';
import burger from '../images/burger.png';
import connect from '../images/connect.png';
import gcircle from '../images/gcircle.png';
import crosss from '../images/crosss.png';
import Login from './login/Login';



const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const loginModalToggle = () => setLoginModal(!loginModal);


  useEffect(() => {



    changePickupStoreMenu();

    function changePickupStoreMenu() {



    }


  }, [])

  return (
    <div>
      <div className='head-bg'>
        <div className='container-fluid'>
          <div className='top-bnr'>
            <div className='cir-logo'>
              <a href='/'><img src={cirlogo}></img></a>
            </div>
            <div className='cir-bnr-right'>
              <h1>Professional School of Behavioral Health Sciences</h1>
              <p>Interdisciplinary professional certificate and diploma programs<br></br>
                in behavioral and physiological sciences </p>

            </div>

          </div>
          <div className="wrp-login-btn-header">
            <a onClick={loginModalToggle} className='login-btn-header'>Student & Faculty Login</a>
          </div>
        </div>
      </div>

      <Modal isOpen={loginModal} toggle={loginModalToggle} centered={true}>
        <ModalHeader toggle={loginModalToggle}><span className="ml-1 roititle font-weight-bold">Login to e-campus</span></ModalHeader>
        <ModalBody>
          <div className="modal-p">
            <div>
              <Login />
            </div>
          </div>
        </ModalBody>

      </Modal>


    </div>
  );

}


export default Header;

