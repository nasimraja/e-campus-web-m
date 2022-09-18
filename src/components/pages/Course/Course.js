

import React, { Component, useEffect } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';




const Course = () => {


    useEffect(() => {



        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [])

    return (
        <div>
             <div className='course-box2'>
								<div className='row'>
									<div className='col-lg-6'>
										<div className='r-top-head'>
											<p>321-W-2022 NEUROACROBATICS</p>
										</div>
									</div>
									<div className='col-lg-2'>
										<div className='r-top-head'>
											<p>$600</p>
										</div>
									</div>
									{/* <div className='col-lg-2'>
										<div className='r-top-head'>
											<p>01</p>
										</div>
									</div> */}
									<div className='col-lg-3'>
										<div className='r-top-head'>
										<div className='view-edit'>
													  {/* <a href='#'><img src={Paypal}></img></a>  */}
													<a href='#'>Pay Now</a>
												</div> 
										</div>
									</div>
								</div>
							</div>
        </div>
    );

}


export default Course;

