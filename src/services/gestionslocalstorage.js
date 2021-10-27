/**
 * Gestion Métier de mon localstorage 
 * pour mon application 
 */

/**
 * Keylogin est la key chargée dans le localstorage de mon navigateur préféré :)
 */
const keylogin ='StorageUser';

export default class gestionlocalstorage {
    /**
     * Je récupére un objet de type Login et je stocke dans le localstorage
     */
    static setlogin(plogin) {
        localStorage.setItem(keylogin, plogin.userName);
    }

    /**
    * Récupération ou non de notre keylogin
    */
    static getlogin() {
        return (localStorage.getItem(keylogin) || null) ;
    }

    /**
     * Déconnexion de notre application
     */
    static logout() {
        localStorage.removeItem(keylogin);
    }

    /**
     * Clear de toutes mes données dans le localstorage
     */
    static clear() {
        localStorage.clear();
    }
}