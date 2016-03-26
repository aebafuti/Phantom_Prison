//=============================================================================
// BattleActorFaceVisibility.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.2 2016/02/13 他のプラグインと併用できるように、ウィンドウの表示位置を調整する機能を追加
//                  ウィンドウの表示順をヘルプウィンドウの下に変更
// 1.1.1 2015/12/28 任意のエネミーグラフィック画像を指摘できる機能を追加
//                  ウィンドウを非表示にする機能を追加
// 1.1.0 2015/12/27 顔グラフィックの代わりに任意のピクチャ画像を指定できる機能を追加
// 1.0.1 2015/11/19 サイドビューでも表示されるように仕様変更
// 1.0.0 2015/11/13 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Plugin that to visualize face graphic in battle
 * @author triacontane
 *
 * @param WindowVisible
 * @desc Window visible flg(ON/OFF)
 * @default ON
 *
 * @param WindowXCustom
 * @desc Window X Position
 * @default
 *
 * @param WindowYCustom
 * @desc Window Y Position
 * @default
 *
 * @help Plugin that to visualize face graphic in battle
 * This plugin is released under the MIT License.
 *
 * No plugin command
 */
/*:ja
 * @plugindesc 戦闘中顔グラフィック表示プラグイン
 * @author トリアコンタン
 *
 * @param ウィンドウ表示
 * @desc 背景ウィンドウの表示フラグです。(ON/OFF)
 * @default ON
 *
 * @param ウィンドウX座標
 * @desc ウィンドウの表示 X 座標です。省略するとデフォルト値になります。
 * @default
 *
 * @param ウィンドウY座標
 * @desc ウィンドウの表示 X 座標です。省略するとデフォルト値になります。
 * @default
 *
 * @help 戦闘中、コマンド選択ウィンドウの上に
 * 顔グラフィックが表示されるようになります。
 *
 * 顔グラフィックを任意のピクチャ画像に差し替えることも可能です。
 * アクターのデータベースのメモ欄に
 * 「<face_picture:（拡張子を除いたピクチャのファイル名）>」
 * と入力してください。制御文字「\V[n]」が利用可能です。
 *
 * 顔グラフィックを任意のエネミー画像に差し替えることも可能です。
 * アクターのデータベースのメモ欄に
 * 「<face_enemy_id:（データベース「敵キャラ」のID）>」
 * と入力してください。制御文字「\V[n]」が利用可能です。
 *
 * 顔グラフィックより大きいピクチャを指定すると自動で同じサイズに縮小されます。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function () {
    'use strict';
    var pluginName = 'BattleActorFaceVisibility';
        //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return (value || '').toUpperCase() == 'ON';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var isParamExist = function(paramNames) {
        return getParamOther(paramNames) != null;
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var getArgString = function (arg, upperFlg) {
        arg = convertEscapeCharacters(arg);
        return upperFlg ? arg.toUpperCase() : arg;
    };

    var getArgNumber = function (arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };
 
    //=============================================================================
    // Scene_Battle
    //=============================================================================
    var _Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function() {
        _Scene_Battle_create.call(this);
        this.loadImages();  // 非同期処理のためあらかじめロードしておく
		this._actorId = 0;
    };
    
    var _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
    	_Scene_Battle_createSpriteset.call(this);
		this.createStandSprite();
	};
	
	var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		_Scene_Battle_createAllWindows.call(this);
	   this.createEscapeHelpWindow();
	};
	
	Scene_Battle.prototype.createEscapeHelpWindow = function() {
	    this._escapeHelpWindow = new Window_EscapeHelp();
	    this._escapeHelpWindow.x = this._actorCommandWindow.x;
	    //this._escapeHelpWindow.x = 0
	    this._escapeHelpWindow.y = this._actorCommandWindow.y - this._escapeHelpWindow.height;
		this.addWindow(this._escapeHelpWindow);
	};


	Scene_Battle.prototype.createStandSprite = function() {
		this._standSprite = new Sprite();
		this.addChild(this._standSprite);
	};

	Scene_Battle.prototype.loadImages = function() {
		$gameParty.members().forEach(function(actor) {
			var meta = actor.actor().meta;
			if (meta != null && meta.face_picture) {
				ImageManager.loadPicture(getArgString(meta.face_picture));
			}
		}, this);
	};

	var _Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_Scene_Battle_update.call(this);
	    this.standUpdate();
	};

	Scene_Battle.prototype.standUpdate = function() {
	    var actor = BattleManager.actor();
	    if (actor && this._actorId != actor.actorId()) {
		    this.drawActorFace(actor);
		    this._actorId = actor.actorId();
		    this._standSprite.visible = true;
		    if(BattleManager.canEscape()) this._escapeHelpWindow.show();
	    }
	    if (actor == null && this._actorId != 0) {
		    this._actorId = 0;
		    this._standSprite.visible = false;
		    this._escapeHelpWindow.hide();
	    }
	};

	Scene_Battle.prototype.drawActorFace = function(actor) {
		var meta = actor.actor().meta;
		if (meta != null && meta.face_picture) {
			this.drawPicture(getArgString(meta.face_picture), ImageManager.loadPicture.bind(ImageManager));
		}
	};

	Scene_Battle.prototype.drawPicture = function(fileName, loadHandler) {
		var bitmap = loadHandler(fileName);
		if (bitmap.isReady()) {
			this._standSprite.bitmap  = bitmap;
		} else {
			throw new Error('何らかの原因で画像' + fileName + 'のロードに失敗しました。');
		}
	};

	var _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
	Scene_Battle.prototype.selectEnemySelection = function() {
		_Scene_Battle_selectEnemySelection.call(this);
		this._standSprite.visible = false;
		this._escapeHelpWindow.hide();
	};

	var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
	Scene_Battle.prototype.onEnemyCancel = function() {
		_Scene_Battle_onEnemyCancel.call(this);
		this._standSprite.visible = true;
		if(BattleManager.canEscape()) this._escapeHelpWindow.show();

	};


//-----------------------------------------------------------------------------
// Window_EscapeHelp
//

function Window_EscapeHelp() {
    this.initialize.apply(this, arguments);
}

Window_EscapeHelp.prototype = Object.create(Window_Base.prototype);
Window_EscapeHelp.prototype.constructor = Window_EscapeHelp;

Window_EscapeHelp.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    this.opacity = 0;
    this.hide();
};

Window_EscapeHelp.prototype.windowWidth = function() {
    return 280;
};

Window_EscapeHelp.prototype.windowHeight = function() {
    return this.fittingHeight(1) - 36;
};

Window_EscapeHelp.prototype.contentsWidth = function() {
    return this.width;
};

Window_EscapeHelp.prototype.contentsHeight = function() {
    return this.height;
};

Window_EscapeHelp.prototype.windowY = function() {
    return ;
};

Window_EscapeHelp.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontSize = 20;
    this.padding = 0;
    var width = this.contentsWidth();
    this.drawText("キャンセル:戦闘/逃走", 4, 0, width, 'left');
    this.contents.fontSize = this.standardFontSize();
};

})();

