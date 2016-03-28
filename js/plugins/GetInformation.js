//
//  入手インフォメーション ver1.04
//
// author yana
//

var Imported = Imported || {};
Imported['GetInformation'] = 1.04;

if (!Imported.CommonPopupCore) {
	console.error('CommonPopupCoreを導入してください。')
}
/*:
 * @plugindesc ver1.04/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。
 * @author Yana
 * 
 * @param Info Disable Switch Id
 * @desc 入手インフォメーションを無効化するためのスイッチのIDです。
 * このスイッチがONの時、インフォメーションが無効化されます。
 * @default 10
 * 
 * @param Use Battle Info
 * @desc 入手インフォメーションを戦闘中に使用するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Use Rewards Info
 * @desc 戦利品を入手インフォメーションで表示するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Info Font Size
 * @desc 入手インフォメーションの文字サイズです。
 * @default 20
 * 
 * @param Info Count
 * @desc 入手インフォメーションの表示時間です。
 * @default 120
 * 
 * @param Info Delay
 * @desc 入手インフォメーションのディレイです。
 * 連続で設定された時、この数値の表示ディレイがかかります。
 * @default 20
 * 
 * @param Info MoveWait
 * @desc 入手インフォメーションが完全に表示された状態の時間です。
 * @default 100
 * 
 * @param Info MoveFade
 * @desc 入手インフォメーションのフェードの時間です。
 * @default 10
 * 
 * @param Gold Icon Index
 * @desc 所持金のアイコンとして使用するアイコンのインデックスです。
 * @default 314
 * 
 * @param Get Gold Text
 * @desc 所持金の増加で表示されるテキストです。。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[24]手に入れた！
 * 
 * @param Lost Gold Text
 * @desc 所持金の減少で表示されるテキストです。
 * _icon:上記で設定したアイコンインデックス _num:金額
 * @default 「\I[_icon]_num\C[14]\G\C[0]」 を\C[2]失った・・・
 * 
 * @param Get Item Text
 * @desc アイテムの増加で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text
 * @desc アイテムの減少で表示されるテキストです。
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[2]失った・・・\n\C[6]_desc1
 * 
 * @param Get Item Text Num
 * @desc アイテム増加。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」 を\C[14]_num個\C[24]手に入れた！\n\C[6]_desc1
 * 
 * @param Lost Item Text Num
 * @desc アイテム減少。2個以上。_icon:アイコン
 * _name:名前　_num:個数 _desc1:解説1行目 _desc2:解説2行目
 * @default 「\I[_icon]_name」を\C[14]_num個\C[2]失った・・・\n\C[6]_desc1
 * 
 * @param Get Skill Text
 * @desc スキルの習得で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」 を\C[24]覚えた！\n\C[6]_desc1
 * 
 * @param Lost Skill Text
 * @desc スキルの忘却で表示されるテキストです。_actor:アクター名
 * _icon:アイコン _name:名前　_desc1:解説1行目 _desc2:解説2行目
 * @default _actorは「\I[_icon]_name」を \C[2]忘れてしまった・・・\n\C[6]_desc1
 * 
 * @param Exp Up Text
 * @desc 経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Exp Down Text
 * @desc 経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Lv Up Text
 * @desc レベルの増加で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Lv Down Text
 * @desc レベルの減少で表示されるテキストです。
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * 
 * @param Param Up Text
 * @desc 能力値の増加で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前 _num:上がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Param Down Text
 * @desc 能力値の減少で表示されるテキストです。
 * _actor:アクター名  _name:能力値の名前　_num:下がったレベル
 * @default _actorは\C[4]_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * 
 * 
 * @param Abp Up Text
 * @desc クラス経験値の増加で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前 _num:経験値　
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[24]得た！
 * 
 * @param Abp Down Text
 * @desc クラス経験値の減少で表示されるテキストです。
 * _actor:アクター名  _name:経験値の名前　_num:経験値
 * @default _actorは\C[14]_numポイント\C[0]の\C[4]_name\C[0]を\C[2]失った・・・
 * 
 * @param Class Lv Up Text
 * @desc クラスレベルの増加で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前 _num:上がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[24]上がった！
 * 
 * @param Class Lv Down Text
 * @desc クラスレベルの減少で表示されるテキストです。 _class:クラス名
 * _actor:アクター名  _name:レベルの名前　_num:下がったレベル
 * @default _actorは\C[4]_classの_name\C[0]が\C[14]_numポイント\C[2]下がった・・・
 * 
 * @help プラグインコマンドはありません。
 * ------------------------------------------------------
 * 利用規約：特になし。素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * このプラグインには「汎用ポップアップベース」のプラグインが必要です。
 * 汎用ポップアップベースより下に配置してください。 
 * また、それぞれの表示テキストに何も記載しない場合、そのインフォメーションを無効化できます。
 * ------------------------------------------------------
 * 更新履歴:
 * var1.04:
 * 任意のテキストを渡せるように修正。
 * ver1.03:
 * ABPとクラスレベルのポップアップ処理を追加しました。
 * ver1.02:
 * レベルアップ処理でポップアップ表示が逆になっていたバグを修正しました。
 * ver1.01:
 * valueが0の状態でもポップアップしていたバグを修正しました。
 * YEP_CoreEngineとの競合回避処理を追加しました。
 * ver1.00:
 * 公開
 */

(function() {
	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'GetInformationText') {
        	CommonPopupManager.showInfo(args[0], 1, 'text'); 
        }
    };
    
	var parameters = PluginManager.parameters('GetInformation');
	var infoDisableSwitchId = Number(parameters['Info Disable Switch Id'] || 10);
	var getGoldText = String(parameters['Get Gold Text'] || '「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[24]手に入れた！');
	var lostGoldText = String(parameters['Lost Gold Text'] || '「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[2]失った・・・');
	var getInfoText = String(parameters['Get Item Text'] || '「\\I[_icon]_name」 を\\C[24]手に入れた！\n\\C[6]_desc1');
	var lostInfoText = String(parameters['Lost Item Text'] || '「\\I[_icon]_name」 を\\C[2]失った・・・\n\\C[6]_desc1');
	var getInfoTextNum = String(parameters['Get Item Text Num'] || '「\\I[_icon]_name」 を\\C[14]_num個\\C[24]手に入れた！\n\\C[6]_desc1');
	var lostInfoTextNum = String(parameters['Lost Item Text Num'] || '「\\I[_icon]_name」を\\C[14]_num個\\C[2]失った・・・\n\\C[6]_desc1');
	var getInfoSkillText = String(parameters['Get Skill Text'] || '_actorは「\\I[_icon]_name」 を\\C[24]覚えた！\n\\C[6]_desc1');
	var lostInfoSkillText = String(parameters['Lost Skill Text'] || '_actorは「\\I[_icon]_name」を \\C[2]忘れてしまった・・・\n\\C[6]_desc1');
	var ExpUpText = String(parameters['Exp Up Text'] || '_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！');
	var ExpDownText = String(parameters['Exp Down Text'] || '_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・');
	var lvUpText = String(parameters['Lv Up Text'] || '_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！');
	var lvDownText = String(parameters['Lv Down Text'] || '_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・');
	var ParamUpText = String(parameters['Param Up Text'] || '_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！');
	var ParamDownText = String(parameters['Param Down Text'] || '_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・');
	var infoFontSize = Number(parameters['Info Font Size'] || 20);
	var infoCount = Number(parameters['Info Count'] || 120);
	var infoDelay = Number(parameters['Info Delay'] || 20);
	var infoMoveWait = Number(parameters['Info MoveWait'] || 100);
	var infoMoveFade = Number(parameters['Info MoveFade'] || 20);
	var goldIconIndex = Number(parameters['Gold Icon Index'] || 314);
	var useBattleInfo = String(parameters['Use Battle Info'] || 'true') === 'true';
	var useRewardsInfo = String(parameters['Use Rewards Info'] || 'true') === 'true';
	var infoSlideCount = 60;

	var abpUpText = String(parameters['Abp Up Text'] || '_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！');
	var abpDownText = String(parameters['Abp Down Text'] || '_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・');
	var clvUpText = String(parameters['Class Lv Up Text'] || '_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！');
	var clvDownText = String(parameters['Class Lv Down Text'] || '_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・');

	var _gInfo_GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_gInfo_GInterpreter_pluginCommand.call(this, command, args);
		if (command === 'GetInfo') {
		}
	};

	CommonPopupManager.popEnable = function() {
		var useBattle = $gameParty.inBattle() ? useBattleInfo : true;
		return !$gameSwitches.value(infoDisableSwitchId) && useBattle;
	};

	// Change Gold
	var _gInfo_GInterpreter_command125 = Game_Interpreter.prototype.command125;
	Game_Interpreter.prototype.command125 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command125.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Item
	var _gInfo_GInterpreter_command126 = Game_Interpreter.prototype.command126;
	Game_Interpreter.prototype.command126 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command126.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Weapon
	var _gInfo_GInterpreter_command127 = Game_Interpreter.prototype.command127;
	Game_Interpreter.prototype.command127 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command127.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Armor
	var _gInfo_GInterpreter_command128 = Game_Interpreter.prototype.command128;
	Game_Interpreter.prototype.command128 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command128.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change EXP
	var _gInfo_GInterpreter_command315 = Game_Interpreter.prototype.command315;
	Game_Interpreter.prototype.command315 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command315.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Level
	var _gInfo_GInterpreter_command316 = Game_Interpreter.prototype.command316;
	Game_Interpreter.prototype.command316 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command316.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Parameter
	var _gInfo_GInterpreter_command317 = Game_Interpreter.prototype.command317;
	Game_Interpreter.prototype.command317 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command317.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};
	// Change Skill
	var _gInfo_GInterpreter_command318 = Game_Interpreter.prototype.command318;
	Game_Interpreter.prototype.command318 = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable();
		var result = _gInfo_GInterpreter_command318.call(this);
		CommonPopupManager._popEnable = false;
		return result;
	};

	var _gInfo_GBBase_addParam = Game_BattlerBase.prototype.addParam;
	Game_BattlerBase.prototype.addParam = function(paramId, value) {
		_gInfo_GBBase_addParam.call(this, paramId, value);
		if (CommonPopupManager._popEnable) {
			CommonPopupManager.showInfo({
				'name' : TextManager.param(paramId),
				'value' : value > 0
			}, value, 'param', this._name);
		}
	};
	var _gInfo_GParty_gainGold = Game_Party.prototype.gainGold;
	Game_Party.prototype.gainGold = function(amount) {
		_gInfo_GParty_gainGold.call(this, amount);
		if (CommonPopupManager._popEnable) {
			var hash = {
				'name' : '',
				'iconIndex' : goldIconIndex,
				'description' : '',
				'value' : Math.abs(amount)
			};
			CommonPopupManager.showInfo(hash, amount, 'gold');
		}
	};
	var _gInfo_GParty_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		var result = _gInfo_GParty_gainItem.call(this, item, amount, includeEquip);
		if (CommonPopupManager._popEnable) {
			CommonPopupManager.showInfo(item, amount, 'item')
		}
		if (Imported.YEP_CoreEngine){ return result };
	};
	var _gInfo_GActor_learnSkill = Game_Actor.prototype.learnSkill;
	Game_Actor.prototype.learnSkill = function(skillId) {
		var isLearn = this.isLearnedSkill(skillId);
		_gInfo_GActor_learnSkill.call(this, skillId);
		if (CommonPopupManager._popEnable && !isLearn) {
			CommonPopupManager.showInfo($dataSkills[skillId], 1, 'skill', this._name);
		};
	};
	var _gInfo_GActor_forgetSkill = Game_Actor.prototype.forgetSkill;
	Game_Actor.prototype.forgetSkill = function(skillId) {
		var isLearn = this.isLearnedSkill(skillId);
		_gInfo_GActor_forgetSkill.call(this, skillId);
		if (CommonPopupManager._popEnable && isLearn) {
			CommonPopupManager.showInfo($dataSkills[skillId], 0, 'skill', this._name);
		};
	};
	var _gInfo_GActor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function(exp, show) {
		var tExp = exp - this.currentExp();
		var plevel = this.level;
		if (CommonPopupManager._popEnable) {
			CommonPopupManager.showInfo({
				'name' : TextManager.exp,
				'value' : tExp > 0
			}, tExp, 'exp', this._name);
		};
		_gInfo_GActor_changeExp.call(this, exp, show);
		if ((this.level - plevel) !== 0){
			var upLevel = this.level - plevel;
			if (CommonPopupManager._popEnable) {
				CommonPopupManager.showInfo({
					'name' : TextManager.level,
					'value' : upLevel > 0
				}, upLevel, 'level', this._name);
			}	
		}
	};
	
	var _gInfo_GActor_changeLevel = Game_Actor.prototype.changeLevel;
	Game_Actor.prototype.changeLevel = function(level, show) {
		var upLevel = level - this.level;
		var tempEnable = CommonPopupManager._popEnable;
		CommonPopupManager._popEnable = false;
		_gInfo_GActor_changeLevel.call(this, level, show);
		CommonPopupManager._popEnable = tempEnable;
		if (CommonPopupManager._popEnable) {
			CommonPopupManager.showInfo({
				'name' : TextManager.level,
				'value' : upLevel > 0
			}, upLevel, 'level', this._name);
		};
	};
	
	if (Imported['VXandAceHybridClass']){
		
		// Change Class Level
		var _gInfo_GInterpreter_changeClassLevel = Game_Interpreter.prototype.changeClassLevel;
		Game_Interpreter.prototype.changeClassLevel = function(actorId,level,show) {
			CommonPopupManager._popEnable = CommonPopupManager.popEnable();
			_gInfo_GInterpreter_changeClassLevel.call(this,actorId,level,show);
			CommonPopupManager._popEnable = false;
		};
		
		// Change Abp
		var _gInfo_GInterpreter_changeAbp = Game_Interpreter.prototype.changeAbp;
		Game_Interpreter.prototype.changeAbp = function(actorId,abp,show) {
			CommonPopupManager._popEnable = CommonPopupManager.popEnable();
			var result = _gInfo_GInterpreter_changeAbp.call(this,actorId,abp,show);
			CommonPopupManager._popEnable = false;
			return result;
		};
		
		var _gInfo_GActor_changeAbp = Game_Actor.prototype.changeAbp;
		Game_Actor.prototype.changeAbp = function(abp, show) {
			var tAbp = abp - this.currentAbp();
			var plevel = this.currentClassLevel();
			if (CommonPopupManager._popEnable) {
				CommonPopupManager.showInfo({
					'name' : TextManager.abp,
					'value' : tAbp > 0
				}, tAbp, 'abp', this._name);
			};
			_gInfo_GActor_changeAbp.call(this, abp, show);
			if ((this.currentClassLevel() - plevel) !== 0){
				var upLevel = this.currentClassLevel() - plevel;
				if (CommonPopupManager._popEnable) {
					CommonPopupManager.showInfo({
						'name' : TextManager.classLevel,
						'value' : upLevel > 0
					}, upLevel, 'classLevel', this._name, this.currentClass().name);
				}	
			}
		};
		
		var _gInfo_GActor_changeClassLevel = Game_Actor.prototype.changeClassLevel;
		Game_Actor.prototype.changeClassLevel = function(level, show) {
			var upLevel = level - this.currentClassLevel();
			var tempEnable = CommonPopupManager._popEnable;
			CommonPopupManager._popEnable = false;
			_gInfo_GActor_changeClassLevel.call(this, level, show);
			CommonPopupManager._popEnable = tempEnable;
			if (CommonPopupManager._popEnable) {
				CommonPopupManager.showInfo({
					'name' : TextManager.classLevel,
					'value' : upLevel > 0
				}, upLevel, 'classLevel', this._name, this.currentClass().name);
			}	
		};
	}

	CommonPopupManager.showInfo = function(object, value, type, actor, c) {
		var text1 = null;
		if (value === 0) { return }
		switch(type) {
		case 'text':
			text1 = object;
			break;
		case 'gold':
			text1 = getGoldText;
			if (value < 0) {
				text1 = lostGoldText
			};
			break;
		case 'item':
			text1 = getInfoText;
			if (value > 1) {
				text1 = getInfoTextNum
			} else if (value === -1) {
				text1 = lostInfoText
			} else if (value < -1) {
				text1 = lostInfoTextNum
			}
			;
			break;
		case 'exp':
			text1 = object.value ? ExpUpText : ExpDownText;
			break;
		case 'level':
			text1 = object.value ? lvUpText : lvDownText;
			break;
		case 'abp':
			text1 = object.value ? abpUpText : abpDownText;
			break;
		case 'classLevel':
			text1 = object.value ? clvUpText : clvDownText;
			break;
		case 'param':
			text1 = object.value ? ParamUpText : ParamDownText;
			break;
		case 'skill':
			text1 = value === 1 ? getInfoSkillText : lostInfoSkillText;
			break;
		default :
			text1 = value;
		}
		if (text1 === '') {
			return
		};
		var descs = object.description ? object.description.split(/\n/) : [];
		if (actor) { text1 = text1.replace(/_actor/g, actor) }
		if (c) { text1 = text1.replace(/_class/g, c) }
		text1 = text1.replace(/_name/g, object.name);
		text1 = text1.replace(/_icon/g, object.iconIndex);
		text1 = text1.replace(/_num/g, Math.abs(value));
		text1 = descs[0] ? text1.replace(/_desc1/g, descs[0]) : text1.replace(/_desc1/g, '');
		text1 = descs[1] ? text1.replace(/_desc2/g, descs[1]) : text1.replace(/_desc2/g, '');
		var texts = text1.split(/\n|\\n/);
		for (var i = 0; i < texts.length; i++) {
			var text = texts[i].replace(/\\C\[\d+\]/g, '');
			if (text === '') {
				delete texts[i]
			};
		}
		texts = texts.compact();
		var oneHeight = (infoFontSize + 8)
		var height = oneHeight * texts.length;
		var bitmap = new Bitmap(Graphics.boxWidth, height);
		bitmap.fillRect(0, 0, bitmap.width / 2, bitmap.height, 'rgba(0,0,0,0.5)');
		bitmap.gradientFillRect(bitmap.width / 2, 0, bitmap.width / 2, bitmap.height, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)');
		this.window().contents = bitmap;
		this.window().drawTextEx('\\FS[' + infoFontSize + ']', 0, 0);
		for (var i = 0; i < texts.length; i++) {
			var text = '\\FS[' + infoFontSize + ']' + texts[i]
			this.window().drawTextEx(text, 8, i * oneHeight);
		}
		var arg = this.setPopup([]);
		arg.bitmap = bitmap;
		arg.x = Graphics.boxWidth * -1;
		arg.y = Graphics.boxHeight - height;
		arg.y = $gameParty.inBattle() ? arg.y - 180 : arg.y
		arg.moveX = Graphics.boxWidth;
		arg.moveY = 0;
		arg.anchorX = 0;
		arg.anchorY = 0;
		arg.count = infoCount;
		arg.fixed = false;
		arg.extend = [infoMoveWait, infoMoveFade];
		arg.slideCount = infoSlideCount;
		arg.delay = 0;
		var array = CommonPopupManager._tempCommonSprites.clone().compact();
		if (CommonPopupManager._lastIndex && array[CommonPopupManager._lastIndex]){
			array.sort(function(a,b){ return a.delay > b.delay ? -1 : 1 })
			arg.delay = array[0].delay + infoDelay;
		}
		CommonPopupManager._lastIndex = this._tempCommonSprites.setNullPos(arg);
	};

	var _gInfo_BManager_gainRewards = BattleManager.gainRewards;
	BattleManager.gainRewards = function() {
		CommonPopupManager._popEnable = CommonPopupManager.popEnable() && useRewardsInfo;
		_gInfo_BManager_gainRewards.call(this);
		CommonPopupManager._popEnable = false;
	};
})();
