document.addEventListener("DOMContentLoaded", function () {
  const tipButtons = document.querySelectorAll(".style-number");
  const billInput = document.getElementById("champ_nombre");
  const customTipInput = document.getElementById("value_custom");
  const numberOfPeopleInput = document.getElementById("number_people");
  const tipAmountSpan = document.getElementById("tip_amount");
  const totalSpan = document.getElementById("total");
  const resetButton = document.getElementById("reset-button");

  // Fonction pour calculer le montant du pourboire
  function calculateTipAmount(bill, tipPercentage) {
    return (bill * tipPercentage) / 100;
  }

  // Fonction pour mettre à jour les résultats
  function updateResults() {
    const bill = parseFloat(billInput.value);
    const numberOfPeople = parseFloat(numberOfPeopleInput.value);
    let tipPercentage;

    // Vérifiez si un pourcentage personnalisé est saisi
    if (customTipInput.value !== "") {
      tipPercentage = parseFloat(customTipInput.value);
    } else {
      // Récupére le pourcentage à partir des boutons de pourcentage
      tipPercentage = parseFloat(
        document.querySelector(".style-number.active").textContent
      );
    }

    // Calcule le montant du pourboire par personne
    const tipAmountPerPerson =
      calculateTipAmount(bill, tipPercentage) / numberOfPeople;
    tipAmountSpan.textContent = tipAmountPerPerson.toFixed(2);

    // Calcule le total par personne (montant du pourboire inclus)
    const totalPerPerson = bill / numberOfPeople + tipAmountPerPerson;
    totalSpan.textContent = totalPerPerson.toFixed(2);
  }

  // Ajoute des écouteurs d'événements pour détecter les changements dans le champ "Bill"
  billInput.addEventListener("input", updateResults);

  // Ajoutez des écouteurs d'événements pour les boutons de pourcentage
  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retire la classe "active" de tous les boutons
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      // Ajoutez la classe "active" au bouton cliqué
      this.classList.add("active");
      // Met à jour les résultats lorsque le pourcentage est modifié
      updateResults();
    });
  });

  // Ajoute un écouteur d'événements pour le pourcentage personnalisé
  customTipInput.addEventListener("input", updateResults);

  // Ajoute un écouteur d'événements pour le bouton de réinitialisation
  resetButton.addEventListener("click", function () {
    // Réinitialisez les valeurs des champs du formulaire
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customTipInput.value = "";

    // Réinitialise les boutons de pourcentage
    tipButtons.forEach((button) => button.classList.remove("active"));

    // Met à jour les résultats après la réinitialisation
    updateResults();
  });
});
