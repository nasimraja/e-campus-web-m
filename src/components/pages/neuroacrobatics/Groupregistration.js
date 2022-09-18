import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Alert } from "reactstrap";
import Header from '../header.js';
import Faculty from '../Faculty/Faculty.js';
import RegistrationForm from '../neuroacrobatics/RegistrationForm'
import RegistraionList from './RegistraionList.js';
import GroupComponent from './GroupComponent.js';
import { API_URL } from '../../../Config/index.js';
import ExistRegistrationForm from './ExistRegistrationForm.js';
import GroupComponentRow from './GroupComponentRow.js';




const Groupregistration = (props) => {

    const [show, setShow] = useState(false);
    const [val, setVal] = useState(localStorage.getItem('val'));
    const [currentinputval, setcurrentinputval] = useState(localStorage.getItem('cuval'));
    const [addformModal, setAddform] = useState(false);
    const addformToggleModal = () => setAddform(!addformModal);

    const [viewGroup, setViewGroup] = useState(false);
    const viewGroupToggle = () => setViewGroup(!viewGroup);

    
    const [groupEmail, setGroupEmail] = useState(null);
    const [addexistformModal, setAddexistformModal] = useState(false);
    const addexistformToggleModal = () => setAddexistformModal(!addexistformModal);
    

    const [addlimitperson, setAddlimitperson] = useState(false);
    const addlimitpersonToggleModal = () => setAddlimitperson(!addlimitperson);
    const [selectedradiobtn,setselectedradiobtn] = useState(localStorage.getItem('selectedradiobtn'))
    const [selectedradiobtn2,setselectedradiobtn2] = useState(localStorage.getItem('selectedradiobtn2'))
    const radiobtn = useRef();
    const radiobtn2 = useRef();
    const [groupmember, setGroupMember] = useState([]);
    const [messageModal, setmessageModal] = useState(false);
    const messageToggle = () => setmessageModal(!messageModal);
    const [message, setmessage] = useState(false);
    const [messageHead, setmessageHead] = useState(false);
    const [error, setError] = useState(false)



    const member = JSON.parse(localStorage.getItem('Member'));
    console.log(member);
    // localStorage.setItem('Member', JSON.stringify(Member));

    //    localStorage.clear();

    useEffect(() => {
        // let result = localStorage.getItem('Member');
        // console.log(result);

        // if(result){

        //   console.log("here are member")
        // }
        // else{
        //     // let _temp = [];
        //     localStorage.setItem('Member','[]');
        // }
        console.log(selectedradiobtn)
        console.log(selectedradiobtn2)
        if(selectedradiobtn == null && selectedradiobtn2 ==  null){
            localStorage.setItem('selectedradiobtn', true);
            localStorage.setItem('selectedradiobtn2', false);
            setselectedradiobtn(true);
            setselectedradiobtn2(false);
            localStorage.setItem('val', 5);
            localStorage.setItem('cuval',5)

            setVal(5);
            setcurrentinputval(5);
            // alert("here")
        }

        // alert(selectedradiobtn)
        // alert(selectedradiobtn2)

    }, [])

    useEffect(() => {

    },[val])

    const handleradio = (v) => {
        setVal(v);
        setCurVal(v);
        localStorage.setItem('val', v);

        if (v == 5) {
            localStorage.setItem('selectedradiobtn', true);
            localStorage.setItem('selectedradiobtn2', false);
         }
        else {
            localStorage.setItem('selectedradiobtn2', true);
            localStorage.setItem('selectedradiobtn', false);

        }
 
    }

    const fetchGroup = async () => {
        const responseUser = await fetch(API_URL+"/get/group?email="+groupEmail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })



        const data = await responseUser.json()

        if(data.success && data.exist  ){
            setGroupMember(data.members)
        }
    }


    
    const addpersonexist = () => {
        addexistformToggleModal()

    }
 
    const addperson = () => {
        // alert(member.length);  
        // alert(currentinputval);  
        if (member) {
            if (member.length < currentinputval) {
                addformToggleModal()

            }

            else {
                addlimitpersonToggleModal()
            }
        }
        else {
            addformToggleModal()

        }

    }

    const setCurVal = (v) => {
        localStorage.setItem('cuval',v)
        setcurrentinputval(v);
       

        if(v > 9){
        // alert("here")
            setVal(10);
        localStorage.setItem('val',10)

            setselectedradiobtn(false);
            setselectedradiobtn2(true);

            localStorage.setItem('selectedradiobtn2', true);
            localStorage.setItem('selectedradiobtn', false);
        }
        else if (v < 10 ){
            setVal(5);
            localStorage.setItem('val',5)
    
                setselectedradiobtn(true);
                setselectedradiobtn2(false);
    
                localStorage.setItem('selectedradiobtn2', false);
                localStorage.setItem('selectedradiobtn', true);
        }
         
        
    }

    const addGroup = async () => {
        let result = JSON.parse(localStorage.getItem('Member'));
        if(result){
            if(result.length < val){
                setmessageHead("Error!!.")
                setmessage("Not enough members added.")
                messageToggle()
            }
            else{
            // alert(val);
            let members =  result ; 
            let discount = val ; 
            const response = await fetch(API_URL+'/add/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    members,
                    discount,
                }),
            })
            const data = await response.json()
            if(data.status){
                setmessageHead("Success!!");
                setmessage('You have created a Group Account.<br /><br />  Each member on the list will receive an email invitation to register. <br /><br />Should you want to add an additional person at a subsequent time, return to GROUP REGISTRATION and click "Add new member to existing group." <br /><br />  Please <a href="/neuroacrobatics" >click here</a> to complete your own registration.<br /><br />');
                messageToggle()
                localStorage.setItem('Member','[]') ;
                localStorage.setItem('selectedradiobtn', true);
                localStorage.setItem('selectedradiobtn2', false);
                localStorage.setItem('val', 5);
                localStorage.setItem('cuval',5)
                // window.location.replace('/')
            }
            else{
                setmessageHead("Error!!")
                setmessage("Some error occured.")
                messageToggle();
            }
    
        }
        }
        else{
            setmessageHead("Error!!")
            setmessage("Not enough members added.")
            messageToggle();



        }
      



    }


    return (
        <div className="main-bg">
            <Header />

            <Faculty />
            <div className="container">
                <div className="group-head">
                    <h3>CREATE REGISTRATION GROUP. </h3>
                    <div className="add-form pull-right">

                    <a onClick={viewGroupToggle} className="ml-3">View Existing Group</a>
                    <a href="/neuroacrobatics" className="ml-3">Go Back</a>
                </div>
                <div className="add-form2 mb-3">

                    <a onClick={addpersonexist}>Add new member to an existing group</a>
                    <p style={{marginTop: "5px" , fontSize : "14px"}}>Note: Once a group account is created, adding new people will not alter the discount.</p>

                    </div>
                    <h4><span style={{fontSize: "20px"}}>OR,</span> create a group by making a selection below:</h4>
              
                    <p><input type="checkbox" id="one" name='one'   value="5" onChange={() => handleradio(5)}  checked={val == 5  ? true : false} /> <label for="one">Five to nine persons: $570.00 (5%)</label></p>
              
                    <p><input type="checkbox" id="two" name='one'   value="10" onChange={() => handleradio(10)}  checked={val == 10 ? true : false} /> <label for="two">Ten or more persons: $540.00 (10%)</label></p>
                    
                    <div className="register-people">
                        <div className="register-p"><p>How many people will be in the group (including yourself)? <input type="number" min={val} value={currentinputval} onChange={(e) => setCurVal(e.target.value)} /></p></div>
                       
                        {/* <div className="add-form">
                            <a href="/">Go to Register</a>
                        </div> */}
                         <Modal isOpen={viewGroup} toggle={viewGroupToggle} className="modal-wrp connect-box" centered={true}>
                            <ModalHeader toggle={viewGroupToggle}><span className="ml-1 roititle font-weight-bold">View Group Members</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-p">
                                    <div>
                                        <div className='d-flex justify-content-center'>
                                        <input type={'text'} placeholder={"Enter your email address"} style={{width : "auto" , minWidth : "250px"}} onChange={(e) => setGroupEmail(e.target.value)} /> 
                                        <button className='fetchbtn' onClick={fetchGroup}>View Members</button>{
                                            groupmember.length > 0 &&
                                           
                                        <button className='fetchbtn pull-right' onClick={addexistformToggleModal}>Add new member</button>
                                         
                                        }
                                        </div>
                                        
                                        {/* <RegistrationForm  /> */}
                                        <p className='text-danger text-center mt-2 mb-0 p-0'>{error}</p>
                                        
                                         
                                        {
                            groupmember.length > 0 && groupmember.map((v, i) => {
                                //  v = JSON.parse(member);
                                return (
                                    
                                    <GroupComponentRow {...v} index={i} />
 

                                )
                            })
                        }
                                    </div>
                                </div>
                            </ModalBody>

                        </Modal>
                        <Modal isOpen={addformModal} toggle={addformToggleModal} className="modal-wrp connect-box" centered={true}>
                            <ModalHeader toggle={addformToggleModal}><span className="ml-1 roititle font-weight-bold">Add Member</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-p">
                                    <div>
                                        <RegistrationForm  />
                                    </div>
                                </div>
                            </ModalBody>

                        </Modal>
                        <Modal isOpen={addexistformModal} toggle={addexistformToggleModal} className="modal-wrp connect-box" centered={true}>
                            <ModalHeader toggle={addexistformToggleModal}><span className="ml-1 roititle font-weight-normal"> </span></ModalHeader>
                            <ModalBody>
                                <div className="">
                                    <div>
                                        <ExistRegistrationForm viewGroupToggle={() => viewGroupToggle()} memberemail={groupEmail} addexistformToggleModal={() => addexistformToggleModal} />
                                    </div>
                                    {/* <div className='r-but2'>
                    <a onClick={() => props.addexistformToggleModal}>Close</a>
                </div> */}
                                </div>
                            </ModalBody>

                        </Modal>
                        <Modal isOpen={addlimitperson} toggle={addlimitpersonToggleModal} className="connect-box" centered={true}>
                            <ModalHeader toggle={addlimitpersonToggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-p">
                                    <div>
                                        <p>You have reached the number of members you specified.  if you wish to add more members, increase the number of people to be in the group.</p>
                                    </div>
                                </div>
                            </ModalBody>

                        </Modal>
                    </div>
                </div>
            </div>
            
            <div className="container">
            <div className="add-form mb-3">
                        
                        {
                            (!member || member.length == 0) ?
                            <a onClick={addperson}>Add Yourself</a>
                            :
                            <a onClick={addperson}>Add Member</a>
                        }

                    </div>
                <div>
                    {/* {val} */}
                    <div class="accordion" id="accordionExample">
                        {
                            member && member.map((v, i) => {
                                //  v = JSON.parse(member);
                                return (
                                    
                                    <GroupComponent {...v} index={i} />
 

                                )
                            })
                        }
                      
                        {
                            member &&  member.length == currentinputval &&
                            <div className='r-but2'>
                            <a onClick={addGroup}>Create Registration Group</a>
                        </div>

                        }
                        {
                            member &&  member.length > currentinputval &&
                            <div className='r-but2 text-center mt-3 font-weight-bold'>
                            You have entered more people than specified, please adjust membership.
                        </div>

                        }
                        {
                            (!member ||  member.length == 0) &&
                            <div className='card mt-2'>
                            <p className="pdata ml-2 pt-3 pb-3">No member added yet.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Modal isOpen={messageModal} toggle={messageToggle} className="connect-box" centered={true}>
                <ModalHeader toggle={messageToggle}><span className="ml-1 roititle font-weight-bold">{messageHead}</span></ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{__html : message}}>
                       
                    </div>
                </ModalBody>

            </Modal>

        </div>
    )
}
export default Groupregistration;