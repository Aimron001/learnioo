import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from "../../components/formInput/FormInput";
import "./login.css"
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

export default function Login(){
    const [loginData, setLoginData] = useState({email:"",password:""})

    function handleChange(e){
        setLoginData(prevData => ({
            ...prevData,
            [e.target.name]:e.target.value
        }));
    }
    const loginInputsData = [
        {
            type: "email",
            id: "email",
            name: "email",
            placeHolder: "Email",
            onChange: handleChange,
            value:loginData.email,
            iconName: faEnvelope
        },
        {
            type: "password",
            id: "password",
            name: "password",
            placeHolder: "Password",
            onChange: handleChange,
            value:loginData.password,
            iconName: faLock
        },
    ]

    async function handleSubmit(e){
        e.preventDefault()
    }
    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='inputs-container'>
            {loginInputsData.map((input) => {
                return <FormInput 
                key={input.id} 
                type={input.type}
                id={input.id}
                name={input.name}
                placeHolder={input.placeHolder}
                value={input.value}
                iconName={input.iconName}
                onChange={input.onChange}
                />
            })}
            </div>
            <button className="btn-login" >Login</button>
            <div className='account'>
                <p>Don`&apos;`t have an account?</p>
                <Link to="../register">Sign Up</Link>
            </div>
        </form>
    )
}