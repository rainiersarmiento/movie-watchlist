'use client'

import Link from 'next/link'
import { useWatchlistContext } from '../providers';
import { usePathname } from 'next/navigation';


function Navbar() {
  const { list } = useWatchlistContext();
  const pathname = usePathname();
  const params = new URLSearchParams(list?.map(movieId => ['id', movieId]) || '');

  const pageTitle = pathname === '/watchlist' ? 'My Watchlist' : 'Find your film';

  return (
    <nav className="navbar">
      <h1>{pageTitle}</h1>
      <div className="navbar-buttons">
        <Link href="/search" className="navbar-btn">
          Search
        </Link>
        <Link href={`/watchlist?${params}`} className="navbar-btn">
          My List
        </Link>
      </div>
    </nav>
  )
}

export default Navbar