import React, { useState } from 'react'
import Logo from "../assests/logo.png"
import SearchForm from './searchForm'
import { FaBars, FaUser, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = ({ data }) => {
    const [show, setShow] = useState(0)
    return (
        <div className='border-b border-[#eeebeb]'>
            <div className="max-w-[1250px] m-auto px-2">
                <nav className="flex items-center justify-between p-4">
                    <div className="">
                        <Link to="/">
                            <img
                                src={Logo} // Replace with your Hostshare logo image path
                                alt="Hostshare Logo"
                                className="h-8"
                            />
                        </Link>

                    </div>
                    <div className='flex border max-w-[700px] border-gray-300 rounded-[50px] shadow-sm p-3 mt-2 hover:cursor-pointer' onClick={() => setShow(!show)} >
                        <ul className='flex'>
                            <li className='px-4 border-r-[1px] border-gray-300 mt-1 hidden  md:block'>
                                Europe
                            </li>
                            <li className='px-4 border-r-[1px] border-gray-300 mt-1 hidden  md:block'>
                                Any Week
                            </li>
                            <li className='px-4 border-r-[1px] border-gray-300 mt-1 hidden  md:block'>
                                Add Guests
                            </li>
                            <li className='px-4'>
                                <span className='w-8 h-8 bg-[#329a9a] rounded-[50%] flex justify-center items-center'>
                                    <FaSearch color='#fff' />
                                </span>
                            </li>

                        </ul>
                    </div>
                    <div className="">
                        <div className='flex border max-w-[700px] border-gray-300 rounded-[50px] shadow-sm p-3 mt-2 hover:cursor-pointer'>
                            <ul className='flex'>
                                <li className='px-2'>
                                    <FaBars />
                                </li>
                                <li className='px-2'>
                                    <FaUser />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {show == 1 && (
                <SearchForm data={data} />
            )}

        </div>
    )
}

export default Header