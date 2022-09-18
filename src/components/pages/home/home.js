import React, { Component } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import $ from "jquery";
import Header from '../../pages/header.js';
import Model from '../Model/Tremester.js';
import Faculty from '../Faculty/Faculty.js';
import Footer from '../../pages/footer.js';
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




class Home extends Component {
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

				<div className='main-bg'>
					<Header />

					<Faculty />
					<div className='container'>
						<div className='winter-heading'>
							<h3>Winter Trimester 2022</h3>
						</div>
						<div className='register-b-head'>
							<h1>NEW STUDENTS REGISTER BELOW</h1>
						</div>
					</div>

					<div className='register-below-main-wrap'>
						<div className='container'>


							<div className='register-wrap'>
								<div className='tab-list'>
									<Tab />
								</div>
								<div className='tab-line'></div>
								<div className='tab-cont'>
									<div className='tab-c-h'>
										<h6>Professional Certificates</h6>
										<div className='tab-c-h-line'></div>
									</div>
									<Model />
								</div>

							</div>

						</div>
					</div>
				</div>



			</div>
		);
	}

}
export default Home;