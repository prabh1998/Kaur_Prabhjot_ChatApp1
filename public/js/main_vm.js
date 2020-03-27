// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

// the packet is whatever data we send through with the connect event
// from the server
// this is data destructuring, Go look it up on 
function setUserId({sID}) {
    // debugger;
    vm.socketID = sID;
};

function showDisconnectMessage() {
    console.log('a user disconnected');

};

function appendMessage(message) {
    vm.messages.push(message);
};

function appendCandidate(Candidate){
    vm.Candidates.push(Candidate);

}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname:"",

        Candidates: [],
        messages: []
    },

    methods: {
        //emit a message event to the server so  that it
        // can in turn send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // the double pipe || is an "or" opperator
            //if the first value is set, use it.

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })
            this.message = "";

        },

        addNewCandidate(){
            console.log('somebody joined');

            socket.emit('CandidateJoined', {
                Candidate: this.nickname
            })
        }
    },
    mounted: function() {
        console.log('Vue is done mounting');

    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app")

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('newCandidate', appendCandidate);

//login function
const loginPage     = document.querySelector('.Screen'),
      loginForm     = document.querySelector('.Form'),
      nicknameInput = document.querySelector('#nickname'),
      loginButton   = document.querySelector('.sent');

      loginButton.addEventListener('click', function(){
        if(nicknameInput.value === ''){
            alert("You need to input a Username")
        }else{
            console.log('New player has joined');
            loginPage.classList.add('hide');
            alert('Welcome, ' + nicknameInput.value);
        }
      });


//player activity bar
const CandidateBut = document.querySelector('.CandidateClick'),
      CandidateNav = document.querySelector('.CandidateList');

      CandidateBut.addEventListener('click', function(){
          console.log('Candidate nav toggled');
          CandidateNav.classList.toggle('showNav');
      })