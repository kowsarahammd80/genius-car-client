import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const PrivateRout = ({children}) => {

  const {user, loading} = useContext(AuthContext);

  let location = useLocation();
  if(loading){
    return <h1 className='text-4xl'>loading...</h1>
  }

  if(user){
    return children;
  }


  return <Navigate to='/login' state={{from: location}} replace></Navigate>;
  
};

export default PrivateRout;