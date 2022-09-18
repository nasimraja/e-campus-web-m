import React, { Component, useEffect } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';




const Summercomponent = () => {


    useEffect(() => {



        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [])

    return (
        <div>
             <div className='pc-cont'>

<div className='pc-h-l'>
    <h1>Summercomponent</h1>
</div>
<div className='pc-h-r'>
    <h3>$600</h3>
</div>
</div>

<div className='regiscont-main-wrap'>
<div className='regist-list'>
    <ul className='regist-ul'>
        <li><a href='#'>Date</a></li>
        <li><a href='#'>Brochure</a></li>
        <li><a href='#'>Faculty</a></li>
        <li><a href='#'>Prereq</a></li>
    </ul>
</div>
<div className='register-but'>
    <a href='/form'>Register</a>
</div>
</div>
            
        </div>
    );

}


export default Summercomponent;

