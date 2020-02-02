// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        // The image/sprite and x, y positions of the enemies
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position
    update(dt) {
        //sets the enemy's speed
        this.x += 250 * dt;

        //when the bug leaves the screen, if statement checks if the x position is bigger than the canvas context
        if (this.x > ctx.canvas.width) {
            //then the x position gets rest and the bug appears from the other side
            this.x = -90;
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x - 50, this.y - 110);
    }
}

// player Class that holds update(), render() and handleInput() functions
class Player {
    constructor(x, y) {
        // The image/sprite and x, y positions of the player
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }
    update() {
        if (this.y === 75) {
            this.win();
        }
    }
    render() {
        //renders the player on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x - 50, this.y - 100);
        console.log(this.y);

    }

    //handleInput function takes the direction parameter from the user's keyboard (up, down, and etc..)
    handleInput(dr) {
        //using a switch statement to determine the user's movements and only moving the character if his/her next movement is within the screen 
        switch (dr) {
            case 'right':
                //if statement to make sure the player doesn't move off screen
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'left':
                if (this.x > 100) {
                    this.x -= 100;
                }
                break;
            case 'up':
                if (this.y > 100) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y < 500) {
                    this.y += 85;
                }
                break
        }

    }
    //a function that alerts the user that he/she won and resets the game
    win() {
        this.reset();
        alert('Congratulations! You Won!');
    }
    //a function that alerts the user that he/she lost and resets the game
    collision() {
        this.reset();
        alert('Game Over, You Lost The Game.');
    }

    //resets the player to his/her initial position
    reset() {
        this.x = 250;
        this.y = 500;
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//function that checks the collision of the player and each of the enemy objects
function checkCollisions() {
    //for each loop to go through the allEnemies array and checks each enemy object
    allEnemies.forEach(enemy => {
        //checks the distance between the enemy and the player
        //if its less that 50 then they are colliding
        if (Math.abs(enemy.x - player.x) < 77 && Math.abs(enemy.y - player.y) < 48) {
            player.collision();
        }
    });

}