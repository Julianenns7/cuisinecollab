import '../app/globals.css';
import { useRouter } from 'next/router';
import Nav from '@/app/components/NavBar';
import React, { useState } from 'react'
import CreatePost from '@/app/components/createPost';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showNavBar = router.pathname !== '/';
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
  };


  return (
    <main className={`bg-gradient-to-b from-neutral-900 from-20% to-black ${showCreatePost ? 'bg-black' : 'bg-white'}`} style={{ minHeight: '100vh' }}>
    {showNavBar && <Nav handleCreatePostClick={handleCreatePostClick} showCreatePost={showCreatePost} />}
      {showCreatePost ? (
        <CreatePost onClose={handleCloseCreatePost} />
      ) : (
        <Component {...pageProps} showCreatePost={showCreatePost} handleCreatePostClick={handleCreatePostClick}/>
      )}
      
    </main>
  );
}

export default MyApp;