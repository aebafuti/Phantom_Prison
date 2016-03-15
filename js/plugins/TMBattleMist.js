//=============================================================================
// TMVplugin - バトルミスト
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.11
// 最終更新日: 2016/03/04
//=============================================================================

/*:
 * @plugindesc 戦闘シーンにそれっぽい霧を表示します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param mistNumber
 * @desc 表示する霧スプライトの数です。
 * 初期値: 32
 * @default 32
 *
 * @param mistTopSide
 * @desc 霧を表示する一番上の座標（サイドビュー）
 * 初期値: 200
 * @default 200
 *
 * @param mistRangeSide
 * @desc 霧を表示する Y 方向の範囲（サイドビュー）
 * 初期値: 300
 * @default 300
 *
 * @param mistTopFront
 * @desc 霧を表示する一番上の座標（フロントビュー）
 * 初期値: 240
 * @default 240
 *
 * @param mistRangeFront
 * @desc 霧を表示する Y 方向の範囲（フロントビュー）
 * 初期値: 340
 * @default 340
 *
 * @param mistScale
 * @desc 霧の拡大率
 * 初期値: 1
 * @default 1
 *
 * @requiredAssets img/system/mist
 *
 * @help 霧の画像 mist.png を img/system に置いてください。
 *
 * ゲーム画面の解像度 816*624 に合わせてあるため
 * 解像度を変更すると表示が乱れる場合があります。
 *
 * プラグインコマンド:
 *   TMBattleMist stop          # バトルミストを無効にする
 *   TMBattleMist start         # バトルミストを有効にする
 */

var Imported = Imported || {};
Imported.TMBattleMist = true;

(function() {

  var parameters = PluginManager.parameters('TMBattleMist');
  var mistNumber     = Number(parameters['mistNumber']);
  var mistTopSide    = Number(parameters['mistTopSide']);
  var mistRangeSide  = Number(parameters['mistRangeSide']);
  var mistTopFront   = Number(parameters['mistTopFront']);
  var mistRangeFront = Number(parameters['mistRangeFront']);
  var mistScale      = Number(parameters['mistScale']);
  
  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isMistEnabled = function() {
    if (this._mistEnabled === undefined) {
      this._mistEnabled = true;
    }
    return this._mistEnabled;
  };

  Game_System.prototype.disableMist = function() {
    this._mistEnabled = false;
  };

  Game_System.prototype.enableMist = function() {
    this._mistEnabled = true;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TMBattleMist') {
      switch (args[0]) {
      case 'start':
        $gameSystem.enableMist();
        break;
      case 'stop':
        $gameSystem.disableMist();
        break;
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_TMBattleMist
  //

  function Sprite_TMBattleMist() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TMBattleMist.prototype = Object.create(Sprite.prototype);
  Sprite_TMBattleMist.prototype.constructor = Sprite_TMBattleMist;

  Sprite_TMBattleMist.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.loadBitmap();
    this.blendMode = 1;
    this.z = 5;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

  Sprite_TMBattleMist.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem('mist');
  };

  Sprite_TMBattleMist.prototype.setRandomPosition = function() {
    this.resetMist();
    if ($gameSystem.isSideView()) {
      var w = this.width * this.scale.x;
      this.x = Math.random() * (Graphics.width + w) - w / 2 - this.parent.x;
    } else {
      this.y = Math.random() * mistRangeFront + mistTopFront;
    }
    this.update();
  };

  Sprite_TMBattleMist.prototype.resetMist = function() {
    var r = Math.random();
    if ($gameSystem.isSideView()) {
      this._count = Math.floor(Math.random() * 180);
      this.y = r * mistRangeSide + mistTopSide;
      r = (r + 0.5) * mistScale;
      this.scale.set(r, r);
      this.x = -this.width / 2 * this.scale.x;
    } else {
      this.x = r * Graphics.width;
      this.y = mistTopFront;
      this._vx = (this.x - Graphics.width / 2) * 0.01;
    }
    this.x -= this.parent.x;
  };

  Sprite_TMBattleMist.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if ($gameSystem.isSideView()) {
      this.x += this.scale.x * 2 - 0.5;
      this._count++;
      if (this._count >= 180) {
        this._count = 0;
      }
      this.opacity = 208 + Math.sin(this._count * Math.PI / 90) * 16;
      if (this.x - this.width / 2 * this.scale.x > Graphics.width - this.parent.x) {
        this.resetMist();
      }
    } else {
      this.x += this._vx;
      this.y += mistScale;
      var w = this.width / 2;
      if (this.y > mistRangeFront + mistTopFront ||
          this.x < 0 - w - this.parent.x ||
          this.x > Graphics.width + w - this.parent.x) {
        this.resetMist();
      }
      this.updateScaleFront();
      this.updateOpacityFront();
    }
  };

  Sprite_TMBattleMist.prototype.updateOpacityFront = function() {
    var borderY = mistTopFront + mistRangeFront * 0.8;
    if (this.y > borderY) {
      this.opacity = 224 - (this.y - borderY) / (mistRangeFront * 0.2) * 224;
    } else {
      this.opacity = Math.min((this.y - mistTopFront) / mistScale * 8, 224);
    }
  };

  Sprite_TMBattleMist.prototype.updateScaleFront = function() {
    var r = (0.5 + (this.y - mistTopFront) / mistRangeFront) * mistScale;
    this.scale.set(r, r);
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Battle
  //

  var _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    this.createMists();
    this._back1Sprite.z = 0;
    this._back2Sprite.z = 1;
    for (var i = 0; i < this._enemySprites.length; i++) {
      this._enemySprites[i].z = 5;
    }
    this.updateActors();
    for (var j = 0; j < this._actorSprites.length; j++) {
      this._actorSprites[j].z = 5;
    }
  };

  Spriteset_Battle.prototype.createMists = function() {
    this._mistSprites = [];
    if ($gameSystem.isMistEnabled()) {
      for (var i = 0; i < mistNumber; i++) {
        this._mistSprites[i] = new Sprite_TMBattleMist();
        this._battleField.addChild(this._mistSprites[i]);
        this._mistSprites[i].setRandomPosition();
      }
    }
  };

  var _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    this._sortBattleField();
  };
  
  Spriteset_Battle.prototype._sortBattleField = function() {
    this._battleField.children.sort(function(a, b) {
      a.z = a.z === undefined ? 10 : a.z;
      b.z = b.z === undefined ? 10 : b.z;
      if (a.z !== b.z) {
        return a.z - b.z;
      } else if (a.y !== b.y) {
        return a.y - b.y;
      } else {
        return a.spriteId - b.spriteId;
      }
    });
  };

})();
