import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { API_URL } from '../../../Config';
import download from 'downloadjs';

const Certificatewithcourse = () => {
    const uid = useRef();
    const courseid = useRef();
    const Cdate = useRef();

    const [fillModel, setFillModel] = useState(false);
    const fillToggleModal = () => setFillModel(!fillModel);

    const [noUseridModel, setNoUseridModel] = useState(false);
    const nouseridToggleModal = () => setNoUseridModel(!noUseridModel);

    const [noCourseidModel, setNoCourseidModel] = useState(false);
    const noCourseidToggleModal = () => setNoCourseidModel(!noCourseidModel);


    const [createCertificatedModel, setCreateCertificatedModel] = useState(false);
    const createCertificatedModelToggleModal = () => setCreateCertificatedModel(!createCertificatedModel);

    useEffect(() => {

    }, [])





    const createCertificate = () => {



        let data = {};
        data['uid'] = uid.current.value;
        data['id'] = courseid.current.value;
        data['Cdate'] = Cdate.current.value;

        if (uid.current.value == "" || courseid.current.value == "" || Cdate.current.value == "") {
            fillToggleModal();
            return false;
        }

        fetch(API_URL + "/get/certificate/withname", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.blob()

                    .then(response => {
                        //Create a Blob from the PDF Stream

                        const file = new Blob([response], {
                            type: "application/pdf"
                        });

                        //Build a URL from the file


                        const fileURL = URL.createObjectURL(file);
                        download(fileURL);
                        createCertificatedModelToggleModal();



                    })
            }
            else if (response.status == 501) {
                nouseridToggleModal();
            }
            else if (response.status == 502) {
                noCourseidToggleModal();
            }
            else {
                alert("network error")
            }


        })


    }



    return (
        <div>
            <div className="reset-password-bg">
                <div className="container">
                    <div className="wrp-reset-password">
                        <ul className="reset-input-list">

                            <li>
                                <input placeholder="Write User id" type="text" ref={uid} />
                            </li>
                            <li>
                                <input placeholder="Write Course id" type="text" ref={courseid} />
                            </li>
                            <li>
                                <input type="date" ref={Cdate} />
                            </li>
                            <li>
                                <div className="submit-btn-reset"><button onClick={createCertificate} >Create Certificate</button></div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>


            <Modal isOpen={fillModel} toggle={fillToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={fillToggleModal}><span className="ml-1 roititle font-weight-bold">Field</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        
                            <p>Please fill all field</p>
                       
                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={noUseridModel} toggle={nouseridToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={nouseridToggleModal}><span className="ml-1 roititle font-weight-bold">User</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        
                            <p>No user id found</p>
                       
                    </div>
                </ModalBody>

            </Modal>

            <Modal isOpen={noCourseidModel} toggle={noCourseidToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={noCourseidToggleModal}><span className="ml-1 roititle font-weight-bold">User</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        
                            <p>No course id found</p>
                       
                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={createCertificatedModel} toggle={createCertificatedModelToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={createCertificatedModelToggleModal}><span className="ml-1 roititle font-weight-bold">successfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        
                            <p>Certificate created successfully</p>
                       
                    </div>
                </ModalBody>

            </Modal>

        </div>
    );

}


export default Certificatewithcourse;

