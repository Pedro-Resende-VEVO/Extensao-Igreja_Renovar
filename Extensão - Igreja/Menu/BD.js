// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQJ_A4u0xRQYeA7pqqyvtl-B2-IDgdyfw",
    authDomain: "sesas-show-8d41d.firebaseapp.com",
    projectId: "sesas-show-8d41d",
    storageBucket: "sesas-show-8d41d.appspot.com",
    messagingSenderId: "353150490394",
    appId: "1:353150490394:web:f2ae1a6c22a9259e5bfea3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()


function contGet() {
    var user_ref = database.ref('contagem')
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()

        let val = data.valor
        sessionStorage.setItem('chave', val);
    })
}

$(window).on("load", function () {
    setTimeout(() => { getPost() }, 0);
    setTimeout(() => { getPost() }, 1000);
});

function getPost() {
    contGet()
    let val = sessionStorage.getItem('chave');
    let valInt = parseInt(val)
    var strHtml = "";
    var postagens = document.getElementById('postagens');
    let valStr = "";
    var user_ref;
    var data;
    //Ver se problema é declarar dentro do for
    
    //alert('oi')

    for (let i = 1; i <= valInt; i++) {
        valStr = i.toString();
        user_ref = database.ref('postagens/' + valStr)
        user_ref.on('value', function (snapshot) {
            data = snapshot.val()

            strHtml += `<div class="expandable-box">
            <h2 style="text-align: center;">Publicação ${i}</h2>
            <hr>
            <img src="${data.img}">
            <p id="desc">${data.text}</p>
            </div>`

        })
    }

    postagens.innerHTML = strHtml;
}


