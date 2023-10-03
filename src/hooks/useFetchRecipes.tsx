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
