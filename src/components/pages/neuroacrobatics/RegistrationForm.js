import React, { useState } from 'react';
import { API_URL } from '../../../Config';


const RegistrationForm = (props) => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)

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
    const [file, setFile] = useState('');



    const savaFormData = async() => {
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
   

        if(firstname == '' || lastname == '' || email == '' || confirmemail == ''  ){
            setError("Please fill in required fields.");
            return false;
        }

        


        let _member = {
            firstname, lastname, email,confirmemail
        };


        // let _member = JSON.stringify(dataArray);

        let result = JSON.parse(localStorage.getItem('Member'));
        console.log(result)
        // result = JSON.parse(result);
        if(checkexist(email)){
            setError("Email already added")
            return false;
        }

      
        const response = await fetch(API_URL+"/check/group?email="+email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })



        const data = await response.json()
        if(data.success && !data.exist){
            if (result) {
                // console.log(result);
                // console.log(_member);
                result.push(_member);
                // result.push(_member);
                result = JSON.stringify(result)
                localStorage.setItem('Member', result);
    
                console.log("here are member")
                // addformToggleModal()
               window.location.reload();
                
    
            }
            else {
                // let _temp = [];
                // // localStorage.setItem('Member',_temp);
                _member = JSON.stringify(_member)
    
                // _temp[0] = _member;
                // console.log(_member);
                localStorage.setItem('Member', '[' + _member + ']');
                // console.log(JSON.parse(localStorage.getItem('Member')));
                window.location.reload();
            }
        }
        else if(!data.success){
            setError("Server Error")
            return false ; 
        }
        else if(data.exist){
            setError("Email already in another group")
            return false ; 
        }   else {
            setError("Unknown Error")
            return false ; 
        }
       



    }
     

    function checkexist(mail){
        let result = JSON.parse(localStorage.getItem('Member'));
        let _exist = false ;
        if(result){
            result.map((v,i) => {
                if(v.email == mail){
                    _exist = true
                }
                else{
                    _exist =  false
                }
            })
        }
       

        return _exist ;
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

        <div className='form-wrap mr-t'>
            <ul className='form'>
                {/* <h3 className='mb-0'>Registration Profile</h3> */}

                <li>

                    <div className='input-list'>
                        <p>First Name *</p>
                        <input type='text' value={firstname}
                            onChange={(e) => setFirstname(e.target.value)} placeholder='Enter first name'></input>
                    </div>
                    <div className='input-list'>
                        <p>Last Name *</p>
                        <input type='text' value={lastname}
                            onChange={(e) => setLastname(e.target.value)} placeholder='Enter last name'></input>
                    </div>
                    <div className='input-list'>
                        <p>Email Address (Username) *</p>
                        <input type='text' value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'></input>
                    </div>
                    <div className='input-list'>
                        <p>Confirm Email Address *</p>
                        <input type='text' value={confirmemail}
                            onChange={(e) => setConfirmEmail(e.target.value)} placeholder='Enter email'></input>
                    </div>

                </li>
                {/* <li>
                    <div className='input-list'>
                        <p>Password *</p>
                        <input type='text' value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder='Enter password'></input>
                    </div>
                    <div className='input-list'>
                        <p>Confirm Password *</p>
                        <input type='text' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter password'></input>
                    </div>
                    <div className='input-list'>
                        <p>Tel Office Number *</p>
                        <input type='text' value={telofficeNo}
                            onChange={(e) => setTelofficeNo(e.target.value)} placeholder='Enter office number'></input>
                    </div>
                    <div className='input-list'>
                        <p>Tel Cell Number</p>
                        <input type='text' value={telcellNo}
                            onChange={(e) => setTelcellNo(e.target.value)} placeholder='Enter cell number'></input>
                    </div>


                </li>
                <li>
                    <div className='input-list2'>
                        <p>Address Line 1 *</p>
                        <input type='text' value={address1}
                            onChange={(e) => setAddress1(e.target.value)} placeholder='Enter Street address'></input>
                    </div>
                    <div className='input-list2'>
                        <p>Address Line 2 </p>
                        <input type='text' value={address2}
                            onChange={(e) => setAddress2(e.target.value)} placeholder='Enter apartment, suite, unit etc (optional)'></input>
                    </div>
                </li>
                <li>

                    <div className='input-list'>
                        <p>Country *</p>
                        <select className="" value={country}
                            onChange={(e) => setCountry(e.target.value)}>
                            <option>Select Country</option>
                            <option>India</option>
                            <option>USA</option>
                        </select>
                    </div>
                    <div className='input-list'>
                        <p>State, province, other *</p>
                        <select className="" value={state}
                            onChange={(e) => setState(e.target.value)}>
                            <option>Select State</option>
                            <option>Bihar</option>
                            <option>Delhi</option>
                        </select>
                    </div>
                    <div className='input-list'>
                        <p>City *</p>
                        <input type='text' value={city}
                            onChange={(e) => setCity(e.target.value)} placeholder='Select city'></input>
                    </div>
                    <div className='input-list'>
                        <p>Postal Code *</p>
                        <input type='number' value={postalcode}
                            onChange={(e) => setPostalcode(e.target.value)} placeholder='Enter postal code'></input>
                    </div>


                </li>

                <div className="professional-content">
                    <h3>Professional Certificate in NeuroAcrobatics???</h3>
                    <p>If you plan to earn a Professional Certificate in NeuroAcrobatics??? by taking the subsequent two
                        webinars to be offered at a later time, please complete the Professional Background Profile as indicated below. You
                        will need to take an examination at the end of the program and receive a passing grade for admission
                        into the Professional Certificate Program.
                    </p>
                    <p>If applicable, click here to complete your <u><b onClick={() => setShow(!show)}>Professional Background Profile</b></u> (only for those interested in earning a Professional Certificate)</p>
                </div>

                {
                    show ? <div>
                        <ul className='form'>
                            <li>
                                <div className='input-list'>
                                    <p>Profession *</p>
                                    <input type='text' value={profession}
                                        onChange={(e) => setProfession(e.target.value)} placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Highest degree earned *</p>
                                    <input type='text' value={highestdegreeearned}
                                        onChange={(e) => setHighestdegreeearned(e.target.value)} placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Degree in what field *</p>
                                    <input type='text' value={degreeinwhatfield}
                                        onChange={(e) => setDegreeinwhatfield(e.target.value)} placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Year degree earned *</p>
                                    <input type='text' value={yeardegreeearned}
                                        onChange={(e) => setyeardegreeearned(e.target.value)} placeholder=''></input>
                                </div>
                            </li>
                            <li>
                                <div className='input-list1'>
                                    <p>Licenses (Indicate NA if none.) *</p>
                                    <input type='text' value={licenses}
                                        onChange={(e) => setLicenses(e.target.value)} placeholder=''></input>
                                </div>
                                <div className='input-list1'>
                                    <p>Certifications (Indicate NA if none.) *</p>
                                    <input type='text' value={certifications}
                                        onChange={(e) => setCertifications(e.target.value)} placeholder=''></input>
                                </div>



                            </li>
                            <li>
                                <div className='input-list'>
                                    <p>Years of professional experience *</p>
                                    <input type='text' value={yearsofprofessionalexperience}
                                        onChange={(e) => setYearsofprofessionalexperience(e.target.value)} placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Who referred you?*</p>
                                    <input type='text' value={whoreferredyou}
                                        onChange={(e) => setWhoreferredyou(e.target.value)} placeholder='Who referred you'></input>
                                </div>

                                <div className='input-list1'>
                                    <p>Upload CV</p>
                                    <input type="file" id="myfile" name="myfile" value={file}
                                        onChange={(e) => setFile(e.target.value)}>

                                    </input>
                                </div>
                            </li>
                        </ul>
                    </div> : null
                } */}
                <p className='text-danger text-center mt-2 mb-0 p-0'>{error}</p>
                <div className='r-but2'>
                    <a onClick={savaFormData}>Add</a>
                </div>
            </ul>

        </div>
    )
}
export default RegistrationForm;