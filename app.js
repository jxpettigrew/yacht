const rollDie = function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

let dice = {
    die1: 0,
    die2: 0,
    die3: 0,
    die4: 0,
    die5: 0,
}

const diceArray = [];
const categoryScores = [];

console.log(dice);
Object.keys(dice).forEach(key => {
    dice[key] = rollDie();
});

function addDice(dieToAdd) {
    return function () {
        if (!diceArray.includes(dieToAdd)) {
            diceArray.push(dieToAdd);
            this.classList.toggle('selected-dice');
        } else {
            diceArray.splice(diceArray.indexOf(dieToAdd), 1);
            this.classList.toggle('selected-dice');
        }
    }
}

function rerollDice(diceArray) {
    diceArray.forEach(key => {
        dice[key] = rollDie();
    })
    setDice();
    scoreDice(Object.values(dice));
}

function setDice() {
    document.querySelector('.area1').innerText = dice.die1;
    document.querySelector('.area2').innerText = dice.die2;
    document.querySelector('.area3').innerText = dice.die3;
    document.querySelector('.area4').innerText = dice.die4;
    document.querySelector('.area5').innerText = dice.die5;
}

function isCategorySelected(category) {
    return category.classList.contains('selected-categories');
}

function selectCategory() {
    return function () {
        this.classList.add('selected-categories');
        categoryScores.push(Number(this.textContent));
        console.log(categoryScores);
        document.querySelector('.scoring .total').textContent = categoryScores.reduce((acc, newVal) => acc + newVal);
        console.log(isCategorySelected(this));
        for (let section of this.parentElement.children) {
            if (!isCategorySelected(section)) {
                section.textContent = "";
            }
        }
    }
}

function setEventListeners() {
    for (i = 1; i < 13; i++) {
        document.querySelector('.scoring').children[i].addEventListener('click', selectCategory());
    }
}

function scoreDice(dice) {
    const scoring = document.querySelector('.scoring');
    const set = new Set(dice);
    const choice = document.querySelector('.scoring .choice');
    const fullHouse = document.querySelector('.scoring .full-house');
    const fourKind = document.querySelector('.scoring .four-of-a-kind');
    const smallStraight = document.querySelector('.scoring .small-straight');
    const largeStraight = document.querySelector('.scoring .large-straight');
    const yacht = document.querySelector('.scoring .yacht');

    for (i = 1; i < 7; i++) {
        let currentCategory = scoring.children[i];
        if (!isCategorySelected(currentCategory)) {
            currentCategory.textContent = dice.includes(i) ? dice.filter(die => die === i).length * i : '';
        }
    }
    choice.textContent = !isCategorySelected(choice) ? dice.reduce((acc, newVal) => acc + newVal) : choice.textContent;
    if (set.size === 2) {
        if (!isCategorySelected(fullHouse) && [2, 3].indexOf(dice.filter(x => x === dice[0]).length) > -1) {
            fullHouse.textContent = dice.reduce((acc, newVal) => acc + newVal);
        }
        if (!isCategorySelected(fourKind) && [1, 4].indexOf(dice.filter(x => x === dice[0]).length) > -1) {
            document.querySelector('.scoring .four-of-a-kind').textContent = dice.reduce((acc, newVal) => acc + newVal);
        }
    }
    if (set.size === 5 && !(dice.includes(1) && dice.includes(6))) {
        if (!isCategorySelected(smallStraight) && dice.includes(1)) {
            document.querySelector('.scoring .small-straight').textContent = 30;
        }
        if (!isCategorySelected(largeStraight) && dice.includes(6)) {
            document.querySelector('.scoring .large-straight').textContent = 30;
        }
    }
    if (!isCategorySelected(yacht) && set.size === 1) {
        document.querySelector('.scoring .yacht').textContent = 50;
    }
}

setDice();
setEventListeners();

Array.from(document.querySelector('.playing-area').children).forEach((area, i) => {
    area.addEventListener('click', addDice(Object.keys(dice)[i]));
})

/*{
    area.addEventListener('click', addDice(Object.keys(dice)[i]));
}*/

/*document.querySelector('.area1').addEventListener('click', addDice(Object.keys(dice)[0]));
document.querySelector('.area2').addEventListener('click', addDice(Object.keys(dice)[1]));
document.querySelector('.area3').addEventListener('click', addDice(Object.keys(dice)[2]));
document.querySelector('.area4').addEventListener('click', addDice(Object.keys(dice)[3]));
document.querySelector('.area5').addEventListener('click', addDice(Object.keys(dice)[4]));*/

document.querySelector('#roll').addEventListener('click', function () { rerollDice(diceArray) });

console.log(Object.values(dice));
scoreDice(Object.values(dice));

