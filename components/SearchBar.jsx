import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const SearchBar = () => {
    return (
        <div>
            <input placeholder='Search Groups..' className="w-full mt-4 input input-bordered input-primary" type="text" />
        </div>
    )
}

export default SearchBar