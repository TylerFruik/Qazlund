const readlineSync = require('readline-sync');

let user_input = '';

let special_points = 0;

let player_name = '';
let player_level = 1;
let player_class = '';
let player_speed = 0;
let player_hp = 1;
let player_vitality = 0;

let enemy_name = 'Zerqat';
let enemy_speed = 0;
let enemy_level = 1;
let enemy_hp = 1;

function world_printer(text) {
    if (text.length > 80) {
        let pos_num = 79;
        let pos = text[pos_num];
        while (pos !== ' ') {
            pos_num -= 1;
            pos = text[pos_num];
        }
        const first_text = text.slice(0, pos_num);
        world_printer(first_text);
        const remaining_text = text.slice(pos_num + 1);
        world_printer(remaining_text);
    } else {
        console.log(`${text}`.padStart(40 + text.length / 2));
    }
}

function self_printer(text) {
    if (text.length > 80) {
        let pos_num = 79;
        let pos = text[pos_num];
        while (pos !== ' ') {
            pos_num -= 1;
            pos = text[pos_num];
        }
        const first_text = text.slice(0, pos_num);
        self_printer(first_text);
        const remaining_text = text.slice(pos_num + 1);
        self_printer(remaining_text);
    } else {
        console.log(`${text}`.padEnd(30));
    }
}

function enemy_printer(text) {
    if (text.length > 80) {
        let pos_num = 79;
        let pos = text[pos_num];
        while (pos !== ' ') {
            pos_num -= 1;
            pos = text[pos_num];
        }
        const first_text = text.slice(0, pos_num);
        self_printer(first_text);
        const remaining_text = text.slice(pos_num + 1);
        self_printer(remaining_text);
    } else {
        console.log(`${text}`.padStart(30));
    }
}

function player_turn() {
    self_printer(`Your HP: ${player_hp}`);
    self_printer(`Special Points: ${special_points}`);
    const action = readlineSync.question();
    while (action.toLowerCase() !== 'quit') {
        if (action.toLowerCase() === 'roll') {
            const list = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1);
            self_printer(list.toString());
            const total_roll = `Total roll: ${list.reduce((acc, curr) => acc + curr, 0)}`;
            self_printer(total_roll);
            player_turn();
        } else if (action.toLowerCase() === 'special') {
            specials();
            player_turn();
        } else if (action.toLowerCase() === 'reset') {
            restart_game();
        } else {
            world_printer('Try again.\n');
            player_turn();
        }
    }
}

function enemy_turn() {
    enemy_printer(`${enemy_name}'s HP: ${player_hp}`);
    const list = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1);
    enemy_printer(list.toString());
    const total_roll = `Total roll: ${list.reduce((acc, curr) => acc + curr, 0)}`;
    enemy_printer(total_roll);
}

function game_start() {
    world_printer('NEW or OPEN');
    user_input = readlineSync.question();
    if (user_input.toLowerCase() === 'new') {
        new_player_class();
        begin_yn();
    } else if (user_input.toLowerCase() === 'open') {
        world_printer('No saved files found\n');
        game_start();
    } else if (user_input.toLowerCase() === 'skip') {
        skip_to_combat();
    } else {
        world_printer('Try again\n');
        game_start();
    }
}

function chapter_start(level) {
    special_points = level * Math.floor(Math.random() * 6) + 1;
    self_printer(`Special actions: ${special_points}`);
    world_printer("Alright haven't gotten to this part yet. Type goblin to start");
    user_input = readlineSync.question();
    combat(user_input);
}

function begin_yn() {
    world_printer('Shall we begin?');
    world_printer('Y/N');
    user_input = readlineSync.question();
    if (user_input.toLowerCase() === 'y') {
        world_printer('Great. Here we go!');
        world_printer('If you get a bit confused, type HELP at any time for a list of available commands.');
        chapter_start(player_level);
    } else if (user_input.toLowerCase() === 'n') {
        world_printer("Well... alright... so here's what happens:");
        world_printer("Your character just sits there for a couple days until a wizard comes through and rewinds time or something. Press Y this time, ok?\n");
        begin_yn();
    } else {
        world_printer('Try again\n');
        begin_yn();
    }
}

function restart_game() {
    world_printer('Welcome to Qazlund!\n');
    game_start();
}

function combat(enemy) {
    if (enemy.toLowerCase() === 'goblin') {
        world_printer('A goblin appears! Ohh shoot better fight!');
    } else {
        world_printer('Enemy not found.');
        user_input = readlineSync.question();
        combat(user_input);
    }
    world_printer("Let's see who goes first here! Type ROLL to begin.");
    user_input = readlineSync.question();
    if (initiative(user_input) === 0) {
        while (player_hp > 0 || enemy_hp > 0) {
            player_turn();
            enemy_turn();
        }
    } else {
        while (player_hp > 0 || enemy_hp > 0) {
            enemy_turn();
            player_turn();
        }
    }
}

function new_player_class() {
    world_printer('Choose one of the following classes');
    world_printer('WARRIOR');
    player_class = readlineSync.question();
    if (player_class.toLowerCase() !== 'warrior') {
        world_printer('Try again\n');
        new_player_class();
    } else {
        new_player_name();
    }
}

function new_player_name() {
    world_printer('What would you like to name your character?');
    player_name = readlineSync.question();
    world_printer(`${player_name.charAt(0).toUpperCase() + player_name.slice(1)} the level ${player_level} ${player_class.charAt(0).toUpperCase() + player_class.slice(1)}\n`);
}

function initiative(action) {
    if (action.toLowerCase() === 'roll') {
        const player_initiative = Math.floor(Math.random() * 20) + 1 + player_speed;
        const enemy_initiative = Math.floor(Math.random() * 20) + 1 + enemy_speed;
        if (player_initiative > enemy_initiative) {
            world_printer('You go first!');
            return 0;
        } else {
            world_printer(`${enemy_name} goes first!`);
            return 1;
        }
    } else {
        world_printer('Try again.');
        action = readlineSync.question();
        return initiative(action);
    }
}

function skip_to_combat() {
    player_level = 1;
    special_points = player_level + Math.floor(Math.random() * 6) + 1;
    player_class = 'warrior';
    player_vitality = 0;
    player_speed = 0;
    player_name = 'Tyler';
    player_hp = player_level * 8 + player_level * player_vitality;
    combat('goblin');
}

world_printer('Welcome to Qazlund!\n');
game_start();
