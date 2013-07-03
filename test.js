//方向定数
var DIR_LEFT  = 0;
var DIR_RIGHT = 1;
var DIR_UP    = 2;
var DIR_DOWN  = 3;

enchant();
window.onload = function() {
    //ゲームオブジェクトの生成
    var game = new Game(320, 320);
    game.fps = 16;

    //画像の読み込み
    game.preload('http://enchantjs.com/assets/images/chara0.gif',
        'http://enchantjs.com/assets/images/map0.gif');

    //ロード完了時に呼ばれる
    game.onload = function() {
        //背景の生成
        var bg = new Sprite(320, 320);
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(320, 320);
        for (var j = 0; j < 320; j += 16) {
            for (var i = 0; i < 320; i += 16) {
                image.draw(maptip, 0, 0, 16, 16, i, j, 16, 16);
            }
        }
        bg.image = image;
        game.rootScene.addChild(bg);

        //キャラクターの生成
        var girl = new Sprite(32, 32);
        girl.image = game.assets['http://enchantjs.com/assets/images/chara0.gif'];
        girl.x     = 160 - 16;
        girl.y     = 160 - 16;
        girl.frame = 7;
        girl.toX   = girl.x;
        girl.toY   = girl.y;
        girl.dir   = DIR_DOWN;
        girl.anim  = [
            15, 16, 17, 16, //左
            24, 25, 26, 24, //右
            33, 34, 35, 34, //上
             6,  7,  8,  7];//下
        game.rootScene.addChild(girl);
        
        //キャラクターの定期処理
        girl.tick = 0;
        girl.addEventListener(Event.ENTER_FRAME, function() {
            //上へ移動
            if (girl.y > girl.toY) {
                girl.dir = DIR_UP;
                if (Math.abs(girl.y - girl.toY) < 3) {
                    girl.y=girl.toY;
                } else {
                    girl.y -= 3;
                }                
            }
            //下へ移動
            else if (girl.y < girl.toY) {
                girl.dir = DIR_DOWN;
                if (Math.abs(girl.y - girl.toY) < 3) {
                    girl.y = girl.toY;
                } else {
                    girl.y += 3;
                }
            } 
            //左へ移動
            if (girl.x > girl.toX) {
                girl.dir = DIR_LEFT;
                if (Math.abs(girl.x - girl.toX) < 3) {
                    girl.x = girl.toX;
                } else {
                    girl.x -= 3;
                }                
            }
            //右へ移動
            else if (girl.x < girl.toX) {
                girl.dir = DIR_RIGHT;
                if (Math.abs(girl.x- girl.toX) < 3) {
                    girl.x = girl.toX;
                } else {
                    girl.x += 3;
                }
            } 
            
            //フレームの指定
            girl.tick++;
            if (girl.x == girl.toX && girl.y == girl.toY) girl.tick = 1;//静止
            girl.frame = girl.anim[girl.dir * 4 + (girl.tick % 4)];            
        });

        //タッチ開始時に呼ばれる
        bg.addEventListener(Event.TOUCH_START, function(e){
            girl.toX = e.x - 16;
            girl.toY = e.y - 16;
        });
        
        //タッチ移動時に呼ばれる
        bg.addEventListener(Event.TOUCH_MOVE, function(e){
            girl.toX = e.x - 16;
            girl.toY = e.y - 16;
        });
    };
    
    //ゲームの開始
    game.start();
};