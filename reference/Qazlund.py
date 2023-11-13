import random



def roll(dice):
    return random.randint(1,dice)
    
def turn(user_action):
    if user_action == 'roll':
        value = roll(d_six)
        self_print(value)
    elif user_action == 'end':
        player_end_turn()
    else:
        global_print('Action not understood')
        global_print('Try one of the following')

def player_end_turn():
    global_print('You ended your turn')
    return None
    
def global_print(text):
    text_line = '{text:=^40}'.format(text=text)
    print(text_line)
    return None
    
def self_print(text):
    text_line = '{text:=<40}'.format(text=text)
    print(text_line)
    return None
    
def enemy_print(text):
    text_line = '{text:=>40}'.format(text=text)
    print(text_line)
    return None

def game_start():
    return

print('Welcome to Qazlund!')
d_six = 6
enemy_turn = 0
user_input = input()

while user_input != 'quit':
    turn(user_input)
    user_input = input()
    
