// import generateRecipeArticle from "./index.js";
// import recipes from "/data/recipes.js";

// // Sélectionn du input
// const searchInput = document.querySelector(".formulaire__inputSearch");

// //fonction qui permettra de return sous form array de chaine de charactère
// //Le contenu textuelle des elements qui ont la meme classe ou le meme Id

// function getArrayTextElements(quelClassOuId) {
//   //je commence par declarer un arrray vide
//   const arrayOfTextContent = [];
//   //Je reccupère une NodeLiset grace a querySelector
//   const nodeListOfHtmlElements = document.querySelectorAll(`${quelClassOuId}`);
//   //Je convertit cette Nodelist en Array exploitable
//   const arrayOfHtmlElements = Array.from(nodeListOfHtmlElements);
//   //J'ittère dans chacun de cette array, sur chaque élement pour en extraire le contenu
//   arrayOfHtmlElements.forEach((element) => {
//     arrayOfTextContent.push(element.textContent);
//   });
//   return arrayOfTextContent;
// }

// //J'obtient grace a la fonction getArrayTextElements, le contenu textuel,
// const arrayNomDesPlats = getArrayTextElements(".figcapRecette__nomRecette");
// const arrayTouteDescriptionsplats = getArrayTextElements(
//   ".sectionRecette__paragrapheDetailRecette"
// );
// const arrayTousIngredientsPlats = getArrayTextElements(
//   ".articleIngrdient__titreH3"
// );
// const arrayTousLesAppareils = getArrayTextElements(
//   "#appareil :not(:first-child)"
// );
// const arrayTousLesUstensil = getArrayTextElements(
//   "#ustensil :not(:first-child)"
// );

// //J'accède a tous les articles de recette
// const tousLesArticles = document.querySelectorAll(
//   ".sectionArticleRecette__articleRecette"
// );
// const arrayDeTousLesArticles = Array.from(tousLesArticles);

// // Fonction pour filtrer les recettes en fonction du texte de recherche
// function filterRecipesBySearchText(
//   array1,
//   array2,
//   array3,
//   arrayDesRecettes,
//   inputUtilisateur
// ) {
//   //Je commence par cacher chaque article
//   arrayDesRecettes.forEach((recette) => {
//     recette.classList.add("hide");
//   });

//   for (let i = 0; i < array1.length; i++) {
//     if (
//       array1[i].includes(inputUtilisateur) ||
//       array2[i].includes(inputUtilisateur) ||
//       array3[i].includes(inputUtilisateur)
//     ) {
//       arrayDesRecettes[i].classList.remove("hide");
//     } else {
//       arrayDesRecettes[i].classList.add("hide");
//     }
//   }
// }

// searchInput.addEventListener("input", function () {
//   // Je récupère la valeur actuelle de l'input
//   const searchText = searchInput.value.toLowerCase();

//   // Vérifiez si la longueur du texte saisi est au moins de 3 caractères
//   if (searchText.length >= 3) {
//     filterRecipesBySearchText(
//       arrayNomDesPlats,
//       arrayTouteDescriptionsplats,
//       arrayTousIngredientsPlats,
//       arrayDeTousLesArticles,
//       searchText
//     );
//   }
// });

// const sectionArticleRecette = document.querySelector(".sectionArticleRecette");

// if (searchText === "") {
//   recipes.forEach((recipe) => {
//     generateRecipeArticle(recipe);
//     sectionArticleRecette.appendChild(recipeArticle);
//   });
// }
