import React from 'react';
import './App.css';

class App extends React.Component {
  get etatInitial() {
    return {
      // On crée un array avec toutes les lettres disponibles
      lettresDisponibles: [..."abcdefghijklmnopqrstuvwxyz"],
      lettresEssayees: new Set(),
      tousLesMots: ['chat', 'chien', 'cheval', 'poney', 'dromadaire', 'papillon', 'libellule', 'boeuf', 'agneau', 'mouche', 'pigeon', 'crapaud', 'vache'],
      mot: "",
      etatPartie: 0
    };
  }

  constructor() {
    super();
    this.state = this.etatInitial;
    this.state.mot = this.state.tousLesMots[Math.floor(Math.random()*this.state.tousLesMots.length)]
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
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
        etatPartie: gagnePartie
      }
    })
  }

  resetGame(event) {
    this.setState(prevState => {
      let nouvelEtat = this.etatInitial
      nouvelEtat.mot = prevState.tousLesMots[Math.floor(Math.random()*prevState.tousLesMots.length)];
      return nouvelEtat
    }
      );

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
          <p style={this.state.etatPartie ? {color: "#A9D962"} : {}}>{motAffiche}</p>
        </div>
        {this.state.etatPartie ? <h3>Félicitations! Vous avez gagné!</h3>: ""}
        <div className="clavier">
          {this.state.etatPartie ? boutonRejouer : lettres}
        </div>
      </div>
    );
  }
}

export default App;
