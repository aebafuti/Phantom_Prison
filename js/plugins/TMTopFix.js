//=============================================================================
// TMVplugin - 先頭並び替え不可
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/04
//=============================================================================

/*:
 * @plugindesc パーティの先頭にいるアクターの並び替えを禁止します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * ゲーム開始時は先頭アクターの並び替えが禁止の状態になります。
 * 必要に応じてプラグインコマンドで解除してください。
 *
 * プラグインコマンド:
 *   TMTopFix stop      # 先頭並び替え禁止を解除します。
 *   TMTopFix start     # 先頭並び替えを禁止します。
 *
 */

var Imported = Imported || {};
Imported.TMTopFix = true;

(function() {

  Game_System.prototype.setTopFix = function(topFix) {
    this._topFix = topFix;
  };

  Game_System.prototype.isTopFix = function() {
    this._topFix = this._topFix === undefined ? true : this._topFix;
    return this._topFix;
  };
  
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TMTopFix') {
      switch (args[0]) {
      case 'stop':
        $gameSystem.setTopFix(false);
        break;
      case 'start':
        $gameSystem.setTopFix(true);
        break;
      }
    }
  };

  var _Window_MenuStatus_isCurrentItemEnabled =
      Window_MenuStatus.prototype.isCurrentItemEnabled;
  Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if ($gameSystem.isTopFix() && this._formationMode &&
        this.index() === 0) {
      return false;
    } else {
      return _Window_MenuStatus_isCurrentItemEnabled.call(this);
    }
  };

})();
