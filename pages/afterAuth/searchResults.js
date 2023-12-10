"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/util/firebase';
import CreatePost from '@/app/components/createPost';

export default function SearchResults({ showCreatePost, handleCreatePostClick } ) {
  const router = useRouter();
  const { query: searchQuery } = router.query;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const recipesCollection = collection(db, 'Recipes');
        const searchResultsQuery = query(recipesCollection, where('r_name', '==', searchQuery));
        const querySnapshot = await getDocs(searchResultsQuery);
        const mappedRecipes = querySnapshot.docs.map((recipeDoc) => ({
          name: recipeDoc.data().r_name,
          recipe: recipeDoc.data().r_desc,
          user: recipeDoc.data().u_name,
        }));
        setSearchResults(mappedRecipes);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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
                            <button >
                                favorite
                            </button>
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