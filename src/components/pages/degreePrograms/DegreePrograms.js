import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import clander from '../../images/clandericon.png';
import pdficon from '../../images/pdficon.png';
import usericon from '../../images/usericon.png';
import picon from '../../images/picon.png';



const DegreePrograms = (props) => {

    const [sesionModel, setSesionModel] = useState(false);
    const sesionToggleModal = () => setSesionModel(!sesionModel);
    const [PrereqModel, setPrereqModel] = useState(false);
    const PrereqToggleModal = () => setPrereqModel(!PrereqModel);
    const [course, setCourse] = useState({});
    const [dates, setates] = useState([])
    

    useEffect(() => {
      

        if (props.sessiondates != "") {
            let _temp = props.sessiondates.split(',');
            setates(_temp)
        }

        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [props])


    return (
        <div >
            <div>
                <div className='tab-cont'>
                                <div className="main-wrp">
                                    <div className='pc-cont'>

                                        <div className='pc-h-l'>
                                        <h1> <input type="checkbox" onChange={(event) => props.data(props, event)} /> {props.coursecode} {props.course}</h1>
                                        </div>
                                        <div className='regist-list'>
                                            <ul className='regist-ul'>
                                            {dates.length > 0 &&
                                                <li><a href='#' onClick={sesionToggleModal}> <img src={clander} className="icons-c" /></a></li>
                                                }
                                                <li><a href={props.course_url} target="_blank"><img src={pdficon} className="icons-c" /></a></li>
                                                <li><a href='#'><img src={usericon} className="icons-c" /></a></li>
                                                <li><a href='#' onClick={PrereqToggleModal}><img src={picon} className="icons-c" /></a></li>
                                            </ul>
                                        </div>
                                        <div className='pc-h-r'>
                                            <h3>${`${props.price}`}</h3>
                                        </div>
                                    </div>

                                </div>
                 

                    <Modal isOpen={sesionModel} toggle={sesionToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={sesionToggleModal}><span className="ml-1 roititle font-weight-bold">Session Dates</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div>
                                   
                                    <ul className="sesion-date-list">
                                        {
                                            dates.map((v, i) => {
                                                return (
                                                    <li>
                                                        <p>{v}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={PrereqModel} toggle={PrereqToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={PrereqToggleModal}><span className="ml-1 roititle font-weight-bold">Prereq</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div>
                                    <p>{props.Prereq}</p>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                    
                </div>

            </div>
        </div>

    );

}


export default DegreePrograms;

