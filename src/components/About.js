import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class About extends Component {
  render() {
    return (
      <>
      <div className='row p-4'>
        <div className='col-sm-2 p-4 ' style={{backgroundColor:'gray'}}> 
        
        <img  src='images/a.jpg' style={{height:'300px ',alignContent:'center' }}/>
        </div>
        <div className='col-sm-10 p-4'> 
        <p className="fs-5 p-2 ">
NAME : Akash Verma<br/>
MOBILE :+91-7408826642<br/>
EMAIL :akashlmp7408@gmail.com<br/>
ADDRESS :Lakhimpur kheri, Uttar Pradesh<br/>
</p>
<input type="submit" className="btn btn-outline-warning  m-3"  value="Edit Profile"/>
        </div>
      

</div>
      </>
    )
  }
}
