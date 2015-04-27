/**
 * Created by kira_kit on 4/25/15.
 */
// create an array of assets to load
var assetsToLoader = [ 'tank.png', 'archer.png', 'explosion.json', 'explosion.png', 'arch.json', 'arch.png', 'walk.json', 'walk.png'];

// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);
// use callback
loader.onComplete = onAssetsLoaded;

//begin load
loader.load();

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF);;

// create a renderer instance.
renderer = PIXI.autoDetectRenderer(800, 600);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


var mixins = {
    fire: {
        fire: function() {
            console.log('fire');
            this.animateFire();
            this.runBullet();
        },
        bullet: null,
        animateFire: function() {},
        runBullet: function() {
         //   debugger;
            if (this.bullet) {
                this.bullet.startAnimate();
            }
        }
    },
    run: {
        run: function() {
            this.img.position.x += 1;
            this.animateRun();
        },
        animateRun: function() {}
    }
}

function createHero(type, skills) {
    var cfg = heroes[type],
        skills = _.map(skills, function(name) {
            return mixins[name];
        }).concat(cfg);

    var hero = new Hero(skills),
        texture = PIXI.Texture.fromImage(cfg.texture),
        heroImg = new PIXI.Sprite(texture);

  //  _.extend(hero, cfg);

    heroImg.position = cfg.position;
    hero.img = heroImg;

    stage.addChild(heroImg);
    return hero;
}

var startFire, move;
Mousetrap.bind('f', function() {
    startFire = true;
});

Mousetrap.bind('r', function() {
    move = true;
    _.each(walkers  , function(hero) {
        hero.activateRunAnimation();
    });
}, 'keydown');

Mousetrap.bind('r', function() {
    move = false;
    _.each(walkers, function(hero) {
        hero.deactivateRunAnimation();
    });
}, 'keyup');


function Hero (skills) {
    skills = skills || [];
    var self = this;
    _.each(skills, function(skill) {
        _.extend(self, skill);
    });
}

function createTank() {
    var tank = createHero('tank', ['run']);
    tank.bullet = createExplosion();
    walkers.push(tank);
   // firemans.push(tank);
}

function createArcher() {
    var archer = createHero('archer', ['run', 'fire']);
    walkers.push(archer);
    firemans.push(archer);
    archer.fireman = createArch();
    archer.walker = createWalker();

}

function createArcher1() {
    console.log('archer1')
    var archer = createHero('archer', ['run']);
    walkers.push(archer);
    archer.walker = createWalker();
    archer.img.position =  {x: 10, y: 460};

}




function onAssetsLoaded() {
    createTank();
    createArcher();
    createArcher1();

    requestAnimFrame( animate );
}

var firemans = [], walkers = [];

function animate() {

    if (startFire) {
        startFire = false;
        _.each(firemans, function(hero) {
            hero.fire();
        })
    }

    if (move) {
      //  move = false;
        _.each(walkers, function(hero) {
            hero.run();
        });
    }

    renderer.render(stage);
    requestAnimFrame( animate );

}


