var STATUS_WALK = 1;

enchant();

var IMG =['img/bg.png','img/title.png','img/operation.png','img/stage01.png','img/stage02.png','img/stage03.png','img/apple.png','img/apple_ks.png','img/bear.png'];

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 16;
    game.tick = 0;
    game.preload(IMG);
    
    var mainAPPLE = enchant.Class.create(enchant.Sprite,{
        initialize: function(speed){
            enchant.Sprite.call(this, 16, 16);
            this.speed = speed;
            this.x = Math.random() * 300;
            this.y = -16;
            this.addEventListener(Event.ENTER_FRAME, function() {
                this.y += this.speed;
        
                /*//クマと衝突
                if (bear.within(apple, 16)) {
                    game.score+=30;
                    scene.removeChild(apple); 
                } 
                //地面と衝突
                else if (apple.y > 320 - 16) {
                    scene.removeChild(apple); 
                }*/
            });
        
        }
    });
    
    var Apple = enchant.Class.create(mainAPPLE,{
        initialize: function(scene, speed){
            mainAPPLE.call(this, speed);
            this.image = game.assets[ IMG[6] ];
            scene.addChild(this);
        }
    });
    
    var NibbleApple = enchant.Class.create(mainAPPLE,{
        initialize: function(scene, speed){
            mainAPPLE.call(this, speed);
            this.image = game.assets[ IMG[7] ];
            scene.addChild(this);
        }
    });
    
    
    var mainBEAR = enchant.Class.create(enchant.Sprite,{
        initialize: function(scene){
            enchant.Sprite.call(this, 47, 67);
            this.image = game.assets[ IMG[8] ];
            this.y = 320 - 67;
            scene.addChild(this);
        }
    });
    
    var Bear = enchant.Class.create(mainBEAR,{
        initialize: function(scene){
            mainBEAR.call(this,scene);
            this.frame = 0;
            scene.addChild(this);
        }
    });
    
    
    
    /*//リンゴの追加
    game.addApple = function(x, speed, scene) {
        //リンゴの生成
            var apple = new Sprite(16, 16);
            apple.image = game.assets[ IMG[6] ];
            apple.x = x;
            apple.y = -16;
            apple.frame = 15;
            apple.speed = speed;
        scene.addChild(apple);
        
        //スプライトの定期処理
        apple.addEventListener(Event.ENTER_FRAME, function() {
            apple.y += apple.speed;*/
    
            /*//クマと衝突
            if (bear.within(apple, 16)) {
                game.score+=30;
                scene.removeChild(apple); 
            } 
            //地面と衝突
            else if (apple.y > 320 - 16) {
                scene.removeChild(apple); 
            }
        });*/
    //};
    
    
    game.onload = function () {
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[0] ];
        bg.addEventListener(Event.TOUCH_START, function(e) {
            game.pushScene(game.TitleScene());
        });
        game.rootScene.addChild(bg);
    
    };
    
    
    game.TitleScene = function( ) {
        var scene = new Scene ();
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[1] ];
        scene.addChild(bg);
        bg.addEventListener(Event.TOUCH_START, function(e) {
            game.pushScene(game.OperationDescription());
        });
        game.rootScene.addChild(bg);
    };
    
    game.OperationDescription = function( ) {
        var scene = new Scene ();
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[2] ];
        scene.addChild(bg);
        bg.addEventListener(Event.TOUCH_START, function(e) {
            game.pushScene(game.stage01());
        });
        return scene;
        
    };
    
    
    // STAGE 1
    game.stage01 = function( ) {
        var scene = new Scene ();
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[3] ];
        
        scene.addChild(bg);
        // apple
        bg.addEventListener(Event.ENTER_FRAME, function( ) {
            if(game.tick % 12 == 0 ) {
                var speed = 3 + Math.floor(Math.random() * 6 );
                var speed02 = 3 + Math.floor(Math.random() * 4 );
                new Apple(scene, speed);
                new NibbleApple(scene, speed02);
            }
            game.tick++;
        });
        
        var pad = new Pad();
        pad.x = 0;
        pad.y = 150;
        scene.addChild(pad);
        
        var bear = new Bear(scene);
        
        bear.addEventListener(Event.ENTER_FRAME, function( ) {
            if (game.input.left) {
                bear.x -= 3;
                bear.scaleX = -1;        
            } else if (game.input.right) {
                bear.x += 3;
                bear.scaleX = 1;
            }
        });
        
        return scene;
    };
    
    /*
    //STAGE 2
    game.stage02 = function( ) {
        var scene = new Scene ();
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[4] ];
        scene.addChild(bg);
        bg.addEventListener(Event.TOUCH_START, function(e) {
            game.pushScene(game.stage03());
        });
        return scene;
    };
    
    //STAGE 3
    game.stage03 = function( ) {
        var scene = new Scene ();
        var bg = new Sprite(320, 320);
        bg.image = game.assets[ IMG[5] ];
        scene.addChild(bg);
        return scene;
    };*/

    game.start();
};
