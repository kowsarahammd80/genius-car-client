import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogImg from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {

  let { sigIn, providerLogin , } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from.pathname || '/';

  let googleProvider = new GoogleAuthProvider()

  let handleLogin = event => {
    event.preventDefault();
    let form = event.target;
    let email = form.email.value;
    let password = form.password.value;
    console.log(email, password)
    sigIn(email, password)
      .then(result => {
        let user = result.user


        const currentUser = {
          email: user.email
        }
        console.log(currentUser);

        // get jwt token 
        fetch('https://genius-car-server-snowy.vercel.app/jwt', {

          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)

        })
          .then(res => res.json())
          .then(data => {
            console.log(data)

            // local storage is the easiest but not the best prectice to storage
            localStorage.setItem('genius-token', data.token);

            navigate(from, { replace: true });

          });


      })
      .catch(error => console.error(error))

  }

  let handlegoogle = () => {
    providerLogin(googleProvider)
      .then(result => {
        let user = result.user;
        console.log(user)

        const currentUser = {
          email: user.email
        }
        console.log(currentUser);

        // get jwt token 
        fetch('https://genius-car-server-snowy.vercel.app/jwt', {

          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)

        })
          .then(res => res.json())
          .then(data => {
            console.log(data)

            // local storage is the easiest but not the best prectice to storage
            localStorage.setItem('genius-token', data.token);

            navigate(from, { replace: true });

          });

      })
      .catch(er => console.error(er))
  }

  return (

    <div className="hero w-full my-20">
      <div className="hero-content grid md:grid-cols-2 gap-20 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className='w-3/4' src={LogImg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-4xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" name='email' className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name='password' className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <div className='p-3'>
            <p className='p-5 text-center'>Have an account? <Link className='text-orange-500 font-bold' to='/signup'>Sign Up</Link></p>

            <button onClick={handlegoogle} className='btn btn-primary w-full'>Sign in with google</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;