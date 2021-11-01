import React, { Component } from 'react';
import gestionlocalstorage from '../services/gestionslocalstorage';
import CompFormContact from './compFormContacts';
import CompAjoutRechercheSuppressionContact from './compARSContact';


class CompGestionContact extends Component {

    constructor(props) {
        super(props);
        this.formContactElement = React.createRef();
        this.ARSContactElement = React.createRef();
    }

    componentDidMount() {
        if(gestionlocalstorage.getlogin() == null) {
            this.props.history.push('/login');
        } 
    }

    render() {
        return (
            <div>
                <CompAjoutRechercheSuppressionContact
                    ref = {this.ARSContactElement}
                    updateThisContact = {
                        (item) => this.formContactElement.current.settingUpForm(item, true)
                    }
                />
                <hr/>
                <CompFormContact 
                    ref = {this.formContactElement}
                    listAllContacts = {
                        () => this.ARSContactElement.current.listAll()
                    }
                />
            </div>
        );
    }
}

export default CompGestionContact;