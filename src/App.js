import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // On crée un array avec toutes les lettres disponibles
      lettresDisponibles: [..."abcdefghijklmnopqrstuvwxyz"],
      lettresEssayees: new Set(),
      mot: "si",
      gagne: 0
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let gagnePartie = 0;
    let lettreAppuyee = event.target.firstChild.data;

    // À FAIRE : Rendre plus claire cette horreur de ligne qui vérifie si le joueur a gagné
    if (this.computeDisplay(this.state.mot, this.state.lettresEssayees.add(lettreAppuyee)) === this.state.mot) {
      gagnePartie = 1;
    }

    this.setState((prevState) => {
      return {
        lettresEssayees: prevState.lettresEssayees.add(lettreAppuyee),
        gagne: gagnePartie
      }
    })
  }

  //On calcule le texte restant à afficher
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  render() {
    // On transforme l'array de lettres du state en divs pour l'affichage
    let lettres = this.state.lettresDisponibles.map(x => (
      <div key={x}
        className={this.state.lettresEssayees.has(x) ? "lettre lettre-utilisee" : "lettre lettre-inutilisee"}
        onClick={this.handleClick}>
        {x}
      </div>));

    let boutonRejouer = ['R','e','j','o','u','e','r','?'].map((x,index) => (
      <div key={index}
        className="lettre lettre-rejouer"
        onClick={this.resetGame}>
        {x}
      </div>));


    let motAffiche = this.computeDisplay(this.state.mot, this.state.lettresEssayees)

    return (
      <div className="App">
        <div className="mot">
          <p style={this.state.gagne ? {color: "#A9D962"} : {}}>{motAffiche}</p>
        </div>
        {this.state.gagne ? <h3>Félicitations! Vous avez gagné!</h3>: ""}
        <div className="clavier">
          {this.state.gagne ? boutonRejouer : lettres}
        </div>
      </div>
    );
  }
}

export default App;
