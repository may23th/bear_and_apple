enchant();

var IMG = ['img/bg.png','img/title.png','img/operation.png','img/stage01.png','img/stage02.png','img/stage03.png'];

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 16;
    game.preload(IMG);
    
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
        bg.addEventListener(Event.TOUCH_START, function(e) {
            game.pushScene(game.stage02());
        });
        return scene;
    };
    
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
    };
        
    game.start();
};
