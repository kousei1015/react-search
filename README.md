# react-search

React でバックエンドのデータの中で、条件が一致したものだけを返すフィルダリング機能を実装してみました。

以下がそのコードです。

types.ts には以下の型情報が書いてあります

```
export type Recipe = {
    id: number;
    name: string;
}
```

hoos/useFetchRecipes.tsx にはバックエンドからのデータを取得するカスタムフックを書いてあります。

```
import { useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "../types";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Recipe[]>(
          "http://localhost:3000/recipes"
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  return { recipes };
};

export default useFetchRecipes;

```

次に、RecipesList.tsx 内で、指定した文字が含まれるデータを抽出させるために、filter メソッドと includes メソッドを使って実装している

```
import React, { useState } from 'react';
import useFetchRecipes from '../hooks/useFetchRecipes';

const RecipeList: React.FC = () => {
  const { recipes } = useFetchRecipes();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRecipes = recipes.filter(recipe =>
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

```

最後に App.tsx で上記の RecipesList.tsx を import している。

```
import React from 'react';
import RecipesList from "./components/RecipesList";

const App = () => {
  return (
    <div>
      <RecipesList />
    </div>
  );
};

export default App;

```

