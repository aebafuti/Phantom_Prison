//=============================================================================
// AltMenuScreen2.js
//=============================================================================

/*:
 * @plugindesc Alternative menu screen layout.
 * @author Yoji Ojima, Sasuke KANNAZUKI
 * 
 * @param backGroundBitmap
 * @desc background bitmap file at img/pictures.
 * @default 
 * 
 * @param maxColsMenu
 * @desc max column at menu window
 * @default 4
 * 
 * @param commandRows
 * @desc number of visible rows at command window
 * @default 2
 *
 * @param isDisplayStatus
 * @desc whether display status or not. (1 = yes, 0 = no)
 * @default 0
 * 
 * @help This plugin does not provide plugin commands.
 *  The differences with AltMenuscreen are follows:
 *   - windows are transparent
 *   - it can set the menu's background bitmap.
 *   - picture is actors' original
 *
 * Actor' note:
 * <stand_picture:filename> set actor's standing picture at menu.
 *   put file at img/pictures.
 *
 * preferred size of actor's picture:
 * width: 174px(maxColsMenu=4), 240px(maxColsMenu=3)
 * height: 408px(commandRows=2), 444px(commandRows=1)
 */

/*:ja
 * @plugindesc レイアウトの異なるメニュー画面
 * @author Yoji Ojima, 神無月サスケ
 * 
 * @param backGroundBitmap
 * @desc 背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param maxColsMenu
 * @desc アクターを表示するウィンドウの1画面の登録最大数です。
 * @default 4
 * 
 * @param commandRows
 * @desc コマンドウィンドウの行数です。
 * @default 2
 *
 * @param isDisplayStatus
 * @desc ステータスを表示するかしないかを選びます。(1 = yes, 0 = no)
 * @default 0
 * 
 * @help このプラグインには、プラグインコマンドはありません。
 *
 *  AltMenuscreen との違いは以下です:
 *  - ウィンドウが透明です
 *  - 背景ビットマップを付けることが出来ます。
 *  - アクターに立ち絵を利用します。
 *
 * アクターのメモに以下のように書いてください:
 * <stand_picture:ファイル名> ファイル名が、そのアクターの立ち絵になります。
 *   ファイルは img/pictures に置いてください。
 *
 * 望ましいアクター立ち絵のサイズ：
 * 幅：3列:240px, 4列：174px
 * 高さ： コマンドウィンドウ 1行:444px 2行:408px
 *
 */
	
(function() {

    // set parameters
    var parameters = PluginManager.parameters('AltMenuScreen2');
    var backGroundBitmap = parameters['backGroundBitmap'] || '';
    var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 4);
    var rowsCommandWnd = Number(parameters['commandRows'] || 2);
    var isDisplayStatus = !!Number(parameters['isDisplayStatus']);

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        // make transparent for all windows at menu scene.
        this._statusWindow.opacity = 0;
        //this._goldWindow.opacity = 0;
        //this._commandWindow.opacity = 0;
        
        this._wheelHelpWindow = new Window_WheelHelp();
	    this._wheelHelpWindow.x = 0;
	    this._wheelHelpWindow.y = this._statusWindow.y + this._statusWindow.height;
	    this.addWindow(this._wheelHelpWindow);
	    
	    //魔術、装備、ステータスから戻る場合
	    switch (this._commandWindow.currentSymbol()) {
		    case 'skill':
		    case 'equip':
		    case 'status':
		    	this._commandWindow.deactivate();
		        this.commandPersonal();
		        break;
    	}
    };
    
	var _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
	Scene_Menu.prototype.commandPersonal = function() {
	    _Scene_Menu_commandPersonal.call(this);
	    if ($gameParty.size() > 4) this._wheelHelpWindow.show();
	};


	var _Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
	Scene_Menu.prototype.commandFormation = function() {
	    _Scene_Menu_commandFormation.call(this);
	    if ($gameParty.size() > 4) this._wheelHelpWindow.show();
	};
	
	var _Scene_Menu_onPersonalCancel = Scene_Menu.prototype.onPersonalCancel;
	Scene_Menu.prototype.onPersonalCancel = function() {
		_Scene_Menu_onPersonalCancel.call(this);
		this._wheelHelpWindow.hide();
	};
	
	var _Scene_Menu_onFormationCancel = Scene_Menu.prototype.onFormationCancel;
	Scene_Menu.prototype.onFormationCancel = function() {
		_Scene_Menu_onFormationCancel.call(this);
		this._wheelHelpWindow.hide();
	};
	
    // load bitmap that set in plugin parameter
    var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function(){
        if(backGroundBitmap){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(backGroundBitmap);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Menu_createBackground.call(this);
    };
    
    Scene_Menu.prototype.createCommandWindow = function() {
	    this._commandWindow = new Window_MenuCommand(0, 0);
	    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
	    this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
	    this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
	    this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
	    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
	    this._commandWindow.setHandler('talk',      this.commandTalk.bind(this));
	    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
	    this._commandWindow.setHandler('save',      this.commandSave.bind(this));
	    //this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
	    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
	    this.addWindow(this._commandWindow);
	};
	
	Scene_Menu.prototype.commandTalk = function() {
		SceneManager.pop();
	    $gameTemp.reserveCommonEvent(10);
	};
	
	
//-----------------------------------------------------------------------------
// Window_MenuCommand
//-----------------------------------------------------------------------------
	
	Window_MenuCommand.prototype.makeCommandList = function() {
	    this.addMainCommands();
	    this.addOriginalCommands();
	    this.addFormationCommand();
	    this.addSaveCommand();
	    this.addOptionsCommand();
	    //this.addGameEndCommand();
	};
	
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		var enabled = $gameParty.size() >= 2 && !$gameSwitches.value(4);
		if(talkCheckUnread() && enabled){
			this.addCommand("会話\\I[12]", 'talk', enabled);
		}else{
			this.addCommand("会話", 'talk', enabled);
		}
	};
	
	
    
    Window_MenuCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 4;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return rowsCommandWnd;
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(rowsCommandWnd);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return maxColsMenuWnd;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };

	Window_MenuStatus.prototype.loadImages = function() {
	    $gameParty.members().forEach(function(actor) {
	    	var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        	var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
	    }, this);
	    ImageManager.loadFace('Actor5');
	};
	
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // load stand_picture
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        if(bitmap){
            var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            var dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2;
            var dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
        } else { // when bitmap is not set, do the original process.
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        }
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        if(!isDisplayStatus){
            return;
        }
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        //this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function() {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

//-----------------------------------------------------------------------------
// Scene_Item
//-----------------------------------------------------------------------------

var _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    _Scene_Item_create.call(this);
    this.createNumberWindow();
	this.createEffectWindow();
};

Scene_Item.prototype.createActorWindow = function() {
	this._effectWindow = new Window_Effect();
	this.addWindow(this._effectWindow);
	
    this._actorWindow = new Window_MenuActor();
    this._actorWindow.setHelpWindow(this._effectWindow);
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_Item.prototype.createNumberWindow = function() {
    this._numberWindow = new Window_Number();
    this._numberWindow.y = this._actorWindow.y + this._actorWindow.height;
	this.addWindow(this._numberWindow);
};

Scene_Item.prototype.createEffectWindow = function() {
    //this._effectWindow = new Window_Effect();
    this._effectWindow.x = this._numberWindow.x + this._numberWindow.width;
    this._effectWindow.y = this._actorWindow.y + this._actorWindow.height;
	//this.addWindow(this._effectWindow);
};

var _Scene_Item_onItemOK = Scene_Item.prototype.onItemOk;
Scene_Item.prototype.onItemOk = function() {
	_Scene_Item_onItemOK.call(this);
	var number = $gameParty.numItems(this.item());
	this._numberWindow.refresh(number);
    this._numberWindow.show();
    this.setGrowItem();
    
};

Scene_Item.prototype.setGrowItem = function() {
	var paramId = false;
	if(this._actorWindow.index() != 0){
    }
    this.item().effects.some(function(effect) {
	paramId = effect.code == Game_Action.EFFECT_GROW ? effect.dataId : false;
	    }, this);
	if (paramId){
		var param = $gameParty.members()[this._actorWindow.index()].param(paramId);
		this._effectWindow.setParamId(paramId);
		this._actorWindow.updateHelp();
		this._effectWindow.show();
	}
};


Scene_Item.prototype.onActorCancel = function() {
    Scene_ItemBase.prototype.onActorCancel.call(this);
    this._numberWindow.hide();
    this._effectWindow.hide();
};

var _Scene_Item_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function() {
    _Scene_Item_useItem.call(this);
    var number = $gameParty.numItems(this.item());
    this._numberWindow.refresh(number);
	this._effectWindow.refresh();
};

//-----------------------------------------------------------------------------
// Window_MenuActor
//-----------------------------------------------------------------------------
Window_MenuActor.prototype.setHelpWindowEffect = function(actor) {
    if (this._helpWindow) {
        this._helpWindow.setActor(actor);
    }
};


Window_MenuActor.prototype.updateHelp = function() {
	if(this.index() >=0){
    	this.setHelpWindowEffect($gameParty.members()[this.index()]);
    }
};

//-----------------------------------------------------------------------------
// Window_Number
//-----------------------------------------------------------------------------

function Window_Number() {
    this.initialize.apply(this, arguments);
}

Window_Number.prototype = Object.create(Window_Base.prototype);
Window_Number.prototype.constructor = Window_Number;

Window_Number.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.hide();
};

Window_Number.prototype.windowWidth = function() {
    return 200;
};

Window_Number.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Number.prototype.refresh = function(number) {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawText("所持数:", 0, 0, width);
    this.drawText(number, 0, 0, width, 'right');
};


//-----------------------------------------------------------------------------
// Window_Effect
//-----------------------------------------------------------------------------

function Window_Effect() {
    this.initialize.apply(this, arguments);
}

Window_Effect.prototype = Object.create(Window_Base.prototype);
Window_Effect.prototype.constructor = Window_Effect;

Window_Effect.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._actor = null;
    this._paramId = 0;
    this.hide();
};

Window_Effect.prototype.windowWidth = function() {
    return 320;
};

Window_Effect.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Effect.prototype.setActor = function(actor) {
    this._actor = actor;
    this.refresh();
};

Window_Effect.prototype.setParamId = function(paramId) {
	this._paramId = paramId;
};

Window_Effect.prototype.refresh = function() {
	var param;
	var name;
	if( this._paramId == 7 ){
		if (this._actor.level >= this._actor.maxLevel()){
			param = "----";
		}else{
			param = this._actor.nextRequiredExp();
		}
		name = TextManager.expNext.format(TextManager.level);
		this.width = 320;
	}else{
		param = this._actor.param(this._paramId);
		name = TextManager.param(this._paramId);
		this.width = 200;
	}
    var x = this.textPadding();
    var width = this.width - this.standardPadding() * 2;
    this.contents.clear();
    this.drawText(name + ":", 0, 0, width);
    this.drawText(param, 0, 0, width, 'right');
};

})();
