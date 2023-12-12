"use client";
import { db } from '@/app/util/firebase';
import { collection, query, orderBy, getDocs, limit, setDoc, doc } from 'firebase/firestore';
import CreatePost from '@/app/components/createPost';
import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/router';

import Nav from '@/app/components/NavBar';
export default function NewRecipes() {

    
    const [latestRecipes, setLatestRecipes] = useState([]);
   
   
   
    

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            const recipesCollection = collection(db, 'Recipes');
            const recipesQuery = query(recipesCollection, orderBy('timestamp', 'desc'), limit(20));
            const querySnapshot = await getDocs(recipesQuery);
            const mappedRecipes = querySnapshot.docs.map((recipeDoc) => ({
                id: recipeDoc.id,
                name: recipeDoc.data().r_name,
                recipe: recipeDoc.data().r_desc,
                user: recipeDoc.data().u_name,
            }));
        setLatestRecipes(mappedRecipes);
    } 
    fetchLatestRecipes();

}, []);

const handleFavoriteClick = async (recipeId, recipeName) => {
     
    const userFavoritesCollection = collection(db, 'Users', localStorage.email, 'favorites');
  const recipeDocRef = doc(userFavoritesCollection, recipeId);

  
  await setDoc(recipeDocRef, {
    
    f_name: recipeName,
  });
};


    return (
        <div>
            
            

            <div class=" w-full  flex-row ">
            {latestRecipes.map((recipe, index) => (
                    <div class="bg-neutral-700 w-3/5 mx-auto my-10 p-10 justify-center" key={index}>

                        <h2 class="text-3xl text-center mb-5 font-title">{recipe.name}</h2>
                        <div class="bg-white text-black mb-10 ">
                            <p class="line-break whitespace-pre-line break-all" >{recipe.recipe}</p>
                        </div>
                        <div class="flex justify-between">
                        <button onClick={() => handleFavoriteClick(recipe.id, recipe.name)}>Favorite</button>
                            <p>
                               {recipe.user} 
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            
      </div>
        


    )
}