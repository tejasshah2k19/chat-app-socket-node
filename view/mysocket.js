let socket = io();//client 
let currentUserId = 1;
function newuser() {
    let userId = parseInt((Math.random() * 100000));
    currentUserId = userId;
    socket.emit("new user", userId)
    let currentuser = document.getElementById("currentuser")
    currentuser.innerHTML = `${userId}`
}

function setUser(userId) {
    let activeuser = document.getElementById("activeuser")
    activeuser.innerHTML += `<span>${userId}</span><br>`
}

function sendMessage() {
    let message = document.getElementById("message")
    let recvId = document.getElementById("sender")
    socket.emit("message", { "userId": currentUserId, "data": message.value,"recvId":recvId.value })
    message.value = ""
}


newuser()


//socket 
socket.on("new user", function (users) {
    console.log("client side => ");
    console.log(users);
    let activeuser = document.getElementById("activeuser")
    activeuser.innerHTML = ""
    let sender = document.getElementById("sender")
    var length = sender.options.length;
    for (i = length - 1; i >= 0; i--) {
        sender.options[i] = null;
    }



    for (let i = 0; i < users.length; i++) {
        setUser(users[i])

        if (currentUserId != users[i]) {
            var option = document.createElement("option");
            option.text = users[i];
            option.value = users[i];
            sender.add(option)
        }

    }
    var option = document.createElement("option");
            option.text = "all";
            option.value = "all";
            sender.add(option)
        

    // console.log(users[0]);
})

socket.on("user disconnect", function (users) {
    let activeuser = document.getElementById("activeuser")
    activeuser.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        setUser(users[i])
    }
})

socket.on("message", function (data) {

    // if (data.userId == currentUserId) {

    // } else {
    let chat = document.getElementById("chat");
    chat.innerHTML += `<br>${data.userId}:${data.data}`
    // console.log(data);
    //}
})