//=============================================================================
// TMVplugin - 最強全脱ぎコマンド削除
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.01
// 最終更新日: 2016/02/05
//=============================================================================

/*:
 * @plugindesc 装備シーンからコマンドウィンドウを削除し、
 * スロットウィンドウに２行分のスペースを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * スロットウィンドウがアクティブな状態で Shift キーを押せば最強装備、
 * Ctrl または Alt キーを押せば全て外すが実行されます。
 *
 * Q または W キーによるアクター変更もスロットウィンドウが
 * アクティブな状態で実行できます。
 *
 * 現在のバージョンではマウス、タッチ操作には対応していません。
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMOmitEquipCommand = true;

(function() {

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  var _Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function() {
    _Scene_Equip_create.call(this);
    this._slotWindow.activate();
    this._slotWindow.select(0);
  };

  var _Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
  Scene_Equip.prototype.createCommandWindow = function() {
    _Scene_Equip_createCommandWindow.call(this);
    this._commandWindow.hide();
    this._commandWindow.deactivate();
  };

  Scene_Equip.prototype.createSlotWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._statusWindow.y;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = this._statusWindow.height;
    this._operateWindow = new Window_Operate(wx, wy, ww);
    
    wy += this._operateWindow.height;
    wh -= this._operateWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
    this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._operateWindow);
    this.addWindow(this._slotWindow);
  };
  


  Scene_Equip.prototype.onActorChange = function() {
    this.refreshActor();
    this._slotWindow.activate();
  };
  
  Scene_Equip.prototype.commandOptimize = function() {
    SoundManager.playEquip();
    this.actor().optimizeEquipments();
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._slotWindow.activate();
  };

  Scene_Equip.prototype.commandClear = function() {
    SoundManager.playEquip();
    this.actor().clearEquipments();
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._slotWindow.activate();
  };

  Scene_Equip.prototype.commandRemove = function() {
    SoundManager.playEquip();
    this.actor().changeEquip(this._slotWindow.index(), null);
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._itemWindow.refresh();
    this._slotWindow.activate();
  };

  var _Scene_Equip_update = Scene_Equip.prototype.update;
  Scene_Equip.prototype.update = function() {
    _Scene_Equip_update.call(this);
    if (this._slotWindow.active) {
      if (Input.isTriggered('shift')) {
        this.commandRemove();
      } 
    }
  };

})();


//-----------------------------------------------------------------------------
// Window_Operate
//

function Window_Operate() {
    this.initialize.apply(this, arguments);
}

Window_Operate.prototype = Object.create(Window_Base.prototype);
Window_Operate.prototype.constructor = Window_Operate;

Window_Operate.prototype.initialize = function(x,y,width) {
    //var width = this.windowWidth();
    var height = this.windowHeight();
    //var x = (Graphics.boxWidth - width)/2;
    //var y = (Graphics.boxHeight - height)/2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Operate.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};



Window_Operate.prototype.windowY = function() {
    return ;
};

Window_Operate.prototype.refresh = function() {
    this.contents.clear();
    var width = this.contentsWidth();
    this.drawTextEx("Shift:装備解除", 0, 0);
};
