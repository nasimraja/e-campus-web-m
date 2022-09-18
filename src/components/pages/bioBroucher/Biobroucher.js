import React, { Component, useEffect, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import Header from "../header";
import dollers from '../../images/dollars.png';
import calender from '../../images/calendar.png';
import presenter from '../../images/presenter.png';




const Biobrocher = () => {

    const [course, setCourse] = useState({});
    const [date, setDates] = useState([]);
    const [topic, setTopic] = useState({});

    const {id} = useParams();

    useEffect(() => {
        getcourse();
        getTopic();



    }, [])

    const getcourse = () => {

        let courseid = id;

        fetch("http://localhost:3001/api/get/course/" + courseid,
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
                    setCourse(resp.getcoursebyid);

                });
            }


        })
    }
    const getTopic = () => {
       
        let courseid = id;

        fetch("http://localhost:3001/api/get/topic/" + courseid,
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
                    setTopic(resp.usersResult);

                    
                    
                });
            }
            


        })
    }








    return (
        <div>
            <Header />
            <div className="container">
                {
                    course.length > 0 && course.map((v, i) => {
                        return (
                            <div className="bio-data-box">
                                <div className="wrp-head-bio">
                                    <div className="heading-biodata">
                                        <h3>({v.coursecode}) {v.course}</h3>
                                    </div>
                                    <div className="btns-b-ad-wrp">

                                        <a href="/registration" className="back-btn">BACK</a>
                                    </div>
                                </div>

                                <div className="amout-wrp">
                                    <div className="amout-c"><p><img src={dollers} /> AMOUNT: <span>${v.price}</span></p></div>
                                    <div className="amout-c mrt-mobile"><p><img src={presenter} /> PRESENTER: {
                                        topic.length > 0 && topic.map((bioV, i)=>{
                                            return(
                                                <span>{bioV.name} {bioV.lastname}</span>
                                            )
                                        })
                                    }</p></div>
                                </div>
                                <div className="presenter-bio">
                                    <h3>PRESENTER BIO:-</h3>
                                    {
                                        topic.length > 0 && topic.map((bioV, i)=>{
                                            return(
                                                <p dangerouslySetInnerHTML={{ __html: v.topic }}></p>
                                            )
                                        })
                                    }
                                    
                                </div>
                                <div className="course-session-dates">
                                    <h3>COURSE SESSION DATES:-</h3>

                                    <ul className="session-dates-box">

                                        {/* {
                                       date.map((vdate,i)=>{ */}
                                        <li>
                                            <div className="session-dates-child mr-right">
                                                <p><img src={calender} className="calender-img" /> {v.sessiondates}</p>
                                            </div>
                                        </li>
                                        {/* })
                                   } */}

                                    </ul>
                                </div>
                                <div className="btns-bottom-wrp">
                                    <div className="btns-b-ad-wrp">

                                        <a href="/registration" className="back-btn">BACK</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}



export default Biobrocher;