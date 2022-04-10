
function vypisOtazku(txt) {
    document.querySelector('#otazka h2').innerText = txt + '\n';
}

function vypisOdpovedi(txt, i) {
    document.querySelector('#odpovedi').children[i].innerText = txt + '\n';
}

function zobrazObrazek(txt){
    document.querySelector("#obrazek").src = txt;
}

function prepniPoradi(nbr){
    document.querySelector('#poradi h2').innerText = "Otázka " + nbr + " z 3";
}

let otazky = [
    {
        otazka: "Jaká je má nejoblíbenější barva?",
        obrazek:  "img/ovoce.jpg",
        odpovedi: ["modrá", "zelená", "červená"],
        index: 2
    },
    {
        otazka: "Jaká je mé nejoblíbenější jídlo?",
        obrazek:  "img/pivo.jpg",
        odpovedi: ["sýrová pizza", "losos na másle", "špagety s kečupem"],
        index: 2
    },
    {
        otazka: "Jaká je má nejoblíbenější značka auta?",
        obrazek:  "img/snehurka.jpg",
        odpovedi: ["BMW", "Volvo", "Tesla"],
        index: 1
    }
];



function prvniFunkce(index) {
    vypisOtazku(otazky[index].otazka);

    otazky[index].odpovedi.forEach((element, index) => {
        vypisOdpovedi(element, index);
    });
    zobrazObrazek(otazky[index].obrazek);

    prepniPoradi(index+1);
}

function pridejClickEvent() {
    let vysledek = [];
    let poradi = 0;
    let items = document.querySelectorAll('li');
    items.forEach(item => {
        item.addEventListener("click", (event) => {
            
            vysledek.push(event.target.getAttribute("data-odpoved"));
            
            poradi++;
            if(poradi < 3){
                prvniFunkce(poradi);
            } else if(poradi === 3) {
                document.getElementById('poradi').style.display = 'none';
                document.getElementById('otazka').style.display = 'none';
                document.getElementById('obsah').style.display = 'none';
                document.getElementById('vysledek').style.display = 'block';
                
                vyhodnot(vysledek);
            }
        });
    });
}

function vyhodnot(vysledek) {
    let pocet = 0;
    otazky.forEach((item, index) => {
        let otazka = document.createElement('h3');
        let odpoved = document.createElement('p');
        let spravne = document.createElement('p');
        otazka.innerText = item.otazka;
        odpoved.innerText = "Tvoje odpověď: " + item.odpovedi[vysledek[index]];
        
        if(item.odpovedi[vysledek[index]] === item.odpovedi[item.index]) {
            spravne.innerText = "To je správně!";
            pocet++;
        } else {
            spravne.innerText = "Správná odpověď: " + item.odpovedi[item.index];
        }

        document.getElementById('telo').appendChild(otazka);
        document.getElementById('telo').appendChild(odpoved);
        document.getElementById('telo').appendChild(spravne);

        document.querySelector('#vyhodnoceni h2').innerText = "Správně " + pocet + " ze 3 otázek. Úspěšnost " + Math.round(((pocet/3)*100)*100)/100 + "%";
    });
}

pridejClickEvent();



