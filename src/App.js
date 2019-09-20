import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // On crée un array avec toutes les lettres disponibles
      lettresDisponibles: [..."abcdefghijklmnopqrstuvwxyz"],
      lettresEssayees: new Set(),
      mot: "sinusite",
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let lettreAppuyee = event.target.firstChild.data;

    this.setState((prevState) => {
      return {lettresEssayees: prevState.lettresEssayees.add(lettreAppuyee)}
    })
  }

  render() {
    // On transforme l'array de lettres du state en divs pour l'affichage
    let lettres = this.state.lettresDisponibles.map(x => (
      <div key={x}
        className={this.state.lettresEssayees.has(x) ? "lettre lettre-utilisee" : "lettre lettre-inutilisee"}
        onClick={this.handleClick}>
        {x}
      </div>));

    //On calcule le texte restant à afficher
    function computeDisplay(phrase, usedLetters) {
      let motSortie = phrase.replace(/\w/g,
        (letter) => (usedLetters.has(letter) ? letter : '_')
      )
      return motSortie;
    }
    let motAffiche = computeDisplay(this.state.mot, this.state.lettresEssayees)

    return (
      <div className="App">
        <div className="mot">
          <p>{motAffiche}</p>
        </div>
        <div className="clavier">
          {lettres}
        </div>
      </div>
    );
  }
}

export default App;
