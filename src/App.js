import React from 'react';
import './App.css';

const nombreDeVies = 10;
const barreVieInitial = 92.5;

class App extends React.Component {

  get etatInitial() {
    return {
      // On crée un array avec toutes les lettres disponibles
      lettresDisponibles: [..."abcdefghijklmnopqrstuvwxyz"],
      lettresEssayees: new Set(),
      tousLesMots: ['chat', 'chien', 'cheval', 'poney', 'dromadaire', 'papillon', 'libellule', 'boeuf', 'agneau', 'mouche', 'pigeon', 'crapaud', 'vache'],
      mot: "",
      etatPartie: 0, //0 = en cours, 1=gagné, 2=perdu
      barreVie: barreVieInitial,
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
    let lettreAppuyee = event.target.firstChild.data;
    let toReturn = {}

    // À FAIRE : Rendre plus claire cette horreur de ligne qui vérifie si le joueur a gagné
    if (this.computeDisplay(this.state.mot, this.state.lettresEssayees.add(lettreAppuyee)) === this.state.mot) {
      toReturn.etatPartie = 1;
    }

    this.setState((prevState) => {
      // On vérifie si la lettre appuyée est valide ou non
      // pour ensuite enlever de la vie au joueur
      if (!prevState.mot.includes(lettreAppuyee)) {
        toReturn.barreVie = prevState.barreVie - (barreVieInitial / nombreDeVies);

        // Si le nombre de vie est égal à 0, changer l'état de la partie
        if (toReturn.barreVie <= 0) {
          console.log('Perdu')
          toReturn.etatPartie = 2;
        }
      }

      return {
        lettresEssayees: prevState.lettresEssayees.add(lettreAppuyee),
        ...toReturn
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
        onClick={!this.state.lettresEssayees.has(x) ? this.handleClick : null}>
        {x}
      </div>));

    let boutonRejouer = ['R','e','j','o','u','e','r','?'].map((x,index) => (
      <div key={index}
        className="lettre lettre-rejouer"
        onClick={this.resetGame}>
        {x}
      </div>));


    let motAffiche = this.computeDisplay(this.state.mot, this.state.lettresEssayees)

    let style = {}
    let text = {}

    switch(this.state.etatPartie) {
      case 1:
        style.mot = {color: "#A9D962"};
        text.message = "Félicitations! Vous avez gagné!";
        break;
      case 2:
        style.mot = {color: "rgb(255, 70, 70)"};
        style.batterie = {border: "2px solid rgb(255, 70, 70)"};
        text.message = "Pas de chance... Vous avez perdu.";
        text.mot = `Le mot cherché était « ${this.state.mot} ».`;
        break;
      default:
        break;
    }



    return (
      <div className="App">
        <h1>Le Pendu</h1>
        <p className="header-description">Trouvez le mot!</p>
        <div className="barreVieContainer" style={style.batterie}>
          <div className="barreVie" style={{height: `${this.state.barreVie}%`}}></div>
        </div>
        <div className="mot">
          <p style={style.mot}>{motAffiche}</p>
        </div>
        {this.state.etatPartie ? <div><h3>{text.message}</h3><p>{text.mot}</p></div> : ""}
        <div className="clavier">
          {this.state.etatPartie ? boutonRejouer : lettres}
        </div>

        <p><br />
          Le code source de ce projet est disponible sur <a href="https://github.com/raphaelmp/react-pendu" rel="noopener noreferrer" target="_blank">Github</a>.
        </p>
      </div>
    );
  }
}

export default App;
