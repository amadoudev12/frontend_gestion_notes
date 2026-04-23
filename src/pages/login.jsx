import React from 'react'
import LoginComponent from '../components/login'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
export default function login() {
      const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.user.role === "ENSEIGNANT"){
                navigate('/dashboard/enseignant')
            }else if (decodedToken.user.role === "ELEVE"){
                navigate('/dashboard/eleve')
            }else{
              navigate('/dashboard/admin')
            }
        }else{
            return
        }
    },[])
  return (
    <div>
        <LoginComponent/>
    </div>
  )
}
