import '../app/globals.css';
import Nav from '@/app/components/NavBar';
import React, { useState } from 'react'
import CreatePost from '@/app/components/createPost';
function MyApp({ Component, pageProps }) {
  
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
  };


  return (
    <main className="bg-gradient-to-b from-neutral-900 from-20% to-black" style={{ minHeight: '100vh' }}>
      <Nav handleCreatePostClick={handleCreatePostClick} />
      {showCreatePost ? (
        <CreatePost onClose={handleCloseCreatePost} />
      ) : (
        <Component {...pageProps} showCreatePost={showCreatePost} handleCreatePostClick={handleCreatePostClick}/>
      )}
      
    </main>
  );
}

export default MyApp;