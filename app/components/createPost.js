"use client";
import { serverTimestamp } from 'firebase/firestore';

import React, { useState } from 'react';
import { db } from '../util/firebase';
import { collection, addDoc, setDoc, doc} from 'firebase/firestore';
export default function CreatePost(){

    const [recipeName, setRecipeName] = useState("");
    const [recipeDesc, setRecipeDesc] = useState("");

    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    }

    const handleRecipeDescChange = (event) => {
        setRecipeDesc(event.target.value);
    }
    
    const handlePostClick = async () => {
        await setDoc(doc(db, 'Users', localStorage.email), {
            r_name: localStorage.name,
            
        });
    
        addDoc(collection(db, 'Recipes'), {
            r_name: recipeName,
            r_desc: recipeDesc,
            u_name: localStorage.name,
            u_email: localStorage.email,
            r_name_lowercase: recipeName.toLowerCase(),
            timestamp: serverTimestamp(),
       });
       const userFavoritesCollection = collection(db, 'Users', localStorage.email, 'favorites');
        await setDoc(doc(userFavoritesCollection, 'empty_field'), {});


        // Reset the form fields after posting
        setRecipeName("");
        setRecipeDesc("");
       
    
    }

   
    return (
        <div class="fixed mt-5 left-1/2 transform -translate-x-1/2  w-3/5 bg-neutral-700 h-3/4 flex-col">
            <h1 class="m-1 font-title text-white font-bold text-2xl text-center">Your Recipe</h1>
            <div class=" flex mt-5  justify-center">
                
                <input 
                class="text-black border border-black w-3/5 mx-auto"
                value={recipeName}
                onChange={handleRecipeNameChange}
                ></input>
                
            </div>
            
            
                <textarea
                 className="flex-col flex mt-5 text-black border border-white my-auto w-4/5 mx-auto h-4/5  resize-none"
                 value={recipeDesc}
                 onChange={handleRecipeDescChange}

                ></textarea>
                
            
            <button class="text-white border border-black absolute bottom-0 right-0 mb-4 mr-4 rounded-full w-20 bg-black"
                onClick={handlePostClick}
                
            > post</button>
        </div>


    )
}