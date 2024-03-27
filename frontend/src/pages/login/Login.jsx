import { Link, useNavigate } from 'react-router-dom';
import FormInput from "../../components/formInput/FormInput";
import "./login.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../features/api/userApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'


export default function Login(){
    const [loginData, setLoginData] = useState({email:"",password:""})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(()=>{
        if (userInfo) {
            navigate('../workspace')
        }

    }, [navigate, userInfo])
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
        try {
            const res = await login({...loginData}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('../workspace')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.log(err);
        }
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
            <button className="btn-login" disabled={isLoading}>Login</button>
            <div className='account'>
                <p>Don`&apos;`t have an account?</p>
                <Link to="../register">Sign Up</Link>
            </div>
        </form>
    )
}