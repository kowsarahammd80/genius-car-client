import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SingUp = () => {
  
  let {createForUser, updateProfiel} = useContext(AuthContext);

  let handleSignUp = event => {
    event.preventDefault();
    let form = event.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;

    createForUser(email, password)
    .then(result => {
       let user = result.user
       console.log(user);
       form.reset()
       handleSetNameOther(name)
    })
    .catch(error => console.error(error))

  }

  let handleSetNameOther = (name) => {
    let profile ={
      displayName: name,
    }
    updateProfiel(profile)
    .then(() => {})
    .catch(e => console.error(e))
  }

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid md:grid-cols-2 gap-20 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
           <img className='w-3/4' src={SignUp} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-4xl font-bold text-center">Sing Up!</h1>
          <form onSubmit={handleSignUp}  className="card-body">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your Name" name='name' className="input input-bordered" />
             </div>

             <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
               </label>
               <input type="email" placeholder="email" name='email' className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name='password' className="input input-bordered" required />
              
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
          </form>
          <p className='p-5 text-center'>Already have an account? <Link className='text-orange-500 font-bold' to='/login'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;