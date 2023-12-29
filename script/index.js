// J'importe la variable `recipes` depuis le fichier de données
import recipes from "/data/recipes.js";

import searchRecipes from "./algoSearch.js";

import {
  appareilsTagés,
  ingredientsTagés,
  ustensilsTagés,
} from "./optionSelect.js";


// J'obtiens ainsi la section parent où les articles de recette seront générés
const sectionArticleRecette = document.querySelector(".articleRecette");

// Fonction pour générer dynamiquement un article de recette
export function generateRecipeArticle(recipe) {
  //Si un article doit rester initialement chaché, on doit rajouté la class 'hide" a "articleRecette"
  const articleRecette = document.createElement("article");
  articleRecette.classList.add("sectionArticleRecette__articleRecette");

  // Creation de la structure HTML de l'article de recette
  const figureRecette = document.createElement("figure");
  figureRecette.classList.add("articleRecette__figureRecette");

  const divImgRecette = document.createElement("div");
  divImgRecette.classList.add("figureRecette__divImgRecette");

  const img = document.createElement("img");
  img.classList.add("divImgRecette__img");
  img.src = `asset/Photos_Les_petits_plats/${recipe.image}`;
  img.alt = recipe.name;

  const divTime = document.createElement("div");
  divTime.classList.add("divImgRecette__divTime");

  const time = document.createElement("p");
  time.classList.add("divTime__time");
  time.textContent = `${recipe.time} minutes`;

  const figcaptionRecette = document.createElement("figcaption");
  figcaptionRecette.classList.add("figureRecette__figcapRecette");

  const nomRecette = document.createElement("h2");
  nomRecette.classList.add("figcapRecette__nomRecette");
  nomRecette.textContent = recipe.name;

  divTime.appendChild(time);
  divImgRecette.appendChild(img);
  divImgRecette.appendChild(divTime);
  figureRecette.appendChild(divImgRecette);
  figcaptionRecette.appendChild(nomRecette);
  figureRecette.appendChild(figcaptionRecette);

  const sectionRecette = document.createElement("section");
  sectionRecette.classList.add("articleRecette__sectionRecette");

  const titreH2Recette = document.createElement("h2");
  titreH2Recette.classList.add("sectionRecette__titreH2");
  titreH2Recette.textContent = "INSTRUCTIONS";

  const paragrapheDetailRecette = document.createElement("p");
  paragrapheDetailRecette.classList.add(
    "sectionRecette__paragrapheDetailRecette"
  );
  paragrapheDetailRecette.textContent = recipe.description;

  sectionRecette.appendChild(titreH2Recette);
  sectionRecette.appendChild(paragrapheDetailRecette);

  const sectionIngredient = document.createElement("section");
  sectionIngredient.classList.add("articleRecette__sectionIngredient");

  const titreH2Ingredient = document.createElement("h2");
  titreH2Ingredient.classList.add("sectionIngredient__titreH2");
  titreH2Ingredient.textContent = "INGREDIENTS";

  const divArticleIngredient = document.createElement("div");
  divArticleIngredient.classList.add("sectionIngredient__divArticleIngredient");

  recipe.ingredients.forEach((ingredient) => {
    const articleIngrdient = document.createElement("article");
    articleIngrdient.classList.add("divArticleIngredient__articleIngrdient");

    const titreH3Ingredient = document.createElement("h3");
    titreH3Ingredient.classList.add("articleIngrdient__titreH3");
    titreH3Ingredient.textContent = ingredient.ingredient;

    const dosageIngredient = document.createElement("p");
    dosageIngredient.classList.add("articleIngrdient__dosage");
    const valeurParDefault = "";
    dosageIngredient.textContent = `${ingredient.quantity} ${
      ingredient.unit ?? valeurParDefault
    }`;

    articleIngrdient.appendChild(titreH3Ingredient);
    articleIngrdient.appendChild(dosageIngredient);

    divArticleIngredient.appendChild(articleIngrdient);
  });

  sectionIngredient.appendChild(titreH2Ingredient);
  sectionIngredient.appendChild(divArticleIngredient);

  articleRecette.appendChild(figureRecette);
  articleRecette.appendChild(sectionRecette);
  articleRecette.appendChild(sectionIngredient);

  return articleRecette;
}

// J'affiche les recettes dans la section parent
recipes.forEach((recipe) => {
  const recipeArticle = generateRecipeArticle(recipe);
  sectionArticleRecette.appendChild(recipeArticle);
});

// J'affiche les recettes dans la section parent (avec vérification de `recipes`)
if (Array.isArray(recipes) && recipes.length > 0) {
  recipes.forEach((recipe) => {
    const recipeArticle = generateRecipeArticle(recipe);
    sectionArticleRecette.appendChild(recipeArticle);
  });
} else {
}

// Sélecteur DOM de la barre de recherche
const searchInput = document.querySelector(".formulaire__inputSearch");



// Fonction pour générer et ajouter dynamiquement les articles de recette
function generateAndAppendRecipeArticles (recipes) {
  sectionArticleRecette.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeArticle = generateRecipeArticle(recipe);
    sectionArticleRecette.appendChild(recipeArticle);
  });
}


// Fonction de recherche étendue avec les tags sélectionnés
export function filterRecipesByTags(
  recipes,
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés
) {
  // Array qui stocke les recettes retenues après l'application du TAG
  let recettesApresTags = [];

  console.log(recipes, ingredientsTagés, ustensilsTagés, appareilsTagés);

  for (const recipe of recipes) {
    // Vérification des tags d'ingrédients
    const ingredientsPresent = ingredientsTagés.every((tag) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()).includes(tag.toLowerCase())
    );

    // Vérification des tags d'ustensiles
    const ustensilsPresent = ustensilsTagés.every((tag) =>
      recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).includes(tag.toLowerCase())
    );

    // Vérification des tags d'appareils
    const appareilPresent = appareilsTagés.length === 0 ? true : appareilsTagés
      .map((appareil) => appareil.toLowerCase())
      .includes(recipe.appliance.toLowerCase());

    // Ajout de la recette à recettesApresTags seulement si elle satisfait toutes les conditions
    if (ingredientsPresent && ustensilsPresent && appareilPresent) {
      recettesApresTags.push(recipe);
    }
  }
  console.log(recettesApresTags);

  return recettesApresTags;
}






// Ceci est une fonction qui lorsqu'elle est appellée declenche la fonctionalité de recherche
export function logicDeRecherche () {
  const input = searchInput.value.toLowerCase();

  //Variables qui contients la liste des recettes, apres resultat de recherche
  let filteredRecipes = recipes;

  //Variables qui contients la liste des recettes, apres L'application du TAG
  let recetteApresTag = [];

  // la variable addedTag est vrai seulement si au moins un des 3 arrays a une eleent
  let addedTag =
    ingredientsTagés.some(Boolean) ||
    ustensilsTagés.some(Boolean) ||
    appareilsTagés.some(Boolean);

  // Je vérifie si la longueur de la requête est supérieure ou égale à 3 caractères
  if (input.length >= 3) {
    filteredRecipes = searchRecipes(input);
    console.log(filteredRecipes);

  }
  
  if (addedTag) {
    // Si la fonction "addesTag" est vrai, alors je filtre par Tag
    console.log("il ya des elemnt TAG");
    filteredRecipes = filterRecipesByTags(
      filteredRecipes,
      ingredientsTagés,
      ustensilsTagés,
      appareilsTagés
    );
  }

  //MESSSAGE D'ERREUR POUR RECHERCHE
  if (filteredRecipes.length === 0) {
    // ICI je Gére le cas où `recipes` n'est pas défini ou vide
    // Soit j'affiche un message d'erreur soit ne rien faire.
    sectionArticleRecette.innerHTML = "";
    const errorParagraph = document.createElement("p");
    errorParagraph.classList.add("errorParagraph");
    errorParagraph.textContent = `Aucune recette ne contient "${searchInput.value.toUpperCase()}" vous pouvez chercher "tarte aux pommes", "poisson" ect ..`;
    sectionArticleRecette.appendChild(errorParagraph);
  } else {
    generateAndAppendRecipeArticles(filteredRecipes);
  }

  // Va mettre a jours le nombre de recettes
  

  //MESSSAGE D'ERREUR POUR TAG
  // if (recetteApresTag.length === 0 && !(filteredRecipes.length === 0)) {
  //   // ICI je Gére le cas où `recipes` n'est pas défini ou vide
  //   // Soit j'affiche un message d'erreur soit ne rien faire.
  //   const errorParagraph = document.createElement("p");
  //   errorParagraph.classList.add("errorParagraph");
  //   errorParagraph.textContent = "Aucune recette ne coresspond a ton TAG";
  //   sectionArticleRecette.appendChild(errorParagraph);
  // }
};





// Écouteur d'événement pour la saisie de recherche
searchInput.addEventListener("input", function () {
  logicDeRecherche();
});



