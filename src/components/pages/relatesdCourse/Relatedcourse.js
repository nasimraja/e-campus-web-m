import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';



const Relatedcourse = (props) => {

    const [sessiondates, setSessiondates] = useState([]);
    const [stimes, setStimes] = useState([]);
    const [etimes, setEtimes] = useState([]);
    
    
    useEffect(() => {
      
      console.log(props)
        
        if (props.sessiondates != "") {
            let _temp = props.sessiondates.split(',');
            setSessiondates(_temp)
        }
        if (props.stimes != "") {
            let _temp2 = props.stimes.split(',');
            setStimes(_temp2)
        }
        if (props.etimes != "") {
            let _temp2 = props.etimes.split(',');
            setEtimes(_temp2)
        }

        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [props])

   


    return (
            <div>
                <div className='tab-cont'>             
                  <div className="wrp-relatedcorse">
                      <h5>{props.coursecode} {props.course}</h5>
                      <ul className="list-dates">
                      {
                         sessiondates.map((v, i) => {
                            return (
                                <li><p>{v} <span>({stimes[i]} - {etimes[i]})</span></p></li>   
                            )
                        })
                        
                      }
                      </ul>
                  </div>
                </div>
            </div>

    );

}


export default Relatedcourse;

