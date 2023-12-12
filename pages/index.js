"use client";
import Link from 'next/link';

import { signInWithGoogle } from '../app/util/firebase';

export default function signIn(){
    

    const handleSignIn = async () => {
      try {
        const userData = await signInWithGoogle();
        
        window.location.href = '/afterAuth/new';
      } catch (error) {
        
        console.error(error);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="font-title text-5xl mb-20">Cuisine Collab</h1>
        <button className="text-xl flex border border-white rounded-full p-5 hover:border-blue-500" onClick={handleSignIn}>
          Sign in with Google
          
        </button>
      </div>
    );
  }

