'use client'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function SearchBar() {
    const searchParams = useSearchParams()
    const [searchInput, setSearchInput] = useState('');
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleClick = (movieTitle: string) => {
        const params = new URLSearchParams(searchParams)
        if (movieTitle) {
            params.set('title', movieTitle)
        } else {
            params.delete('title')
        }
        replace(`${pathname}?${params.toString()}`)

    }

  return (
    <div className='searchbar'>
        <label
            className='sr-only'
            htmlFor='searchbar'
            hidden
        > search
        </label>
        <FaSearch className='search-icon' />
        <input
            type='text'
            placeholder='Star Wars'
            value={searchInput}
            name='searchInput'
            onChange = {(e) => {
                setSearchInput(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && searchInput) {
                    handleClick(searchInput);
                }
            }}
        />
        <button className="searchbar-button"
            disabled={searchInput ? false : true}
            onClick ={ () => {
                handleClick(searchInput);
            }}
            >Search
        </button>
    </div>
  )
}

export default SearchBar