import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className = "bg-base-300 border-b border-secondary">
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                The Thinker
            </h1>
            <div className='flex items-centergap-4'>
                <Link to = {"/create"} className='btn btn-primary'>
                    <PlusIcon className='size-6' /> New Think
                </Link>
            </div>


        </div>





    </div>
    </header>
  )
}

export default Navbar