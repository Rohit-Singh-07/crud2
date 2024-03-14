import React from 'react'
import { Link } from 'react-router-dom'


function Card({item}) {
  
  return (
    <div className='h-80 w-52 rounded-md overflow-hidden'>
      <Link to={`/details/${item.id}`}><img src={item.image} alt="" className='object-contain w-full h-[78%] hover:scale-105'/>
      <h1>{item.title}</h1>
      </Link>
    </div>
  )
}

export default Card
