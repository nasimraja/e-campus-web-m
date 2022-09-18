import React, { Component, useState, useEffect, useRef } from 'react';




const Biodatafaculty = (props) => {


    return (
            <div>
                <div className='tab-cont'>             
                  <div className="wrp-biodata">
                     <p dangerouslySetInnerHTML={{ __html: props.facultybio }}></p> 
                  </div>
                </div>
            </div>

    );

}


export default Biodatafaculty;

