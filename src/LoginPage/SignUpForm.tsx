import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router"

const SignUpForm = () => {
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[emailError,setEmailError]=useState("");
    const[password,setPassword]=useState('');
    const[passwordError,setPasswordError]=useState("");
    const[ConfirmPassword,setConfirmPassword]=useState('');
    const[confirmPasswordError,setConfirmPasswordError]=useState("");
    const[signUpResult,setSignUpResult]=useState();
    
    const handleSignUp = async () =>{
      handleEmailValid();
      handlePassword();
      handleConfirmPassword();
      if(emailError=="" && passwordError=="" && confirmPasswordError==""){
        try{
          const response= await axios.post(`https://localhost:44351/api/PlantManagement/SignUp?username=${email}&password=${ConfirmPassword}`);
          setSignUpResult(response.data);
          if (signUpResult==1){
            navigate('/')
          } 
        }catch(error){
          console.log("Error during Signup");
          
        }
      }
    }

  const handleEmailValid = ()=>{
    const specialchars=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length<5){
      setEmailError("Email must be at least 5 characters long")
    }else if(!specialchars.test(email)){
      setEmailError("Please Enter a Valid Email ID");
    }else{
      setEmailError("");
    }
  }

  const handlePassword =()=>{
    const pattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!pattern.test(password)){
      setPasswordError('Password should contain a Uppercase&Lowercase & a special character');
      setConfirmPasswordError('')
    }else if(password.length<8){
      setPasswordError('Password must be at least 8 characters long.');
      setConfirmPasswordError('Password must be at least 8 characters long.');
    }else{
      setPasswordError("");
      setConfirmPasswordError("");
    }

  }
  const handleConfirmPassword=()=>{
    handlePassword();
    if(password!=ConfirmPassword){
      setPasswordError('Both passwords must be Same');
      setConfirmPasswordError('Both passwords must be Same');
    }else{
      setPasswordError("");
      setConfirmPasswordError("");
    }
  }

  return (
    <>
      <div className="vh-100 m-0 w-100 d-flex flex-column justify-content-center bg-pos-bottom bg-cover align-center bg-SignupForm">
        <div className="bg-gray vh-65 w-35 br-2 text-center d-flex justify-content-center">
            <div>
                <h1>Signup</h1>
                <input value={email}  onBlur={handleEmailValid} onChange={(e)=>{setEmail(e.target.value)}} className="dis-block form-input-size" placeholder="Email"/>
                {emailError!=="" && <p className="red">{emailError}</p>}
                <input value={password} onBlur={handlePassword} onChange={(e)=>{setPassword(e.target.value)}} className="dis-block form-input-size" type="password" placeholder="Create Password"/>
                {passwordError!=="" && <p className="red">{passwordError}</p>}
                <input value={ConfirmPassword} onBlur={handleConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  className="dis-block form-input-size" type="password" placeholder="Confirm Password"/>  
                {confirmPasswordError!=="" && <p className="red">{confirmPasswordError}</p>}
                <button onClick={handleSignUp} className="SignUp-btn bg-blue text-white border-blue">SignUp</button>
                <p>Already have an account? <span className="text-blue cursor-p" onClick={()=>{navigate('/')}}>Login</span></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
