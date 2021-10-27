import React, { Component } from 'react';
import Login from '../classes/login';
import CrudLogin from '../services/CrudLogin';
import gestionlocalstorage from '../services/gestionslocalstorage';

class compGestionLogin extends Component {
    
    state = {
        liste : [],
        searchedLogin : undefined
    }

    constructor(props) {
        super(props);
        this.service = new CrudLogin();
        this.idLoginInput = React.createRef();
    }

    componentDidMount() {
        if(gestionlocalstorage.getlogin() == null)
        {
            this.props.history.push('/login');
        }
        this.listAll();
    }

    listAll = () => {
        this.service.selectAll(
            (data) => this.setState({liste : data})
        );
    }

    searchOne = () => {
        this.setState({searchedLogin : undefined});
        let login = new Login();
        login.id = this.idLoginInput.current.value;
        this.idLoginInput.current.value = "";
        this.service.selectOne(
            login, 
            (data) => {
                this.setState({searchedLogin : data});
            },
            (error) => console.log(error)
        );
    }

    deleteThisLogin(id) {
        let login = new Login();
        login.id = id;
        this.service
            .delete(login)
            .then(() => this.listAll())
            .catch(error => console.log(error));
    }
    
    render() {
        return (
            <div>
                <button onClick={this.listAll}>Mettre à jour</button>
                <ul>
                    {this.state.liste.map(item => <li key={item.id} onClick={() => this.deleteThisLogin(item.id)}>{item.userName}</li>)}
                </ul>
                <hr/>
                <h3>Faire une recherche par id</h3>
                <input type="text" required="required" ref={this.idLoginInput}/>
                <button onClick={this.searchOne}>Rechercher</button><br/>
                {
                    this.state.searchedLogin  &&
                    <h4>{this.state.searchedLogin.userName} {this.state.searchedLogin.userMDP}</h4>
                }
            </div>
        );
    }
}

export default compGestionLogin;