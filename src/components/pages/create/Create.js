import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Alert } from "reactstrap";

import $ from "jquery";
import Header from '../header.js';
import Faculty from '../Faculty/Faculty.js';
import Footer from '../footer.js';
import scan from '../../images/scan.png';
import play from '../../images/play.png';
import bnrimg from '../../images/bnrimg.png';

import web1 from '../../images/web1.png';
import web2 from '../../images/web2.png';
import web3 from '../../images/web3.png';
import web4 from '../../images/web4.png';
import web5 from '../../images/web5.png';
import web6 from '../../images/web6.png';
import aboutimg from '../../images/aboutimg.png';
import { API_URL } from '../../../Config/index.js';

 

const Create = () => {

    const [show, setShow] = useState(true)
    const [error, setError] = useState(false)
    const [userId, setUserId] = useState(null)
    const [creating,  setCreating] = useState(false)
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [confirmemail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [telofficeNo, setTelofficeNo] = useState('');
    const [telcellNo, setTelcellNo] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [profession, setProfession] = useState('');
    const [highestdegreeearned, setHighestdegreeearned] = useState('');
    const [degreeinwhatfield, setDegreeinwhatfield] = useState('');
    const [yeardegreeearned, setyeardegreeearned] = useState('');
    const [licenses, setLicenses] = useState('');
    const [certifications, setCertifications] = useState('');
    const [yearsofprofessionalexperience, setYearsofprofessionalexperience] = useState('');
    const [whoreferredyou, setWhoreferredyou] = useState('');
    const [loginModel, setLoginModel] = useState(false);
    const LoginToggleModal = () => setLoginModel(!loginModel);
 

    const [registering, setRegistering] = useState(false);
    const [logging, setLogging] = useState(false);

    const totalCost = localStorage.getItem('totalCost')
    const balanceAmount = localStorage.getItem('balanceAmount')
    const classes = localStorage.getItem('classes')
    const [existingUserId, setExistingUserId] = useState(null);

    const cvFile = useRef()

    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);

    const [messageModal, setmessageModal] = useState(false);
    const messageToggle = () => setmessageModal(!messageModal);
    const [message, setmessage] = useState(false);
    const [messageHead, setmessageHead] = useState(false);
    const [showOtherRefer, setShowOtherRefer] = useState(false);
    const [source, setSource] = useState(null);
    
    const trimester = localStorage.getItem('trimester');

     const [balanceAmountDiscount, setBalanceAmountDiscount] = useState(0);
    const [totalCostDiscount, setTotalCostDiscount] = useState(0);

    const [scholarshipCode, setScholarshipCode] = useState(null);
    const [poNumber, setPoNumber] = useState(null);
    const [scapplied, setScapplied] = useState(null);
    const [poapplied, setPoapplied] = useState(null);
    const [codeError, setCodeError] = useState(null);
    


    const [countries,setCountries] = useState([])
    
    const [payPalModal, setPayPalModal] = useState(false);
    const payPalToggle = () => setPayPalModal(!payPalModal);
 
    const Navigate = useNavigate();
    // const [alert, setAlert] = useState(false);
    const [price, setPrice] = useState(100);
    
    const LoginUser = async () => {
        // let result = await fetch('http://localhost:5000/api/login', {
        //     method: 'POST',

        //     body: JSON.stringify({
        //         email,
        //         password
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // result = await result.json();
        // console.warn(result);
        // setAlert(false);
        // if (result.length > 0) {
        //     localStorage.setItem("user_id", JSON.stringify(result));
        //     Navigate('/');
        // }
        // else {
        //     setAlert(true);
        // }
    }

    useEffect(() => {
       getPrice()
       getCountries();
    },[email])
    

    const getCountries = async () => {
        const response = await fetch(API_URL+"/countries/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })

         const data = await response.json()
         if(data.status){
            setCountries(data.countries)
         }
        
    }
    const getPrice = async () => {
        const response = await fetch(API_URL+"/check/group?email="+email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })

         const data = await response.json()
         if(data.success){
            // setPrice(data.price)
         }
        
    }
    const savaFormDataTEST = () => {

    setmessageHead("Success!!")
    setmessage("Your registration was successful.<br /> <br /> You may log into the Professional School e-campus website any time at <a target='_blank' href='https://e-campus.bp.edu' ><u>www.e-campus.bp.edu</u></a> to access course materials and listen to recordings of previous sessions. You will be provided with details during the first course session. <br /> <br /> Thank you!  We look forward to seeing you.") ;
    messageToggle();
    }

    const savaFormData = () => {
        setError(false);
        if(email != confirmemail){
            setError("Email doesn't match.")
            return false;
        }
        if(!ValidateEmail(email) || !ValidateEmail(confirmemail)){
            setError('Email not valid.');
            return false;

        }
        if(email != confirmemail){
            setError("Email doesn't match.");
            return false;

        }
        if(password != confirmPassword){
            setError("Password doesn't match.");
            return false;

        }

        if(firstname == '' || lastname == '' || email == '' || confirmemail == '' || password == '' || confirmPassword == '' || telofficeNo == '' ||  address1 == '' ||  country == '' || state == '' || city == '' || postalcode == '' ){
            setError("Please fill in required fields.");
            return false;
        }

        if(show){
            if(highestdegreeearned == '' || profession == '' || degreeinwhatfield == '' || yeardegreeearned == '' || licenses == '' || certifications == '' || yearsofprofessionalexperience == '' ||  whoreferredyou == ''   ){
                setError("Please fill in required fields.");
                return false;
            }
        }


        let _member = {
            firstname, lastname, email, confirmemail, password, confirmPassword, telofficeNo, telcellNo
            , address1, address2, country, state, city, postalcode, profession, highestdegreeearned, degreeinwhatfield, yeardegreeearned , trimester , classes
            , licenses, certifications, yearsofprofessionalexperience, whoreferredyou, show,source
        };

        let formData = new FormData();
    

        formData.append('fname', firstname);
        formData.append('lname', lastname);
        formData.append('email', email);
        formData.append('username', email);
        formData.append('password', password);
        formData.append('phone', telofficeNo);
        formData.append('add1', address1);
        formData.append('add2', address2);
        formData.append('country', country);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('zip', postalcode);
        formData.append('paymentoptions', 'deposit');
        formData.append('amount', price);
        formData.append('semsids', trimester);
        formData.append('classes', classes);
        if(show){
            formData.append('profession', profession);
            formData.append('highestdeg', highestdegreeearned);
            formData.append('degrefield', degreeinwhatfield);
            formData.append('yeardegree', yeardegreeearned);
            formData.append('licenses', licenses);
            formData.append('certifications', certifications);
            formData.append('experienceyears', yearsofprofessionalexperience);
            formData.append('referredyou', whoreferredyou);
            formData.append('referredfiled', source);
            formData.append('cv', cvFile.current.files[0]);
        }
      
setCreating(true);

        fetch(API_URL+'/create/user', {
            method: 'POST',
           
            body: formData
        }).then(async (result) => {
            // console.warn("result",result);
            const data = await result.json()
setCreating(false);

            if(data.status){
            //    setUserId(data.id)
        setExistingUserId(data.id);

            payPalToggle();
               setTimeout(() => {
                    payNow(data.id) ;
               },2000)
            }
            else if(data.exist){
                setmessageHead('Error!')
                setmessage("You're an existing student. Please login to complete the registration")
                messageToggle();
            }
            else{
                setmessageHead('Error!')
                setmessage("Server Error.")
                messageToggle();


            }
        })


    }

    const applyponumber = async () => {
     

        let result = await fetch(API_URL+'/apply/ponumber', {
            method: 'POST',
            
            body: JSON.stringify({
                code : poNumber,
                payable: totalCost,
                balance : balanceAmount
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        setCodeError(false);
        setScapplied(false);
        setPoapplied(false);
        setTotalCostDiscount(0);
        setBalanceAmountDiscount(0);
        if (result.success) {
            if(result.exist){
                setTotalCostDiscount(result.payable);
                setBalanceAmountDiscount(result.balance)
                setPoapplied(true);
                setTimeout(() => {
                    payNow(existingUserId) ;
               },2000)

            }
            else{
                setCodeError("Invalid PO Number")
                setTimeout(() => {
                    payNow(existingUserId) ;

               },2000)

            }

            // Navigate('/');
        }
        else {
            setCodeError("Some Error Occured!!!")
            setTimeout(() => {
                                    payNow(existingUserId) ;

           },2000)

        }
    }


    const applyscholarshipcode = async () => {
     
        $("#paypal-button-container").html('')
        let result = await fetch(API_URL+'/apply/scholarship', {
            method: 'POST',
            
            body: JSON.stringify({
                couponcode : scholarshipCode,
                semsid :  trimester,
                payable: totalCost,
                balance : balanceAmount
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        setCodeError(false);
        setScapplied(false);
        setPoapplied(false);
        setTotalCostDiscount(0);
        setBalanceAmountDiscount(0);
        if (result.success) {
            if(result.exist){
                setTotalCostDiscount(result.payable);
                setBalanceAmountDiscount(result.balance)
                setScapplied(true);
                setTimeout(() => {
                    payNow(existingUserId) ;

},2000)
            }
            else{
                setCodeError("Invalid Code")
                setTimeout(() => {
                    payNow(existingUserId) ;

},2000)
            }

            // Navigate('/');
        }
        else {
            setCodeError("Some Error Occured!!!")
            setTimeout(() => {
                payNow(existingUserId) ;

},2000)
        }
    }


    const payNow = (id) => {
       
         paypal.Buttons({
           createOrder: function(data, actions) {
             return actions.order.create({
               purchase_units: [{
                 amount: {
                   value: parseFloat(price)
                 }
               }]
             });
           },
           onApprove: function (data, actions) {
               return actions.order.capture().then(function (details) {
                //   console.log(details)
                completeRegisteration(id,details) ; 
                  
                 })
               },
               onCancel: function (data) {
                  // window.location.replace("<?php echo $site_url;?>sales/CeRegister_new_back.php")
               }
         }).render('#paypal-button-container');
         
    }

    const completeRegisteration = async (id,details,_cost,_balanceAmount) => {
        setRegistering(true)
          
           let semsids = trimester
           const response = await fetch(API_URL+'/complete/registration/new/'+id, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                classes : classes,
                semsids : semsids,
                details,
                paidAmount : _cost,
                discountcoupon : scholarshipCode,
                pocode : poNumber,
                balance : _balanceAmount
               }),
           })
    
    
    
           const data = await response.json()
    
           if(data.status){
               setmessageHead("Success!!")
               setmessage("Your registration was successful.<br /> <br /> You may log into the Professional School e-campus website any time at <a target='_blank' href='https://e-campus.bp.edu' ><u>www.e-campus.bp.edu</u></a> to access course materials and listen to recordings of previous sessions. You will be provided with details during the first course session. <br /> <br /> Thank you!  We look forward to seeing you.") ;
               messageToggle();
                payPalToggle() ; 
                // setTotalCost(0) ;
                // setOrderedItems([])
               // setTimeout(() => {
               //     window.location.replace('https://e-campus.bp.edu/autologin.php?uid='+data.id)
               // },10000)
    
           }
           else{
               setmessageHead("Error!!")
               setmessage("Some Error Occured")
               messageToggle();
    
    
           }
       }

    const refervalue = (e) => {
        setWhoreferredyou(e.target.value)
        if(e.target.value == "Other: Please specify source"){
            setShowOtherRefer(true)
        }
    }



    function ValidateEmail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
        // alert("You have entered an invalid email address!")
        return (false)
    }
    return (

        <div className="main-bg">


            <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Login</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <div className="wrp-login">

                                <div className="login-content">

                                    <div className="wrp-label">
                                        <label>Email Address</label>
                                        <input
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="wrp-label mrt-input">
                                        <label>Password</label>
                                        <input
                                            value={password} onChange={(e) => setpassword(e.target.value)}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>

                                    {
                                        alert &&
                                        <Alert color="danger">
                                            Invalid Login
                                        </Alert>
                                    }

                                    <button className="login-btn" type="submit" onClick={LoginUser} >Login </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <Header />

            <Faculty message={"Please fill the form below and checkout"} />
            <div className="wrp-welcome-page">
                <div className="container">
                    <div className="welcome-content">
                        {/* <div className="welcome-head">
                            <h3>WELCOME</h3>
                         <h4>Professional School of Behavioral Health Sciences</h4> 

                        </div> */}
                        <div className="registration-from">
                           
                            {/* <p>Please complete your Registration profile as shown below</p> */}
                            


                        </div>
                        {/* <div className='registration-from-bottom'>
                            <p>Upon completion of the program, you will receive a transcript and a Certificate of Completion by email.</p>
                        </div> */}
                    </div>
                </div>
                <form>
                    <div className='form-main-wrap'>
                        <div className='container-fluid'>
                            <div className='form-wrap'>
                                <ul className='form'>
                                    <h3 className='mb-0 mt-0'>Registration Profile</h3>
                                    <small>If you're an existing student/faculty member please <u><a onClick={LoginToggleModal}>click here </a></u>to proceed to checkout.</small>
                                    <li>
              
              <div className='input-list'>
                  <p>First Name *</p>
                  <input type='text'     onChange={(e) => setFirstname(e.target.value)} placeholder='Enter first name'></input>
              </div>
              <div className='input-list'>
                  <p>Last Name *</p>
                  <input type='text'    onChange={(e) => setLastname(e.target.value)} placeholder='Enter last name'></input>
              </div>
              <div className='input-list'>
                  <p>Email Address (Username) *</p>
                  <input type='text'   onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'></input>
              </div>
              <div className='input-list'>
                  <p>Confirm Email Address *</p>
                  <input   onChange={(e) => setConfirmEmail(e.target.value)} placeholder='Enter email'></input>
              </div>
              </li>
        
          <li>
              <div className='input-list'>
                  <p>Password *</p>
                  <input   onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter password'></input>
              </div>
              <div className='input-list'>
                  <p>Confirm Password *</p>
                  <input   onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Enter password'></input>
              </div>
              <div className='input-list'>
                  <p>Tel Office Number *</p>
                  <input   onChange={(e) => setTelofficeNo(e.target.value)} type='text' placeholder='Enter office number'></input>
              </div>
              <div className='input-list'>
                  <p>Tel Cell Number</p>
                  <input   onChange={(e) => setTelcellNo(e.target.value)} type='text' placeholder='Enter cell number'></input>
              </div>


          </li>
          <li>
              <div className='input-list2'>
                  <p>Address Line 1 *</p>
                  <input   onChange={(e) => setAddress1(e.target.value)} type='text' placeholder='Enter Street address'></input>
              </div>
              <div className='input-list2'>
                  <p>Address Line 2 </p>
                  <input  onChange={(e) => setAddress2(e.target.value)} type='text' placeholder='Enter apartment, suite, unit etc (optional)'></input>
              </div>
          </li>
          <li>
                    {
                        countries.length > 0 &&
          <div className='input-list'>
                  <p>Country *</p>
                  <select className=""   onChange={(e) => setCountry(e.target.value)} >
                      <option value={''}>Select Country</option>
                      {
                          countries.map((v,i) => {
                              return (
                                <option value={v.id}>{v.Name}</option>
                              )

                          })
                      }
                    
                  </select>
              </div>
                    }

              <div className='input-list'>
                  <p>State, province, other *</p>
                  <input   onChange={(e) => setState(e.target.value)} type='text' placeholder='State, province, other *'></input>
 
              </div>
              <div className='input-list'>
                  <p>City *</p>
                  <input   onChange={(e) => setCity(e.target.value)} type='text' placeholder='Select city'></input>
              </div>
              <div className='input-list'>
                  <p>Postal Code *</p>
                  <input   onChange={(e) => setPostalcode(e.target.value)} type='text' placeholder='Enter postal code'></input>
              </div>


          </li>
                                    <div className="professional-content">
                                        {/* <h3>Professional Certificate in NeuroAcrobatics™</h3> */}
                                        {/* <p className='text-justify'>If you plan to earn a <b>Professional Certificate in NeuroAcrobatics™ </b> by taking the subsequent two */}
                                            {/* webinars, click  here: <u><b style={{cursor: "pointer"}} onClick={() => setShow(!show)}>Professional Background Profile.</b></u>  */}
                                        {/* </p> */}
                                        {/* <p>If applicable, click here to complete your  (only for those interested in earning a Professional Certificate)</p> */}
                                    </div>

                                    {
                                        show ? <div>
                                          <ul className='form'>
                            <li>
                                <div className='input-list'>
                                    <p>Profession *</p>
                                    <input   onChange={(e) => setProfession(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Highest degree earned *</p>
                                    <input   onChange={(e) => setHighestdegreeearned(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Degree in what field *</p>
                                    <input   onChange={(e) => setDegreeinwhatfield(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Year degree earned *</p>
                                    <input   onChange={(e) => setyeardegreeearned(e.target.value)} type='text' placeholder=''></input>
                                </div>
                            </li>
                            <li>
                                <div className='input-list1'>
                                    <p>Licenses (Indicate NA if none.) *</p>
                                    <input   onChange={(e) => setLicenses(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list1'>
                                    <p>Certifications (Indicate NA if none.) *</p>
                                    <input type='text'   onChange={(e) => setCertifications(e.target.value)} placeholder=''></input>
                                </div>



                            </li>
                            <li>
                                <div className='input-list input-list4'>
                                    <p>Years of professional experience *</p>
                                    <input   onChange={(e) => setYearsofprofessionalexperience(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list input-list4'>
                                    <p>Who referred you?*</p>
                                    <select onChange={refervalue} >
                                    <option value="" data-title="Website Link" data-id="0">Please Choose</option>
                                    <option value="School website or email" data-title="Website Link" data-id="0">School website or email</option>
                                       <option value="Social Media, e.g., Facebook" data-title="Website Link" data-id="1">Social Media, e.g., Facebook</option>
                                       <option value="Faculty, Student, or Admin" data-title="Specify name" data-id="1">Faculty, Student, or Admin</option>
                                       <option value="Employer" data-title="Specify Name" data-id="1">Employer</option>                                    
                                       <option value="Personal friend" data-title="Name" data-id="1">Personal friend</option>
                                       <option value="Professional colleague" data-title="Name" data-id="1">Professional colleague</option>
                                       <option value="Other: Please specify source" data-title="Name" data-id="1">Other: Please specify source</option>

                                    </select>
                                </div>
                                {
                                showOtherRefer ?
                                <>                                
                                <div className='input-list'>
                                <p>Please specify source </p>
                                <input   onChange={(e) => setSource(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                </>
                                :
                                null
                                }
                                <div className={showOtherRefer ? 'input-list' : 'list5'}>
                                    <p>Upload CV</p>
                                    <input type="file" id="myfile" name="myfile"  ref={cvFile}  >

                                    </input>
                                </div>
                                
                            </li> 
                        </ul>
                                        </div> : null
                                    }
                <p className='text-danger text-center mt-2 mb-0 p-0'>{error}</p>
                                        
                                    <div className='r-but2'>
                                        {
                                            creating ?
                                            <a  >REGISTERING...</a>
                                            :
                                            <a onClick={savaFormData} >REGISTER AND PAY NOW (${totalCost})</a>
                                            
                                            
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>


                <form>
                    <div className='form-main-wrap'>
                        <div className='container'>

                        </div>
                    </div>
                </form>

            </div>


            <Modal isOpen={payPalModal} toggle={payPalToggle} className="connect-box" centered={true}>
            <ModalHeader toggle={payPalToggle}><span className="ml-1 roititle font-weight-bold">
            {
                            parseFloat(balanceAmount - balanceAmountDiscount).toFixed(2) == 0 ?
                            <>
                            Amount Payable : ${parseFloat(totalCost -  totalCostDiscount).toFixed(2)}
                            </>
                            :
                            <>
                            Program Deposit : ${parseFloat(totalCost -  totalCostDiscount).toFixed(2)}
                             
                            </>
                    }
                    </span>
                
                </ModalHeader>
                <ModalBody>
                <div className="discount-btn">
                       
                       {
                        parseFloat(balanceAmount - balanceAmountDiscount).toFixed(2) > 0 &&
                        <p className='mb-0'><b>Balance due 2 days before program starts:</b> ${parseFloat(balanceAmount - balanceAmountDiscount).toFixed(2)}</p>
                    }
                       {
                           scapplied ? 
                           <p className='text-success'><i className='fa fa-check-circle'></i> Scholarship Code Applied</p>:
                           poapplied ? 
                           <p className='text-success'><i className='fa fa-check-circle'></i> PO Number Applied</p>
                           :
                           null
                       }
                       {
                        parseFloat(balanceAmount - balanceAmountDiscount).toFixed(2) > 0 &&
                       <hr />
                    }
                       {
                           codeError ?
                           <small className='text-danger'><i className='fa fa-times'></i> {codeError}</small>
                           :
                           null

                       }

                       <div className="coupon-wrp mb-4 mt-2">
                           <div className="coupon-child1">
                               <label><b>Scholarship Code</b></label>
                               <input onChange={(e) => setScholarshipCode(e.target.value)} placeholder='Enter Scholarship Code' />
                               <button onClick={applyscholarshipcode}>Apply</button>
                           </div>
                           <div className="coupon-child1 coupon-right">
                                <label><b>PO Number</b></label>
                                <input onChange={(e) => setPoNumber(e.target.value)} placeholder='Enter PO Number' />
                               <button onClick={applyponumber}>Apply</button>
                           </div>
                       </div>
                       {
                           registering &&
                           <button disabled={true}>Completing Registration...</button>

                       }
                       {
                           totalCost == totalCostDiscount && !registering &&
                           <button onClick={() =>  completeRegisteration(existingUserId,'',0,0)}>CheckOut</button>
                       }
                    </div>
                    {
                           totalCost != totalCostDiscount &&
                           <div id="paypal-button-container">
                       
                           </div>
                    }
                </ModalBody>

            </Modal>

            <Modal isOpen={messageModal} toggle={messageToggle} className="connect-box" centered={true}>
                <ModalHeader toggle={messageToggle}><span className="ml-1 roititle font-weight-bold">{messageHead}</span></ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{__html : message}}>
                       
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={loginModel} toggle={LoginToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={LoginToggleModal}><span className="ml-1 credentials-title">Please enter your e-campus credentials to checkout</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                            <div className='login-bg'>
                                <div className="wrp-login">

                                    <div className="login-content">
                                       
                                        <div className="wrp-label">
                                            <label>Email Address</label>
                                            <input
                                               
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="wrp-label mrt-input">
                                            <label>Password</label>
                                            <input
                                                
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </div>

                                       

                                        <button className="login-btn" type="submit"  >CheckOut</button>

                                    </div>

                                </div>
                            </div>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}
export default Create;