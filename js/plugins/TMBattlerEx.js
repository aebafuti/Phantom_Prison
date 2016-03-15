//=============================================================================
// TMVplugin - バトラー表示拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/11/24
//=============================================================================

/*:
 * @plugindesc エネミーに遠近感や息づかいの表現を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param baseY
 * @desc 拡大率が 1 になる Y 座標。
 * 初期値: 400
 * @default 400
 *
 * @param breathH
 * @desc 息づかいの大きさ。
 * 初期値: 0.05
 * @default 0.05
 *
 * @param mirrorRate
 * @desc 左右反転の確率。
 * 初期値: 0.4（ 0 ～ 1 ）
 * @default 0.4
 *
 * @help サイドビューでは左右反転が無効になります。
 * 
 * メモ欄（敵キャラ）タグ:
 *   <scale:1>       # 拡大率の個別設定
 *   <breathH:0.05>  # 息づかいの大きさを個別設定
 *   <noMirror>      # 左右反転を禁止
 * 
 * 拡大率の個別設定がある敵キャラには遠近感の表現が適用されません。
 * 
 * プラグインコマンドはありません。
 *
 */

var Imported = Imported || {};
Imported.TMBattlerEx = true;

(function() {

  var parameters = PluginManager.parameters('TMBattlerEx');
  var baseY = Number(parameters['baseY']);
  var breathH = Number(parameters['breathH']);
  var mirrorRate = Number(parameters['mirrorRate']);
  
  //-----------------------------------------------------------------------------
  // Sprite_Enemy
  //
  
  var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
  Sprite_Enemy.prototype.initialize = function(battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    var r = battler.enemy().meta['scale'];
    r = r ? Number(scale) : this.y / (baseY * 2) + 0.5;
    this._baseScale = new Point(r, r);
    if (!$gameSystem.isSideView() && Math.random() < mirrorRate &&
        !battler.enemy().meta['noMirror']) {
      this._baseScale.x = -r;
    }
    this._breathMax = Math.randomInt(90) + 90;
    this._breathCount = Math.randomInt(this._breathMax);
  };
  
  var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    this.updateScaleEx();
  };

  Sprite_Enemy.prototype.updateScaleEx = function() {
    this._breathCount++;
    if (this._breathCount >= this._breathMax) {
      this._breathMax = Math.randomInt(90) + 90;
      this._breathCount = 0;
    }
    var scaleX = this._baseScale.x;
    var scaleY = this._baseScale.y;
    var bh = this._enemy.enemy().meta['breathH'];
    bh = bh ? Number(bh) : breathH;
    scaleY += Math.sin(Math.PI * this._breathCount / (this._breathMax / 2)) * bh;
    this.scale.set(scaleX, scaleY);
  };

})();
