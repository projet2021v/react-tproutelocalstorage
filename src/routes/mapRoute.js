import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from '../composants/Home';
import CompLogin from '../composants/compLogin';
import gestionlocalstorage from "../services/gestionslocalstorage";
import compGestionLogin from "../composants/compGestionLogin";
import CompGestionContact from "../composants/compGestionContact";

/**
TP Route + LocalStorage + Axios
Objectif : Garder la connexion d'un utilisateur : sur la table Login : lorsqu'on fait F5 ou qu'on quitte le naviagateur
Recharger : Les informations liées à notre utilisateur dans tous les cas.
Charger le Routes suivant.
Prévoir une méthode logout() au niveau des composants Home et Login ou de prévoir un composant Header
*/


/**
 * JSON de ma gestion des routes
 * J'ai ajouté de façon personnelle menu et exact
 */
const routes = [
  {
    path: "/",
    menu: 'Accueil',
    component: Home,
    exact : true
  },
  {
    path: "/login",
    menu: 'Identification',
    component: CompLogin
  },
  {
    path: "/CrudLogin",
    menu: "Mon CRUD login",
    component: compGestionLogin
  },
  {
    path: "/contacts",
    menu: "Gestion des contacts",
    component: CompGestionContact
  },
  {
    path: "/listes",
    menu: 'Listes',
    component: Listes,
    routes: [
      {
        path: "/listes/gestionlogin",
        menu: 'Gestion des users',
        component: GestionLogin
      },
      {
        path: "/listes/gestionclient",
        menu: 'Gestion des Clients',
        component: GestionCustomers
      }
    ]
  }
];


/**
 * on récupére les routes (const route en cours...) et les props des routes
 */
export function Listes( { routes, ...props }) {
  /**
   * On vérifie si on est "logué" sinon on est redirigé vers le path : '/login'
   */
  if(gestionlocalstorage.getlogin() == null) {
    props.history.push('/login');
  }

  return (
    <div>
      <ul>
      {/*On affiche tous les liens du route en cours */}
      {routes.map((route, i) => (
          <AfficheLesLiens key={i} {...route} />
      ))}
      </ul>

      {/** on crée la balise route avec le composant et les passages de paramètres dont les props */}
      {routes.map((route, i) => (
          <GestionSousRoutes key={i} {...route} />
      ))}
    </div>
  );
}

  
/**
 * Gestion principale de mes routes à partir de const route
 */
export default function MapRoute() {
  return (
    <div>
      <ul>
        { routes.map( (route, i) => (<AfficheLesLiens key={i} {...route} />) ) }
      </ul>

      {/* Gestion de mes routes sélectionnés grâce à la balise Switch  */}
      <Switch>
        { routes.map((route, i) => (<GestionSousRoutes key={i} {...route} />) ) }
      </Switch>
    </div>
  );
}


//Affiche les Link de la routes
export function AfficheLesLiens(route) {
  return (
    <li>
        {/*On affiche tous les liens du route en cours par NavLink */}
        {route.exact === undefined &&
        <NavLink to={route.path}> {route.menu} </NavLink>
        }

        {/*Je positionne mon lien actif par défaut configurer dans le const route*/}
        {route.exact === true  &&
        <NavLink to={route.path} activeClassName="selected"> {route.menu} </NavLink>
        }
    </li>
  );
}


/**
 * Gestion des sous routes 
 */
export function GestionSousRoutes(route) {
  return (
    <Route
      path = {route.path}
      render = {props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}


/**
 * Simulation de la gestion des login....
 */
export function GestionLogin() {
  return <div>Gestion des login</div>
}

/**
 * Simulation de la gestion des Clients....
 */
export function GestionCustomers() {
  return <div>Gestion des Clients</div>
}