const tileDisplay = document.querySelector(".tiles");
const keyboard = document.querySelector(".keyboard");
const messageDisplay = document.querySelector(".message");

let wordle = 'SUPER';
const keys =[
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

let currentRow = 0;
let currentTile = 0;

let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) =>{
    const row = document.createElement('div');
    row.setAttribute('id', 'guessRow-' + guessRowIndex );
    guessRow.forEach((guess, guessIndex) =>{
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', 'guessRow-'+guessRowIndex+'-tile-'+ guessIndex);
        row.append(tile);
    });
    tileDisplay.append(row);
});




keys.forEach(key => {
   const button = document.createElement('button');
   button.textContent = key;
   button.setAttribute('id', key);
   button.addEventListener('click', () => handleClick(key));
   keyboard.append(button);
});

handleClick = (letter) =>{
    console.log("clicked", letter);
    if(letter === '«'){
        deleteLetter();
        return
    }
    if(letter === 'ENTER'){
        checkRow();
        
        return
    }
    addLetter(letter);
};

const addLetter = (letter) =>{
    if(currentTile < 5 && currentRow <6 ){
        const tileBlock = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tileBlock.textContent = letter;
        tileBlock.setAttribute('data', letter);
        guessRows[currentRow][currentTile] = letter;
        currentTile++;
    }
}

const deleteLetter = () =>{
    if(currentTile > 0){
        currentTile--; //we need to update the tile now.
        const tileBlock = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tileBlock.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tileBlock.setAttribute('data', '');
    }
}

const checkRow = () =>{
    const guess = guessRows[currentRow].join('');
    flipTile();
    
    if(currentTile > 4 && wordle === guess){
    showMsg('Magnificent!');
    isGameOver = true;
    return
    }
    else if(currentRow >= 5){
        isGameOver = true;
            showMsg('Game Over');
            return   
        }
    if(currentRow < 5){
        currentRow++;
        currentTile = 0;
    }
}

const showMsg = (msg)=>{
   const messageBlock = document.createElement('p');
   messageBlock.textContent = msg;
    messageDisplay.append(messageBlock);
    setTimeout(()=> messageDisplay.removeChild(messageBlock), 2000);
}

const addColor =(letter, color) => {
    const key = document.getElementById(letter);
    key.style.backgroundColor = color;
};

const flipTile = ()=>{
    const rowTiles = document.querySelector("#guessRow-"+ currentRow).childNodes;

    //"#246824","#83830c",#a09c9c

    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: '#29292b'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = '#246824';
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = '#83830c';
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.style.backgroundColor = guess[index].color;
            addColor(guess[index].letter, guess[index].color)
        }, 500* index);
    })
}