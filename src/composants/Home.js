import React, { Component } from 'react';
import gestionlocalstorage from '../services/gestionslocalstorage';

class Home extends Component {

   
    componentDidMount() {
        /**
         * Contrôle pour accéder ou non composant.
         */
        if(gestionlocalstorage.getlogin() == null)
        {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                {/* Affiche le nom de l'utilsiateur*/}
                Home : {gestionlocalstorage.getlogin()}
            </div>
        );
    }
}

export default Home;
