// Import React Libs
import { useState } from "react";
// Import Components
import SignInComponent from "../Components/SignInComponent";
import SignUpComponent from "../Components/ SignUpComponent";
// Import Icons
import LogoBanner from '../Assets/Icons/LogoBanner.svg';

const Login = () => {
  return(
    <div className="Page LoginPage">
      <div className="LoginPage_Banner">
        <img width={200} src={LogoBanner} alt="Banner" />
      </div>      
      <div className="LoginPage_Container">



        <div className="LoginForm_Methods">
          <button>Вход</button>
          <button>Регистрация</button>
        </div>

        <div className="LoginPage_Enter">
          <SignUpComponent />
        </div>        
      </div>
    </div>
  );
}
export default Login;