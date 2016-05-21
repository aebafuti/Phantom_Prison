//=============================================================================
// TMVplugin - 自動ニューゲーム
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2015/12/25
//=============================================================================

/*:
 * @plugindesc 起動時に自動ではじめからゲームを開始します。
 * Web用ミニゲームなど、タイトルが不要な場合に使えます。
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param autoNewGame
 * @desc 自動ではじめからゲームを開始する。
 * 初期値: 1（ 0 で無効 / 1 で有効）
 * @default 1
 *
 * @param allwaysOnTop
 * @desc 常にゲームウィンドウを最前面に表示する。
 * 初期値: 1（ 0 で無効 / 1 で有効）
 * @default 1
 *
 * @param autoDevTool
 * @desc 自動でデベロッパツールを開く。
 * 初期値: 1（ 0 で無効 / 1 で有効）
 * @default 1
 *
 * @help プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMAutoNewGame = true;

(function() {

  var parameters = PluginManager.parameters('TMAutoNewGame');
  var autoNewGame  = parameters['autoNewGame'] === '1' ? true : false;
  var allwaysOnTop = parameters['allwaysOnTop'] === '1' ? true : false;
  var autoDevTool  = parameters['autoDevTool'] === '1' ? true : false;

  Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
    } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      if (Utils.isNwjs() && Utils.isOptionValid('test') && autoDevTool) {
        require('nw.gui').Window.get().showDevTools().moveTo(0, 0);
        require('nw.gui').Window.get().setAlwaysOnTop(allwaysOnTop);
        window.focus();
      }
      
      SceneManager.goto(DataManager.isAnySavefileExists() ? Scene_Title : Scene_Map);
      Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  };

})();


//-----------------------------------------------------------------------------

Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._loadSuccess = false;
};

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
    this.createConfirmWindow();
};

Scene_Title.prototype.createConfirmWindow = function() {
	this._cautionWindow = new Window_Caution();
    this._confirmWindow = new Window_Confirm();
    this._cautionWindow.y -= this._cautionWindow.height;
    this._confirmWindow.y = this._cautionWindow.y + this._cautionWindow.height;
    this._confirmWindow.setHandler('ok',  this.confirmOk.bind(this));
    this._confirmWindow.setHandler('cancel', this.confirmcancel.bind(this));
    this.addWindow(this._cautionWindow);
    this.addWindow(this._confirmWindow);
}

Scene_Title.prototype.confirmOk = function() {
	DataManager.setupNewGame();
	this._cautionWindow.hide();
	this._confirmWindow.hide();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.confirmcancel = function() {
	this._cautionWindow.hide();
	this._confirmWindow.hide();
	this._commandWindow.activate();
};

Scene_Title.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};

Scene_Title.prototype.commandNewGame = function(another) {
	if(DataManager.isAnySavefileExists() && !another){
		this._commandWindow.deactivate();
		this._cautionWindow.show();
		this._confirmWindow.show();
		this._confirmWindow.activate();
	}else{
    	this.confirmOk();
    }
};

Scene_Title.prototype.commandContinue = function() {
    this._commandWindow.close();
    if(DataManager.loadGame(1)){
    	this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
    //SceneManager.push(Scene_Load);
};

Scene_Title.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
    $gameSystem.onAfterLoad();
};

Scene_Title.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    //this.activateListWindow();
};

Scene_Title.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};

//-----------------------------------------------------------------------------
// Scene_Menu
//-----------------------------------------------------------------------------

Scene_Menu.prototype.commandSave = function() {
	this.onSaveSuccess();
	//Scene_File.prototype.onSavefileOk.call(this);
    //$gameSystem.onBeforeSave();
    //if (DataManager.saveGame(1)) {
    //    this.onSaveSuccess();
    //} else {
    //    this.onSaveFailure();
    //}
    //SceneManager.push(Scene_Save);
};

Scene_Menu.prototype.onSavefileOk = function() {

};

Scene_Menu.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    this.popScene();
    $gameTemp.reserveCommonEvent(21);
};

Scene_Menu.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    //this.activateListWindow();
};



//-----------------------------------------------------------------------------
// Window_Confirm
//-----------------------------------------------------------------------------

function Window_Confirm() {
    this.initialize.apply(this, arguments);
}

Window_Confirm.prototype = Object.create(Window_HorzCommand.prototype);
Window_Confirm.prototype.constructor = Window_Confirm;

Window_Confirm.prototype.initialize = function() {
	var width = this.windowWidth();
	var x = (Graphics.boxWidth - width)/2;
    Window_HorzCommand.prototype.initialize.call(this, x, 0);
    this.select(1);
	this.hide();
	this.deactivate();
};

Window_Confirm.prototype.windowWidth = function() {
    return 380;
};

Window_Confirm.prototype.maxCols = function() {
    return 2;
};


Window_Confirm.prototype.makeCommandList = function() {
    this.addCommand("はい", 'ok');
    this.addCommand("いいえ", 'cancel');
};


//-----------------------------------------------------------------------------
// Window_Caution
//

function Window_Caution() {
    this.initialize.apply(this, arguments);
}

Window_Caution.prototype = Object.create(Window_Base.prototype);
Window_Caution.prototype.constructor = Window_Caution;

Window_Caution.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width)/2;
    var y = (Graphics.boxHeight - height)/2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.hide();
};

Window_Caution.prototype.windowWidth = function() {
    return 380;
};

Window_Caution.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};



Window_Caution.prototype.windowY = function() {
    return ;
};

Window_Caution.prototype.refresh = function() {
    this.contents.clear();
    var width = this.contentsWidth();
    this.drawTextEx("現在の進行は失われますが"+ "\n" + "よろしいですか？", 0, 0);
};
