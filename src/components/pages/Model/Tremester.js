import React, { Component, useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Alert } from 'reactstrap';
import { Link, useParams, Router } from 'react-router-dom';
import Professionaldiplomas from '../Professionaldiplomas/Professionaldiplomas.js';
import { ToastContainer } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { API_URL } from '../../../Config/index.js';




const Model = (props) => {

    
    const [tabIndex, setTabIndex] = useState(0);
    const [getyearsSeason, setGetyearsSeason] = useState({});
    const [course, setCourse] = useState({});
    const { type } = useParams();
    const { trimester } = useParams();
    const [diplomacourse, setDiplomacourse] = useState({});
    const getSessionid = useRef()
   

    useEffect(() => {
        // getprofesnaldiploma();
        getYear();
       

        changePickupStoreMenu();

        function changePickupStoreMenu() {

        }


    }, [])


 
  


    const getYear = () => {
        const d = new Date();
        // let year = d.getFullYear();
        let year = 2022;



        fetch(API_URL+"/getyear/" + year,
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
                    setGetyearsSeason(resp.getyearsSeason);
                });
            }


        })
    }
    // const getprofesnaldiploma = () => {
    //     let semesters = "139";
    //     let degreepro = "0";
    //     let category = "Diploma";
        

    //     fetch("http://localhost:3001/api/get/course/" + semesters + "/" + degreepro + "/" + category,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',

    //             },
    //         }
    //     ).then((response) => {
    //         if (response.status == 200) {
    //             response.json().then((resp) => {
    //                 console.log("result", resp);
    //                 setDiplomacourse(resp.getCourse);
    //             });
    //         }


    //     })
    // }

    // const getSeassionValue = ()=>{
    //   let getsession = getSessionid.current.value;
    //  alert(getsession)
    // }

    return (
        <div>
           
            <ul className="years-list">
                {/* <li><a href="winter" className={tabs == winter ? "tabs active" : "tabs"}>Winter 2021</a></li>
                <li><a href="fall" className={tabs == fall ? "tabs active" : "tabs"}>Fall 2021</a></li> */}
                {

                    getyearsSeason.length > 0 && getyearsSeason.map((getyearsSeason, i) => {
                        return (
                          
                            <li><a href={"/registration/" + getyearsSeason.id + (type ? "/"+type : "")} value={getyearsSeason.id} className={trimester == getyearsSeason.id ? "tabs active" : "tabs"}  >{getyearsSeason.name} {getyearsSeason.year}</a></li>
                                   
                        )
                    })
                }

            </ul>
            {/* {
                                trimester == 139 && type == "Winter" &&
                                diplomacourse.length > 0 && diplomacourse.map((v, i) => {
                                    return (
                                        <Professionaldiplomas  {...v} />
                                    )
                                })

                            } */}


            
        </div>
    );

}


export default Model;

