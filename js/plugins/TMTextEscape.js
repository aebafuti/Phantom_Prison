//=============================================================================
// TMVplugin - メッセージ制御文字拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/15
//=============================================================================

/*:
 * @plugindesc 文章の表示に使える制御文字を追加します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * 『文章の表示』『選択肢の表示』で使用できます。
 *
 * \J[n]      # n 番の職業名に置き換えます。
 * \AJ[n]     # n 番のアクターの現在の職業名に置き換えます。
 * \PJ[n]     # n 番目のパーティメンバーの現在の職業名に置き換えます。
 * \IN[n]     # n 番のアイテム名（アイコン付き）に置き換えます。
 * \WN[n]     # n 番の武器名（アイコン付き）に置き換えます。
 * \AN[n]     # n 番の防具名（アイコン付き）に置き換えます。
 * \SN[n]     # n 番のスキル名（アイコン付き）に置き換えます。
 *
 */

var Imported = Imported || {};
Imported.TMTextEscape = true;

(function() {

  var _Window_Base_convertEscapeCharacters = 
      Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(/\x1bJ\[(\d+)\]/gi, function() {
      return this._className(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bAJ\[(\d+)\]/gi, function() {
      return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bPJ\[(\d+)\]/gi, function() {
        return this.partyMemberClassName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bIN\[(\d+)\]/gi, function() {
      return this.itemName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bWN\[(\d+)\]/gi, function() {
      return this.weaponName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
      return this.armorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bSN\[(\d+)\]/gi, function() {
      return this.skillName(parseInt(arguments[1]));
    }.bind(this));
    return text;
  };

  Window_Base.prototype._className = function(n) {
    var _class = n >= 1 ? $dataClasses[n] : null;
    return _class ? _class.name : '';
  };

  Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.partyMemberClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.itemName = function(n) {
    var item = n >= 1 ? $dataItems[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
      //return item.name
    }
    return '';
  };

  Window_Base.prototype.weaponName = function(n) {
    var item = n >= 1 ? $dataWeapons[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.armorName = function(n) {
    var item = n >= 1 ? $dataArmors[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.skillName = function(n) {
    var item = n >= 1 ? $dataSkills[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

})();
