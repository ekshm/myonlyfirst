import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-77ff0-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, "movies");

const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const movieList = document.getElementById("movie-list");

buttonEl.addEventListener("click", function () {
    let inputValue = inputEl.value;
    push(moviesInDB, inputValue);
    alert(`${inputValue} added to database`);
    inputEl.value = "";
});

onValue(moviesInDB, function (snapshot) {
    movieList.innerHTML = ""; 
    
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const key = childSnapshot.key;

            const newEl = document.createElement("li");
            newEl.textContent = item;

            newEl.addEventListener('dblclick', function () {
                let locationInDB = ref(database, `movies/${key}`);
                remove(locationInDB);

                alert(`${item} removed from database`);
            });

            movieList.appendChild(newEl);
        });
    } else {
        movieList.innerHTML = "no movies ..... yet"
    }
});
