//
//  汎用ポップアップコア ver1.01
//
// author yana
//

var Imported = Imported || {};
Imported['CommonPopupCore'] = 1.01;

/*:
 * @plugindesc 汎用的なポップアップの仕組みを提供するためのベースプラグインです。
 * @author Yana
 * 
 * @param Text Back Color
 * @desc ポップアップの背景カラーです。
 * rgba(red,green,blue,alpha)で設定してください。
 * @default rgba(0,0,0,0.6)
 * 
 * @param Text Back FileName
 * @desc ポップアップの背景画像名です。
 * %dがインデックスに変換されます。
 * @default popup_back%d
 * 
 * @help プラグインコマンド
 * CommonPopup add param1 param2 param3 ・・・
 * 
 * 必要なパラメータのみを指定できます。
 *  例:プレイヤーの上にテストと240フレームポップアップさせる
 * CommonPopup add text:テスト count:240 eventId:-1
 * 
 * パラメータ詳細:
 * text:表示テキスト
 * eventId:表示するイベントのID
 * count:表示時間
 * delay:表示遅延
 * moveX:目標地点X(相対座標)
 * moveY:目標地点Y(相対座標)
 * sx:表示位置補正X
 * sy:表示位置補正Y
 * pattern:表示パターン
 * back:-1:透明背景,0:背景カラーで塗りつぶし,1以上:画像インデックス
 * bx:内容の表示位置補正X
 * by:内容の表示位置補正Y
 * extend: 
 * fixed:画面に固定するか？ true/falseで指定。
 * anchorX:
 * anchorY:
 * slideCount:新しいポップアップが発生した際、上にスライドさせる速度。
 * 
 * ------------------------------------------------------
 * 利用規約：特になし。素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * このプラグインは、汎用的なポップアップの仕組みを提供するプラグインです。
 * このプラグイン単体ではプラグインコマンドを追加する以外の機能はありません。
 * 追加機能として、
 * ・\I[x]で描画されるアイコンのサイズが文字サイズに追従する。
 * ・文字サイズ変更の制御文字、\FS[x]が追加される。
 * の2点が追加されます。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * containerが作成されていない状態で、ポップアップが登録される可能性のあるバグを修正しました。
 * ver1.00:
 * 公開
 */

function Sprite_Popup() {
	this.initialize.apply(this, arguments);
};

function CommonPopupManager() {
    throw new Error('This is a static class');
};
	
(function(){
	var parameters = PluginManager.parameters('CommonPopupCore');
	var commonPopupTextBackColor = String(parameters['Text Back Color'] || 'rgba(0, 0, 0, 0.6)');
	var commonPopupTextBackFileName = String(parameters['Text Back FileName'] || 'popup_back%d');
	
	var _cPU_GInterpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _cPU_GInterpreter_pluginCommand.call(this, command, args);
        if (command === 'CommonPopup') {
            switch (args[0]) {
            case 'add':
                this.addPopup(args);
                break;
            }
        }
    };
    
    Array.prototype.setNullPos = function(object){
    	for(var i=0; i < this.length; i++){
    		if (this[i] === null || this[i] === undefined){
    			this[i] = object;
    			return i;
    		}
    	}
    	this.push(object);
	};
	
	Array.prototype.compact = function() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			if (this[i] !== null && this[i] !== undefined) {
				result.push(this[i]);
			}
		}
		return result;
	};
    
    CommonPopupManager.initTempSprites = function(){
    	this._tempCommonSprites = new Array(50);
		this._setedPopups = [];
		this._readyPopup = [];
    };
    
    CommonPopupManager.window = function(){
    	if (this._window){return this._window };
    	this._window = new Window_Base(0,0,Graphics.boxWidth,Graphics.boxHeight);
    	return this._window;
    };
    
    CommonPopupManager.testBitmap = function(){
    	if (this._testBitmap){return this._testBitmap };
    	this._testBitmap = new Bitmap(1,1);
    	return this._testBitmap;
    };
	
	Sprite_Popup.prototype = Object.create(Sprite.prototype);
	Sprite_Popup.prototype.constructor = Sprite_Popup;
		
	Sprite_Popup.prototype.initialize = function(index){
		Sprite.prototype.initialize.call(this);
		this._index = index;
		this._count = 0;
		this._enable = false;
		this.update();
	};
	
	Sprite_Popup.prototype.setMembers = function(arg){
   		this._count = arg.count;
   		this._arg = arg;
    	this.anchor.x = arg.anchorX;
    	this.anchor.y = arg.anchorY;
		this.x = arg.x;
		this.y = arg.y;
    	this.z = 6;
    	this.visible = true;
    	this._enable = true;
    	this.createBitmap();
		if (arg.slideCount){ 
			CommonPopupManager._setedPopups.push([this._index, this.height, this._arg.slideCount]);
		};
	};
	
	Sprite_Popup.prototype.createBitmap = function(){
		if (this._arg.bitmap){
			this.bitmap = this._arg.bitmap;
		}else{
			CommonPopupManager.window().resetFontSettings();
			var text = this._arg.text;
			var width = CommonPopupManager.window().textWidth(text);
			var height = CommonPopupManager.window().contents.fontSize + 8;
			var sh = 8;
			if (this._arg.back === 0){ sh = 2 }
			CommonPopupManager.window().createContents();
			this.bitmap = new Bitmap(width+24,height+sh);
			this.drawBackRect(width+24,height+sh);
			CommonPopupManager.window().drawTextEx(this._arg.text,12,0);
			this.bitmap.blt(CommonPopupManager.window().contents,0,0,width+24,height+sh,this._arg.bx,this._arg.by+2);
		}
	};
	
	Sprite_Popup.prototype.drawBackRect = function(width,height){
		switch (this._arg.back){
			case 0:
				var color1 = commonPopupTextBackColor;
				var color2 = 'rgba(0,0,0,0)';
				var dSize = width / 4;
				this.bitmap.gradientFillRect(0,0,dSize,height,color2,color1);
				this.bitmap.fillRect(dSize,0,dSize*2,height,color1);
				this.bitmap.gradientFillRect(dSize*3,0,dSize,height,color1,color2);
				break;
			case -1:
				break;
			default:
				var fileName = commonPopupTextBackFileName;
				fileName = fileName.replace(/%d/g,this._arg.back);
				var bitmap = ImageManager.loadSystem(fileName);
				this.bitmap.blt(bitmap,0,0,bitmap.width,bitmap.height,0,0,this.bitmap.width,this.bitmap.height);
				bitmap.clear;
				bitmap = null;
		}
	};
	
	Sprite_Popup.prototype.update = function(){
		Sprite.prototype.update.call(this);
		if (CommonPopupManager._tempCommonSprites[this._index] && !this._enable){
			if (CommonPopupManager._tempCommonSprites[this._index].delay == 0){
				this.setMembers(CommonPopupManager._tempCommonSprites[this._index]);
			}else{
				CommonPopupManager._tempCommonSprites[this._index].delay--;
			}
		}
		if (this._count > 0){
			this._count--;
			switch(this._arg.pattern){
				case 0:
					this.updateSlide();
					break;
				default:
					this.updateAnime();
			}
			if (this._count == 0){ this.terminate() };
		}
		if (this._arg && this._arg.slideCount){ this.updateUpSlide() };
	};
	
	Sprite_Popup.prototype.updateUpSlide = function(){
		if (CommonPopupManager._setedPopups) {
			var array = CommonPopupManager._setedPopups.clone().reverse();
			var n = 0;
			for (var i = 0; i < array.length; i++) {
				if (this._index === array[i][0]) {
					this.y = this.y - n;
				}
				n += (array[i][1] * ((this._arg.slideCount - array[i][2]) / this._arg.slideCount));
			}
			for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
				CommonPopupManager._setedPopups[i][2]--;
				if (CommonPopupManager._setedPopups[i][2] < 0) {
					CommonPopupManager._setedPopups[i][2] = 0
				}
			}
		}
	};
	
	Sprite_Popup.prototype.updateSlide = function(){
		var originalWait = this._arg.count;
		var cnt = originalWait - this._count;
		this.opacity = 255;
      	var act = [(originalWait * 3) / 4 , originalWait / 4];
      	if (this._arg.extend !== ''){ act = this._arg.extend }
      	var oa = Math.max(originalWait - act[0],1);
      	var n1 = Math.max(originalWait / oa,0.1);
      	var up = (this._arg.moveY / (originalWait / n1));
      	var slide = (this._arg.moveX / (originalWait / n1));
      	var opTime1 =  originalWait / 3.0;
      	var moveX = 0;
      	var moveY = 0;
      	if (act[2]){ opTime1 = originalWait - act[2] } 
       	var opTime2 = originalWait / 3.0;
       	if (act[3]){ opTime2 = act[3] }
      	if (this._count >= act[0]){
        	this.opacity = Math.floor(255 * (cnt / opTime1));
        	moveY = Math.floor(up * cnt);
        	moveX = Math.floor(slide * cnt);
      	}else if (this._count < act[1]){
        	this.opacity = Math.floor(255 * (this._count / opTime2));
        	moveY = Math.floor((originalWait / n1) * up);
        	moveX = Math.floor((originalWait / n1) * slide);
      	}else{
        	moveY = Math.floor((originalWait / n1) * up);
        	moveX = Math.floor((originalWait / n1) * slide);
       	}
       	this._times = cnt
       	this.x = this._arg.x + moveX + this._arg.sx
       	this.y = this._arg.y + moveY + this._arg.sy
    	if (this._arg.fixed){
      		this.x -= $gameMap._displayX * 48
      		this.y -= $gameMap._displayY * 48
    	}
	};
	
	Sprite_Popup.prototype.updateAnime = function(){
		var anime = $dataAnimations[this._arg.pattern]
		var frameId = Math.floor((anime.frames.length * (this._arg.count - this._count)) / this._arg.count)
		if (frameId !== anime.frames.length ){
			var array = anime.frames[frameId][0];
			var x = array[1];
			var y = array[2];
			this.x = this._arg.x + array[1] + this._arg.sx;
			this.y = this._arg.y + array[2] + this._arg.sy;
			this.scale = new Point(array[3]/100,array[3]/100);
			this.rotation = array[4];
			this.opacity = array[6];
			this.blendMode = array[7];
		}		
	};
	
	Sprite_Popup.prototype.terminate = function(){
		this.bitmap = null;
		this.visible = false;
		this._enable = false;
		this._count = 0;
		this._arg = null;
		
		CommonPopupManager._tempCommonSprites[this._index].terminate = true;
		
		if (CommonPopupManager._setedPopups) {
			for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
				if (CommonPopupManager._setedPopups[i][0] === this._index) {
					delete CommonPopupManager._setedPopups[i];
				}
			}
			CommonPopupManager._setedPopups = CommonPopupManager._setedPopups.compact();
		}
	};
	
	Game_Interpreter.prototype.addPopup = function(argParam){
		var eventId = 0;
		for (var i=0;i<argParam.length;i++){
			if (argParam[i].match(/^eventId:(.+)/g)){
				eventId = Number(RegExp.$1);
				break;
			}
		}
		var character = this.character(eventId);
		var arg = CommonPopupManager.setPopup(argParam,character);
		if (arg.back > 0){
			CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg));
			CommonPopupManager._readyPopup.push(arg);
		}else{
			CommonPopupManager._tempCommonSprites.setNullPos(arg);
		}
	};
	
	CommonPopupManager.setPopup = function(argParam,character){
		var arg = {
			text:'',				// 表示テキスト
			eventId:-1, 			// 表示するイベントのID
			count:60, 				// 表示時間
			delay:0, 				// 表示遅延
			moveX:0,				// 目標地点X(相対座標)
			moveY:-48,				// 目標地点Y(相対座標)
			sx:0, 					// 表示位置補正X
			sy:0, 					// 表示位置補正Y
			pattern:0, 				// 表示パターン
			back:-1, 				// 背景に使う画像インデックス
			bx:0, 					// 内容の表示位置補正X
			by:0, 					// 内容の表示位置補正Y
			extend:'', 				// 
			fixed:true,				//
			anchorX:0.5,
			anchorY:0.5
		}
		var array = ['text','eventId','count','delay','moveX','moveY',
					 'sx','sy','pattern','back','bx','by','extend','fixed',
					 'anchorX','anchorY', 'slideCount'];
		for (var i=0;i < argParam.length;i++){
			if (i > 0){
				for (var j=0;j < array.length;j++){
					var r = new RegExp('(' + array[j] + ')' + ':(.+)');
				  	if (argParam[i].match(r)){
				  		var code = RegExp.$1;
				  		var value = RegExp.$2;
				  		if (code === 'text' || code === 'extend'){
				 			arg[code] = value;
						}else if (code === 'fixed'){
							arg[code] = value === 'true';
						}else{
					  		arg[code] = Number(value);
					  }
					}
				}
			}
		}
		if (character){
			var screenX = $gameParty.inBattle() ? 0 : character.screenX();
			var screenY = $gameParty.inBattle() ? 0 : character.screenY();
			var displayX = $gameParty.inBattle() ? 0 : $gameMap._displayX * 48;
			var displayY = $gameParty.inBattle() ? 0 : $gameMap._displayY * 48;
			arg.x = screenX + displayX;
			arg.y = screenY + displayY;
		}
		
		arg.terminate = false;
		return arg;
	}
	
	CommonPopupManager.setPopUpdate = function(){
		if (this._readyPopup){
			for (var i=0;i<this._readyPopup.length;i++){
				if (this._readyPopup[i]){
					var arg = this._readyPopup[i];
					if(ImageManager.isReady()){
						this.startPopup(arg);
						delete this._readyPopup[i];
						this._readyPopup.compact();
						return;
					}else{
						this.bltCheck(this.makeBitmap(arg));
					}
				}
			}
		}
	}
	
	CommonPopupManager.makeBitmap = function(arg){
		var fileName = commonPopupTextBackFileName;
		fileName = fileName.replace(/%d/g,arg.back);
		return ImageManager.loadSystem(fileName);
	}
	
	CommonPopupManager.bltCheck = function(bitmap){
		this.testBitmap().blt(bitmap,0,0,bitmap.width,bitmap.height,0,0);
		this.testBitmap().clear;
		bitmap.clear;
		bitmap = null;
	}
	
	CommonPopupManager.startPopup = function(arg){
		CommonPopupManager._tempCommonSprites.setNullPos(arg);
	}
	
	var _cPU_SsBase_initialize = Spriteset_Base.prototype.initialize;
	Spriteset_Base.prototype.initialize = function(){
		_cPU_SsBase_initialize.call(this);
		this.createSpritePopup();
	};
	
	var _cPU_SsBase_update = Spriteset_Base.prototype.update;
	Spriteset_Base.prototype.update = function(){
		_cPU_SsBase_update.call(this);
		if (this._popupContainer === undefined){ return }
		if(CommonPopupManager._tempCommonSprites){
			for(var i=0;i<CommonPopupManager._tempCommonSprites.length;i++){
				if (CommonPopupManager._tempCommonSprites[i]){
					if (CommonPopupManager._tempCommonSprites[i].terminate){
						var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
						this._popupContainer.removeChild(sprite);
						delete CommonPopupManager._tempCommonSprites[i]
					}else if (!CommonPopupManager._tempCommonSprites[i].sprite){
						var sprite = new Sprite_Popup(i)
						this._popupContainer.addChild(sprite);
						CommonPopupManager._tempCommonSprites[i].sprite = sprite;
					}
				}
			}
		}
	}
	
	var _cPU_SBase_update = Scene_Base.prototype.update;
	Scene_Base.prototype.update = function(){
		_cPU_SBase_update.call(this);
		if(CommonPopupManager){ CommonPopupManager.setPopUpdate() };
	}
	
	Spriteset_Base.prototype.createSpritePopup = function() {
   		var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = (Graphics.width - width) / 2;
    	var y = (Graphics.height - height) / 2;
    	this._popupContainer = new Sprite();
    	this._popupContainer.setFrame(x, y, width, height);
    	this.addChild(this._popupContainer);
	};
	
	var _cPU_SBase_terminate = Scene_Base.prototype.terminate;
	Scene_Base.prototype.terminate = function(){
		_cPU_SBase_terminate.call(this);
		this.terminatePopup();
	};
	
	Scene_Base.prototype.terminatePopup = function(){
		if (!CommonPopupManager._tempCommonSprites){
			CommonPopupManager.initTempSprites();
		}
		for(var i=0;i<CommonPopupManager._tempCommonSprites.length;i++){
			if (CommonPopupManager._tempCommonSprites[i]){
				var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
				if (sprite) { 
					sprite.terminate();
				}
				delete CommonPopupManager._tempCommonSprites[i];
			}
		}
		CommonPopupManager._setedPopupss = [];
		CommonPopupManager._readyPopup = [];
	}
	var _cPU_SMap_launchBattle = Scene_Map.prototype.launchBattle;
	Scene_Map.prototype.launchBattle = function(){
		_cPU_SMap_launchBattle.call(this);
		this.terminatePopup();
	}
	
	// 再定義　文字サイズに合わせてアイコンのサイズを調整する
	Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
		var nn = (32 - n) / 2;
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y, n, n);
	};

	// 再定義 processDrawIconをストレッチされた文字サイズに合わせたズレに調整する
	Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
		this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
		var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
		textState.x += n + 4;
	};

	// \FS[FontSize]の制御文字を追加する部分です。
	var _cPU_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
	Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		_cPU_Window_Base_processEscapeCharacter.call(this, code, textState);
		var param = this.obtainEscapeParam(textState);
		if (code == 'FS' && param != '') {
			this.makeFontSize(param)
		}
	};
	Window_Base.prototype.makeFontSize = function(fontSize) {
		this.contents.fontSize = fontSize;
	};
})();
