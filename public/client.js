let userName;
do{
    userName = prompt("Enter user Name")
}while(!userName)

let textArea = document.querySelector("#textarea");
let mesageArea = document.querySelector(".message-area");
const socket = io();
let today = new Date();
let hours = today.getHours();
var ampm = hours >= 12 ? 'pm' : 'am';
let greet = document.createElement("h3");

if(ampm === "pm"){
    greet.innerText = " Good Evening" + " " + userName;
}
else{
    greet.innerText = " Good Mornning " + " " +  userName;
}
greet.classList.add("grey");
mesageArea.appendChild(greet)


socket.emit('newUser',userName);
socket.on("newUser",function(userName){

    
    let info = document.createElement("h3");
    info.classList.add("style")
    info.innerText = userName + " Joined The Chat...";
    mesageArea.appendChild(info)
    scrollTop()
})
textArea.addEventListener("keyup",function(e){

   
    if(e.key === "Enter"){
        for(let i=0; i < e.target.value.length; i++)
        {
            if(e.target.value.charCodeAt(i) !=10 && e.target.value.charCodeAt(i) !=32 ){
                sendMessage(e.target.value)
                break;
            }

        }
       
        
    }
})

function sendMessage(userMsg){

    let message = {

        name : userName,
        msg: userMsg.trim()
    }
    

    //Append Msg

    appendMsg("outgoing",message)
    scrollTop()

    textArea.value = ""

    // send to server
    socket.emit('sendMessage',message);
}

function appendMsg(type,message){

    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className,"message")
    let markup = `
                   <h4>${message.name}</h4>
                   <p>${message.msg}</p>
           
                `
    mainDiv.innerHTML = markup;
    mesageArea.appendChild(mainDiv);

}

//Recevice the msg

socket.on("sendMessage",function(msg){

    appendMsg("incoming",msg)
    scrollTop()
})

function scrollTop(){
     mesageArea.scrollTop = mesageArea.scrollHeight;
}


