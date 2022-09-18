import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import Biodatafaculty from '../biodatafaculty/Biodatafaculty';
import clander from '../../images/clandericon.png';
import pdficon from '../../images/pdficon.png';
import usericon from '../../images/usericon.png';
import picon from '../../images/picon.png';
import { API_URL } from '../../../Config/index.js';



const courses = (props) => {

    const [sesionModel, setSesionModel] = useState(false);
    const sesionToggleModal = () => setSesionModel(!sesionModel);
    const [PrereqModel, setPrereqModel] = useState(false);
    const PrereqToggleModal = () => setPrereqModel(!PrereqModel);
    const [course, setCourse] = useState({});
    const [dates, setDates] = useState([]);
    const [stimes, setStimes] = useState([]);
    const [etimes, setEtimes] = useState([]);
    const [facultyModel, setFaculty] = useState(false);
    const facultToggleModal = () => setFaculty(!facultyModel);
    const [relatedcourse, setRelatedcourse] = useState({});
    const [topic, setTopic] = useState({});


    useEffect(() => {
        getrelatedcourse();
        getTopic();

        if (props.sessiondates != "") {
            let _temp = props.sessiondates.split(',');
            setDates(_temp)
        }
        if (props.stimes != "") {
            let _temp = props.stimes.split(',');
            setStimes(_temp)
        }
        if (props.etimes != "") {
            let _temp = props.etimes.split(',');
            setEtimes(_temp)
        }



    }, [props])

    const getrelatedcourse = () => {

        let courseid = props.id;

        fetch(API_URL+"/get/courses/" + courseid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

                    // console.log("result", resp);
                    setRelatedcourse(resp.data);



                });
            }



        })
    }

    const getTopic = () => {

        let courseid = props.id;

        fetch(API_URL+"/get/topic/" + courseid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

                    // console.log("result", resp);
                    setTopic(resp.data);



                });
            }



        })
    }


    return (
        <div >
            <div>
                <div className='tab-cont'>
                    <div className="main-wrp">
                        <div className='pc-cont'>

                            <div className='pc-h-l'>
                                <h1> <input type="checkbox" className='mr-1' onChange={(event) => props.data(props, event)} /> {props.coursecode} {props.course}</h1>
                            </div>
                            <div className='regist-list'>
                                <ul className='regist-ul'>


                                <li className="customtooltip"> <span class="tooltiptext">Dates</span><a href='#' onClick={sesionToggleModal}> <img src={clander} className="icons-c" /></a></li>
                                 
                                <li className="customtooltip"> <span class="tooltiptext">Brochure</span><a href={"/bio/brocher/" + props.id} target="_blank"><img src={pdficon} className="icons-c" /></a></li>
                                  
                                       <li className="customtooltip"> <span class="tooltiptext">Faculty</span><a href='#' onClick={facultToggleModal}><img src={usericon} className="icons-c" /></a></li>

                                       <li className="customtooltip"> <span class="tooltiptext">Prerequisites</span><a href='#' onClick={PrereqToggleModal}><img src={picon} className="icons-c" /></a></li>

                                </ul>
                            </div>
                            <div className='pc-h-r'>
                                <h3>${`${parseFloat(props.price).toFixed()}`}</h3>
                            </div>
                        </div>

                    </div>


                    <Modal isOpen={sesionModel} toggle={sesionToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={sesionToggleModal}><span className="ml-1 roititle ">Session Dates</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div>

                                    <ul className="sesion-date-list">
                                        {
                                            dates.map((v, i) => {
                                                return (
                                                    <li>
                                                        <p>{v} <span>({stimes[i]} - {etimes[i]} )</span></p>
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
                        <ModalHeader toggle={PrereqToggleModal}><span className="ml-1 roititle">Prereq</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div>
                                <p dangerouslySetInnerHTML={{ __html: props.Prereq }}></p>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                    <Modal isOpen={facultyModel} toggle={facultToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={facultToggleModal}><span className="ml-1 roititle">Faculty</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div>
                                    {

                                        topic.length > 0 && topic.map((getbiodata2, i) => {
                                            return (
                                                <Biodatafaculty {...getbiodata2} />
                                            )

                                        })

                                    }
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>

                </div>

            </div>
        </div>

    );

}


export default courses;

