var Player = function(){

    this.uuid = 0;
    this.x = 0;
    this.y = 0;
    this.username = "Default Uris";
    this.sprite = null;
    this.usernameLabel = null;
    this.distance = 0;
    this.speed = 100;
    this.moveToX = 0;
    this.moveToY = 0;

    //init function
    this.init = function(id,username, x, y){

        //setup data
        this.y = y;
        this.x = x;
        this.username = username;
        this.uuid = id;

        this.create();

        //attach phaser events
        Game.scene.events.on("update", () => this.update() );
        

    }
    
    //create function
    this.create = function(){

        //create sprite (for now only circle)
        this.sprite = Game.scene.add.circle(this.x, this.y, 16, 0x6666ff);
        Game.scene.physics.add.existing(this.sprite);

        //create username text
        this.usernameLabel = Game.scene.add.text(this.y-30, this.x, this.username, { fontFamily: "Arial", fontSize:"16" });

    }

    //update function
    this.update = function(){

        this.usernameLabel.x = this.sprite.x;
        this.usernameLabel.y = this.sprite.y-30;


        //calc distance from destination and stop player movement if he reach it
        this.distance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.moveToX , this.moveToY);
        if(this.distance < 3){
            this.sprite.body.setVelocity(0);
		}

    }

    //move player to point
    this.moveTo = function(position){

        this.moveToX = position.x;
        this.moveToY = position.y;
        Game.scene.physics.moveTo(this.sprite, position.x, position.y, this.speed);

    }

    this.remove = function(){
        Game.scene.events.off('update', this.update, this);//this is not working, phaser bug
        this.update = function(){};//at least i will clear function logic before removing
        this.sprite.destroy();
        this.usernameLabel.destroy();
        Game.players[this.uuid] = null;
        delete Game.players[this.uuid];
    }
}