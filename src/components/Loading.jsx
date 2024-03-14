import React from 'react'
import Lottie from 'lottie-react'
import shopLoading from './shopLoading.json'

function Loading() {
  return (
    <div className='h-screen w-full flex justify-center items-center flex-col'>
        <Lottie className='h-48 w-48' animationData={shopLoading}/>
        <h1 className='font-bold font-serif italic'>Loadind...</h1>
    </div>
  )
}

export default Loading