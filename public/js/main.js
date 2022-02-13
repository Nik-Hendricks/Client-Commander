import Dispatcher from '/js/dispatcher.js';
import API2 from '/js/API2.js'
import ViewManager from '/js/viewManager.js';
import '/js/nedb.js';

//import all components
import {MenuBarBottom} from '/components/MenuBarBottom.js';
import {MenuBarTop} from '/components/MenuBarTop.js';
import {MainContent} from '/components/MainContent.js';
import {LoadingSpinner} from '/components/loadingSpinner.js';
import {SideScroller} from '/components/sidescroller.js';
import {Card} from '/components/Card.js';
import {WideButton} from '/components/widebutton.js';
import {IconButton} from '/components/iconbutton.js';
import {GridContainer} from '/components/GridContainer.js';
import {ImageSlider} from '/components/ImageSlider.js';
import {ListItem} from '/components/ListItem.js';
import {PostCard} from '/components/PostCard.js';
import {ContextMenu} from '/components/ContextMenu.js';
import {CodeFormat} from '/components/CodeFormat.js';
import{ColorPicker} from '/components/ColorPicker.js';
import {MusicPlayer} from '/components/MusicPlayer.js';
import {SliderInput} from '/components/SliderInput.js';
import {SQLEditor} from '/components/SQLEditor.js';
import {CustomButton} from '/components/CustomButton.js'
import {Calculator} from '/components/Calculator.js';
import {Calendar} from '/components/Calendar.js';
//import all views
import {DashboardView} from '/views/DashboardView.js';
import {ClientsView} from '/views/ClientsView.js';
import {NewClientView} from '/views/NewClientView.js';


window.onload = () => {
    register_service_worker();
    register_views();
    window.API2.new_db('clients');
    window.API2.new_db('calendar_data');



 

    window.DP.on("VIEW_LOAD", () => {
        window.loadingSpinner.hide();
        
    })
    
    window.DP.on('API_LOAD', () => {
        window.VM.get_view_from_url();
        window.loadingSpinner.hide();
        if(getMobileOperatingSystem() == "iOS"){
            if(window.navigator.standalone == true){
                document.body.style.paddingTop = "40px";
                console.log(document.getElementsByTagName("menu-bar-top")[0])
                document.getElementsByTagName("main-content")[0].style.top = "100px"

                var inputs = document.getElementsByTagName('input');
                for(var key in inputs){
                    if(inputs[key].type == 'text'){
                        input[key].touchstart = (e) => {
                              // Bail if there's too little vertical space and scrolling is necessary
                            if ((e.target.offsetTop + e.target.offsetHeight) / window.innerHeight > MAX_KEYBOARD_PROPORTION) return
                            const MAX_KEYBOARD_PROPORTION = .52
                            var offset = document.body.scrollTop;
                            document.body.style.top = (offset * -1) + 'px';
                            document.body.classList.add('prevent-ios-focus-scrolling');
                            setTimeout(() => {
                              // Undo it after 500ms, roughly the amount of time focus animation takes iOS
                              offset = parseInt(document.body.style.top, 10);
                              document.body.classList.remove('prevent-ios-focus-scrolling');
                              document.body.scrollTop = (offset * -1);
                            }, 500)
                        }
                    }
                }
                

            }
        }
    })

    window.DP.on('NO_AUTH', () => {

    })   


}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function register_service_worker(){
    console.log('service worker registration')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}



function register_views(){
    var theme_primary_color = '';
    var theme_secondary_color = '';

    var routes = {
        "":{
            title: "Dashboard",
            view: `<dashboard-view></dashboard-view>`
        },
        "Dashboard":{
            title: "Dashboard",
            view: `<dashboard-view></dashboard-view>`
        },
        "Clients":{
            title: "Clients",
            view: `<clients-view></clients-view>`,
            subViews:{
                "New":{
                    title:"New Client",
                    view: `<new-client-view></new-client-view>`
                }
            }
        }

    }
    
    window.VM.register(routes)

    
}


