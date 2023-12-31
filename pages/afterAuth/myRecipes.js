"use client"
import { db } from "@/app/util/firebase";
import { query, getDocs, where, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect} from 'react';
export default function MyRecipes({ }) {

    const [yourRecipes, setYourRecipes] = useState([]);

    useEffect(() => {
        const fetchYourRecipes = async () => {
            const email = localStorage.email;
            const recipesCollection = collection(db, 'Recipes');
            const userRecipesQuery = query(recipesCollection, where('u_email', '==', email) );
            const userRecipesSnapshot = await getDocs(userRecipesQuery);
            const userRecipes = userRecipesSnapshot.docs.map((recipeDoc) => ({
                id: recipeDoc.id,
                name: recipeDoc.data().r_name,
                recipe: recipeDoc.data().r_desc,
            }))
        setYourRecipes(userRecipes)
    }
    fetchYourRecipes();
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
        {yourRecipes.map((recipe, index) => (
                <div class="bg-neutral-700 w-3/5 mx-auto my-10 p-10 justify-center" key={index}>

                    <h2 class="text-3xl text-center mb-5 font-title">{recipe.name}</h2>
                    <div class="bg-white text-black mb-10 ">
                        <p class="line-break whitespace-pre-line break-all" >{recipe.recipe}</p>
                    </div>
                    <div class="flex justify-between">
                    <button onClick={() => handleFavoriteClick(recipe.id, recipe.name)}>Favorite</button>
                        
                    </div>
                </div>
            ))}
        </div>

        
  </div>
    


)
}