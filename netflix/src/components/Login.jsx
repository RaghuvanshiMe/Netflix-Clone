import React from 'react';
import { useState } from 'react';
import Header from './Header';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';
import { useSelector } from 'react-redux';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[username,setUsername] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.app.isLoading);
    const navigate = useNavigate();
    const loginHandler = () => {
        setIsLogin(!isLogin);
    }
    const getInputData = async(e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        if(isLogin){
                const user = {email, password};
                try {
                    const response = await axios.post(`${API_END_POINT}/login`, user, {withCredentials:true});
                    
                    if(response.data.success){
                      toast.success(response.data.message);
                    }
                    dispatch(setUser(response.data));
                    navigate("/browse");
                } catch (error) {
                    toast.error(error.response.data.message);
                    console.log(error);
                }finally{
                    dispatch(setLoading(false));
                }
        } else {
          dispatch(setLoading(true));
      const user = {email, password, username};
      try {
          const response = await axios.post(`${API_END_POINT}/register`, user, {withCredentials:true});
          console.log(response.data);
          if(response.data.success){
            toast.success(response.data.message);
          }
          setIsLogin(true);
      } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
      }finally{
                    dispatch(setLoading(false));
                  }
    }
    
    setEmail("");
    setPassword("");
    setUsername("");
}
  return (
    <div className="relative min-h-screen  text-white font-sans">
      <Header />

      <div className="absolute inset-0 -z-10">
        <img 
          className="w-full h-full object-cover opacity-100%" 
          src="https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" 
          alt="banner" 
        />
        <div className="absolute inset-0"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen px-4">
        <form onSubmit={getInputData} className="backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">{isLogin ? "login": "Signup"}</h2>

          <div className="space-y-4">
            {
                !isLogin && <input value={username} onChange={(e)=>setUsername(e.target.value)}
              type="text" 
              placeholder="Username" 
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:border-red-600" 
            />
            }
            
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              placeholder="Email" 
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:border-red-600" 
            />
            <input 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password" 
              placeholder="Password" 
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:border-red-600" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 bg-red-600 hover:bg-red-700 transition-colors p-3 rounded text-white font-semibold"
          >
            {isLogin ? "login": "Signup"}
          </button>

          <p className="text-center text-gray-400 mt-4 text-sm">
            {isLogin ? "New Here?" : "Already have an account?"} <a onClick={loginHandler} href="#" className="text-white hover:underline">{`${isLoading ? "loading...":(isLogin ? "Sign up now" : "Log In")}`}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;


