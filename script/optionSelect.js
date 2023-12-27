// J'importe la variable `recipes` depuis le fichier de données
import recipes from "/data/recipes.js";
import {logicDeRecherche} from "./index.js";

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

// Fonction pour j'affiche les ingredients dans le dropdown
// Je declare un tableau pour stocker les textes des paragraphes d'ingrédients tagés
export var ingredientsTagés = [];

function displayIngredients(ingredients) {
  var dropdownContent = document.querySelector(
    "#myDropdown1 #myDropdownContent"
  );
  var template = document.getElementById("templateFiltreIngredients");
  var selectedIngredientsDiv = document.querySelector(
    ".myDropdown1__divIngredientsSelectionnés"
  );
  var taggedIngredientsDiv = document.querySelector(
    ".sectionTags__IngredientsAppareilsUstensilsTagues"
  );

  dropdownContent.innerHTML = ""; // Je réinitialise le contenu du dropdown

  ingredients.forEach((ingredient) => {
    var clone = template.content.cloneNode(true);
    var templateParagraph = clone.querySelector(".paragrapheFlitreIngredient");

    templateParagraph.textContent = ingredient;

    // j'ajoute un gestionnaire d'événements au paragraphe cloné
    templateParagraph.addEventListener("click", function () {
      // Je verifie si l'élément est déjà présent dans la liste
      if (!ingredientsTagés.includes(ingredient)) {
        // Je clone l'élément cliqué dans la div de classe .myDropdown1__divIngredientsSelectionnés
        var selectedIngredientClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon = document.createElement("span");
        closeIcon.className = "close-icon";
        closeIcon.textContent = "\u2716"; // Symbole de fermeture (X)

        // Ajout et gestion de l'événement de survol de l'élément
        selectedIngredientClone.addEventListener("mouseover", function () {
          // Ajout de la classe "show2" pour j'affiche l'icône
          closeIcon.classList.add("show2");
          // Ajout du texte gras
          selectedIngredientsDiv.classList.add("bold500");
        });

        // Ajout d'un gestionnaire d'événement pour quitter le survol
        selectedIngredientClone.addEventListener("mouseout", function () {
          // je retire la classe "show2" pour je masque l'icône
          closeIcon.classList.remove("show2");
          // Retrait du texte gras
          selectedIngredientsDiv.classList.remove("bold500");
        });

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedIngredientsDiv.removeChild(selectedIngredientClone);
          taggedIngredientsDiv.removeChild(taggedIngredientClone); // je retire également de .sectionTags__IngredientsTagues

          // je retire le texte du paragraphe du tableau ingredientsTagés
          ingredientsTagés = ingredientsTagés.filter(
            (texte) => texte !== ingredient
          );
          console.log(ingredientsTagés);
        });

        // j'ajoute l'icône de fermeture à l'élément cloné
        selectedIngredientClone.appendChild(closeIcon);

        // Je modifie la couleur de fond en utilisant le code hexadécimal
        selectedIngredientClone.style.backgroundColor = "#FFD15B";
        selectedIngredientClone.style.fontSize = "13px";

        // j'ajoute l'élément cloné à la div .myDropdown1__divIngredientsSelectionnés
        selectedIngredientsDiv.appendChild(selectedIngredientClone);

        // j'ajoute le texte du paragraphe au tableau ingredientsTagés
        ingredientsTagés.push(ingredient);
        console.log(ingredientsTagés);

        // j'ajoute le clone à la div .sectionTags__IngredientsTagues
        var taggedIngredientClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon2 = document.createElement("span");
        closeIcon2.className = "close-icon2";
        closeIcon2.textContent = "\u2716"; // Symbole de fermeture (X)

        taggedIngredientsDiv.appendChild(taggedIngredientClone);
        taggedIngredientClone.appendChild(closeIcon2);
        logicDeRecherche();

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon2.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedIngredientsDiv.removeChild(selectedIngredientClone);
          taggedIngredientsDiv.removeChild(taggedIngredientClone); // je retire également de .sectionTags__IngredientsTagues
          logicDeRecherche();
          // je retire le texte du paragraphe du tableau ingredientsTagés
          ingredientsTagés = ingredientsTagés.filter(
            (texte) => texte !== ingredient
          );
          console.log(ingredientsTagés);
        });
      }
    });

    dropdownContent.appendChild(clone);
  });
}

// j'affiche ou je masque le dropdown
const borderRadiusAModifier = document.getElementById("dropdownBtn1");
const borderRadiusAModifier2 = document.querySelector(
  ".divDropBtnIngredients div"
);

const dropdownBtn1 = document.getElementById("dropdownBtn1");
const chevron1 = document.querySelector(".divDropBtnIngredients i");
var dropdownContent1 = document.getElementById("myDropdown1");

dropdownBtn1.addEventListener("click", function () {
  dropdownContent1.classList.toggle("dropdown-open");
  borderRadiusAModifier2.classList.toggle("dropdown-open");
  borderRadiusAModifier.classList.toggle("dropdown-open");
  chevron1.classList.toggle("rotate");

  // d'autres actions à effectuer à l'ouverture ici
  displayIngredients(arrayDesIngredients);
});

// je filtre les éléments du dropdown en fonction de la saisie de l'utilisateur
document
  .getElementById("myIngredientInput")
  .addEventListener("input", function () {
    let input1, filter1, div1, items1, txtValue1, i1;
    input1 = document.getElementById("myIngredientInput");
    filter1 = input1.value.toUpperCase();
    div1 = document.querySelector("#myDropdown1 #myDropdownContent");
    items1 = div1.getElementsByTagName("div");

    // Je verifie si la longueur de la chaîne est supérieure à 0
    if (input1.value.length > 0) {
      // J'accède à la span avec la classe .ingredientsInputClose
      let ingredientsInputClose = document.querySelector(
        ".ingredientsInputClose"
      );

      // j'ajoute la classe .inputCloseShow pour j'affiche la span
      if (ingredientsInputClose) {
        ingredientsInputClose.classList.add("inputCloseShow");
      }
    } else {
      // Si la longueur est de 0, je masque la span
      let ingredientsInputClose = document.querySelector(
        ".ingredientsInputClose"
      );
      if (ingredientsInputClose) {
        ingredientsInputClose.classList.remove("inputCloseShow");

        // Je réinitialise l'affichage pour montrer tous les éléments
        for (let i = 0; i < items1.length; i++) {
          items1[i].style.display = "";
        }
      }
    }

    // J'utilise arrayDesAppareils comme base de filtrage
    for (i1 = 0; i1 < arrayDesIngredients.length; i1++) {
      txtValue1 = arrayDesIngredients[i1];
      let currentItem1 = items1[i1];

      // Je verifie si l'élément existe avant d'J'accède à sa propriété style
      if (currentItem1) {
        if (txtValue1.toUpperCase().indexOf(filter1) > -1) {
          // j'affiche l'élément si le filtre correspond
          currentItem1.style.display = "";
        } else {
          // je masque l'élément sinon
          currentItem1.style.display = "none";
        }
      }
    }
  });

// j'ajoute un gestionnaire d'événements pour le clic sur la span .ingredientsInputClose
let ingredientsInputClose = document.querySelector(".ingredientsInputClose");
if (ingredientsInputClose) {
  ingredientsInputClose.addEventListener("click", function () {
    // Je vide l'input
    document.getElementById("myIngredientInput").value = "";

    // je masque la span
    ingredientsInputClose.classList.remove("inputCloseShow");

    // Je réinitialise l'affichage pour montrer tous les éléments
    let div1 = document.querySelector("#myDropdown1 #myDropdownContent");
    let items1 = div1.getElementsByTagName("div");
    for (let i = 0; i < items1.length; i++) {
      items1[i].style.display = "";
    }
  });
}

//***************************************************************************** */

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
// Je declare un tableau pour stocker les textes des paragraphes d'appareils tagés
export var appareilsTagés = [];

function displayAppareils(appareils) {
  var dropdownContent = document.querySelector(
    "#myDropdown2 #myDropdownContent"
  );
  var template = document.getElementById("templateFiltreAppareils");
  var selectedAppareilsDiv = document.querySelector(
    ".myDropdown2__divAppareilsSelectionnés"
  );
  var taggedAppareilsDiv = document.querySelector(
    ".sectionTags__IngredientsAppareilsUstensilsTagues"
  );

  dropdownContent.innerHTML = ""; // Je réinitialise le contenu du dropdown

  appareils.forEach((appareil) => {
    var clone = template.content.cloneNode(true);
    var templateParagraph = clone.querySelector(".paragrapheFlitreAppareil");

    templateParagraph.textContent = appareil;

    // j'ajoute un gestionnaire d'événements au paragraphe cloné
    templateParagraph.addEventListener("click", function () {

      // Je verifie si l'élément est déjà présent dans la liste
      if (!appareilsTagés.includes(appareil)) {
        // Je clone l'élément cliqué dans la div de classe .myDropdown2__divAppareilsSelectionnés
        var selectedAppareilClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon = document.createElement("span");
        closeIcon.className = "close-icon";
        closeIcon.textContent = "\u2716"; // Symbole de fermeture (X)

        // Ajout et gestion de l'événement de survol de l'élément
        selectedAppareilClone.addEventListener("mouseover", function () {
          // j'ajoute la classe "show2" pour j'affiche l'icône
          closeIcon.classList.add("show2");
        });

        // Ajout d'un gestionnaire d'événement pour quitter le survol
        selectedAppareilClone.addEventListener("mouseout", function () {
          // je retire la classe "show2" pour je masque l'icône
          closeIcon.classList.remove("show2");
        });

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedAppareilsDiv.removeChild(selectedAppareilClone);
          taggedAppareilsDiv.removeChild(taggedAppareilClone); // je retire également de .sectionTags__appareilsTagues

          // je retire le texte du paragraphe du tableau appareilsTagés
          appareilsTagés = appareilsTagés.filter((texte) => texte !== appareil);
          console.log(appareilsTagés);
        });

        // j'ajoute l'icône de fermeture à l'élément cloné
        selectedAppareilClone.appendChild(closeIcon);

        // Je modifie la couleur de fond en utilisant le code hexadécimal
        selectedAppareilClone.style.backgroundColor = "#FFD15B";
        selectedAppareilClone.style.fontSize = "13px";

        // j'ajoute l'élément cloné à la div .myDropdown2__divAppareilsSelectionnés
        selectedAppareilsDiv.appendChild(selectedAppareilClone);

        // j'ajoute le texte du paragraphe au tableau appareilsTagés
        appareilsTagés.push(appareil);
        console.log(appareilsTagés);

        // j'ajoute le clone à la div .sectionTags__appareilsTagues
        var taggedAppareilClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon2 = document.createElement("span");
        closeIcon2.className = "close-icon2";
        closeIcon2.textContent = "\u2716"; // Symbole de fermeture (X)

        taggedAppareilsDiv.appendChild(taggedAppareilClone);
        taggedAppareilClone.appendChild(closeIcon2);

        logicDeRecherche();

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon2.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedAppareilsDiv.removeChild(selectedAppareilClone);
          taggedAppareilsDiv.removeChild(taggedAppareilClone); // je retire également de .sectionTags__appareilsTagues

          // je retire le texte du paragraphe du tableau appareilsTagés
          appareilsTagés = appareilsTagés.filter((texte) => texte !== appareil);
          console.log(appareilsTagés);
        });
      }
    });

    dropdownContent.appendChild(clone);
  });
}

// j'affiche ou je masque le dropdown

const borderRadiusAModifierApp = document.getElementById("dropdownBtn2");
const borderRadiusAModifier2App = document.querySelector(
  ".divDropBtnAppareils div"
);

const dropdownBtn2 = document.getElementById("dropdownBtn2");
const chevron2 = document.querySelector(".divDropBtnAppareils i");
var dropdownContent2 = document.getElementById("myDropdown2");

dropdownBtn2.addEventListener("click", function () {
  dropdownContent2.classList.toggle("dropdown-open");
  borderRadiusAModifierApp.classList.toggle("dropdown-open");
  borderRadiusAModifier2App.classList.toggle("dropdown-open");
  chevron2.classList.toggle("rotate");

  // Vous pouvez j'ajoute d'autres actions à effectuer à l'ouverture ici
  displayAppareils(arrayDesAppareils);
});

// je filtre les éléments du dropdown en fonction de la saisie de l'utilisateur
document
  .getElementById("myAppareilInput")
  .addEventListener("input", function () {
    let input2, filter2, div2, items2, txtValue2, i2;
    input2 = document.getElementById("myAppareilInput");
    filter2 = input2.value.toUpperCase();
    div2 = document.querySelector("#myDropdown2 #myDropdownContent");
    items2 = div2.getElementsByTagName("div");

    // Je verifie si la longueur de la chaîne est supérieure à 0
    if (input2.value.length > 0) {
      // J'accède à la span avec la classe .appareilsInputClose
      let appareilsInputClose = document.querySelector(".appareilsInputClose");

      // j'ajoute la classe .inputCloseShow pour j'affiche la span
      if (appareilsInputClose) {
        appareilsInputClose.classList.add("inputCloseShow");
      }
    } else {
      // Si la longueur est de 0, je masque la span
      let appareilsInputClose = document.querySelector(".appareilsInputClose");
      if (appareilsInputClose) {
        appareilsInputClose.classList.remove("inputCloseShow");

        // Je réinitialise l'affichage pour montrer tous les éléments
        for (let i = 0; i < items2.length; i++) {
          items2[i].style.display = "";
        }
      }
    }

    // J'utilise arrayDesAppareils comme base de filtrage
    for (i2 = 0; i2 < arrayDesAppareils.length; i2++) {
      txtValue2 = arrayDesAppareils[i2];
      let currentItem2 = items2[i2];

      // Je verifie si l'élément existe avant d'J'accède à sa propriété style
      if (currentItem2) {
        if (txtValue2.toUpperCase().indexOf(filter2) > -1) {
          // j'affiche l'élément si le filtre correspond
          currentItem2.style.display = "";
        } else {
          // je masque l'élément sinon
          currentItem2.style.display = "none";
        }
      }
    }
  });

// j'ajoute un gestionnaire d'événements pour le clic sur la span .appareilsInputClose
let appareilsInputClose = document.querySelector(".appareilsInputClose");
if (appareilsInputClose) {
  appareilsInputClose.addEventListener("click", function () {
    // Je vide l'input
    document.getElementById("myAppareilInput").value = "";

    // je masque la span
    appareilsInputClose.classList.remove("inputCloseShow");

    // Je réinitialise l'affichage pour montrer tous les éléments
    let div2 = document.querySelector("#myDropdown2 #myDropdownContent");
    let items2 = div2.getElementsByTagName("div");
    for (let i = 0; i < items2.length; i++) {
      items2[i].style.display = "";
    }
  });
}

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

// Fonction pour j'affiche les ingredients dans le dropdown
// Je declare un tableau pour stocker les textes des paragraphes d'ustensils tagés
export var ustensilsTagés = [];


function displayUstensils(ustensils) {
  var dropdownContent = document.querySelector(
    "#myDropdown3 #myDropdownContent"
  );
  var template = document.getElementById("templateFiltreUstensils");
  var selectedUstensilsDiv = document.querySelector(
    ".myDropdown3__divUstensilsSelectionnés"
  );
  var taggedUstensilsDiv = document.querySelector(
    ".sectionTags__IngredientsAppareilsUstensilsTagues"
  );

  dropdownContent.innerHTML = ""; // Je réinitialise le contenu du dropdown

  ustensils.forEach((ustensil) => {
    var clone = template.content.cloneNode(true);
    var templateParagraph = clone.querySelector(".paragrapheFlitreUstensil");

    templateParagraph.textContent = ustensil;

    // j'ajoute un gestionnaire d'événements au paragraphe cloné
    templateParagraph.addEventListener("click", function () {
      // Je verifie si l'élément est déjà présent dans la liste
      if (!ustensilsTagés.includes(ustensil)) {
        // Je clone l'élément cliqué dans la div de classe .myDropdown3__divUstensilsSelectionnés
        var selectedUstensilClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon = document.createElement("span");
        closeIcon.className = "close-icon";
        closeIcon.textContent = "\u2716"; // Symbole de fermeture (X)

        // Ajout et gestion de l'événement de survol de l'élément
        selectedUstensilClone.addEventListener("mouseover", function () {
          // j'ajoute la classe "show2" pour j'affiche l'icône
          closeIcon.classList.add("show2");
        });

        // Ajout d'un gestionnaire d'événement pour quitter le survol
        selectedUstensilClone.addEventListener("mouseout", function () {
          // je retire la classe "show2" pour je masque l'icône
          closeIcon.classList.remove("show2");
        });

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedUstensilsDiv.removeChild(selectedUstensilClone);
          taggedUstensilsDiv.removeChild(taggedUstensilClone); // je retire également de .sectionTags__ustensilsTagues

          // je retire le texte du paragraphe du tableau ustensilsTagés
          ustensilsTagés = ustensilsTagés.filter((texte) => texte !== ustensil);
          console.log(ustensilsTagés);
        });

        // j'ajoute l'icône de fermeture à l'élément cloné
        selectedUstensilClone.appendChild(closeIcon);

        // Je modifie la couleur de fond en utilisant le code hexadécimal
        selectedUstensilClone.style.backgroundColor = "#FFD15B";
        selectedUstensilClone.style.fontSize = "13px";

        // j'ajoute l'élément cloné à la div .myDropdown3__divUstensilsSelectionnés
        selectedUstensilsDiv.appendChild(selectedUstensilClone);

        // j'ajoute le texte du paragraphe au tableau ustensilsTagés
        ustensilsTagés.push(ustensil);
        console.log(ustensilsTagés);

        // j'ajoute le clone à la div .sectionTags__ustensilsTagues
        var taggedUstensilClone = templateParagraph.cloneNode(true);

        // j'ajoute une icône de fermeture à l'élément cloné
        var closeIcon2 = document.createElement("span");
        closeIcon2.className = "close-icon2";
        closeIcon2.textContent = "\u2716"; // Symbole de fermeture (X)

        taggedUstensilsDiv.appendChild(taggedUstensilClone);
        taggedUstensilClone.appendChild(closeIcon2);
        logicDeRecherche();

        // j'ajoute un gestionnaire d'événements à l'icône de fermeture
        closeIcon2.addEventListener("click", function () {
          // je retire le paragraphe correspondant lorsqu'on clique sur l'icône de fermeture
          selectedUstensilsDiv.removeChild(selectedUstensilClone);
          taggedUstensilsDiv.removeChild(taggedUstensilClone); // je retire également de .sectionTags__ustensilsTagues

          // je retire le texte du paragraphe du tableau ustensilsTagés
          ustensilsTagés = ustensilsTagés.filter((texte) => texte !== ustensil);
          console.log(ustensilsTagés);
        });
      }
    });

    dropdownContent.appendChild(clone);
  });
}

// j'affiche ou je masque le dropdown
const borderRadiusAModifierUst = document.getElementById("dropdownBtn3");
const borderRadiusAModifier2Ust = document.querySelector(
  ".divDropBtnUstensils div"
);

const dropdownBtn3 = document.getElementById("dropdownBtn3");
const chevron3 = document.querySelector(".divDropBtnUstensils i");
var dropdownContent3 = document.getElementById("myDropdown3");

dropdownBtn3.addEventListener("click", function () {
  dropdownContent2.classList.toggle("dropdown-open");
  borderRadiusAModifierUst.classList.toggle("dropdown-open");
  borderRadiusAModifier2Ust.classList.toggle("dropdown-open");
  chevron3.classList.toggle("rotate");

  // ont peut ajouter d'autres actions à effectuer à l'ouverture ici
  displayUstensils(arrayDesUstensils);
});

// je filtre les éléments du dropdown en fonction de la saisie de l'utilisateur
document
  .getElementById("myUstensilInput")
  .addEventListener("input", function () {
    let input3, filter3, div3, items3, txtValue3, i3;
    input3 = document.getElementById("myUstensilInput");
    filter3 = input3.value.toUpperCase();
    div3 = document.querySelector("#myDropdown3 #myDropdownContent");
    items3 = div3.getElementsByTagName("div");

    // Je verifie si la longueur de la chaîne est supérieure à 0
    if (input3.value.length > 0) {
      // J'accède à la span avec la classe .ustensilsInputClose
      let ustensilsInputClose = document.querySelector(".ustensilsInputClose");

      // j'ajoute la classe .inputCloseShow pour j'affiche la span
      if (ustensilsInputClose) {
        ustensilsInputClose.classList.add("inputCloseShow");
      }
    } else {
      // Si la longueur est de 0, je masque la span
      let ustensilsInputClose = document.querySelector(".ustensilsInputClose");
      if (ustensilsInputClose) {
        ustensilsInputClose.classList.remove("inputCloseShow");

        // Je réinitialise l'affichage pour montrer tous les éléments
        for (let i = 0; i < items3.length; i++) {
          items3[i].style.display = "";
        }
      }
    }

    // J'utilise arrayDesUstensils comme base de filtrage
    for (i3 = 0; i3 < arrayDesUstensils.length; i3++) {
      txtValue3 = arrayDesUstensils[i3];
      let currentItem3 = items3[i3];

      // Je verifie si l'élément existe avant d'J'accède à sa propriété style
      if (currentItem3) {
        if (txtValue3.toUpperCase().indexOf(filter3) > -1) {
          // j'affiche l'élément si le filtre correspond
          currentItem3.style.display = "";
        } else {
          // je masque l'élément sinon
          currentItem3.style.display = "none";
        }
      }
    }
  });

// j'ajoute un gestionnaire d'événements pour le clic sur la span .ustensilsInputClose
let ustensilsInputClose = document.querySelector(".ustensilsInputClose");
if (ustensilsInputClose) {
  ustensilsInputClose.addEventListener("click", function () {
    // Je vide l'input
    document.getElementById("myUstensilInput").value = "";

    // je masque la span
    ustensilsInputClose.classList.remove("inputCloseShow");

    // Je réinitialise l'affichage pour montrer tous les éléments
    let div3 = document.querySelector("#myDropdown3 #myDropdownContent");
    let items3 = div3.getElementsByTagName("div");
    for (let i = 0; i < items3.length; i++) {
      items3[i].style.display = "";
    }
  });
}

//*********** FONCTIONNALITE DE COORDINATION DE FERMETURE DES DROPDOWN */

// Fonction pour fermer toutes les dropdowns sauf celle spécifiée
function fermerToutesLesDropdowns(saufDropdown) {
  if (dropdownContent1 !== saufDropdown) {
    dropdownContent1.style.display = "none";
    chevron1.classList.remove("rotate");
  }

  if (dropdownContent2 !== saufDropdown) {
    dropdownContent2.style.display = "none";
    chevron2.classList.remove("rotate");
  }

  if (dropdownContent3 !== saufDropdown) {
    dropdownContent3.style.display = "none";
    chevron3.classList.remove("rotate");
  }
}

// Écouteurs d'événements pour les boutons de dropdown
document.getElementById("dropdownBtn1").addEventListener("click", function () {
  if (dropdownContent1.style.display === "block") {
    dropdownContent1.style.display = "none";
    chevron1.classList.remove("rotate");
  } else {
    fermerToutesLesDropdowns(dropdownContent1);
    dropdownContent1.style.display = "block";
    chevron1.classList.add("rotate");
    displayIngredients(arrayDesIngredients);
  }
});

document.getElementById("dropdownBtn2").addEventListener("click", function () {
  if (dropdownContent2.style.display === "block") {
    dropdownContent2.style.display = "none";
    chevron2.classList.remove("rotate");
  } else {
    fermerToutesLesDropdowns(dropdownContent2);
    dropdownContent2.style.display = "block";
    chevron2.classList.add("rotate");
    displayAppareils(arrayDesAppareils);
  }
});

document.getElementById("dropdownBtn3").addEventListener("click", function () {
  if (dropdownContent3.style.display === "block") {
    dropdownContent3.style.display = "none";
    chevron3.classList.remove("rotate");
  } else {
    fermerToutesLesDropdowns(dropdownContent3);
    dropdownContent3.style.display = "block";
    chevron3.classList.add("rotate");
    displayUstensils(arrayDesUstensils);
  }
});
