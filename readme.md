# DOCUMENTS I USE

1. For this work i've really be inspire by  the work  of Evan Fung [https://github.com/EvanFung/FEND-project-3-arcade] wich i got on his Github.I did understand how he wrote his code and i've been muchly inspired by his work

2. You tube channel of Ryan Waite wich was about the third project of the front end nanodegree

3. The course on HTML canvas provided by Udacity has been really helpful

4. I've found some notion on about the sprite attibute  [ https://docs.unity3d.com/].

5. I've learn more about the random function on stackoverflow wich generate a random number
randomInteger utility function for generate a radom number.[https://stackoverflow.com/]

6. we have tried to provide a new feature for the player can collect items


## SOME FUNCTIONS AND FEATURES I USED EXPLAINED

1. Function randomInteger(minimum, maximum) {
  return Math.floor(Math.random()*(maximum - minimum + 1) + minimum);
}
  * @param  {[var type]} minimum [description]
  * @param  {[var type]} maximum [description]
  * @return {[var type]}         [description]

2. This is all about  *sprite*  and its attributes
 * @param {is a number} x [X position of the item]
 * @param {is a number]} y [Y position of the item]
 * @param {is a string} sprite [URL of the sprite images]
 *  @param { is a string} item Property to differentiate the obstacles: house, door, tree, rock, gem 
 

3. The function wich check for collision between the player and the bugs
    ```function checkCollision(object, player) {
    return (player.x > object.x - object.box.x/2 &&
            player.x < object.x + object.box.x/2 &&
           player.y > object.y - object.box.y/2 &&
            player.y < object.y + object.box.y/2);
 }```
 

### HOW THE GAME WORKS

##### Basic Functionality

1. To start the game you firstly need to open the index.html file in your browser

2. In this game you have a Player(charboy) and Enemies (bugs). The goal of the player is to reach the water and the player  should avoid collision with bugs

3. The player can move left, right, up and down(using the arrow keys).

4. The enemies move at varying speeds on the paved block portion of the game board

5. Once a the player collides with an enemy, the game is reset and the player moves back to the starting square

6. Once the player reaches the water, the game is won

### Another Functionalities

1. The player begins the game with 3 hearts wich are lifes and he got some istructions

2. Every time the player touches a bug he lose on life and is set to his initial position

3. The player has the opportunity to collect more heartwhile playing those live appear randomly on the game board

4. There is a congratulation module wich is displays every time the player wins

5. A pop message also displays if the player looses all his lifes.