import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom'

function NavBar() {
  const [products] = useContext(ProductContext)
  
  let distinct_categories = products && products.reduce((acc, cv) => [...acc, cv.category], [])
  distinct_categories = [...new Set(distinct_categories)]

  const color = () => {
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }
  return (
    <div className='flex bg-slate-100 flex-col items-centre w-[15%] h-full items-center p-5 text-left'>
      <Link to={'/create'} className='text-blue-400 border-2 p-2 border-blue-300 font-bold mb-5 w-32' >Add Products</Link>
      <h1 className='w-32 font-bold'>Category:</h1> <br />
      <ul className='w-50'>
        {distinct_categories.map((c, i) => <li className='font-semibold flex gap-3 items-centre' ><div className='h-3 w-3 rounded-full mt-2' style={{
       backgroundColor: color()}}></div><Link to={`/?category=${c}`} className='p-0'>{c}</Link></li>)}
      </ul>
    </div>
  )
}

export default NavBar
