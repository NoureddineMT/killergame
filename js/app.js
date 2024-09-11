let history = document.getElementById("history")

class Tueur {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;

    }
    attack(adver) {
        let randomProbaDeath = Math.random();
        let randomProbaDammage = Math.random();
        let randomDeathWithDammage = Math.random();
        let survivorIndex = Math.floor(Math.random() * survivor.length);
    
        if (randomProbaDeath < adver[survivorIndex].probaDeath) {
            history.innerHTML += "<p>Jason killed " + adver[survivorIndex].nameHero + ". Remaining heroes: " + (adver.length - 1) + "</p>";
            document.getElementById(`${adver[survivorIndex].nameHero}`).classList.add("bg-danger");
            adver.splice(survivorIndex, 1);
        } else if (randomProbaDammage < adver[survivorIndex].probaDammage) {
            let damage = 10;
            this.hp -= damage;
            history.innerHTML += "<p>" + adver[survivorIndex].nameHero + " dodged and inflicted 10 damage points to Jason</p>";
            document.getElementById(`${adver[survivorIndex].nameHero}`).classList.add("bg-success");
        } else if (randomDeathWithDammage < adver[survivorIndex].probaDeathWithDammage) {
            let damage = 15;
            this.hp -= damage;
            document.getElementById(`${adver[survivorIndex].nameHero}`).classList.add("bg-warning");
            history.innerHTML += "<p>" + adver[survivorIndex].nameHero + " died while inflicting 15 damage to Jason</p>";
            adver.splice(survivorIndex, 1);
        }
    }
    }

class Stats {

    constructor(name, probaDammage, probaDeath, probaDeathWithDammage, img) {
        this.name = name;
        this.probaDammage = probaDammage;
        this.probaDeath = probaDeath;
        this.probaDeathWithDammage = probaDeathWithDammage;
        this.img = img;
    }
}

let clichés1 = new Stats("blonde", 0.3, 0.7, 0.5, "img/blonde.jpeg");
let clichés2 = new Stats("nerd", 0.3, 0.6, 0.4, "img/nerd.jpeg");
let clichés3 = new Stats("sportif", 0.9, 0.4, 0.9, "img/sportif.jpeg");
let clichés4 = new Stats("casual", 0.5, 0.5, 0.5, "img/casual.jpg");
let clichés5 = new Stats("militaire", 0.9, 0.2, 0.8, "img/militaire.jpeg");
let clichés6 = new Stats("kamikaze", 0.1, 1, 1, "img/kamikaze.jpg");
let clichés7 = new Stats("heros", 0.7, 0.2, 0.95, "img/heros.jpeg");
let clichés8 = new Stats("banquier", 0.3, 0.2, 0.1, "img/banquier.jpeg");
let clichés9 = new Stats("vioc", 0.1, 0.95, 0.05, "img/vioc.jpeg");
let clichés10 = new Stats("prisonnier", 0.5, 0.6, 0.5, "img/prisonnier.jpeg");

let listClichés = [clichés1, clichés2, clichés3, clichés4, clichés5, clichés6, clichés7, clichés8, clichés9, clichés10];



let persos = ["Fabrice", "Sarah", "Jimmy", "Max", "Boris", "Morgan", "JD", "Carla", "Bob", "Christopher", "Meryem"];
let survivor = [];

for (let i = 0; i < 5; i++) {
    let persosIndex = Math.floor(Math.random() * persos.length);
    let clichesIndex = Math.floor(Math.random() * listClichés.length);
    let personnage = listClichés[clichesIndex];

    personnage.nameHero = persos[persosIndex];
    survivor.push(personnage);
    persos.splice(persosIndex, 1);

    listClichés.splice(clichesIndex, 1);

    document.getElementById("survivorRow").innerHTML += `
    <div class="col-4 pt-3">
        <div id="${personnage.nameHero}" class="card" style="width: 20rem;">
            <img src="${personnage.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title text-center">${personnage.nameHero}</h5>
                <h6 class="card-title text-center">${personnage.name}</h6>
            </div>
        </div>
    </div>
    `
}

const jason = new Tueur("Jason", 100);

let jasonWins = 0; // Vittorie di Jason
let alliesWins = 0; // Vittorie degli alleati

function updateScore() {
    document.getElementById("jasonWins").innerText = jasonWins;
    document.getElementById("alliesWins").innerText = alliesWins;
}

// Text for history updates and other messages
function startGame() {
    while (true) {
        if (jason.hp > 0 && survivor.length > 0) {
            jason.attack(survivor);
        } else if (jason.hp <= 0) {
            document.getElementById('jason').classList.add("bg-danger");
            history.innerHTML += "<p>Finally " + jason.name + " is dead</p>";
            alliesWins++; // Allies won
            updateScore(); // Update the score
            document.getElementById("restartGame").style.display = "block"; // Show the restart button
            document.getElementById("startGame").style.display = "none"; // Hide the start button

            break;
        } else {
            document.getElementById('jason').classList.add("bg-success");
            history.innerHTML += "<p>" + jason.name + " has won!!</p>";
            jasonWins++; // Jason won
            updateScore(); // Update the score
            document.getElementById("restartGame").style.display = "block"; // Show the restart button
            document.getElementById("startGame").style.display = "none"; // Hide the start button
            break;
        }
    }
}

document.getElementById("startGame").addEventListener("click", function() {
    startGame();
});

// Text for resetting the game
function resetGame() {
    jason.hp = 100;
    survivor = [];

    persos = ["Fabrice", "Sarah", "Jimmy", "Max", "Boris", "Morgan", "JD", "Carla", "Bob", "Christopher", "Meryem"];
    listClichés = [clichés1, clichés2, clichés3, clichés4, clichés5, clichés6, clichés7, clichés8, clichés9, clichés10];
    document.getElementById("survivorRow").innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let persosIndex = Math.floor(Math.random() * persos.length);
        let clichesIndex = Math.floor(Math.random() * listClichés.length);
        let personnage = listClichés[clichesIndex];

        personnage.nameHero = persos[persosIndex];
        survivor.push(personnage);
        persos.splice(persosIndex, 1);
        listClichés.splice(clichesIndex, 1);

        document.getElementById("survivorRow").innerHTML += `
        <div class="col-4 pt-3">
            <div id="${personnage.nameHero}" class="card" style="width: 20rem;">
                <img src="${personnage.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-center">${personnage.nameHero}</h5>
                    <h6 class="card-title text-center">${personnage.name}</h6>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById("history").innerHTML = ""; // Clear history
    document.getElementById("restartGame").style.display = "none"; // Hide the restart button
    document.getElementById("startGame").style.display = "block"; // Hide the start button
}

document.getElementById("restartGame").addEventListener("click", function() {
    resetGame();
});
