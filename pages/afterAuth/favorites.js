import { FirebaseApp } from 'firebase/app';
import { db } from '@/app/util/firebase';
import { collection, query, getDocs, where, documentId} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      
      

      // Query the user's favorites collection to get document IDs
      const userFavoritesCollection = collection(db, 'Users', localStorage.email, 'favorites');
      const favoritesQuery = query(userFavoritesCollection);
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favoritesIds = favoritesSnapshot.docs.map(doc => doc.id);

      // Fetch the recipes corresponding to the document IDs
      const recipesCollection = collection(db, 'Recipes');
      const recipesQuery = query(recipesCollection, where(documentId(), 'in', favoritesIds));
      const recipesSnapshot = await getDocs(recipesQuery);
      const favoriteRecipesData = recipesSnapshot.docs.map(recipeDoc => ({
        id: recipeDoc.id,
        name: recipeDoc.data().r_name,
        recipe: recipeDoc.data().r_desc,
        user: recipeDoc.data().u_name,
      }));

      setFavoriteRecipes(favoriteRecipesData);
    };

    fetchFavoriteRecipes();
  }, []);

 

  return (
    <div>
        
        

        <div class=" w-full  flex-row ">
        {favoriteRecipes.map((recipe, index) => (
                <div class="bg-neutral-700 w-3/5 mx-auto my-10 p-10 justify-center" key={index}>

                    <h2 class="text-3xl text-center mb-5 font-title">{recipe.name}</h2>
                    <div class="bg-white text-black mb-10 ">
                        <p class="line-break whitespace-pre-line break-all" >{recipe.recipe}</p>
                    </div>
                    <div class="flex justify-between">
                   
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