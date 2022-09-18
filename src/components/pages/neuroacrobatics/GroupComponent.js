import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Alert } from "reactstrap";
import Header from '../header.js';
import Faculty from '../Faculty/Faculty.js';
import RegistrationForm from '../neuroacrobatics/RegistrationForm'
import RegistraionList from './RegistraionList.js';
import darrow from '../../images/darrow.png';
import deletes from '../../images/delete.png'



const GroupComponent = (props) => {

    const [show, setShow] = useState(false);
    const [addformModal, setAddform] = useState(false);
    const [member, setMember] = useState({});
    const addformToggleModal = () => setAddform(!addformModal);

    // const daya
    // const member = JSON.parse(localStorage.getItem('Member'));
    // console.log(member);
    // localStorage.setItem('Member', JSON.stringify(Member));

    //    localStorage.clear();

    useEffect(() => {
        if (props.firstname) {
            // console.log(props);

            setMember(props)
        }
        else {
            console.log(props);

            let _temp = JSON.stringify(props);
            _temp = JSON.parse(_temp);
            //  console.log(_temp);
            setMember(_temp);
        }
        // let result = localStorage.getItem('Member');
        // console.log(result);

        // if(result){

        //   console.log("here are member")
        // }
        // else{
        //     // let _temp = [];
        //     localStorage.setItem('Member','[]');
        // }

    }, [])

    const deleteItem =()=>{
        let result = JSON.parse(localStorage.getItem('Member'));
        result.splice(props.index,1);

        // alert(props.index)
        result = JSON.stringify(result)
        localStorage.setItem('Member', result);

        window.location.reload()
       
    }
  

    return (
        <div>
            {
                 <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <div className="form-list-wrp">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <img src={darrow} className="dimg" />
                                {member.lastname}, {member.firstname} 
                            </button>
                            <div className="action-icon">
                                <img src={deletes} onClick={deleteItem}  />
                            </div>
                            </div>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            <RegistraionList  index={props.index} data={member} />
                        </div>
                    </div>
                </div>
            }

        </div>


    )
}
export default GroupComponent;