import {View} from '/views/View.js';

class NewClientView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `  <input id="client-name" type="text" placeholder="Client Name"/>
                            <input id="job-name" type="text" placeholder="Job Name"/>
                            <input id="bid-ammount" type="text" placeholder="Bid Amount"/>
                            <input id="deadline" type="text" placeholder="Deadline"/>
                            <textarea id="description" placeholder="Description" rows="10"></textarea>
                            <custom-button id="add-client" variant="wide" icon="info" text="Add Client"></custom-button>
                            `
    
        document.getElementById('add-client').onclick = () => {
            var client_name = document.getElementById('client-name').value;
            var job_name = document.getElementById('job-name').value;
            var bid_ammount = document.getElementById('bid-ammount').value;
            var deadline = document.getElementById('deadline').value;
            var description = document.getElementById('description').value;

            
            if(client_name == '' || job_name == '' || bid_ammount == '' || deadline == '' || description == ''){
                console.error('no data supplied for client')
            }else{
                var date = new Date().getDate();
                var deadline_day = parseInt(date) + parseInt(deadline);

                if(Number(deadline_day) && Number(bid_ammount)){
                    window.API2.databases['clients'].insert({client_name: client_name, job_name: job_name, bid_ammount: bid_ammount, deadline: deadline_day, description: description}, (err, doc) => {
                        console.log(doc)
                        if(err){
                            console.error(err);
                        }else{
                            window.history.back();
                        }
                    })
                }else{
                    console.error("Bid ammount or Deadline arent numbers")
                }
            }

        }
        


        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('new-client-view', NewClientView);
export{NewClientView};