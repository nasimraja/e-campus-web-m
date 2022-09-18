import React from 'react';
import {BrowserRouter, Routes ,Route,Switch,Navigate} from 'react-router-dom';
import './components/css/style.css';
import './App.css';

import Login from './components/pages/login/Login.js';
// import Privateroute from './components/component/Privateroute';
// import Privateroutelogin from './components/component/Privateroutelogin';
import Home from './components/pages/home/home.js';
import Form from './components/pages/Form/Form.js';
import Review from './components/pages/Review/Review.js';
import Professionaldiplomas from './components/pages/Professionaldiplomas/Professionaldiplomas';
import Professionalcertificates from './components/pages/Professionalcertificates/Professionalcertificates';
import Proseminars from './components/pages/Proseminars/Proseminars';
import Registerform from './components/pages/neuroacrobatics/registerform';
import Groupregistration from './components/pages/neuroacrobatics/Groupregistration';
import Dashboard from './components/pages/dashboard/Dashboard';
import Registration from './components/pages/registration/Registration';
import Biobrocher from './components/pages/bioBroucher/Biobroucher';
import Create from './components/pages/create/Create';
import ResetPassword from './components/pages/resetpassword/ResetPassword';
import Certificate from './components/pages/certificate/Certificate';
import Certificatewithcourse from './components/pages/certificatewithcourse/Certificatewithcourse';


function App(){
	return(
		<BrowserRouter>			
			<Routes>
				{/* <Route path="" element={<Privateroute />}> */}
				
				{/* <Route  path="/dashboards" render={() => (<Navigate to="/dashboard/winter" />)} /> */}
				{/* <Route  path="/home" element={<Home />} /> */}
{/* 				
				<Route  path="/form" element={<Form />} />
				<Route  path="/review" element={<Review />} /> */}

				  
				<Route  path="/neuroacrobatics" element={<Registerform />} />
				<Route  path="/neuroacrobatics/groupregistration" element={<Groupregistration />} />
				 <Route  path="/" element={<Registration />} />
				
				<Route  path="/professionaldiplomas" element={<Professionaldiplomas />} />
				<Route  path="/professionalcertificates" element={<Professionalcertificates />} />
				<Route  path="/registration" element={<Registration />} />
				<Route  path="/registration/:trimester" element={<Dashboard />} />
				<Route  path="/registration/:trimester/:type" element={<Dashboard />} />
				<Route  path="/proseminars" element={<Proseminars />} />
				<Route  path="/bio/brocher/:id" element={<Biobrocher />} />
				<Route  path="/create" element={<Create />} />
				<Route path="/login" element={<Login />} />
				<Route path="/reset/password/:token" element={<ResetPassword />} />
				<Route path="/generate/certificate" element={<Certificate />} />
				<Route path="/generate/course/certificate" element={<Certificatewithcourse />} />
				

				{/* <Route path="" element={<Privateroutelogin />}>
				<Route path="/login" element={<Login />} />
				</Route> */}
				
			</Routes>
	</BrowserRouter>
	)
}

export default App;
