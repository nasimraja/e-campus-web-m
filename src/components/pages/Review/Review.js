import React, { Component } from 'react';
import $ from "jquery";
import Header from '../header.js';
import Course from '../Course/Course.js';

import Footer from '../footer.js';
import scan from '../../images/scan.png';
import play from '../../images/play.png';
import bnrimg from '../../images/bnrimg.png';
import cirlogo from '../../images/cir-logo.png';
import web1 from '../../images/web1.png';
import web2 from '../../images/web2.png';
import web3 from '../../images/web3.png';
import web4 from '../../images/web4.png';
import web5 from '../../images/web5.png';
import web6 from '../../images/web6.png';
import Paypal from '../../images/Paypal.png';



class Review extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount = () => {



	}

	render() {
		return (
			<div>
				<Header />


				<div className='lg-box-wrap'>
					<div className='container'>
						<div className='lg-box'>
							<div className='lg-cont'>
								<h1></h1>
							</div>
							<div className='back-to-r-but'>
								<a href='http://localhost:3000/'> » Back To Registration</a>
							</div>
						</div>
					</div>
				</div>

				<div className='review-wrap'>
					<div className='container'>
						<div className='reviewo-heading'>
							<h1>Review your order</h1>
						</div>
						<div className='review-box'>
							<div className='course-box'>
								<div className='row'>
									<div className='col-lg-6'>
										<div className='r-top-head'>
											<h3>Course title</h3>
										</div>
									</div>
									{/* <div className='col-lg-2'>
										<div className='r-top-head'>
											<h3>Price</h3>
										</div>
									</div> */}
									{/* <div className='col-lg-2'>
										<div className='r-top-head'>
											<h3>Quantity</h3>
										</div>
									</div> */}
									<div className='col-lg-2'>
										<div className='r-top-head'>
											<h3>Tuition</h3>
										</div>
									</div>
								</div>
							</div>
							<Course />
							<div className='review-line'></div>
							<div className='scholarship-list-main'>
								{/* <div className='scholarship-list-wrap'>
									<div className='row'>
										<div className='col-lg-5'>
											<div className='scholarship-box'>
												<ul className='scholarship'>
													<li>
														<div className='scholarship-list'>
															<input type='text' placeholder='Scholarship Code'></input>
															<a href='#'>Apply Scholarship Code</a>
														</div>
													</li>
													<li>
														<div className='scholarship-list'>
															<input type='text' placeholder='Purchase Order'></input>
															<a href='#'>Apply PO Number</a>
														</div>
													</li>
													<li>
														<div className='scholarship-list'>
															<input type='text' placeholder='Pre-payment Code'></input>
															<a href='#'>Apply Pre-payment Code</a>
														</div>
													</li>
													<li>
														<div className='scholarship-list'>
															<input type='text' placeholder='Invoice Number'></input>
															<a href='#'>Apply Invoice Number</a>
														</div>
													</li>
												</ul>
											</div>
										</div>
										<div className='col-lg-7'>
											<div className='payment-box'>
												<div className='payt-head'>
													<h1>Payment Options</h1>
												</div>
												<div className='pay-line'></div>
												<p>You have the following payment options:</p>
												<p>1. Pay a deposit and the balance two days before a program begins. You will receive
													an email from e-campus a few days before the program start date and to click on the
													link to make payment.</p>
												<p>2. If you are a US or UK citizen, you may elect elect to pay the full amount now and then
													choose to make six installment payments offered by PayPal.</p>
											</div>
										</div>
									</div>
								</div> */}
								<div className='pay-line2'></div>
								{/* <div className='p-option-sec'>
									<div className='row'>
										<div className='col-lg-4'>
											{/* <div className='p-option-left'>
												<input type="radio" id="html" name="fav_language" value="HTML" />
												<h1>Pay In Full</h1>
											</div> 
										</div>
										<div className='col-lg-2'>
											<div className='p-option-right'>
												<div className='cart-h'>
													<h1>Cart Totals</h1>
												</div>
												{/* <p>Subtotal</p> 
												<p>Total</p>
											</div>
										</div>
										<div className='col-lg-6'>
											{/* <div className='subtotal'>
												<input type='text' placeholder='$600'></input>
											</div> 
											<div className='subtotal'>
												<input type='text' placeholder='$600'></input>
											</div>
											<div className='p-butn'>
												{/* <div className='view-edit'>
													<a href='#'>View/Edit Profile</a>
												</div> 
												{/* <div className='view-edit'>
													{/* <a href='#'><img src={Paypal}></img></a> 
													<a href='#'>Pay Now</a>
												</div> 
											</div>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>



			</div>
		);
	}

}
export default Review;