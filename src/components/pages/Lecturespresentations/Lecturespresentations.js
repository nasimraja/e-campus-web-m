import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import Header from '../../pages/header.js';
import clander from '../../images/clandericon.png';
import pdficon from '../../images/pdficon.png';
import usericon from '../../images/usericon.png';
import picon from '../../images/picon.png';





const Lecturespresentations = (props) => {

    const [sesionModel, setSesionModel] = useState(false);
    const sesionToggleModal = () => setSesionModel(!sesionModel);
    const [PrereqModel, setPrereqModel] = useState(false);
    const PrereqToggleModal = () => setPrereqModel(!PrereqModel);
    const [course, setCourse] = useState({});
    const [dates, setates] = useState([])


    useEffect(() => {

        getcourse()

        // if (course.sessiondates != "") {
        //     let _temp = course.sessiondates.split(',');
        //     setates(_temp)
        // }


        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [])

    const getcourse = () => {

        fetch("http://localhost:3001/api/listcourse",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.log("result", resp);
                    setCourse(resp.course);
                });
            }


        })
    }

    return (
       
        <div>
            <div className='tab-cont'>
               
                
                {
                    course.length > 0 && course.map((v, i) => {
                        return (
                            <div className="main-wrp">
                                <div className='pc-cont'>

                                    <div className='pc-h-l'>
                                    <h1> <input type="checkbox" onChange={(event) => props.data(v, event)} /> {v.coursecode} {v.course}</h1>
                                    </div>
                                    <div className='regist-list'>
                                        <ul className='regist-ul'>
                                            <li><a href='#' onClick={sesionToggleModal}> <img src={clander} className="icons-c" /></a></li>
                                            <li><a href={v.voucher} target="_blank"><img src={pdficon} className="icons-c" /></a></li>
                                            <li><a href='#'><img src={usericon} className="icons-c" /></a></li>
                                            <li><a href='#' onClick={PrereqToggleModal}><img src={picon} className="icons-c" /></a></li>
                                        </ul>
                                    </div>
                                    <div className='pc-h-r'>
                                        <h3>${v.price}</h3>
                                    </div>
                                </div>

                            </div>
                        )
                    })

                }


                <Modal isOpen={sesionModel} toggle={sesionToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={sesionToggleModal}><span className="ml-1 roititle font-weight-bold">Session Dates</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <div>
                               
                                {/* <ul className="sesion-date-list">
                                    {
                                        dates.map((v, i) => {
                                            return (
                                                <li>
                                                    <p>{v}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul> */}
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={PrereqModel} toggle={PrereqToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={PrereqToggleModal}><span className="ml-1 roititle font-weight-bold">Prereq</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <div>
                                {/* <p>{props.Prereq}</p> */}
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

            </div>

        </div>
   

    );

}


export default Lecturespresentations;

