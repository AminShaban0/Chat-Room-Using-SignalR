
document.addEventListener("DOMContentLoaded", function () {
    var userName = prompt("Please Enter Your Name");
    var groupNameInp = document.getElementById("txtJoinGrup");
    var txtMessageElToGroup = document.getElementById("txtMessageGroup");

   //messageInp.focus();

    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    proxyConnection.start().then(function () {
        document.getElementById("btnSend").addEventListener("click", function (e) {
            e.preventDefault();
            var txtMessageEl = document.getElementById("txtMessage");
            const msg = txtMessageEl.value;
            if (msg) {
                
                proxyConnection.invoke("Send", userName, txtMessageEl.value);
                txtMessageEl.value = "";
            }
            
        });

        document.getElementById("btnjoin").addEventListener("click", function (e) {
            e.preventDefault();
            
            const msg = groupNameInp.value;
            proxyConnection.invoke("JoinTOGroup", groupNameInp.value, userName);
            //if (msg) {

            //    groupNameInp.value = "";
            //}

        });

        document.getElementById("btnSendGroup").addEventListener("click", function (e) {
            e.preventDefault();
            const msg = txtMessageElToGroup.value;
            if (msg) {

            proxyConnection.invoke("SendToGroup", groupNameInp.value, userName, txtMessageElToGroup.value);
                txtMessageElToGroup.value = "";
            }

        });
    }).catch(function (error) {
        console.log(error);
    });

    proxyConnection.on("ResivieMessage", function (username, message) {
        
        const messagesectionE1 = document.getElementById('messageSection');
        const msgBoxE1 = document.createElement("div");
        msgBoxE1.classList.add("msg-box");
        msgBoxE1.innerHTML = `<strong>${username}</strong> : ${ message}`;
        messagesectionE1.appendChild(msgBoxE1);

    });
    proxyConnection.on("newMemberJoin", function (username, groupname) {
        const messagesectionE1 = document.getElementById('messageSectionGroup');
        const msgBoxE1 = document.createElement("div");
        msgBoxE1.classList.add("msg-box");
        msgBoxE1.innerHTML = `<strong>${username}</strong> Has Joined ${groupname}`;
        messagesectionE1.appendChild(msgBoxE1);

    });
    proxyConnection.on("ReceiveMessageGroup", function (sender, message) {
        const messagesectionE1 = document.getElementById('messageSectionGroup');
        const msgBoxE1 = document.createElement("div");
        msgBoxE1.classList.add("msg-box");
        msgBoxE1.innerHTML = `<strong>${sender}</strong> : ${message}`;
        messagesectionE1.appendChild(msgBoxE1);

    });

});