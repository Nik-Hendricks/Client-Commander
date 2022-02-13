import {View} from '/views/View.js';

class DashboardView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<custom-calendar></custom-calendar>`
        var calendar = this.getElementsByTagName('custom-calendar')[0]
        console.log(calendar)


        var data = {
            'feb':{
                '9':{
                    color:'#B53471'
                }
            }
        }
        var important_dates = [{
            'feb':{
                '4':{
                    color: '#0984e3',
                    type:'reminder',
                    text:'test reminder',
                },
                '14':{
                    color: '#e84393',
                    type: 'reminder',
                    text: 'valentine',
                }
            },
            'mar':{
                '16':{
                    color: '#00b894',
                },
                '8':{
                    color: '#6c5ce7'
                }
            }
        }]

        //calendar.important_dates = important_dates;
        window.API2.databases['clients'].find({}, (err, docs) => {
            var highlight_data = {}
            for(var key in docs){
                console.log(key)
                calendar.highlight_day(docs[key].deadline, 'blue', 'feb')
               // Object.assign(highlight_data ,{`${docs[key].deadline}`: {color: 'blue'}});
                
            }
            console.log(highlight_data)
        })


        calendar.highlight_dates(data, 'feb')


        window.DP.dispatch("VIEW_LOAD")
    }
}

window.customElements.define('dashboard-view', DashboardView);
export{DashboardView};