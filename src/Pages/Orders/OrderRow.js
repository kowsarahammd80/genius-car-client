import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelte, handleStatusUpdat }) => {
  let { _id, seviceName, price, customer, email, phone, message, service, status } = order;

  let [orderService, setOrderService] = useState({})

  useEffect(() => {

    fetch(`https://genius-car-server-snowy.vercel.app/services/${service}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('photo-token')}`
      }
      
    })
      .then(res => res.json())
      .then(data => setOrderService(data));

  }, [service])



  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelte(_id)} className='btn btn-ghost'>X</button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {orderService?.img &&
                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
              }
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {seviceName}
        <br />
        <span className="badge badge-ghost badge-sm">${price}</span>
        <span className="badge badge-ghost badge-sm">{message}</span>
      </td>
      <td>{email}</td>
      <th>
        <button onClick={() => handleStatusUpdat(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
      </th>
    </tr>
  );
};

export default OrderRow;