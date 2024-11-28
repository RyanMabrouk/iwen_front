import React, { ReactNode } from 'react';
import Navbar from './navbar';

interface NavZoneProps {
  children: ReactNode; 
}

export default function NavZone({ children }: NavZoneProps) {
  return (
    <div dir='rtl' className='mt-[2rem] p-8 bg-white'>
      <Navbar />
      <div className='mt-10'>
      {children}

      </div>
    </div>
  );
}
