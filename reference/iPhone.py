import random

user_input = ''

special_points = 0

player_name = ''
player_level = 1
player_class = ''
player_speed = 0
player_hp = 1
player_vitality = 0

enemy_name = 'Zerqat'
enemy_speed = 0
enemy_level = 1
enemy_hp = 1

def world_printer(text):
    if len(text) > 80:
        pos_num = 79
        pos = text[pos_num]
        while pos != ' ':
            pos_num -= 1
            pos = text[pos_num]
        first_text = text[0:pos_num]
        world_printer(first_text)
        remaining_text = text[pos_num + 1:]
        world_printer(remaining_text)
    else:
        print('{t:^80}'.format(t=text))
        
def self_printer(text):
    if len(text) > 80:
        pos_num = 79
        pos = text[pos_num]
        while pos != ' ':
            pos_num -= 1
            pos = text[pos_num]
        first_text = text[0:pos_num]
        self_printer(first_text)
        remaining_text = text[pos_num + 1:]
        self_printer(remaining_text)
    else:
        print('{t:<30}'.format(t=text))
  
def enemy_printer(text):
    if len(text) > 80:
        pos_num = 79
        pos = text[pos_num]
        while pos != ' ':
            pos_num -= 1
            pos = text[pos_num]
        first_text = text[0:pos_num]
        self_printer(first_text)
        remaining_text = text[pos_num + 1:]
        self_printer(remaining_text)
    else:
        print('{t:>30}'.format(t=text))
        
def player_turn():
    self_printer('Your HP: ' + str(player_hp))
    self_printer('Special Pointes: ' + str(special_points))
    action = str(input())
    while action.lower() != 'quit':
        if action.lower() == 'roll':
            list = []
            for i in range(0,5):
                n = random.randint(1,20)
                list.append(n)
            self_printer(str(list))
            total_roll = 'Total roll: ' + str(sum(list))
            self_printer(total_roll)
            player_turn()
        elif action.lower() == 'special':
            specials()
            player_turn()
        elif action.lower() == 'reset':
            restart_game()
        else:
            world_printer('Try again.\n')
            player_turn()

def enemy_turn():
    enemy_printer(str(enemy_name) + '\'s HP: ' + str(player_hp))
    list = []
    for i in range(0,3):
        n = random.randint(1,20)
        list.append(n)
    enemy_printer(str(list))
    total_roll = 'Total roll: ' + str(sum(list))
    enemy_printer(total_roll)
    
def game_start():
    world_printer('NEW or OPEN')
    user_input = str(input())
    if user_input.lower() == 'new':
        new_player_class()
        begin_yn()
    elif user_input.lower() == 'open':
        world_printer('No saved files found\n')
        game_start()
    elif user_input.lower() == 'skip':
        skip_to_combat()
    else:
        world_printer('Try again\n')
        game_start()
            
def chapter_start(level):
    global special_points
    world_printer('To get started, type ROLL to generate your Specials.')
    world_printer('Specials are calculated by rolling 1d6 per character level.\n')
    user_input = str(input())
    if user_input.lower() == 'roll':
        special_points = level * random.randint(1,6)
        self_printer('Special actions: ' + str(special_points))
        
    else:
        world_printer('Pretty simple, here. Just follow the instructions.\n')
        chapter_start(level)
        
    world_printer('Alright haven\'t gotten to this part yet. Type goblin to start')
    user_input = str(input())
    combat(user_input)

def begin_yn():
    global player_level
    world_printer('Shall we begin?')
    world_printer('Y/N')
    user_input = str(input())
    if user_input == 'y' or user_input == 'Y':
        world_printer('Great. Here we go!')
        world_printer('If you get a bit confused, type HELP at any time for a list of available commands.')
        chapter_start(player_level)
    elif user_input == 'n' or user_input == 'N':
        world_printer('Well... alright... so here\'s what happens:')
        world_printer('Your character just sits there for a couple days until a wizard comes through and rewinds time or something. Press Y this time, ok?\n')
        begin_yn()
    else:
        world_printer('Try again\n')
        begin_yn()
        
def restart_game():
    world_printer('Welcome to Qazlund!\n')
    game_start()
    
def combat(enemy):
    global player_speed
    global player_hp
    global enemy_speed
    global enemy_name
    global enemy_hp
    if enemy.lower() == 'goblin':
        world_printer('A goblin appears! Ohh shoot better fight!')
    else:
        world_printer('Enemy not found.')
        user_input = str(input())
        combat(user_input)
    world_printer('Let\'s see who goes first here! Type ROLL to begin.')
    user_input = str(input())
    if initiative(user_input) == 0:
        while player_hp > 0 or enemy_hp > 0:
            player_turn()
            enemy_turn()
    else:
        while player_hp > 0 or enemy_hp > 0:
            enemy_turn()
            player_turn()
        
def new_player_class():
    global player_class
    world_printer('Choose one of the following classes')
    world_printer('WARRIOR')
    player_class = str(input())
    if player_class.lower() != 'warrior':
        world_printer('Try again\n')
        new_player_class()
    else:
        new_player_name()
        
def new_player_name():
    world_printer('What would you like to name your character?')
    player_name = str(input())
    world_printer(player_name.capitalize() + ' the level ' + str(player_level) + ' ' + player_class.capitalize() + '\n')

def initiative(action):
    global enemy_name
    if action.lower() == 'roll':
        player_initiative = random.randint(1,20) + player_speed
        enemy_initiative = random.randint(1,20) + enemy_speed
        if player_initiative > enemy_initiative:
            world_printer('You go first!')
            return 0
        else:
            world_printer(enemy_name + ' goes first!')
            return 1
    else:
        world_printer('Try again.')
        action = str(input())
        initiative(action)
    
def skip_to_combat():
    global player_class    
    global special_points
    global player_hp
    global player_level
    global player_speed
    global player_vitality
    global player_name
    player_level = 1
    special_points = player_level + random.randint(1,6)
    player_class = 'warrior'
    player_vitality = 0
    player_speed = 0
    player_name = 'Tyler'
    player_hp = player_level * 8 + player_level * player_vitality  
    combat('goblin')

world_printer('Welcome to Qazlund!\n')
game_start()