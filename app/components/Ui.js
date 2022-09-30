//FUNCTIONS FOR UI
var Ui = new function() {

    //init
    this.init = function(){

        this.addEvents();

    }

    //setusername
    this.addEvents = function(){

        document.getElementById("connectButton").addEventListener('click',function(){
            var username = document.getElementById("usernameInput").value;
            if(username == ""){
                document.getElementById("errorMessage").innerHTML = "Empty username";
            }else{
                Game.username = username;
                Server.init();
            }

        });

    }
    
}    