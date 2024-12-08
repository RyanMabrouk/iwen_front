import React from 'react'
import Discover from './ui/discover'
import Form from './ui/form'

export default function Page() {
  return (
    <div dir='rtl' className=' px-10 flex flex-col gap-10'>
        <Discover/>
        <div className='flex justify-between'>
            <Form/>
            <div className='w-full'></div>
            
        </div>
    </div>
  )
}
