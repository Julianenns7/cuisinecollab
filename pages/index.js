"use client";
import Link from 'next/link';

import { signInWithGoogle } from '../app/util/firebase';

export default function signIn(){
    

    const handleSignIn = async () => {
      try {
        const userData = await signInWithGoogle();
        // Redirect to the home page after successful sign-in
        window.location.href = '/afterAuth/new';
      } catch (error) {
        // Handle error if needed
        console.error(error);
      }
    };
  
    return (
      <div class="bg-neutral-950">
        <button onClick={handleSignIn}>Sign in with Google</button>
      </div>
    );
  }

