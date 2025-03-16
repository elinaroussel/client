let url = 'https://59618aaa-67a4-4fcc-86ec-90a68119c752-00-9sz0b4t0uvbm.picard.replit.dev';

function update(messages) {
   const messageList = document.querySelector("ul");
   messageList.innerHTML = "";
   messages.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = '<em>' + item.date + '</em> ' + '<strong>' + item.pseudo + '</strong> : ' + item.msg;
      messageList.appendChild(li);
   });
}

function fetchMessages() {
   fetch(url + '/msg/getAll')
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
         console.log(data);
         update(data)
      })
}

function changeTheme() {
   document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", fetchMessages());

document.getElementById("update-button").addEventListener("click", () => {
   fetchMessages();
});

document.getElementById("post-button").addEventListener("click", function() {
   let pseudo = document.querySelector(".pseudo").value.trim();
   let msg = document.querySelector(".msg").value.trim();

   if (!pseudo || !msg) {
      alert("Veuillez entrer un pseudo et un message.");
      return;
   }

   fetch(url + `/msg/post?msg=${msg}&pseudo=${pseudo}`)
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
         update(data)
         document.querySelector(".pseudo").value = "";
         document.querySelector(".msg").value = "";
      })
});

document.getElementById("theme-button").addEventListener("click", changeTheme);