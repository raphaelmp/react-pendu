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

    let ajouts = [lettreAppuyee];

    // Patch pas très élégante pour les accents
    if (lettreAppuyee === 'e') {
      ajouts = ['e', 'é', 'è', 'ë'];
    } else if (lettreAppuyee === 'a') {
      ajouts = ['à', 'a']
    }


    this.setState(prevState => {
      let set = prevState.lettresEssayees; // On récupère l'ancien set
      let nouveauSet = new Set([ ...set, ...ajouts]);
      return ({lettresEssayees: nouveauSet})
    })
  }

  render() {
    // On transforme l'array de lettres du state en divs pour l'affichage
    let lettres = this.state.lettresDisponibles.map(x => (<div key={x} className="lettre" onClick={this.handleClick}>{x}</div>));

    //On calcule le texte restant à afficher
    function computeDisplay(phrase, usedLetters) {
      return phrase.replace(/\w/g,
        (letter) => (usedLetters.has(letter) ? letter : '_')
      )
    }
    let motAffiche = computeDisplay(this.state.mot, this.state.lettresEssayees)

    return (
      <div className="App">
        <div className="mot">
          <p>{motAffiche}</p>
        </div>
        <div className="lettresEssayees">
          <p>Lettres essayées: {}</p>
        </div>
        <div className="clavier">
          {lettres}
        </div>
      </div>
    );
  }
}

export default App;
