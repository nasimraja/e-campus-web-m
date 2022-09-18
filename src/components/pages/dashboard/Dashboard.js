import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, useParams, Router,useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { Alert } from "reactstrap"
import $ from "jquery";
import Header from '../header.js';
import Tremester from '../Model/Tremester';
import Faculty from '../Faculty/Faculty.js';
import { ToastContainer } from 'react-toastify';
import Professionaldiplomas from '../Professionaldiplomas/Professionaldiplomas.js';
import Proseminars from '../Proseminars/Proseminars.js';
import Lecturespresentations from '../Lecturespresentations/Lecturespresentations.js';
import Courses from '../courses/courses.js';
import DegreePrograms from '../degreePrograms/DegreePrograms';
import Program from '../program/Program.js';
import Professionalcertificates from '../Professionalcertificates/Professionalcertificates.js';
import { API_URL } from '../../../Config/index.js';




const Dashboard = (props) => {

    // const trimester 
    const [orderedItems, setOrderedItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    
    const [course, setCourse] = useState({});
    const { type } = useParams();
    const { trimester } = useParams();
    // alert(trimester);
    const [diplomacourse, setDiplomacourse] = useState([]);
    const [ProseminarsCourse, setProseminarsCourse] = useState([]);
    const [courses, setCourses] = useState([]);
    const [ProfessionalCertificates, setProfessionalCertificates] = useState([]);

    const [checkoutsuccessModel, setCheckoutsuccess] = useState(false);
    const checkoutsuccessToggleModal = () => setCheckoutsuccess(!checkoutsuccessModel);

    
    const [registering, setRegistering] = useState(false);
    const [logging, setLogging] = useState(false);

    const [selectcourseModel, setSelectcourse] = useState(false);
    const selectcourseToggleModal = () => setSelectcourse(!selectcourseModel);

    const [loginModel, setLoginModel] = useState(false);
    const LoginToggleModal = () => setLoginModel(!loginModel);
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [alert, setAlert] = useState(false);
    const [existingUserId, setExistingUserId] = useState(null);
    const [balanceAmount, setBalanceAmount] = useState(0);
    const [balanceAmountDiscount, setBalanceAmountDiscount] = useState(0);
    const [totalCostDiscount, setTotalCostDiscount] = useState(0);
    const [totalActualCost, setTotalActualCost] = useState(0);
    
    const [scholarshipCode, setScholarshipCode] = useState(null);
    const [poNumber, setPoNumber] = useState(null);
    const [scapplied, setScapplied] = useState(null);
    const [poapplied, setPoapplied] = useState(null);
    const [codeError, setCodeError] = useState(null);
    

    
    const Navigate = useNavigate();


    const [messageModal, setmessageModal] = useState(false);
    const messageToggle = () => setmessageModal(!messageModal);

    const [message, setmessage] = useState(false);
    const [messageHead, setmessageHead] = useState(false);

 
    const [payPalModal, setPayPalModal] = useState(false);
    const payPalToggle = () => setPayPalModal(!payPalModal);

    const [discoutModal, setDiscoutModal] = useState(false);
    const discoutToggle = () => setDiscoutModal(!discoutModal);

    const tabArray = [
        {
            types: "diploma", tabDisplay: "Professional Diplomas"
        },
        {
            types: "Program", tabDisplay: "Professional Certificates"
        },
        {
            types: "course", tabDisplay: "Courses & Workshops"
        },
        {
            types: "Proseminar", tabDisplay: "Proseminars"
        },



    ];


    useEffect(() => {
        
        setExistingUserId(localStorage.getItem('existingUserId'));
        getprofesnaldiploma();
        getCourseProseminars();
        getCourses();
        Professional_Certificates();

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 300) {
                $('.checkout-box').addClass('fixed-box');

            }
            else {
                $('.checkout-box').removeClass('fixed-box');

            }
        });

        changePickupStoreMenu();

        function changePickupStoreMenu() {



        }


    }, [])

    const LoginUser = async () => {
        setLogging(true);

        let result = await fetch(API_URL+'/login', {
            method: 'POST',
            
            body: JSON.stringify({
                mail,
                pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        setAlert(false);
        if (result.success) {
            localStorage.setItem('existingUserId' , result.user)
            setExistingUserId(result.user);
            LoginToggleModal();

            payPalToggle();
            setTimeout(() => {
                payNow(result.user) ;
           },2000)
            // Navigate('/');
        }
        else {
            setAlert(true);
        }
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
       let _cost = parseFloat(totalCost - totalCostDiscount).toFixed(2);
       let _balanceAmount = parseFloat(balanceAmount - balanceAmountDiscount).toFixed(2);
    //    let _cost = 0.01;
        paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: parseFloat(_cost)
                }
              }]
            });
          },
          onApprove: function (data, actions) {
              return actions.order.capture().then(function (details) {
               //   console.log(details)
                
               completeRegisteration(id,details,_cost,_balanceAmount) ; 
                 
                })
              },
              onCancel: function (data) {
                 // window.location.replace("<?php echo $site_url;?>sales/CeRegister_new_back.php")
              }
        }).render('#paypal-button-container');
        
   }

   const completeRegisteration = async (id,details,_cost,_balanceAmount) => {
    setRegistering(true)
    let _temp = [] ; 
    orderedItems.map((v,i) => {
        _temp.push(v.id);
    })
    console.log(_temp);
    let classes = _temp.join(',');
    //    let classes = orderedItems.join(',')
       let semsids = trimester
       const response = await fetch(API_URL+'/complete/registration/existing/'+id, {
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

    const getprofesnaldiploma = () => {
        let semesters = trimester;
        let degreepro = "0";
        let category = type;


        fetch(API_URL+"/get/course/" + semesters + "/" + degreepro + "/" + category,
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
                    setDiplomacourse(resp.data);

                });
            }



        })
    }
    const Professional_Certificates = () => {
        let semesters = trimester;
        let degreepro = "0";
        let category = type;


        fetch(API_URL+"/get/course/" + semesters + "/" + degreepro + "/" + category,
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
                    setProfessionalCertificates(resp.data);
                });
            }


        })
    }


    const getCourses = () => {
        let semesters = trimester;
        let individual = "1";
        let category = type;

        fetch(API_URL+"/get/courses/" + semesters + "/" + individual + "/" + category,
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
                    setCourses(resp.data);
                });
            }


        })
    }
    const getCourseProseminars = () => {
        let semesters = trimester;
        let degreepro = "0";
        let category = "Proseminar";

        fetch(API_URL+"/get/course/" + semesters + "/" + degreepro + "/" + category,
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
                    setProseminarsCourse(resp.data);
                });
            }


        })
    }

    useEffect(() => {
        let _temp = [] ; 
        orderedItems.map((v,i) => {
            _temp.push(v.id);
        })
        // console.log(_temp);
        let classes = _temp.join(',');
        localStorage.setItem('trimester' , trimester);
        localStorage.setItem('classes' , classes);
        localStorage.setItem('totalCost' , totalCost);
        localStorage.setItem('balanceAmount' , balanceAmount);
    },[orderedItems,totalCost,balanceAmount,trimester]);




    const handleChange = (item, event) => {
        if (event.target.checked) {
            setOrderedItems((cartItem) => [...cartItem, item]);
            console.log(item.bamount_new);
            item.bamount_new ? setTotalCost((total) => total + parseInt(item.damount_new)) : setTotalCost((total) => total + parseInt(item.price));
            item.bamount_new ? setBalanceAmount(item.bamount_new) : setBalanceAmount(0) ;

             setTotalActualCost((total) => total + parseInt(item.price)) ;

            
            // item.bamount_new ? setBalanceDate(item.)
            // add item to orderedItems array
        } else {
            // remove item from orderedItems array
            setOrderedItems((cartItem) =>
                cartItem.filter((v) => v.name !== item.name)
            );



            item.bamount_new ? setTotalCost((total) => total - parseInt(item.damount_new)) : setTotalCost((total) => total - parseInt(item.price));
            setBalanceAmount(0) ;
            setTotalActualCost((total) => total - parseInt(item.price)) ;

            // setTotalCost((total) => total - parseInt(item.price));
        }
    };

    const handlechaeckOut = () => {
        if (orderedItems.length > 0) {
            
            // console.log(classes)
            checkoutsuccessToggleModal()
        }
        else {
            selectcourseToggleModal()
        }

    }


    // const handlelogin = ()=>{
    //     // if(){

    //     // }
    // }


    return (
        <div>


            <div className='main-bg'>
                <Header />

                <Faculty message={"Please register here."} />
                <div className='container'>
                    {/* <div className='winter-heading'>
                        <h3>Registration</h3>
                    </div>
                     */}
                </div>
                <div className='container-fluid'>
                    <div className='register-wrap'>
                        <div className='tab-list'>
                            <ul className='tab'>


                                {
                                    tabArray.map(function (v, i) {
                                        return (
                                            <li> <a href={"/registration/" + trimester + "/" + v.types} className={type == v.types ? "tabs active" : "tabs"}>{v.tabDisplay}</a></li>
                                        )
                                    }

                                    )
                                }

                                <div className="wrp-checkout-box">
                                    <div className="checkout-box">
                                        <p>Total Amount: ${totalActualCost}</p>
                                        {/* <p>Deposit Amount: ${totalCost}</p> */}
                                        <a onClick={handlechaeckOut}>CheckOut</a>
                                    </div>
                                </div>
                                {/* <div><a href='#' onClick={discoutToggle}>click here</a></div> */}

                            </ul>
                        </div>
                        <div className='tab-line'></div>

                        <div className="right-section">
                            <Tremester />
                            <div className="right-d-box">
                                <div className='tab-c-h'>
                                    {/* <h6>Professional Diplomas</h6>
                                    <div className='tab-c-h-line'></div> */}
                                </div>


                                {
                                    type == "diploma" &&
                                    diplomacourse.length > 0 && diplomacourse.map((v, i) => {
                                        return (
                                            <Professionaldiplomas data={handleChange} {...v} />
                                        )

                                    })

                                }
                                {
                                    type == "diploma" &&
                                    diplomacourse.length == 0 &&
                                    <p className="not-faund">No Professional Diplomas found</p>

                                }
                                {
                                    type == "Program" &&
                                    ProfessionalCertificates.length > 0 && ProfessionalCertificates.map((pvalue, i) => {
                                        return (
                                            <Professionalcertificates data={handleChange} {...pvalue} />
                                        )
                                    })

                                }

                                {
                                    type == "course" &&
                                    courses.length > 0 && courses.map((Cvalue, i) => {
                                        return (
                                            <Courses data={handleChange} {...Cvalue} />
                                        )
                                    })

                                }


                                {
                                    type == "course" &&
                                    courses.length == 0 &&
                                    <p className="not-faund">No Courses & Workshops found</p>

                                }


                                {
                                    type == "Proseminar" &&
                                    ProseminarsCourse.length > 0 && ProseminarsCourse.map((Pvalue, i) => {
                                        return (
                                            <Proseminars data={handleChange} {...Pvalue} />
                                        )
                                    })

                                }
                                {
                                    type == "Proseminar" &&
                                    ProseminarsCourse.length == 0 &&
                                    <p className="not-faund">No Proseminars found</p>

                                }

                                {
                                    !type &&
                                    <p className="not-faund text-left pl-2" ><i className='fa fa-arrow-left'></i> Please make a selection</p>
                                }


                            </div>



                        </div>
                        <div className='tab-line' style={{marginRight: "2px"}}></div>

                    </div>
                </div>
            </div>

            <Modal isOpen={checkoutsuccessModel} toggle={checkoutsuccessToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={checkoutsuccessToggleModal}><span className="ml-1 roititle">Please register</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <p> Click: <a href="/create"><u>New Student</u></a> <br /><br />  Click: <a href="#" onClick={() => { LoginToggleModal(); checkoutsuccessToggleModal(); }}><u>Existing Student</u></a></p>
                        </div>
                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={selectcourseModel} toggle={selectcourseToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={selectcourseToggleModal}><span className="ml-1 roititle">Please make a selection</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <p>Please select at least one item in the list.</p>
                        </div>
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
                                                value={mail} onChange={(e) => setMail(e.target.value)}
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="wrp-label mrt-input">
                                            <label>Password</label>
                                            <input
                                                value={pass} onChange={(e) => setPass(e.target.value)}
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
                                        {
                                            logging ?
                                        <button className="login-btn" disabled>Logging in...</button>
                                            :
                                            <button className="login-btn" type="submit" onClick={LoginUser}  >CheckOut</button>
                                        }

                                    </div>

                                </div>
                            </div>
                    </div>
                </ModalBody>

            </Modal>

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

            {/* dicount modal open */}
            
            <Modal isOpen={discoutModal} toggle={discoutToggle} className="connect-box" centered={true}>
                <ModalHeader toggle={discoutToggle}><span className="ml-1 roititle font-weight-bold">Discount Coupon</span></ModalHeader>
                <ModalBody>
                    <div className="discount-btn">
                       <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</p>
                       <div className="coupon-wrp">
                           <div className="coupon-child1">
                               <label>Course Coupon</label>
                               <input placeholder='Enter Coupon' />
                               <button>Apply</button>
                           </div>
                           <div className="coupon-child1 coupon-right">
                                <label>Course Coupon</label>
                                <input placeholder='Enter Coupon' />
                               <button>Apply</button>
                           </div>
                       </div>
                       <button>CheckOut</button>
                    </div>
                </ModalBody>

            </Modal>

            {/* dicount modal closed */}
        </div>
    );

}


export default Dashboard;