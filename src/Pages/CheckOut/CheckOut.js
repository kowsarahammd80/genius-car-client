import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const CheckOut = () => {

  let { _id, title, price } = useLoaderData();
  let { user } = useContext(AuthContext);

  let handlePlaceOrder = event => {

    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || 'unregistered';
    const phone = form.phone.value;
    const message = form.message.value;

    //  console.log(name, email, phone, message)

    const order = {
      service: _id,
      seviceName: title,
      price,
      customer: name,
      email,
      phone,
      message
    }

    console.log(order)

    //  if(phone.length > 11){
    //    alert('Phone number should be 10 character or longer')
    //  }
    //  else{

    //  }

    fetch('https://genius-car-server-snowy.vercel.app/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      },
      body: JSON.stringify(order)

    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged
        ) {
          alert('Order placed successfully')
          form.reset()
        }
      })
      .catch(error => console.error(error))

  }

  return (
    <div>

      <form onSubmit={handlePlaceOrder}>

        <h2 className='text-4xl'>You are about to order: {title}</h2>
        <h4 className='text-3xl'>Price: {price}</h4>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full " />
          <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full " />
          <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full " />
          <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full " readOnly />

        </div>

        <textarea name='message' className="textarea textarea-bordered h-24 w-full mt-4 mb-4" placeholder="Your Massage"></textarea>

        <input className='btn w-1/2' type="submit" value='Place Your Order' />
      </form>

    </div>
  );
};

export default CheckOut;