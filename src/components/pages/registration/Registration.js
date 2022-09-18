import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { API_URL } from '../../../Config/index.js';
import Header from '../header.js';



const Registration = () => {
    const [getseasonName, setGetseasonName] = useState({});
    const { trimester } = useParams();
    

    useEffect(() => {
      
        getSeason();

    }, [])

    const getSeason = ()=>{

       

        fetch(API_URL+"/getseasonname",
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
                setGetseasonName(resp.getsSeasonName);
                window.location.replace("/registration/"+resp.getsSeasonName[0].id)
            });
        }


    })
        
    
      }


    return (
        <div className="main-bg">
            <Header />
           <div>
               <ul className="seasonnameList">
               {

                getseasonName.length > 0 && getseasonName.map((v, i) => {
                    return (
                    
                        <li><a href={"/registration/" + v.id}>{v.name}{v.year}</a></li>
                            
                    )
                })
                }
                </ul>
           </div>
        </div>

    );

}


export default Registration;

