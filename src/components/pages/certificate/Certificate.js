import React, { Component, useEffect, useState,useRef } from 'react';
import { Link, useParams, Router,useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { API_URL } from '../../../Config';


const Certificate = (props) => {

    const uid = useRef();


    useEffect(() => {

    }, [])

   

    const saveCertificate = ()=>{
        let data ={};
        data['uid'] = uid.current.value;
        
        fetch(API_URL+"/certificate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        
                    });
                }
                else {
                    alert("invalid login")
                }
               
            })
    
          
       
    }

    return (
        <div>
            <div className="reset-password-bg">
                <div className="container">
                    <div className="wrp-reset-password">
                        <ul className="reset-input-list">
                            
                            <li><input placeholder="Write Name" type="text"  ref={uid} />
                           
                            </li>
                            <li>
                                <div className="submit-btn-reset" onClick={saveCertificate}><button>Create Certificate</button></div>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
           
        </div>
    );

}


export default Certificate;

