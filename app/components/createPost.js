"use client";
import { serverTimestamp } from 'firebase/firestore';

import React, { useState } from 'react';
import { db } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
    
        addDoc(collection(db, 'Recipes'), {
            r_name: recipeName,
            r_desc: recipeDesc,
            u_name: localStorage.name,
            u_email: localStorage.email,
            timestamp: serverTimestamp(),
       });

       
    
    }

   
    return (
        <div class="fixed mt-5 left-1/2 transform -translate-x-1/2  w-3/5 bg-neutral-700 h-3/4 flex-col">
            <h1 class="m-1 font-title text-white font-bold text-2xl text-center">Your Recipe</h1>
            <div class="flex-row">
                <label class="text-black">Recipe Name</label>
                <input 
                class="text-black border border-black"
                value={recipeName}
                onChange={handleRecipeNameChange}
                ></input>
                
            </div>
            <button class=" border border-black absolute top-0 right-0 bg-black rounded-" >Exit</button>
            <div class="">
                <textarea
                class="text-black border border-white my-auto w-full h-90 "
                value={recipeDesc}
                onChange={handleRecipeDescChange}

                ></textarea>
                
            </div>
            <button class="text-white border border-black absolute bottom-0 right-0 mb-4 mr-4 rounded-full w-20 bg-black"
                onClick={handlePostClick}
                
            > post</button>
        </div>


    )
}