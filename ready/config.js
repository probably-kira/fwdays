/**
 * Created by kira_kit on 4/25/15.
 */

function createExplosion() {
    var explosion,
        explosionTextures = [];
    for (var i=0; i < 26; i++) {
        var texture = PIXI.Texture.fromFrame("explosion" + (i+1) + ".png");
        explosionTextures.push(texture);
    };
    explosion = new PIXI.MovieClip(explosionTextures);

    explosion.alpha = 0;
  //  explosion.play();
    stage.addChild(explosion);
    explosion.loop = false;
    explosion.onComplete = function() {
        this.alpha = 0;
    };

    explosion.startAnimate = function() {
        console.log('start animate')
        this.alpha = 1;
        this.gotoAndPlay(0);
    };

    return explosion;
}

function createArch() {
    var archer, archerTextures = [];
    for (var i = 0; i < 5; i++) {
        var texture = PIXI.Texture.fromFrame("a" + i + ".png");
        archerTextures.push(texture);
    };
    archer = new PIXI.MovieClip(archerTextures);
    archer.alpha = 0;
    stage.addChild(archer);
    archer.loop = false;
    return archer;
}

function createWalker() {
    var walker, walkerTextures = [];
    for (var i = 0; i < 6; i++) {
        var texture = PIXI.Texture.fromFrame("w" + i + ".png");
        walkerTextures.push(texture);
    };
    walker = new PIXI.MovieClip(walkerTextures);
    walker.alpha = 0;
    stage.addChild(walker);
    return walker;
}

var heroes = {
    tank: {
        texture: 'tank.png',
        position: {x: 10, y: 70},
        activateRunAnimation: function(){},
        deactivateRunAnimation: function() {},
        animateFire: function() {
            var sprite = this.img,
                pos = sprite.position.x + sprite.width - 40,
                explosion = this.bullet;

            explosion.position.x = pos;
            explosion.position.y = 0;
        }
    },
    archer: {
        texture: 'archer.png',
        position: {x: 10, y: 320},
        activated: false,
        activateRunAnimation: function() {
            if (!this.activated) {
                var walker = this.walker;
                this._cached = this.img;
                walker.alpha = 1;
                walker.position = this._cached.position;
                this._cached.alpha = 0;
                this.img = walker;
                walker.gotoAndPlay(0);
                this.activated = true;
            }


        },
        deactivateRunAnimation: function() {
            this.img = this._cached;
            this.walker.alpha = 0;
            this._cached.alpha = 1;
            this._cached.position = this.walker.position;
            this.activated = false;
        },
        animateFire: function() {
            var sprite = this.img,
                archer = this.fireman;
            if (this.fireman) {
                archer.position = sprite.position;
                sprite.alpha = 0;
                archer.alpha = 1;

                archer.animationSpeed = 0.4;
                archer.gotoAndPlay(0);
                archer.onComplete = function() {
                    sprite.alpha = 1;
                    archer.alpha = 0;
                }
            }

        }
    }
}