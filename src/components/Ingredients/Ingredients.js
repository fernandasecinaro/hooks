import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-be647-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient }]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-update-be647-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => {
          return ingredient !== ingredientId;
        })
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
