import React, { Component } from 'react';
import Login from '../classes/login';
import CrudLogin from '../services/CrudLogin';
import gestionlocalstorage from '../services/gestionslocalstorage';

class compGestionLogin extends Component {
    
    state = {
        liste : [],
        searchedLogin : undefined,
        isLoginFound : false
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

    searchOneLogin = () => {
        this.setState({searchedLogin : undefined, isLoginFound : false});
        let login = new Login();
        login.id = this.idLoginInput.current.value;
        this.idLoginInput.current.value = "";
        this.service.selectOne(
            login, 
            (data) => {
                this.setState({searchedLogin : data});
                if(!(data instanceof Array)) this.setState({isLoginFound : true});
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
                <button onClick={this.searchOneLogin}>Rechercher</button><br/>
                {
                    this.state.isLoginFound &&
                    <div>
                        Login : <strong>{this.state.searchedLogin.userName}</strong><br/>
                        Password : <strong>{this.state.searchedLogin.userMDP}</strong>
                    </div>
                }
            </div>
        );
    }
}

export default compGestionLogin;