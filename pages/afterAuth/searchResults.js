"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { query, collection, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/util/firebase';
import CreatePost from '@/app/components/createPost';

export default function SearchResults() {
  const router = useRouter();
  const { query: searchQuery } = router.query;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const recipesCollection = collection(db, 'Recipes');
        
        const searchResultsQuery = query(recipesCollection, where('r_name_lowercase', '==', searchQuery.toLowerCase()));
        const querySnapshot = await getDocs(searchResultsQuery);
        const mappedRecipes = querySnapshot.docs.map((recipeDoc) => ({
          id: recipeDoc.id,
          name: recipeDoc.data().r_name,
          recipe: recipeDoc.data().r_desc,
          user: recipeDoc.data().u_name,
        }));
        setSearchResults(mappedRecipes);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleFavoriteClick = async (recipeId, recipeName) => {
    const userEmail = 'user@example.com'; 
    const userFavoritesCollection = collection(db, 'Users', localStorage.email, 'favorites');
  const recipeDocRef = doc(userFavoritesCollection, recipeId);

  
  await setDoc(recipeDocRef, {
    
    f_name: recipeName,
  });
};

  return (
    <div>
            
            

            <div class=" w-full  flex-row ">
            {searchResults.map((recipe, index) => (
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
  );
}