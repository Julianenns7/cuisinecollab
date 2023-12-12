"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = (props) => {
  const { showCreatePost} = props;

  const [searchMode, setSearchMode] = useState('recipe');
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const bar = "font-bold flex-grow text-xl h-10 items-center font-title flex items-center justify-center";
  const isLinkActive = (href) => router.pathname === href;

  const handleSearchMode = (newSearchMode) => {
    setSearchMode(newSearchMode);
  };

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      router.push(`/afterAuth/searchResults?query=${searchInput.trim()}`);
    }
  };

  const handleCreatePostClick = () => {
    props.handleCreatePostClick();
  };

  return (
    <nav className="bg-opacity-0">
      <div className="mx-auto w-3/5">
        <div className="flex justify-between items-center">
          <div className="flex text-3xl justify-center">
            <h1 className="font-title">Cuisine Collab</h1>
          </div>
          <div className="flex mb-10 mt-5">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="text-black rounded-l-full h-15 w-80 pl-4 focus:border-2 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex flex-col">
              <button
                className={`border border-t-0 ${searchMode === 'recipe' ? 'border-black' : 'border-white'}`}
                onClick={() => handleSearchMode('recipe')}
              >
                <img src="/images/notepad.jpg" alt="Recipe" className="w-7 h-7" />
              </button>
              <button
                className={`border border-b-0 ${searchMode === 'profile' ? 'border-black' : 'border-white'}`}
                onClick={() => handleSearchMode('profile')}
              >
                <img src="/images/profile.jpg" alt="Profile" className="w-7 h-7" />
              </button>
            </div>
            <button
              className="bg-white items-center flex rounded-r-full h-15 w-20 justify-center"
              onClick={handleSearch}
            >
              <img src="/images/search.jpg" alt="Recipe" className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div className="flex justify-between bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 h-20 text-center items-center">
          <Link href="/afterAuth/favorites" passHref className={`${bar} h-20 border-x  border-white ${isLinkActive('/afterAuth/favorites') ? 'border-opacity-1' : 'border-opacity-0'}`}>Favorites</Link>
          <Link href="/afterAuth/myRecipes" passHref className={`${bar} h-20 border-x  border-white ${isLinkActive('/afterAuth/myRecipes') ? 'border-opacity-1' : 'border-opacity-0'}`}>My Recipes</Link>
          <Link href="/afterAuth/new" passHref className={`  h-20  ${bar} border-x  border-white ${isLinkActive('/afterAuth/new') ? 'border-opacity-1' : 'border-opacity-0'}`}>Latest</Link>
          <button className={`${bar} m-5 border border-black rounded-full ${showCreatePost ? 'bg-black' : 'bg-neutral-800'}`} onClick={handleCreatePostClick}>Create Post</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;