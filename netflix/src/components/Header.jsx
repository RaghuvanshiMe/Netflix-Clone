import React from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { setUser } from "../redux/userSlice.jsx";
import {toast} from "react-hot-toast";
import { setToggle } from '../redux/movieSlice.jsx';

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async() => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if(res.data.success){
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }


  const toggleHandler = () => {
    dispatch(setToggle());
  }

  return (
    <div className='absolute inset-x-0 top-0 flex w-100% items-center justify-between bg-gradient-to-b from-black to-transparent p-4'>
        <img className='w-55' src="https://cdn.geekwire.com/wp-content/uploads/2014/07/Netflix_Logo_Print_FourColorCMYK.png" alt="netflix-logo" />
        {
          user && (
            <div className='flex items-center'>
            <IoIosArrowDropdownCircle size="24px" color='white'/>
            <h1 className='text-lg font-medium text-white'>{user.user.username}</h1>
            <div className='ml-4 '>
                <button onClick={logoutHandler} className='ml-2 bg-red-600 px-4 py-2 rounded text-white'>Logout</button>
                <button onClick={toggleHandler} className='bg-red-600 px-4 py-2 rounded text-white ml-3'>{toggle ? "Home" : "Search Movie"}</button>
            </div>
            </div>
          )
        }
    </div>
  )
}

export default Header