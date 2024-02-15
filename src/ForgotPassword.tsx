import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const[email,SetEmail]=useState("");
    const[otp,setotp]=useState(0);
    const[enterotp,setenterotp]=useState();
    const[newpassword,setnewPassword]=useState();
    const[newrepassword,setrenewpassword]=useState();
    const[otpvalid,setotpvalid]=useState<boolean>();
    const navigate=useNavigate();
    
    const handleOtp=()=>{
      axios.get(`https://localhost:44351/api/PlantManagement/SendOtp?email=${email}`).then((response:any)=>{
        setotp(response.data)     
        console.log("List",response.data)
      })
  }

  const handleSave = ()=>{
    axios.post(`https://localhost:44351/api/PlantManagement/ChangePassword?email=${email}&password=${newpassword}`).then((response:any)=>{
      navigate('/');
      console.log(response);
      
    })
  }

  const handleOtpEntered = async ()=>{
    if(enterotp==otp){
      setotpvalid(true);
    }else{
      setotpvalid(false);
    }
  }

  return (
    <>
    <div className='bg-forgot-password cw'>
        <label className='m-1'>Enter Your Registered Email Address</label> <br/>
        <input className='form-input-size2 dis-inline m-1' type='email' value={email} placeholder='Enter Your Email' onChange={(e)=>{SetEmail(e.target.value)}}/>
        <button className='otp-btn dis-inline' onClick={handleOtp}>SEND OTP</button>
        <br/> <br/>
        {otp!=0 &&
        <div>
            <label className='m-1'>Enter Your Otp Sent To Your Registered Email Address:</label> <br/>
            <input className='form-input-size2 dis-inline m-1'  value={enterotp} placeholder='Enter OTP' onChange={(e:any)=>{setenterotp(e.target.value)}}/>
            <button className='otp-btn' onClick={handleOtpEntered}>SUBMIT OTP</button>
            {
              otpvalid &&
              <div><br/>
                <label className='m-1'>Enter New Password</label> <br/>
                <input className='form-input-size2 dis-inline m-1' placeholder='Enter New Password' value={newpassword} onChange={(e:any)=>{setnewPassword(e.target.value)}}/><br/><br/>
                <label className='m-1'>Re-Enter New Password</label> <br/>
                <input className='form-input-size2 dis-inline m-1' placeholder='Re-enter New Password' value={newrepassword} onChange={(e:any)=>{setrenewpassword(e.target.value)}}/>
                <button className='otp-btn' onClick={handleSave}>SAVE</button>
              </div>
              
            }
        </div>
        }
    </div>
        
    
    </>
  )
}

export default ForgotPassword
