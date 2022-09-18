import React, { useEffect, useState } from 'react';





const RegistraionList = (props) => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)

    const [firstname, setFirstname] = useState(props.data.lastname);
    const [lastname, setLastname] = useState(props.data.lastname);
    const [email, setEmail] = useState(props.data.email);
    const [confirmemail, setConfirmEmail] = useState(props.data.confirmemail);
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [telofficeNo, setTelofficeNo] = useState('');
    // const [telcellNo, setTelcellNo] = useState('');
    // const [address1, setAddress1] = useState('');
    // const [address2, setAddress2] = useState('');
    // const [country, setCountry] = useState('');
    // const [state, setState] = useState('');
    // const [city, setCity] = useState('');
    // const [postalcode, setPostalcode] = useState('');
    // const [profession, setProfession] = useState('');
    // const [highestdegreeearned, setHighestdegreeearned] = useState('');
    // const [degreeinwhatfield, setDegreeinwhatfield] = useState('');
    // const [yeardegreeearned, setyeardegreeearned] = useState('');
    // const [licenses, setLicenses] = useState('');
    // const [certifications, setCertifications] = useState('');
    // const [yearsofprofessionalexperience, setYearsofprofessionalexperience] = useState('');
    // const [whoreferredyou, setWhoreferredyou] = useState('');
    // const [file, setFile] = useState('');

    useEffect(() => {
        setFirstname(props.data.firstname);
        setLastname(props.data.lastname);
        setEmail(props.data.email);
        setConfirmEmail(props.data.confirmemail);
    },[props])


  

    const editItem =()=>{
        setError(false);
        // alert(email)
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
            firstname, lastname, email, confirmemail
        };

        let result = JSON.parse(localStorage.getItem('Member'));
        result[props.index] = _member;

        // alert(props.index)
        result = JSON.stringify(result)
        localStorage.setItem('Member', result);

        window.location.reload()
       
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
                <h3 className='mb-0'>Member Profile</h3>

                <li>
              
                    <div className='input-list'>
                        <p>First Name *</p>
                        <input type='text' defaultValue={props.data.firstname}   onChange={(e) => setFirstname(e.target.value)} placeholder='Enter first name'></input>
                    </div>
                    <div className='input-list'>
                        <p>Last Name *</p>
                        <input type='text' defaultValue={props.data.lastname}  onChange={(e) => setLastname(e.target.value)} placeholder='Enter last name'></input>
                    </div>
                    <div className='input-list'>
                        <p>Email Address (Username) *</p>
                        <input type='text' defaultValue={props.data.email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'></input>
                    </div>
                    <div className='input-list'>
                        <p>Confirm Email Address *</p>
                        <input defaultValue={props.data.confirmemail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder='Enter email'></input>
                    </div>
                    </li>
                {/* 
                <li>
                    <div className='input-list'>
                        <p>Password *</p>
                        <input defaultValue={props.password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder='Enter password'></input>
                    </div>
                    <div className='input-list'>
                        <p>Confirm Password *</p>
                        <input defaultValue={props.confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder='Enter password'></input>
                    </div>
                    <div className='input-list'>
                        <p>Tel Office Number *</p>
                        <input defaultValue={props.telofficeNo} onChange={(e) => setTelofficeNo(e.target.value)} type='text' placeholder='Enter office number'></input>
                    </div>
                    <div className='input-list'>
                        <p>Tel Cell Number</p>
                        <input defaultValue={props.telcellNo} onChange={(e) => setTelcellNo(e.target.value)} type='text' placeholder='Enter cell number'></input>
                    </div>


                </li>
                <li>
                    <div className='input-list2'>
                        <p>Address Line 1 *</p>
                        <input defaultValue={props.address1} onChange={(e) => setAddress1(e.target.value)} type='text' placeholder='Enter Street address'></input>
                    </div>
                    <div className='input-list2'>
                        <p>Address Line 2 </p>
                        <input defaultValue={props.address2} onChange={(e) => setAddress2(e.target.value)} type='text' placeholder='Enter apartment, suite, unit etc (optional)'></input>
                    </div>
                </li>
                <li>

                <div className='input-list'>
                        <p>Country *</p>
                        <select className="" defaultValue={props.country} onChange={(e) => setCountry(e.target.value)} >
                            <option>Select Country</option>
                            <option>India</option>
                            <option>USA</option>
                        </select>
                    </div>
                    <div className='input-list'>
                        <p>State, province, other *</p>
                        <select className="" defaultValue={props.state} onChange={(e) => setState(e.target.value)}>
                            <option>Select State</option>
                            <option>Bihar</option>
                            <option>Delhi</option>
                        </select>
                    </div>
                    <div className='input-list'>
                        <p>City *</p>
                        <input defaultValue={props.city} onChange={(e) => setCity(e.target.value)} type='text' placeholder='Select city'></input>
                    </div>
                    <div className='input-list'>
                        <p>Postal Code *</p>
                        <input defaultValue={props.postalcode} onChange={(e) => setPostalcode(e.target.value)} type='number' placeholder='Enter postal code'></input>
                    </div>


                </li>

                <div className="professional-content">
                    <h3>Professional Certificate in NeuroAcrobatics™</h3>
                    <p>If you plan to earn a Professional Certificate in NeuroAcrobatics™ by taking the subsequent two
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
                                    <input defaultValue={props.profession} onChange={(e) => setProfession(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Highest degree earned *</p>
                                    <input defaultValue={props.highestdegreeearned} onChange={(e) => setHighestdegreeearned(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Degree in what field *</p>
                                    <input defaultValue={props.degreeinwhatfield} onChange={(e) => setDegreeinwhatfield(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Year degree earned *</p>
                                    <input defaultValue={props.yeardegreeearned} onChange={(e) => setyeardegreeearned(e.target.value)} type='text' placeholder=''></input>
                                </div>
                            </li>
                            <li>
                                <div className='input-list1'>
                                    <p>Licenses (Indicate NA if none.) *</p>
                                    <input defaultValue={props.licenses} onChange={(e) => setLicenses(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list1'>
                                    <p>Certifications (Indicate NA if none.) *</p>
                                    <input type='text' defaultValue={props.certifications} onChange={(e) => setCertifications(e.target.value)} placeholder=''></input>
                                </div>



                            </li>
                            <li>
                                <div className='input-list'>
                                    <p>Years of professional experience *</p>
                                    <input defaultValue={props.yearsofprofessionalexperience} onChange={(e) => setYearsofprofessionalexperience(e.target.value)} type='text' placeholder=''></input>
                                </div>
                                <div className='input-list'>
                                    <p>Who referred you?*</p>
                                    <input defaultValue={props.whoreferredyou} type='text' onChange={(e) => setWhoreferredyou(e.target.value)} placeholder='Who referred you'></input>
                                </div>

                                <div className='input-list1'>
                                    <p>Upload CV</p>
                                    <input type="text" id="myfile" name="myfile" defaultValue={props.file} onChange={(e) => setFile(e.target.value)}>

                                    </input>
                                </div>
                            </li> 
                        </ul>
                    </div> : null
                }
                */}
                <p className='text-danger text-center mt-2 mb-0 p-0'>{error}</p>

                 <div className='r-but2'>
                    <a onClick={editItem}>Update Member</a>
                </div>
               
            </ul>

        </div>
    )
}
export default RegistraionList;