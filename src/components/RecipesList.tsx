import React, { useState } from "react";
import useFetchRecipes from "../hooks/useFetchRecipes";

const RecipeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { recipes } = useFetchRecipes();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.includes(searchTerm)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
