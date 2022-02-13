import {View} from '/views/View.js';

class ClientsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<custom-button variant="wide" icon="add" text="New Client" onclick="window.history.pushState('','','/Clients/New')"></custom-button>`



        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('clients-view', ClientsView);
export{ClientsView};