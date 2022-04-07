// jogador X = 1
// jogador O = 2

const button_item = document.querySelectorAll('.js_button_item'), 
      current_player = document.getElementById('js_current_player'),
      button_restart = document.getElementById('js_button_restart');

if (button_item.length > 0 && current_player != null && button_restart != null) {
    let player_turn = 1, game = [0,0,0,0,0,0,0,0,0], count = 0;
    const arrIndexs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    current_player.innerText = 'Jogador X';
    const changePlayerTurn = (item, index) => {
        game[index - 1] = player_turn;
        if (player_turn == 1) {
            player_turn = 2;
            current_player.innerText = 'Jogador O';
            item.innerText = 'X';
        } else {
            player_turn = 1;
            current_player.innerText = 'Jogador X';
            item.innerText = 'O';
        }
    }
    const restartGame = () => {
        current_player.innerText = 'Jogador X';
        current_player.classList.remove('green', 'velha');
        player_turn = 1;
        game = [0,0,0,0,0,0,0,0,0];
        count = 0;
        button_item.forEach(item => [item.innerText = '',item.classList.remove('bg-green', 'bg-velha'),item.disabled = false]);
    }
    const checkByIndexs = (index_01, index_02, index_03) => {
        if ((game[index_01] !== 0 && game[index_02] !== 0 && game[index_03] !== 0) && (game[index_01] === game[index_02]) && game[index_02] === game[index_03]) {
            return [index_01, index_02, index_03];
        }
        return false;
    }
    const verifyGame = () => {
        let arrCheck = [];
        for (const iterator of arrIndexs) {
            let check = checkByIndexs(iterator[0], iterator[1], iterator[2]);
            if(check) arrCheck.push(check);
        }
        return arrCheck.length > 0 ? arrCheck : false;
    }
    const writeButton = (item) => {
        let index = item.getAttribute('data-index');
        if (game[index - 1] === 0) {
            changePlayerTurn(item, index);
            count++;
            let verify = verifyGame();
            if (verify) {
                for (const arrCheck of verify) {
                    for (const iterator of arrCheck) {
                        button_item[iterator].classList.add('bg-green');
                    }
                }
                current_player.innerText = `Jogador ${player_turn == 1 ? 'O' : 'X'} Venceu!`;
                current_player.parentElement.classList.add('green');
                button_item.forEach(item => item.disabled = true)
            }
            if (!verify && count >= 9) {
                button_item.forEach(item => item.classList.add('bg-velha'));
                current_player.innerText = `Deu Velha!`;
                current_player.parentElement.classList.add('velha');
            }
        }
    }
    button_item.forEach(item => item.addEventListener('click', () => writeButton(item)))
    button_restart.addEventListener('click', restartGame)
    
}