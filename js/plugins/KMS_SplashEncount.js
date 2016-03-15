//=============================================================================
// KMS_SplashEncount.js
//   Last update : 2015/11/26
//=============================================================================

/*
 * This plugin is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * This plugin requires "three.js".
 * http://threejs.org/
 *
 * This plugin can be used in the environment which supports WebGL.
 */

/*:
 * @plugindesc
 * [v0.1.1] Applies splash encounter effect.
 * 
 * @author TOMY (Kamesoft)
 *
 * @param Split X
 * @default 10
 * @desc Split number of the horizontal direction.
 *
 * @param Split Y
 * @default 8
 * @desc Split number of the vertical direction.
 *
 * @param Delay
 * @default 10
 * @desc The waiting time between splitting start and battle scene start. [frame]
 *
 * @param Use CDN
 * @default 0
 * @desc
 * Specify the source of "three.min.js" to load from CDN or local.
 * 0: From local (js/libs/three.min.js), 1: From CDN
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc
 * [v0.1.1] エンカウント時に画面が割れるエフェクトを適用します。
 * 
 * @author TOMY (Kamesoft)
 *
 * @param Split X
 * @default 10
 * @desc 横方向の分割数です。
 *
 * @param Split Y
 * @default 8
 * @desc 縦方向の分割数です。
 *
 * @param Delay
 * @default 10
 * @desc 画面が割れてから戦闘開始までの待ち時間をフレーム単位で指定します。
 *
 * @param Use CDN
 * @default 0
 * @desc
 * どの "three.min.js" を使用するか指定します。
 * 0: ローカル (js/libs/three.min.js), 1: CDN
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function()
{

var PluginName = 'KMS_SplashEncount';

var pluginParams = PluginManager.parameters(PluginName);
var Params = {};
Params.splitNum = {}
Params.splitNum.x = Number(pluginParams['Split X'] || 10);
Params.splitNum.y = Number(pluginParams['Split Y'] || 8);
Params.delay = Math.max(Number(pluginParams['Delay'] || 10), 1);
Params.useCdn = Number(pluginParams['Use CDN'] || 0);

// three.js のロード
(function()
{
    var threeJsId = 'three-js-script';
    if (document.getElementById(threeJsId) || typeof THREE !== 'undefined')
    {
        return;
    }

    var url = Params.useCdn ?
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.min.js' :
        'js/libs/three.min.js';

    console.info('[' + PluginName + '] Load "three.min.js" from ' + (Params.useCdn ? 'CDN' : 'local'));

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url
    script.async = false;
    script.onerror = PluginManager.onError.bind(PluginManager);
    script._url = url;
    script.id = threeJsId;
    document.body.appendChild(script);
})();

function Game_SplashScreen()
{
    this.initialize.apply(this, arguments);
}

Game_SplashScreen.prototype = Object.create(Sprite.prototype);
Game_SplashScreen.prototype.constructor = Game_SplashScreen;

Game_SplashScreen.prototype.initialize = function()
{
    Sprite.prototype.initialize.call(this);

    this._scene3d = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera(75, Graphics.width / Graphics.height, 1, 10000);
    this._camera.position.set(0, 0, 400);
    this._camera.updateProjectionMatrix();

    this._canvas3d = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._canvas3d.setSize(Graphics.width, Graphics.height);
    this._canvas3d.setClearColor(0, 0);
};

Game_SplashScreen.prototype.dispose = function()
{
    this.clear();
    this._canvas3d.dispose();
};

Game_SplashScreen.prototype.clear = function()
{
    if (this._splashObjs)
    {
        //this.splashObjs.forEach(function(obj) { obj.dispose(); });
        this._splashObjs = null;
    }
    if (this._splashMaterial)
    {
        this._splashMaterial.dispose();
        this._splashMaterial = null;
    }
    if (this._splashTexture)
    {
        this._splashTexture.dispose();
        this._splashTexture = null;
    }

    this.removeChild(this._sprite3d);
};

Game_SplashScreen.prototype.isFinished = function()
{
    return !this._splashMaterial || this._splashMaterial.opacity <= 0;
};

/*
 * 画面割れエフェクトの生成
 */
Game_SplashScreen.prototype.createSplashEffect = function(stage, duration)
{
    var roundUpSquareSize = function(n)
    {
        var square = 1;
        while (n > square)
        {
            square *= 2;
        }

        return square;
    };

    this.clear();

    // 画面に表示されている内容をテクスチャとして使用
    // (微妙に無駄ではあるが、警告回避のため、2 の倍数サイズに拡張する)
    var snap = Bitmap.snap(stage);
    var newSize = roundUpSquareSize(Math.max(snap.width, snap.height));
    var bitmap = new Bitmap(newSize, newSize);
    bitmap.blt(snap, 0, 0, snap.width, snap.height, 0, 0, newSize, newSize);

    this._splashTexture = new THREE.Texture(bitmap.canvas);
    this._splashTexture.needsUpdate = true;
    this._splashMaterial = new THREE.MeshBasicMaterial({ map: this._splashTexture, side: THREE.DoubleSide });
    this._splashMaterial.transparent = true;

    this._splashObjs = this.createSplashMeshes(
        this._splashMaterial,
        { x: Graphics.width, y: Graphics.height },
        Params.splitNum);
    this._splashObjs.forEach(function(obj) { this._scene3d.add(obj); }, this);

    // 3D 空間を 2D テクスチャにマッピング
    this._texture3d = PIXI.Texture.fromCanvas(this._canvas3d.domElement);
    this._sprite3d = new PIXI.Sprite( this._texture3d );

    this.addChild(this._sprite3d);

    this._duration = duration;

    // 一瞬だけ割るために更新
    this.updateObjects();
    this.updateObjects();
};

/*
 * 破片メッシュの作成
 */
Game_SplashScreen.prototype.createSplashMeshes = function(material, wholeSize, splitNum)
{
    var randRot = function(abs)
    {
        if (abs)
        {
            return Math.random() / 10.0;
        }
        else
        {
            return (Math.random() - 0.5) / 10.0;
        }
    };

    var splitSize = { x: wholeSize.x / splitNum.x, y: wholeSize.y / splitNum.y };
    var center = { x: splitSize.x / 3.0, y: splitSize.y / 3.0 };
    var objs = [];
    for (var i = 0; i < splitNum.x * splitNum.y; ++i)
    {
        var base =
            {
                x: splitSize.x * parseInt(i % splitNum.x),
                y: splitSize.y * parseInt(i / splitNum.x)
            };
        for (var j = 0; j < 2; ++j)
        {
            var geo = new THREE.Geometry();
            geo.faces[0] = new THREE.Face3(0, 1, 2);

            // 形状とテクスチャ座標の設定
            // TODO: もう少し整理したい
            var pos = { x: -splitSize.x / 2, y: -splitSize.y / 2 };
            var uv  = { u: base.x / wholeSize.x, v: base.y / wholeSize.y };
            var uvd = { u: splitSize.x / wholeSize.x, v: splitSize.y / wholeSize.y };
            if (j === 0)
            {
                geo.vertices[0] = new THREE.Vector3(pos.x, pos.y, 0);
                geo.vertices[1] = new THREE.Vector3(pos.x + splitSize.x, pos.y, 0);
                geo.vertices[2] = new THREE.Vector3(pos.x, pos.y + splitSize.y, 0);
                geo.faceVertexUvs[0].push([
                    new THREE.Vector2(uv.u, uv.v),
                    new THREE.Vector2(uv.u + uvd.u, uv.v),
                    new THREE.Vector2(uv.u, uv.v + uvd.v)
                ]);
            }
            else
            {
                geo.vertices[0] = new THREE.Vector3(pos.x, pos.y + splitSize.y, 0);
                geo.vertices[1] = new THREE.Vector3(pos.x + splitSize.x, pos.y + splitSize.y, 0);
                geo.vertices[2] = new THREE.Vector3(pos.x + splitSize.x, pos.y, 0);
                geo.faceVertexUvs[0].push([
                    new THREE.Vector2(uv.u, uv.v + uvd.v),
                    new THREE.Vector2(uv.u + uvd.u, uv.v + uvd.v),
                    new THREE.Vector2(uv.u + uvd.u, uv.v)
                ]);
            }

            // メッシュを作成し、位置を調整
            var mesh = new THREE.Mesh(geo, material);
            mesh.position.set(
                base.x - pos.x - wholeSize.x / 2,
                base.y - pos.y - wholeSize.y / 2,
                0);

            // フレーム毎の回転量 (クオータニオン) と移動量を算出
            mesh.delta_quat = new THREE.Quaternion();
            var axis = new THREE.Vector3(randRot(), randRot(), randRot()).normalize();
            mesh.delta_quat.setFromAxisAngle(axis, 0.02 + Math.abs(randRot()) * 2);

            if (1)
            {
                mesh.delta_mov = new THREE.Vector3(randRot(), randRot(true), randRot(true));
                mesh.delta_mov.multiplyScalar(30);
            }
            else
            {
                var center = new THREE.Vector3(0, 0, 0);
                var dist = center.distanceTo(mesh.position);
                mesh.delta_mov = new THREE.Vector3(randRot(), randRot(), randRot());
                mesh.delta_mov.multiplyScalar((wholeSize.x * 1.5 - dist) / 8);
                console.log(mesh.position);
            }

            objs.push(mesh);
        }
    }

    return objs;
};

Game_SplashScreen.prototype.updateAnimation = function(duration)
{
    if (!this._splashObjs)
    {
        return;
    }

    this.updateObjects();
    if (duration >= 40)
    {
        this._splashMaterial.opacity -= 0.02;
    }
};

Game_SplashScreen.prototype.updateObjects = function()
{
    this._splashObjs.forEach(function(obj)
    {
        obj.quaternion.multiply(obj.delta_quat);
        obj.position.add(obj.delta_mov);
        obj.delta_mov.y -= 0.2;  // 落下
    });
};

Game_SplashScreen.prototype.render3d = function()
{
    this._texture3d.baseTexture.dirty();
    this._canvas3d.render(this._scene3d, this._camera);
};

//-----------------------------------------------------------------------------
// Game_Temp

/*
 * 画面割れエフェクト
 *
 * Scene_Map と Scene_Battle で共有する。
 */
Object.defineProperty(Game_Temp.prototype, 'splashScreen', {
    get: function()
    {
        return this._splashScreen;
    },
    set: function(value)
    {
        this._splashScreen = value;
    },
    configurable: true
});

//-----------------------------------------------------------------------------
// Scene_Map

/*
 * 画面割れエンカウントエフェクトの適用
 */
Scene_Map.prototype.applySplashEncounterEffect = function()
{
    var splash = new Game_SplashScreen();
    splash.createSplashEffect(this, 160);

    $gameTemp.splashScreen = splash;
    this.addChild(splash);
};

Scene_Map.prototype.startEncounterEffect = function()
{
    this._encounterEffectDuration = this.encounterEffectSpeed();
};

var _KMS_SplashEncount_Scene_Map_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect;
Scene_Map.prototype.updateEncounterEffect = function()
{
    if (this._encounterEffectDuration <= 0)
    {
        return;
    }

    this._encounterEffectDuration--;
    var speed = this.encounterEffectSpeed();
    var n = speed - this._encounterEffectDuration;

    if (n === 1)
    {
        this.createFadeSprite();  // 最上位を画面割れスプライトにするために事前作成
        this.applySplashEncounterEffect();
        this._spriteset.hideCharacters();
        this.snapForBattleBackground();
        this.startFadeOut(1);
        this.updateFade();
    }

    if (n === Math.floor(speed / 2))
    {
        BattleManager.playBattleBgm();
    }

    $gameTemp.splashScreen.render3d();
};

Scene_Map.prototype.encounterEffectSpeed = function()
{
    return Params.delay;
};

//-----------------------------------------------------------------------------
// Scene_Battle

var _KMS_SplashEncount_Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function()
{
    _KMS_SplashEncount_Scene_Battle_start.call(this);

    if ($gameTemp.splashScreen)
    {
        // 画面割れエフェクトをこのシーンに入れる
        this._encounterEffectDuration = this.encounterEffectSpeed();
        this.addChild($gameTemp.splashScreen);
    }
};

var _KMS_SplashEncount_Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function()
{
    _KMS_SplashEncount_Scene_Battle_update.call(this);

    if ($gameTemp.splashScreen)
    {
        this.updateEncounterEffect();
    }
};

Scene_Battle.prototype.updateEncounterEffect = function()
{
    this._encounterEffectDuration--;
    var speed = this.encounterEffectSpeed();
    var n = speed - this._encounterEffectDuration;
    $gameTemp.splashScreen.updateAnimation(n);
    $gameTemp.splashScreen.render3d();

    // エフェクトが終了したら破棄
    if ($gameTemp.splashScreen.isFinished())
    {
        $gameTemp.splashScreen.dispose();
        $gameTemp.splashScreen = null;
    }
};

Scene_Battle.prototype.encounterEffectSpeed = function()
{
    return 90;
};

})();
