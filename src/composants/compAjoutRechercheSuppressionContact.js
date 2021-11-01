import React, { Component } from 'react';
import Contact from '../classes/contact';
import CrudContact from '../services/CrudContact';

class CompAjoutRechercheSuppressionContact extends Component {

    constructor(props) {
        super(props);
        this.service = new CrudContact()
        this.idContactInput = React.createRef();
        this.state = {
            listeContacts : [],
            isToBeDisplayed : false,
            searchedContact : undefined,
            isContactFound : false
        }
    }

    listAll = () => {
        this.service.selectAll(
            (data) => this.setState({listeContacts : data})
        );
    }

    toggleDisplayContacts = () => {
        this.setState({isToBeDisplayed : !this.state.isToBeDisplayed});
        this.listAll();
    }

    searchOneContact = () => {
        this.setState({isContactFound : false, searchedContact : undefined})
        
        let contact = new Contact();
        contact.id = this.idContactInput.current.value;
        this.idContactInput.current.value = "";
        
        contact = this.service.selectOne(
            contact,
            (data) => {
                this.setState({searchedContact : data});
                if(!(data instanceof Array)) this.setState({isContactFound : true});
            },
            (error) => console.log(error)
        );
    }

    updateThisContact = (item) => {
        console.log(item);
        this.props.updateThisContact(item);
    }

    deleteThisContact = (item) => {
        this.service
        .delete(item)
        .then(() => this.listAll());
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.toggleDisplayContacts}>Afficher/Masquer les contacts</button><br/>
                    {
                        this.state.isToBeDisplayed &&
                        <ul>
                            {this.state.listeContacts.map(item => 
                                <li key={item.id} >
                                    {item.lastName} {item.firstName} 
                                    <span onClick={() => this.deleteThisContact(item)}><small> / supprimer le contact {item.id}</small></span>
                                    <span onClick={() => this.updateThisContact(item)}><small> / modifier le contact {item.id}</small></span>
                                </li>    
                            )}
                        </ul>
                    }
                </div>

                <hr/>
                
                <div>
                    <h3>Faire une recherche de contact par id</h3>
                    <input type="text" required ref={this.idContactInput} />
                    <button onClick={this.searchOneContact}>Rechercher par id</button><br/>
                    {
                        this.state.isContactFound &&
                        <div>
                            Last name : <strong>{this.state.searchedContact.lastName}</strong><br/>
                            First name : <strong>{this.state.searchedContact.firstName}</strong><br/>
                            Address : <strong>{this.state.searchedContact.address}</strong><br/>
                            City : <strong>{this.state.searchedContact.city}</strong><br/>
                            ZIP code : <strong>{this.state.searchedContact.zip}</strong><br/>
                        </div>
                    }
                </div>

                
            </div>
        );
    }
}

export default CompAjoutRechercheSuppressionContact;