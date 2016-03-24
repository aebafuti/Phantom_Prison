/*:ja
 * @plugindesc メッセージウインドウを文章の長さに応じて可変にしたり、名前ウインドウを表示させます。
 * @author 饗庭淵
 *
 * @param 
 * @desc 
 * @default 
 *
 * @helpプラグインコマンド：
 *Name 名前 # 名前ウインドウに名前を表示させます
 *Name  　　# なにも入力しないことで名前ウインドウを消します
 */



(function () {
	var nameTag;	
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Name') {
        	nameTag = args[0];
        	}
        }
    };

	//-----------------------------------------------------------------------------
	// Window_Base
	//
	// The superclass of all windows within the game.

	Window_Base.prototype.windowSize = function(text) {
		var textWidth = 0;
	    var textTable = text.split('\n');
	    var textLine = text.split('\n').length;
	    for (i = 0; i < textLine; i++){
	    	textWidth = Math.max(this.textWidth(textTable[i]), textWidth);
	    }
		this.width = textWidth + this.standardPadding() * 2;
		this.height = textLine * this.lineHeight() + this.standardPadding() * 2;
	};

	//-----------------------------------------------------------------------------
	// Window_Message
	//

	Window_Message.prototype.initialize = function() {
	    var width = this.windowWidth();
	    var height = this.windowHeight();
	    var x = (Graphics.boxWidth - width) / 2;
	    Window_Base.prototype.initialize.call(this, x, 0, width, height);
	    //this.openness = 0;
	    this.hide();
	    this.initMembers();
	    this.createSubWindows();
	    this.updatePlacement();
	};

	var _Window_Message_subWindows = Window_Message.prototype.subWindows;
	Window_Message.prototype.subWindows = function() {
	    return [this._goldWindow, this._choiceWindow,
	            this._numberWindow, this._itemWindow, this._nameWindow];
	_Window_Message_subWindows.call(this);
	};

	var _Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
	    this._goldWindow = new Window_Gold(0, 0);
	    this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
	    this._goldWindow.openness = 0;
	    this._choiceWindow = new Window_ChoiceList(this);
	    this._numberWindow = new Window_NumberInput(this);
	    this._itemWindow = new Window_EventItem(this);
	    this._nameWindow = new Window_Name();
	    //this._nameWindow.openness = 0;
	   _Window_Message_createSubWindows.call(this);
	};

	var _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
	    _Window_Message_startMessage.call(this);
	    this.windowSize(this._textState.text);	//テキストの長さに応じてウィンドウ幅を決定
	    this.updatePlacement();
	    this.updateBackground();
	    this._nameWindow.text(nameTag);
	    this.show();
	    //this.processVirtual();
	};


	Window_Message.prototype.updatePlacement = function() {
		this.x = (Graphics.boxWidth - this.width) / 2;
	    this._positionType = $gameMessage.positionType();
	    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
	    this.y -= 24;
	    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
	    this._nameWindow.x = this.x;
	    this._nameWindow.y = this.y - this._nameWindow.height;
	    
	};

	//var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function() {
	    this.hide();
	    this._goldWindow.hide();
	    this._nameWindow.hide();
	    $gameMessage.clear();
	    //_Window_Message_terminateMessage.call(this);
	};

	Window_Message.prototype.updateShowFast = function() {
	    this._showFast = true;
	};

	Window_Message.prototype.isAnySubWindowActive = function() {
	    return (this._choiceWindow.active ||
	            this._numberWindow.active ||
	            this._itemWindow.active);
	};

	Window_Message.prototype.startInput = function() {
	    if ($gameMessage.isChoice()) {
	        this._choiceWindow.start();
	        return true;
	    } else if ($gameMessage.isNumberInput()) {
	        this._numberWindow.start();
	        return true;
	    } else if ($gameMessage.isItemChoice()) {
	        this._itemWindow.start();
	        return true;
	    } else {
	        return false;
	    }
	};


	//-----------------------------------------------------------------------------
	// Window_Name
	//

	function Window_Name() {
	    this.initialize.apply(this, arguments);
	}

	Window_Name.prototype = Object.create(Window_Base.prototype);
	Window_Name.prototype.constructor = Window_Name;

	Window_Name.prototype.initialize = function() {
	    Window_Base.prototype.initialize.call(this, 0, 0, 120, 56);
	    this.contents.fontSize = 22;
	    this.hide();
	};

	Window_Name.prototype.text = function(name) {
		this.contents.clear();
		if (name){
	    	this.drawText(name, 0, -8, 120);
	    	this.width = this.textWidth(name) + this.standardPadding() * 2;
	    	this.show();
	    }
	};

})();
