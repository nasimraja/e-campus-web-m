import React, { Component } from 'react';

import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
import scan  from '../../images/scan.png';
import play  from '../../images/play.png';
import bnrimg  from '../../images/bnrimg.png';

import web1  from '../../images/web1.png';
import web2  from '../../images/web2.png';
import web3  from '../../images/web3.png';
import web4  from '../../images/web4.png';
import web5  from '../../images/web5.png';
import web6  from '../../images/web6.png';
import aboutimg  from '../../images/aboutimg.png';



const From = () =>{
	 return(
		<div>
		<Header />
	   

			<div className='lg-box-wrap'>
				<div className='container'>
					<div className='lg-box'>
						<div className='lg-cont'>
							<h1></h1>
						</div>
						<div className='login-but'>
							<a href='#'>Login</a>
						</div>
					</div>
				</div>
			</div>

			<form>
				<div className='form-main-wrap'>
					<div className='container'>
						<div className='form-wrap'>
							<ul className='form'>
								<li>
									<div className='input-list'>
									<p>Email Address *</p>
									<input type='text' placeholder='Enter email'></input>
									</div>
									<div className='input-list'>
									<p>First Name *</p>
									<input type='text' placeholder='Enter first name'></input>
									</div>
									<div className='input-list'>
									<p>Last Name *</p>
									<input type='text' placeholder='Enter last name'></input>
									</div>
									<div className='input-list'>
									<p>Tel Office number *</p>
									<input type='number' placeholder='Enter office number'></input>
									</div>
								</li>
								<li>
									<div className='input-list'>
									<p>Skype</p>
									<input type='number' placeholder='Enter skype'></input>
									</div>
									<div className='input-list'>
									<p>Address *</p>
									<input type='text' placeholder='Enter Street address'></input>
									</div>
									<div className='input-list1'>
									<p>Address 2</p>
									<input type='text' placeholder='Enter apartment, suite, unit etc (optional)'></input>
									</div>
									 
								</li>
								<li>
								<div className='input-list1'>
									<p>Address 3</p>
									<input type='text' placeholder='Enter Appartment, suite, unit etc. (optional)'></input>
									</div>
									<div className='input-list'>
									<p>Tel Cell number *</p>
									<input type='number' placeholder='Enter cell number'></input>
									</div>
									<div className='input-list'>
									<p>Country *</p>
									<input type='text' placeholder='Select country'></input>
									</div>
									
									 
								</li>
								<li>
									<div className='input-list'>
									<p>State, province, other</p>
									<input type='text' placeholder='Select state'></input>
									</div>
									<div className='input-list'>
									<p>City *</p>
									<input type='text' placeholder='Select city'></input>
									</div>
									<div className='input-list'>
									<p>Postal code *</p>
									<input type='number' placeholder='Enter postal code'></input>
									</div>
									<div className='input-list'>
									<p>Profession *</p>
									<input type='text' placeholder=''></input>
									</div>
								</li>
								<li>
									<div className='input-list'>
									<p>Business name</p>
									<input type='text' placeholder='Enter business name'></input>
									</div>
									<div className='input-list'>
									<p>Highest degree earned *</p>
									<input type='text' placeholder=''></input>
									</div>
									<div className='input-list'>
									<p>Degree in what field *</p>
									<input type='text' placeholder=''></input>
									</div>
									<div className='input-list'>
									<p>Year degree earned *</p>
									<input type='text' placeholder=''></input>
									</div>
								</li>
								<li>
								<div className='input-list1'>
									<p>Licenses (Indicate NA if none.) *</p>
									<input type='text' placeholder=''></input>
									</div>
									<div className='input-list1'>
									<p>Certifications (Indicate NA if none.) *</p>
									<input type='text' placeholder=''></input>
									</div>
									 
									
									 
								</li>
								<li>
									<div className='input-list'>
									<p>Years of professional experience *</p>
									<input type='text' placeholder=''></input>
									</div>
									<div className='input-list'>
									<p>Who referred you?*</p>
									<input type='text' placeholder='Who referred you'></input>
									</div>
									<div className='input-list'>
									<p>Username (Your email address) *</p>
									<input type='text' placeholder='Username'></input>
									</div>
									<div className='input-list'>
									<p>Set Password *</p>
									<input type='text' placeholder='Password'></input>
									</div>
								</li>
								<li>
								
									<div className='input-list1'>
									<p>Confirm Password *</p>
									<input type='text' placeholder='Confirm password'></input>
									</div>
									 
									<div className='input-list1'>
									<p>Upload CV</p>
									<input type="file" id="myfile" name="myfile">
									
									</input>
									</div>
									 
								</li>
								<div className='r-but2'>
									<a href='/review'>Register</a>
									</div>
							</ul>
						</div>
					</div>
				</div>
			</form>

	   </div>
	 )
}
export default From;