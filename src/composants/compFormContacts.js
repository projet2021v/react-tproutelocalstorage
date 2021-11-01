import React, { Component } from 'react';
import Contact from '../classes/contact';
import { CONTACT_FORM_ATTRIBUTES } from '../config/contactFormAttributes';
import CrudContact from '../services/CrudContact';

class CompFormContact extends Component {

    constructor(props) {
        super(props);
        this.service = new CrudContact();
        this.state = {
            contact : new Contact(),
            isUpdatingForm : false,
        }
    }

    createForm() {
        let config = CONTACT_FORM_ATTRIBUTES;

        return config.map(element => 
            <div key={element.name}>
                <label htmlFor={element.name}>{element.label}</label>
                <input  
                    type={element.type}
                    id={element.name}
                    name={element.name}
                    onChange={this.onChange}
                    value={this.state.contact[element.name]} 
                />
                <br/>
            </div>
        )
    }

    onChange = (e) => {
        this.state.contact[e.target.name] = e.target.value;
        this.setState({contact : this.state.contact});
    }

    settingUpForm(contactToUpdate, isUpdating) {
        this.setState({contact : contactToUpdate});
        this.setState({isUpdatingForm : isUpdating});
        this.createForm();
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if(!this.state.isUpdatingForm) {
            this.service.add(this.state.contact).then(() => this.props.listAllContacts());
        } else {
            this.service.update(this.state.contact).then(() => this.props.listAllContacts());
        }
        this.settingUpForm(new Contact(), false);
    }
    
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {this.createForm()}
                    {
                        !this.state.isUpdatingForm &&
                        <button type="submit">Ajouter un contact</button>
                    }
                    {
                        this.state.isUpdatingForm &&
                        <button type="submit">Modifier le contact</button>
                    }
                    
                </form>
            </div>
        );
    }
}

export default CompFormContact;