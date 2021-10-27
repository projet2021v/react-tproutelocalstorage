import React, { Component } from "react";
import Login from '../classes/login';
import {Redirect} from "react-router-dom";
import axios from 'axios';

import gestionlocalstorage from "../services/gestionslocalstorage";
import { Config } from '../config/config';

/**
 * Composant de connexion : formulaire et gestion des states...
 * Récupération des props de mon router
 */
class CompLogin extends Component {

  constructor(props) {
    super(props);
    /**
     * State pour orienté la rediction vers la route de l'application
     */
    this.state = { redirectToReferrer : false };
    this.loginInput = React.createRef(); //instance de pointeur en mémoire, liant l'attribut à une balise html (voir dans le return)
    this.mdpInput = React.createRef(); //instance de pointeur en mémoire, liant l'attribut à une balise html (voir dans le return)
  }
    
  /**
   * Appeler lors du click pour vérifier si les informations
   * du login est correct
   */
  /**
   * login est appelé lors du onclick du bouton connexion
   * il récupére le user et le MTP
   * se connecte à la base de données et vérifie si les deux informations existent
   * si c'est le cas alors on met à jour notre localstorage
   * sinon on est déconnecté
   */
  login = () => {
    /**
     * on se déconnecte pour une raison de sécurité ...
     */
    gestionlocalstorage.logout();

    let c = new Login();

    c.userMDP = this.mdpInput.current.value; //récupération de la saisie dans l'input du MDP (défini dans le render)
    c.userName = this.loginInput.current.value; //récupération de la saisie dans l'input du LOGIN (défini dans le render)
    
    /**
     * get (Promise, grâce à l'api axios)
     * requête http, verbe GET
     */
    axios.get(Config.login).then((response) => {
      let data = response.data;
      data.forEach((item) => {
        if((c.userMDP === item.userMDP) && (c.userName === item.userName)) {
            gestionlocalstorage.setlogin(c);
        }
      });

      /**
       * Si on a une information alors on déclenche le redirect par redirectToReferrer: true
       */
      if(gestionlocalstorage.getlogin() != null) {
        this.setState({redirectToReferrer: true})
      }
    });
  };

/**
 * Déconnexion de l'application
 */
  logout = () => {
    gestionlocalstorage.logout();
    this.setState({redirectToReferrer: false});
  }

  render() {
    /**
     * from est un attribut JSON de location.state
     * (state du router)
     * si le state est undefined alors { from: { pathname: "/" }
     */
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    
    /**
     * Récupération de l'attribut redirectToReferrer du state du composant
     */
    let { redirectToReferrer } = this.state;

    //Récupération du state redirectToReferrer
    if (redirectToReferrer) {
    //Si redirectToReferrer est à true on est redirigé vers /app
    //avec le state mise à jour
      if(from.pathname !== '/') {
          from.state = { login:gestionlocalstorage.getlogin() };
      }
      //Je redirige vers from.pathname configuré
      return  <Redirect to={from} />;
    }

    /**
     * Ecran de saisie avec des reférences ref
     */
    return (
      <div>
        {gestionlocalstorage.getlogin() === null &&
          <div>
            <label>Login :<input type='text' ref={this.loginInput} /></label><br/>
            <label>Mot de passe :<input type='password' ref={this.mdpInput} /></label>
            <button onClick={this.login}>Connexion...</button>
          </div>
        }

        {/* Bouton déconnexion si login ok*/}
        {gestionlocalstorage.getlogin() !== null &&
          <button onClick={this.logout}>Logout...</button>
        }
      </div>
    );
  }
}

export default CompLogin;