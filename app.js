var gameWon = false,
    gameLost = false,
    Lifes = 3;
    collections = 0 ;
    coordinateX = [-2,99,200,301,402],
    coordinateY = [68,151,234,317];

// displays the number of lifes or hearts of the player
document.getElementById('numberLifes').innerHTML = Lifes.toString();
//we display the number of objects the players has collected
document.getElementById('collections').innerHTML = collections.toString();

//this function is use to randomize the speed of the bugs
function randomInteger(minimum, maximum) {
  return Math.floor(Math.random()*(maximum - minimum + 1) + minimum);
}

//while this function controls the lifes remaining to the player everytime he loses one
var heartCounter = function() {
    return new Items(coordinateX[randomInteger(0,5)],coordinateY[randomInteger(0,4)],"Heart","life");
}


//OBSTACLES TO AVOID AND ITEMS

var Items = function (x,y,sprite,item) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
    this.item = item;
}

Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}
Items.prototype.box = {'x':101,'y':83};
var allItems = [heartCounter()];

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//let's displays a box model for all the ennemies
Enemy.prototype.box = {'x':101,'y':83};

Enemy.prototype.checkCollision = function(object, player) {
  return (player.x > object.x - object.box.x/2 &&
          player.x < object.x + object.box.x/2 &&
          player.y > object.y - object.box.y/2 &&
          player.y < object.y + object.box.y/2);
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter this will ensure the game runs at the same speed for all computers.

    this.x = this.x + this.speed * dt;

    //when the enemy goes off screen, we reset thier position to start again
    if(this.x > 500) {
        //initial enemy x-axis position
        this.x = -60;
        this.randomSpeed();
    }

    if(this.checkCollision(this,player)) {
        resetGame();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 7 + 1);
    this.speed = 75 * speedMultiply;
}

// Now write your own player class
// This class requires an update(), render() and

var Player = function(x,y,speed) {
    // Tnis is for setting the initial position of the player
    this.x = x;
    this.y = y;

    this.speed = speed;

    //loading the image by setting this.sprite
    this.sprite = "images/char-boy.png";
}
Player.prototype = {
    checkCollision: function(object,player) {
       return (player.x > object.x - object.box.x/2 &&
              player.x < object.x + object.box.x/2 &&
              player.y > object.y - object.box.y/2 &&
              player.y < object.y + object.box.y/2);       
    },
    // Player class instance methods
    update: function() {
        if(this.y <= -15) {
            allEnemies = [];
            gameWon = true;
        }
        if(allItems.length > 0) {
            if(this.checkCollision(allItems[0],this)) {
                Lifes++;
                document.getElementById('numberLifes').innerHTML = Lifes.toString();
                allItems.splice(0,1);
            };
        }

        if(Lifes <= 0) {
            allEnemies = [];
            gameLost = true;
        }
    },
    //The render function draw the player on the screen and required methods for game
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    handleInput: function(allowedKeys) {
        //this is the  listener for the keyboard arrows 'left' 'right' 'up' 'down'
        switch (allowedKeys) {
            case 'left':
                /* this is  to avoid player moving off-screen and update previousX */
                if(this.x > 0) {
                    this.x -= 101;
                }
                break;
            case 'up':
                /* this is to avoid player moving off-screen and update previousY */
                if(this.y > 0) {
                    this.y -=83;
                }
                break;
            case 'right':
                /* this  avoid player for  moving off-screen and update previousX */
                // 404 = 101 * 4
                if(this.x < 402) {
                    this.x += 101;
                }
                break;
            case 'down':
                /* This avoid player for moving off-screen and update previousY */
                // 332 = 83 * 4
                if(this.y < 332) {
                    this.y += 83;
                }
                break;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];


//Instantiate all enemies
for(var i = 0;i < 4;i++) {
    //[75 - 375]
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(0,60 + 85 * i, tempSpeed));
}

// Place the player object in a variable called player

var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//we reset the number of heart to 0 for the game is restrarting
//we reset the number of keys collection to 0 for the game to start over
var resetGame  = function() {
    player.x = 0;
    player.y = 400;
    Lifes-- ;
    document.getElementById('numberLifes').innerHTML = Lifes.toString();

};



var LogPlayerPosition = function() {
    console.log('>>> PLAYER - X: ' + player.x + ' Y: ' + player.y);
};