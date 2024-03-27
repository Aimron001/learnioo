import { Link, useNavigate } from 'react-router-dom';
import FormInput from "../../components/formInput/FormInput";
import "./register.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../features/api/userApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import {faEnvelope, faLock, faUser, faPhone} from '@fortawesome/free-solid-svg-icons'
import {toast }from 'react-toastify'

export default function Register(){
    const [registerData, setRegisterData] = useState({
        email:"",
        password:"",
        firstname:"",
        lastname:"",
        phoneNumber:"",
        confirmPassword:"",
    })

    const navigate =  useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('../workspace')
        }
    }, [navigate, userInfo])

    function handleChange(e){
        setRegisterData(prevData => ({
            ...prevData,
            [e.target.name]:e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword){
            toast.error("Passwords do not match")
        } else {
            try {
                const res = await register({...registerData}).unwrap();
                dispatch(setCredentials({...res}))
                navigate('../workspace')
            }catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    const registerInputsDataLeft = [
        {
            type: "text",
            id: "firstName",
            name: "firstname",
            placeHolder: "First Name",
            onChange: handleChange,
            value:registerData.firstname,
            iconName: faUser

        },
        {
            type: "email",
            id: "email",
            name: "email",
            placeHolder: "Email",
            onChange: handleChange,
            value:registerData.email,
            iconName: faEnvelope
        },
        {
            type: "password",
            id: "password",
            name: "password",
            placeHolder: "Password",
            onChange: handleChange,
            value:registerData.password,
            iconName: faLock
        },
    ]
    const registerInputsDataRight = [
        {
            type: "text",
            id: "lastName",
            name: "lastname",
            placeHolder: "Last Name",
            onChange: handleChange,
            value:registerData.lastname,
            iconName: faUser

        },
        {
            type: "text",
            id: "phoneNumber",
            name: "phoneNumber",
            placeHolder: "Phone Number",
            onChange: handleChange,
            value:registerData.phoneNumber,
            iconName: faPhone
        },
        {
            type: "password",
            id: "confirmPassword",
            name: "confirmPassword",
            placeHolder: "Confirm Password",
            onChange: handleChange,
            value:registerData.confirmPassword,
            iconName: faLock
        },
    ]
    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h1>Sign up to use learn.io</h1>
            <div className='register-inputs-container'>
                <div className="inputs-container">
                    {registerInputsDataLeft.map((input) => {
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
                
                <div className="inputs-container">
                    {registerInputsDataRight.map((input) => {
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
                
            </div>
            <button className="btn-login" disabled={isLoading}>Sign up</button>
            <div className='account'>
                <p>Already have an account?</p>
                <Link to="../login">Login</Link>
            </div>
        </form>
    )
}