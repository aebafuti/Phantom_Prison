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
  
Scene_Equip.prototype.createControlHelpWindow = function() {
	this._controlHelpWindow = new Window_ControlHelp(0, 0);
	this._controlHelpWindow.y = Graphics.boxHeight - this._controlHelpWindow.height;
	this._controlHelpWindow.setHandler('select', this.selectCancel.bind(this));
	this._controlHelpWindow.setHandler('cancel', this.cancel.bind(this));
	this._controlHelpWindow.setHandler('previous', this.previousActor.bind(this));
	this._controlHelpWindow.setHandler('next', this.nextActor.bind(this));
	this.addWindow(this._controlHelpWindow);
	this._controlHelpWindow.deselect();
	this._controlHelpWindow.pagingEnable(true);
};

Scene_Equip.prototype.selectCancel = function() {
    if (this._itemWindow.active) {
        this._itemWindow.deselect();
        //this._itemWindow.deactivate();
    }
};

Scene_Equip.prototype.cancel = function() {
    if (this._slotWindow.active) {
    	this.onSlotCancel();
    }else if (this._itemWindow.active) {
    	this.onItemCancel();
    }
};

Scene_Equip.prototype.selectSlot = function() {
	this._controlHelpWindow.deselect();
    this._slotWindow.activate();
    this._controlHelpWindow.activate();
};

Scene_Equip.prototype.selectItem = function() {
	this._controlHelpWindow.deselect();
    this._itemWindow.activate();
    this._controlHelpWindow.activate();
};

Scene_Equip.prototype.onSlotCancel = function() {
	if(this._controlHelpWindow.index() >= 0){
    	this.selectSlot();
    }else{
        this._slotWindow.deselect();
    	this.popScene();
    }
};

Scene_Equip.prototype.onItemCancel = function() {
	if(this._controlHelpWindow.index() >= 0){
    	this.selectItem();
    }else{
        this._slotWindow.activate();
        this._controlHelpWindow.activate();
    	this._itemWindow.deselect();
    }
    
};

Scene_Equip.prototype.createSlotWindow = function() {
	this.createControlHelpWindow();
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
	this._slotWindow.setHandler('ok',   this.onSlotOk.bind(this));
	this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
	this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
	this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
	this.addWindow(this._operateWindow);
	this.addWindow(this._slotWindow);
};
 
Scene_Equip.prototype.createItemWindow = function() {
	var wx = 0;
	var wy = this._statusWindow.y + this._statusWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy - this._controlHelpWindow.height;
	this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setStatusWindow(this._statusWindow);
	this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
	this._slotWindow.setItemWindow(this._itemWindow);
	this.addWindow(this._itemWindow);
};

Scene_Equip.prototype.onActorChange = function() {
	this.refreshActor();
	this._slotWindow.activate();
	this._itemWindow.deselect();
	this._controlHelpWindow.activate();
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

Scene_Equip.prototype.onItemOk = function() {
    SoundManager.playEquip();
    var lastEquip = this.actor().equips()[this._slotWindow.index()];
    if(lastEquip == this._itemWindow.item()){
    	this.actor().changeEquip(this._slotWindow.index(), null);
    }else{
    	this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
    }
    this._slotWindow.activate();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
};

//-----------------------------------------------------------------------------
// Window_Operate
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// EquipStatus
//-----------------------------------------------------------------------------

Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var h = this.height - this.padding * 2;
        this.drawActorFace(this._actor, 0, 0, 72, h);
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 6; i++) {
            this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
        }
    }
};

Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    this.drawParamName(x + this.textPadding() + 72, y, paramId);
    if (this._actor) {
        this.drawCurrentParam(x + 140, y, paramId);
    }
    this.drawRightArrow(x + 188, y);
    if (this._tempActor) {
        this.drawNewParam(x + 222, y, paramId);
    }
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.

Window_EquipItem.prototype.includes = function(item) {
    if (item === null) {
        return true;
    }
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
        return false;
    }
    return this._actor.canEquip(item);
};

/*
Window_EquipItem.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
    	if(this._slotId >= 0 && this._actor.equips()[this._slotId] !== null) {
    		this._data.unshift(null);
    	}else{
    		this._data.push(null);
    	}
    }
};
*/


})();

