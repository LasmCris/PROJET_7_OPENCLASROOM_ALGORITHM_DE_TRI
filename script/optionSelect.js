// J'importe la variable `recipes` depuis le fichier de données
import recipes from "/data/recipes.js";






// Je Crée un tableau pour stocker les valeurs de la propriétés "appliance"
const arrayDesAppareils = [];

//Je parcoure le tableau recipes
recipes.forEach((recipe) => {
  const appareil = recipe.appliance;

  //Je vérifie si l'appareils n'est pas déjà dans le tableau arrayDesAppareils
  if (!arrayDesAppareils.includes(appareil)) {
    arrayDesAppareils.push(appareil); // J'ajoute l'appareil au tableau "arrayDesAppareils"
  }
});


// Maintenant, arrayDesAppareils contient toutes les appareils.
console.log(arrayDesAppareils);


// Fonction pour afficher les appareils dans le dropdown
function displayAppareils(appareils) {
    var dropdownContent = document.querySelector(
      "#myDropdown2 #myDropdownContent"
    );
    var template = document.getElementById('templateFiltreAppareils');
    dropdownContent.innerHTML = ''; // Réinitialiser le contenu du dropdown
    // if (template) {
      appareils.forEach((appareil) => {
        var clone = template.content.cloneNode(true);
        clone.querySelector(".paragrapheFlitreAppareil").textContent = appareil;
        dropdownContent.appendChild(clone);
      });
    // } 
    // else {
    //   window.location.reload();
    //   console.error("Le template n'est pas encore disponible dans le DOM.");
    // }
    
}



// Afficher ou masquer le dropdown
// Initialisation de la variable d'état
var dropdownAppareilsOpen = false;
const chevron2 = document.querySelector(".divDropBtnAppareils i");
var dropdownContent2 = document.getElementById("myDropdown2");
document.getElementById("dropdownBtn2").addEventListener("click", function () {
  
  if (dropdownAppareilsOpen) {
    dropdownContent2.style.display = "none";
    chevron2.classList.remove("rotate");
    dropdownAppareilsOpen = false;
  } else {
    dropdownContent2.style.display = "block";
    chevron2.classList.add("rotate");
    dropdownAppareilsOpen = true;
    displayAppareils(arrayDesAppareils);
  }
});





// Filtrer les éléments du dropdown en fonction de la saisie de l'utilisateur
document.getElementById('myAppareilInput').addEventListener('input', function() {
    var input, filter, div, items, txtValue, i;
    input = document.getElementById('myAppareilInput');
    filter = input.value.toUpperCase();
    div = document.getElementById('myDropdownContent');
    items = div.getElementsByTagName('div');
    for (i = 0; i < items.length; i++) {
        txtValue = items[i].querySelector('.paragrapheFlitreAppareil').textContent || items[i].querySelector('.paragrapheFlitreAppareil').innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});







//***************************************************************************** */




// Je crée un tableau pour stocker les valeurs uniques de "ingredient"
const arrayDesIngredients = [];

// Je parcoure le tableau recipes
recipes.forEach((recipe) => {
  // Je parcoure les ingrédients de chaque recette
  recipe.ingredients.forEach((ingredient) => {
    const ingredientName = ingredient.ingredient;

    //Je vérifie si l'ingredientName n'est pas déjà dans le tableau uniqueIngredients
    if (!arrayDesIngredients.includes(ingredientName)) {
      arrayDesIngredients.push(ingredientName); // J'ajoute l'ingredientName au tableau uniqueIngredients
    }
  });
});



// Maintenant, uniqueIngredients contient toutes les valeurs uniques de "ingredient"
console.log(arrayDesIngredients);




// Fonction pour afficher les ingredients dans le dropdown
function displayIngredients (ingredient) {
  var dropdownContent = document.querySelector("#myDropdown1 #myDropdownContent");
  var template = document.getElementById("templateFiltreIngredients");
  dropdownContent.innerHTML = ""; // Réinitialiser le contenu du dropdown
  // if (template) {
  ingredient.forEach((ingredient) => {
    var clone = template.content.cloneNode(true);
    clone.querySelector(".paragrapheFlitreIngredient").textContent = ingredient;
    dropdownContent.appendChild(clone);
  });
  // }
  // else {
  //   window.location.reload();
  //   console.error("Le template n'est pas encore disponible dans le DOM.");
  // }
}



// Afficher ou masquer le dropdown
// Initialisation de la variable d'état
var dropdownAppareilsOpen = false;
const chevron1 = document.querySelector(".divDropBtnIngredients i");
var dropdownContent1 = document.getElementById("myDropdown1");
document.getElementById("dropdownBtn1").addEventListener("click", function () {
  
  if (dropdownAppareilsOpen) {
    dropdownContent1.style.display = "none";
    chevron1.classList.remove("rotate");
    dropdownAppareilsOpen = false;
  } else {
    dropdownContent1.style.display = "block";
    chevron1.classList.add("rotate");
    dropdownAppareilsOpen = true;
    displayIngredients(arrayDesIngredients);
  }
});





// Filtrer les éléments du dropdown en fonction de la saisie de l'utilisateur
document.getElementById('myIngredientInput').addEventListener('input', function() {
    var input, filter, div, items, txtValue, i;
    input = document.getElementById("myIngredientInput");
    filter = input.value.toUpperCase();
    div = document.getElementById('myDropdownContent');
    items = div.getElementsByTagName('div');
    for (i = 0; i < items.length; i++) {
        txtValue = items[i].querySelector('.paragrapheFlitreIngredient').textContent || items[i].querySelector('.paragrapheFlitreIngredient').innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});








//***************************************************************************** */




//Je cree un tableau pour stocker les valeurs uniques d'ustensils
const arrayDesUstensils = [];

//Je parcoure le tableau recipes
recipes.forEach((recipe) => {
  //Je parcoure les ustensiles de chaque recette
  recipe.ustensils.forEach((ustensil) => {
    //Je vérifie si l'ustensil n'est pas déjà dans le tableau uniqueUstensils
    if (!arrayDesUstensils.includes(ustensil)) {
      arrayDesUstensils.push(ustensil); // J'joute l'ustensil au tableau uniqueUstensils
    }
  });
});

// Maintenant, uniqueUstensils contient toutes les valeurs uniques d'ustensils
console.log(arrayDesUstensils);





// Fonction pour afficher les ingredients dans le dropdown
function displayUstensils (Ustensils) {
  var dropdownContent = document.querySelector(
    "#myDropdown3 #myDropdownContent"
  );
  var template = document.getElementById("templateFiltreUstensils");
  dropdownContent.innerHTML = ""; // Réinitialiser le contenu du dropdown
  // if (template) {
  Ustensils.forEach((Ustensil) => {
    var clone = template.content.cloneNode(true);
    clone.querySelector(".paragrapheFlitreUstensil").textContent = Ustensil;
    dropdownContent.appendChild(clone);
  });
  // }
  // else {
  //   window.location.reload();
  //   console.error("Le template n'est pas encore disponible dans le DOM.");
  // }
}



// Afficher ou masquer le dropdown
// Initialisation de la variable d'état
var dropdownAppareilsOpen = false;
const chevron3 = document.querySelector(".divDropBtnUstensils i");
var dropdownContent3 = document.getElementById("myDropdown3");
document.getElementById("dropdownBtn3").addEventListener("click", function () {
  
  if (dropdownAppareilsOpen) {
    dropdownContent3.style.display = "none";
    chevron3.classList.remove("rotate");
    dropdownAppareilsOpen = false;
  } else {
    dropdownContent3.style.display = "block";
    chevron3.classList.add("rotate");
    dropdownAppareilsOpen = true;
    displayUstensils(arrayDesUstensils);
  }
});





// Filtrer les éléments du dropdown en fonction de la saisie de l'utilisateur
document.getElementById('myIngredientInput').addEventListener('input', function() {
    var input, filter, div, items, txtValue, i;
    input = document.getElementById("myIngredientInput");
    filter = input.value.toUpperCase();
    div = document.getElementById('myDropdownContent');
    items = div.getElementsByTagName('div');
    for (i = 0; i < items.length; i++) {
        txtValue = items[i].querySelector('.paragrapheFlitreIngredient').textContent || items[i].querySelector('.paragrapheFlitreIngredient').innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});








// J'obtiens les références des éléments <select> dans le HTML
const ingredientSelect = document.querySelector("#ingredient");
const appareilSelect = document.querySelector("#appareil");
const ustensilSelect = document.querySelector("#ustensil");

// // J'obtiens les références des templates
// const templateFiltreIngredients = document.getElementById(
//   "templateFiltreIngredients"
// );
// const templateFiltreAppareils = document.getElementById(
//   "templateFiltreAppareils"
// );
// const templateFiltreUstensils = document.getElementById(
//   "templateFiltreUstensils"
// );

// // Je remplis les options des balises <select> avec les valeurs des tableaux
// // Pour les ingrédients
// uniqueIngredients.forEach((ingredient) => {
//   const option = document.createElement("option");
//   option.value = ingredient;
//   option.textContent = ingredient;
//   ingredientSelect.appendChild(option);
// });

// // Pour les appareils
// uniqueAppliances.forEach((appareil) => {
//   const option = document.createElement("option");
//   option.value = appareil;
//   option.textContent = appareil;
//   appareilSelect.appendChild(option);
// });

// // Pour les ustensiles
// uniqueUstensils.forEach((ustensil) => {
//   const option = document.createElement("option");
//   option.value = ustensil;
//   option.textContent = ustensil;
//   ustensilSelect.appendChild(option);
// });

// // Ajout des écouteurs d'événements
// // pour gérer les sélections et les ajouts dynamiques d'éléments basés sur les sélections.

// //################################ POUR LES INGREDIENTS #####################################

// // J'obtient la référence du conteneur où j'afficherais les sélections
// const selectionContainer = document.querySelector(
//   ".parametreDeTri__ingredients"
// );

// // Je crée un tableau pour stocker les valeurs sélectionnées
// export const selectedIngredientValues = [];

// // J'ajoute un gestionnaire d'événement "change" à la balise <select>
// ingredientSelect.addEventListener("change", function () {
//   // Je récupére la valeur de l'option sélectionnée
//   const selectedValue = ingredientSelect.value;

//   // Si une valeur est sélectionnée et n'est pas déjà dans le tableau selectedIngredientValues
//   if (selectedValue && !selectedIngredientValues.includes(selectedValue)) {
//     // Je clonne le template
//     const newSelection = templateFiltreIngredients.content.cloneNode(true);

//     // Je recupère la référence du paragraphe dans le clone
//     const paragraph = newSelection.querySelector(".paragrapheFlitreIngredient");

//     // J'affiche la valeur de l'option sélectionnée dans le paragraphe
//     paragraph.textContent = selectedValue;

//     // J'ajoute le clone au conteneur
//     selectionContainer.appendChild(newSelection);

//     // J'ajoute la valeur sélectionnée au tableau selectedIngredientValues
//     selectedIngredientValues.push(selectedValue);
//   }
// });

// //FERMETURE DES INGREDIENTS SELECTIONNÉ
// // J'obtient la référence du conteneur où J'afficherais les sélections
// selectionContainer;

// // J'ajoute un gestionnaire d'événement "click" au conteneur parent
// selectionContainer.addEventListener("click", (event) => {
//   if (event.target.classList.contains("close-icon")) {
//     // Si l'élément cliqué a la classe "close-icon"
//     // Je récupére le parent (le template à supprimer)
//     const templateToRemove = event.target.closest(".ingredient__selectione");

//     if (templateToRemove) {
//       // Je supprime le template du conteneur
//       selectionContainer.removeChild(templateToRemove);

//       // Je supprime également la valeur correspondante du tableau selectedIngredientValues
//       const index = Array.from(templateToRemove.parentNode.children).indexOf(
//         templateToRemove
//       );
//       selectedIngredientValues.splice(index, 1);
//     }
//   }
// });

// //################################ POUR LES APPAREIL #####################################

// // J'obtient la référence du conteneur où J'afficherais les sélections
// const selectionContainerAppareil = document.querySelector(
//   ".parametreDeTri__appareils"
// );

// // Je cree un tableau pour stocker les valeurs sélectionnées
// export const selectedAppareilValues = [];

// // J'ajoute un gestionnaire d'événement "change" à la balise <select>
// appareilSelect.addEventListener("change", function () {
//   // Je récupère la valeur de l'option sélectionnée
//   const selectedAppareilValue = appareilSelect.value;

//   // Si une valeur est sélectionnée et n'est pas déjà dans le tableau selectedIngredientValues
//   if (
//     selectedAppareilValue &&
//     !selectedAppareilValues.includes(selectedAppareilValue)
//   ) {
//     // Je clonne le template
//     const newSelection2 = templateFiltreAppareils.content.cloneNode(true);

//     // Je récupère la référence du paragraphe dans le clone
//     const paragraph = newSelection2.querySelector(".paragrapheFlitreAppareil");

//     // J'affiche la valeur de l'option sélectionnée dans le paragraphe
//     paragraph.textContent = selectedAppareilValue;

//     // J'ajoute le clone au conteneur
//     selectionContainerAppareil.appendChild(newSelection2);

//     // J'ajoute la valeur sélectionnée au tableau selectedIngredientValues
//     selectedAppareilValues.push(selectedAppareilValue);
//   }
// });

// //FERMETURE DES APPAREILS SELECTIONNÉ
// // J'obtient la référence du conteneur où J'afficherais les sélections
// selectionContainerAppareil;

// //DELEGATION D'EVENNEMENT
// // J'ajoute un gestionnaire d'événement "click" au conteneur parent
// selectionContainerAppareil.addEventListener("click", (event) => {
//   if (event.target.classList.contains("close-icon")) {
//     // Si l'élément cliqué a la classe "close-icon"
//     // Je récupère le parent (le template à supprimer)
//     const templateToRemove = event.target.closest(".appareil__selectione");

//     if (templateToRemove) {
//       // Je supprime le template du conteneur
//       selectionContainerAppareil.removeChild(templateToRemove);

//       // Je supprime également la valeur correspondante du tableau selectedIngredientValues
//       const index = Array.from(templateToRemove.parentNode.children).indexOf(
//         templateToRemove
//       );
//       selectedAppareilValues.splice(index, 1);
//     }
//   }
// });

// //################################ POUR LES USTENSILS #####################################

// // J'obtient la référence du conteneur où J'afficherais les sélections
// const selectionContainerUstensils = document.querySelector(
//   ".parametreDeTri__ustensils"
// );

// // Je crée un tableau pour stocker les valeurs sélectionnées, avec le mot clés export
// // pour pouvoir l'exporter dans un autre module js
// export const selectedUstensilValues = [];

// // J'ajoute un gestionnaire d'événement "change" à la balise <select>
// ustensilSelect.addEventListener("change", function () {
//   // Je récupère la valeur de l'option sélectionnée
//   const selectedUstensilValue = ustensilSelect.value;

//   // Si une valeur est sélectionnée et n'est pas déjà dans le tableau selectedIngredientValues
//   if (
//     selectedUstensilValue &&
//     !selectedUstensilValues.includes(selectedUstensilValue)
//   ) {
//     // Je clonne le template
//     const newSelection3 = templateFiltreUstensils.content.cloneNode(true);

//     // Je récupère la référence du paragraphe dans le clone
//     const paragraph = newSelection3.querySelector(".paragrapheFlitreUstensil");

//     // J'affiche la valeur de l'option sélectionnée dans le paragraphe
//     paragraph.textContent = selectedUstensilValue;

//     // J'ajoute le clone au conteneur
//     selectionContainerUstensils.appendChild(newSelection3);

//     // J'ajoute la valeur sélectionnée au tableau selectedIngredientValues
//     selectedUstensilValues.push(selectedUstensilValue);
//   }
// });

// //FERMETURE DES INGREDIENTS SELECTIONNÉ
// // J'obtient la référence du conteneur où J'afficherais les sélections
// selectionContainerUstensils;

// // J'ajoute un gestionnaire d'événement "click" au conteneur parent
// selectionContainerUstensils.addEventListener("click", (event) => {
//   if (event.target.classList.contains("close-icon")) {
//     // Si l'élément cliqué a la classe "close-icon"
//     // Je récupère le parent (le template à supprimer)
//     const templateToRemove = event.target.closest(".ustensil__selectione");

//     if (templateToRemove) {
//       // Je supprime le template du conteneur
//       selectionContainerUstensils.removeChild(templateToRemove);

//       // Je supprime également la valeur correspondante du tableau selectedIngredientValues
//       const index = Array.from(templateToRemove.parentNode.children).indexOf(
//         templateToRemove
//       );
//       selectedUstensilValues.splice(index, 1);
//     }
//   }
// });

// export default {
//   selectedIngredientValues,
//   selectedUstensilValues,
//   selectedAppareilValues,
// };











