import { useEffect } from "react";
import { Box } from "native-base";
import { IRootState, useAppDispatch } from "../../stores";
import { useSelector } from "react-redux";
import { getRecipeInfo } from "../../stores/recipe/actions";
import { recipeActions } from "../../stores/recipe/slices";

export const Recipe = ({ route, navigation }) => {
  const { recipeId, otherParam } = route.params;

  const dispatch = useAppDispatch();

  const { setRecipeInfo } = recipeActions;

  const recipe = useSelector((state: IRootState) => state.recipe.recipe);

  useEffect(() => {
    dispatch(getRecipeInfo(recipeId));

    return () => {
      dispatch(setRecipeInfo(null));
    };
  }, []);

  return <Box>{recipe?.name}</Box>;
};
