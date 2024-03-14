import React, { useContext } from 'react'
import NavBar from './NavBar'
import Cards from './Cards'
import {ProductContext} from '../utils/Context'
import Loading from './Loading'


function Home() {

  const [products] = useContext(ProductContext)
  
  
  return ( 
    <div>
      <div className='h-screen w-full flex m-0'>
      <NavBar></NavBar>
      {products ? <Cards></Cards>: <Loading /> }
    </div>
    </div>
  )
}

export default Home
