import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import { LoginState } from "../ActionCreators";
// import Mui from "../Mui";


const LoginForm = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const[emailError,setEmailError]=useState("");
  const [password,setPassword]=useState("");
  const[passwordError,setPasswordError]=useState("");
  const [LoginResult,setLoginResult]=useState();
  console.log(LoginResult);
  const[LoginError,setLoginError]=useState("");
  const dispatch=useDispatch();

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

  const handlePassword = () =>{
    if(password.length==0){
      setPasswordError("Please Enter Password")
    }else{
      setPasswordError("");
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44351/api/PlantManagement/MakeValidation?username=${email}&password=${password}`
      );
  
      setLoginResult(response.data);
      console.log("Result", response.data);
      dispatch(LoginState(response.data));
  
      setTimeout(() => {
        if (response.data === 1) {
          navigate('/PlantListEdit');
        } else {
          setLoginError("Incorrect Email ID / Password");
        }
      }, 2);
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Incorrect EmailID/Password");

    }
  };
  

  // useEffect(()=>{

  // },[LoginResult])

  

  return (
    <>
  
      <div className="vh-100 m-0 w-100 d-flex flex-column justify-content-center bg-pos-bottom bg-cover align-center bg-SignupForm">
        <div className="bg-gray vh-65 w-35 br-2 text-center d-flex justify-content-center">
            <div>
                <h1>Login  <i className="fa-solid fa-right-to-bracket fa-bounce fa-lg text-blue" ></i></h1>
                <input type="email" onBlur={handleEmailValid} value={email} onChange={(e)=>{setEmail(e.target.value)}} className="dis-block form-input-size" placeholder="Email"/>
                {emailError!=="" && <p className="red">{emailError}</p>}
                <input value={password} onBlur={handlePassword} onChange={(e)=>{setPassword(e.target.value)}} className="dis-block form-input-size" type="password" placeholder="Password"/>
                {passwordError!=="" && <p className="red">{passwordError}</p>}
                <span className="text-blue cursor-p" onClick={()=>{navigate('/forgotPassword')}}>Forgot Password?</span>
                <button className="SignUp-btn bg-blue text-white border-blue" onClick={handleLogin}>Login</button>
                {LoginError!=="" && <p className="red">{LoginError}</p>}
                <p>Don't have an account? <span className="text-blue cursor-p" onClick={()=>{navigate('/SignUp')}}>SignUp</span></p>
            </div>
        </div>
      </div>      
    </>
  )
}

export default LoginForm
