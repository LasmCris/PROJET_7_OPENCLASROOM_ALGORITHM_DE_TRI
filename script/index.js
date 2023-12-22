// J'importe la variable `recipes` depuis le fichier de données
import recipes from "/data/recipes.js";

import {
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés,
} from "./optionSelect.js";

import searchRecipes from "./algoSearch.js";

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

// Sélectionner les paragraphes tagués du DOM
const elementsTagues = document.querySelectorAll(
  ".sectionTags__IngredientsAppareilsUstensilsTagues p"
);

// Convertir la NodeList en tableau
const elementsArray = Array.from(elementsTagues);

// Extraire le contenu textuel de chaque paragraphe
const textContents = elementsArray.map((paragraph) => paragraph.textContent);

// Convertir le contenu en minuscules
const lowercaseTextContents = textContents.map((text) => text.toLowerCase());

// Le résultat final attribué à la variable zonneDetag
let zonneDetag = lowercaseTextContents;
console.log(zonneDetag);

// Array qui stocke les recettes retenues après l'application du TAG
const recettesApresTags = [];

// Fonction de recherche étendue avec les tags sélectionnés
function filterRecipesByTags(
  recipes,
  ingredientsTagés,
  ustensilsTagés,
  appareilsTagés
) {
  for (const recipe of recipes) {
    // Vérification des tags d'ingrédients
    const ingredientsPresent = ingredientsTagés.every((tag) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(tag)
      )
    );
    // Ajout de la recette à recettesApresTags seulement si l'ingrédient est présent dans l'array
    if (ingredientsPresent) {
      recettesApresTags.push(recipe);
    }

    // Vérification des tags d'ustensiles
    const ustensilsPresent = ustensilsTagés.every((tag) =>
      recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).includes(tag)
    );
    // Ajout de la recette à recettesApresTags seulement si l'ustensil est présent dans l'array
    if (ustensilsPresent) {
      recettesApresTags.push(recipe);
    }

    // Vérification des tags d'appareils
    const appareilPresent = appareilsTagés.includes(
      recipe.appliance && recipe.appliance.toLowerCase()
    );
    // Ajout de la recette à recettesApresTags seulement si l'appareil est présent dans l'array
    if (appareilPresent) {
      recettesApresTags.push(recipe);
    }
  }

  return recettesApresTags;
}

// Fonction pour générer et ajouter dynamiquement les articles de recette
function generateAndAppendRecipeArticles(recipes) {
  sectionArticleRecette.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeArticle = generateRecipeArticle(recipe);
    sectionArticleRecette.appendChild(recipeArticle);
  });
}

// Écouteur d'événement pour la saisie de recherche
searchInput.addEventListener("input", function () {
  const input = searchInput.value.toLowerCase();

  const filteredRecipes = searchRecipes(input);
  // Je vérifie si la longueur de la requête est supérieure ou égale à 3 caractères
  if (input.length >= 3) {
    console.log(filteredRecipes);
    // Régénérer les articles de recette avec les nouvelles recettes filtrées
    generateAndAppendRecipeArticles(filteredRecipes);
  } else if (input.length <= 3) {
    // Si la longueur de la requête est inférieure à 3 caractères, réafficher tous les articles de recette
    generateAndAppendRecipeArticles(recipes);
  }

  if (filteredRecipes.length <= 1) {
    // ICI je Gére le cas où `recipes` n'est pas défini ou vide
    // Soit j'affiche un message d'erreur soit ne rien faire.
    const errorParagraph = document.createElement("p");
    errorParagraph.classList.add("errorParagraph");
    errorParagraph.textContent = `Aucune recette ne contient "${searchInput.value.toUpperCase()}" vous pouvez chercher "tarte aux pommes", "poisson" ect ..`;
    sectionArticleRecette.appendChild(errorParagraph);
  }
});

// Fonction pour initialiser et attacher l'observateur de mutation
function initMutationObserver() {
  const zonneDetagElement = document.querySelector(
    ".sectionTags__IngredientsAppareilsUstensilsTagues"
  );

  // Initialiser l'observateur de mutation
  const observer = new MutationObserver(function () {
    let ArrayRectteApresTags = filterRecipesByTags(
      recipes,
      ingredientsTagés,
      ustensilsTagés,
      appareilsTagés
    );

    generateAndAppendRecipeArticles(ArrayRectteApresTags);
  });

  // Configurer les options pour l'observateur de mutation
  const observerOptions = {
    childList: true, // Surveiller les modifications des enfants de zonneDetagElement
    subtree: true, // Surveiller les modifications dans tout l'arbre descendant
  };

  // Attacher l'observateur de mutation à zonneDetagElement
  observer.observe(zonneDetagElement, observerOptions);
}

// Appeler la fonction d'initialisation de l'observateur de mutation
initMutationObserver();

export default generateRecipeArticle;
