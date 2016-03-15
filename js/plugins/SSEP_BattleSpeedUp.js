//=============================================================================
// sound sepher Engine - Battle Speed Up
// SSEP_BattleSpeedUp.js
// Version: 1.51
//=============================================================================

var Imported = Imported || {};
Imported.SSEP_BattleSpeedUp = true;

var Sepher = Sepher || {};

//=============================================================================
/*:
 * @plugindesc [ver1.51] 戦闘速度を上げるプラグインです。YanflyEngine対応。
 * 利用時は、必ずYanflyEngineの後に読み込んでください。
 * @author Shoichiro Sakamoto(sound sepher)
 *
 * @help
 * ------------------------------------------------------------------------------
 * ■sound sepher Engine - "Battle Speed UP" Plugin (Ver1.51 '15 11/07)
 * ------------------------------------------------------------------------------
 * 制作：坂本昌一郎 / Shoichiro Sakamoto (sound sepher)
 * Web ：http://sepher.jp/
 * 
 * ------------------------------------------------------------------------------
 * ■内容説明
 * ------------------------------------------------------------------------------
 * このプラグインは戦闘速度を上げるプラグインです。
 * フロントビュー・サイドビュー両方に対応しています。
 * 
 * また、YanflyEngineのBattleCore、アクションシーケンスパック(X_ActSeqPack1等)、
 * YEP Active Time Battle、VictoryAftermath、Ellye's Active Time Battle に対応。
 * 
 * ------------------------------------------------------------------------------
 * ■使い方
 * ------------------------------------------------------------------------------
 * OKボタンを押しっぱなしにすると戦闘が早送りモードになります。
 * 
 * 戦闘速度の設定を細かく調整することができます。
 * 設定項目の意味がわからない場合は、デフォルト状態でお使いください。
 * 通常ではGeneral Settingの値を変えるだけでも充分でしょう。
 * 
 * YanflyEngineとEllye's ATBに対応していますが、プラグインマネージャでこれらの
 * プラグインの後にこのプラグインを置かないと正確に実行されません。
 * また、Ellye's ATBを使う場合は108行め"(function() {"と550行め"})();"を削除して、
 * 関数スコープを開放してください。
 * 
 * ------------------------------------------------------------------------------
 * ■注意事項
 * ------------------------------------------------------------------------------
 * ・利用時は競合を避けるため、必ずYanflyEngineの後に読み込んでください。
 * ・サポートは行いませんので、自己責任でご利用ください。
 * ・できればtxtやクレジットに、前述の著作権表記を掲載して頂けたら嬉しいです。
 * 
 * ------------------------------------------------------------------------------
 * ■パラメータの説明
 * ------------------------------------------------------------------------------
 * ・BattleSpeed (Default)：OKボタンを押していないときの戦闘速度の倍数です。
 * ・BattleSpeed (Boost)　：OKボタンを押してあるときの戦闘速度の倍数です。
 * 　　　　　　　　　　　 　4倍速以上は効果がありません。
 * ------------------------------------------------------------------------------
 * ・StateIcon　　　　　　：敵のステートアイコン表示速度を調節します。
 * ・StateOverLay　　　　 ：味方のステートアニメのアニメ速度を調節します。
 * ・Weapon　　　　　　　 ：サイドビューで味方が武器を振る速度です。
 * ・Motion　　　　　　　 ：味方と敵のアニメーション速度です。
 * 　　　　　　　　　　　 　待機アニメ・移動アニメ等の速度に影響します。
 * 　　　　　　　　　　　 　また、WeaponとMotionは同期していますので、
 * 　　　　　　　　　　　 　値は同じにしたほうが無難です。
 * ・Balloon　　　　　　　：吹き出しの表示速度です。
 * ・Damage　　　　　　　 ：ダメージ数値の持続フレーム数です。
 * ・DamageMin　　　　　　：ダメージ数値の持続フレーム数の最低値です。
 * 　　　　　　　　　　　 　Damageを早く設定すると見づらいので、防止措置です。
 * ------------------------------------------------------------------------------
 * ・LogAnime BaseDelay　 ：バトルログウィンドウの表示フレーム数です。
 * ・LogAnime NextDelay　 ：バトルログウィンドウの持続フレーム数です。
 * ・LogWaitCount Default ：バトルログウィンドウ表示中の待機フレーム数を
 * 　　　　　　　　　　　 　指定倍数分、早くします。
 * ・LogWaitCount Boost　 ：バトルログウィンドウ表示中の待機フレーム数を
 * 　　　　　　　　　　　 　指定倍数分、早くします。(ブースト状態時)
 * 　　　　　　　　　　　 　なお、待機フレームはOKボタンを押しっぱなしにすると、
 * 　　　　　　　　　　　 　更に早くすることができます。
 * ------------------------------------------------------------------------------
 * ★以下はYanflyEngine - BattleCore用追加オプション
 * 
 * ・YEP Battle MotionWait：値が小さいほど攻撃演出のウェイトが早くなります。
 * ------------------------------------------------------------------------------
 * ★以下はYanflyEngine - Active Time Battle用追加オプション
 * 
 * ・YEP ATB BoostSwitch　：YEP ATBを導入時、ブーストするかどうか指定します。
 * 　　　　　　　　　　　 　(true:する / false:しない)
 * ------------------------------------------------------------------------------
 * ★以下はEllye & Yanfly ATB用追加オプション(両対応)
 * 
 * ・ATB Speed(Default)　 ：通常時のATゲージのスピードを倍数で指定します。
 * ・ATB Speed(Boost)　　 ：ブースト時のATゲージのスピードを倍数で指定します。
 * ------------------------------------------------------------------------------
 * ★以下はYanflyEngine - VictoryAftermath用追加オプション
 * 
 * ・YEP Victory Motion　 ：勝利時にブースト状態の場合、ウェイトを短縮します。
 * 　　　　　　　　　　　 　(true:短縮する / false:短縮しない)
 * ------------------------------------------------------------------------------
 *
 * @param ---General Setting---
 * @default
 * @param BattleSpeed (Default)
 * @desc デフォルトのアニメスピードです。初期値は1。
 * 武器攻撃以外のアニメ速度を指定の倍数分、早くします。
 * @default 1
 * @param BattleSpeed (Boost)
 * @desc 決定(OK)キー入力時のアニメスピードです。初期値は2。
 * 武器攻撃以外のアニメ速度を指定の倍数分、早くします。
 * @default 2
 * @param ---Detail Setting---
 * @default
 * @param StateIcon
 * @desc ステートアイコンのアニメスピードを指定します。
 * 初期値は40。
 * @default 40
 * @param StateOverlay
 * @desc ステートオーバーレイのアニメスピードを指定します
 * 初期値は8。
 * @default 8
 * @param Weapon
 * @desc サイドビュー時の武器攻撃のアニメスピードを指定します。
 * 初期値は12。Motionと同期してるので同じ値がおすすめ。
 * @default 12
 * @param Motion
 * @desc 行動モーションのアニメスピードを指定します。
 * 初期値は12。Weaponと同期してるので同じ値がおすすめ。
 * @default 12
 * @param Balloon
 * @desc バルーンのアニメスピードを指定します。
 * 初期値は12。
 * @default 12
 * @param Damage
 * @desc ダメージポップアップの持続フレーム数を指定します。
 * 初期値は90。早過ぎると目視できなくなるので要注意。
 * @default 90
 * @param DamageMin
 * @desc ダメージポップアップの持続フレーム数の最低値を指定します。
 * 初期値は60。このままにしておくことをオススメします。
 * @default 60
 * @param --BattleLog Setting--
 * @default
 * @param LogAnime BaseDelay
 * @desc バトルログウィンドウの表示フレーム数を指定します。
 * 初期値は8。BattleSpeed (Default)の影響を受けません。
 * @default 8
 * @param LogAnime NextDelay
 * @desc バトルログウィンドウの持続フレーム数を指定します。
 * 初期値は12。BattleSpeed (Default)の影響を受けません。
 * @default 12
 * @param LogWaitCount Default
 * @desc バトルログ表示中の待機フレームを指定倍数分、早くします。
 * 初期値は1。値を増やすとバトルログの速度がアップします。
 * @default 1
 * @param LogWaitCount Boost
 * @desc バトルログブースト中の待機フレームを指定倍数分、早くします。
 * 初期値は20。値を増やすとバトルログの速度がアップします。
 * @default 2
 * @param ---YEP BattleCore---
 * @default
 * @param YEP Battle MotionWait
 * @desc YEP BattleCoreを導入していた場合のみ設定可能です。
 * 初期値は20。値を減らすと攻撃演出のウェイトが早くなります。
 * @default 20
 * @param ---YEP ATB---
 * @default
 * @param YEP ATB BoostSwitch
 * @desc YEP ATBを導入していた場合のみ設定可能です。
 * 初期値はtrue。trueにするとブースト時にATBも速度を上げます。
 * @default true
 * @param ---ATB Speed---
 * @default
 * @param ATB Speed(Default)
 * @desc EllyeもしくはYEP ATBを導入していた場合のみ設定可能です。
 * 初期値は1。デフォルトのATゲージのスピードを倍数で指定します。
 * @default 1
 * @param ATB Speed(Boost)
 * @desc EllyeもしくはYEP ATBを導入していた場合のみ設定可能です。
 * 初期値は2。ブースト時のATゲージのスピードを倍数で指定します。
 * @default 2
 * @param ---YEP Victory AM---
 * @default
 * @param YEP Victory Wait
 * @desc YEP VictoryAftermathを導入していた場合のみ設定可能です。
 * 初期値はtrue。ブースト中、勝利時のウェイトを早くします。
 * @default true
 *
 */

//------------------------------------------------------------------------------
// グローバル変数
//------------------------------------------------------------------------------

Sepher.Parameters = PluginManager.parameters('SSEP_BattleSpeedUp');
Sepher.Param = Sepher.Param || {};

Sepher.Param.BattleSpeedDefault	= Number(Sepher.Parameters['BattleSpeed (Default)']);
Sepher.Param.BattleSpeedBoost	= Number(Sepher.Parameters['BattleSpeed (Boost)']);
Sepher.Param.StateIcon			= Number(Sepher.Parameters['StateIcon']);
Sepher.Param.StateOverlay		= Number(Sepher.Parameters['StateOverlay']);
Sepher.Param.Weapon				= Number(Sepher.Parameters['Weapon']);
Sepher.Param.Balloon			= Number(Sepher.Parameters['Balloon']);
Sepher.Param.Motion				= Number(Sepher.Parameters['Motion']);
Sepher.Param.Damage				= Number(Sepher.Parameters['Damage']);
Sepher.Param.DamageMin			= Number(Sepher.Parameters['DamageMin']);
Sepher.Param.LogBase			= Number(Sepher.Parameters['LogAnime BaseDelay']);
Sepher.Param.LogNext			= Number(Sepher.Parameters['LogAnime NextDelay']);
Sepher.Param.logWaitDefault		= Number(Sepher.Parameters['LogWaitCount Default']);
Sepher.Param.logWaitBoost		= Number(Sepher.Parameters['LogWaitCount Boost']);
Sepher.Param.YEPMotionWait		= Number(Sepher.Parameters['YEP Battle MotionWait']);
Sepher.Param.YEPVictoryWait		= String(Sepher.Parameters['YEP Victory Wait']);
Sepher.Param.YEPBoostSwitch		= String(Sepher.Parameters['YEP ATB BoostSwitch']);
Sepher.Param.ATBSpeedDefault	= Number(Sepher.Parameters['ATB Speed(Default)']);
Sepher.Param.ATBSpeedBoost		= Number(Sepher.Parameters['ATB Speed(Boost)']);

// YEPVictoryWait型変換
if (Sepher.Param.YEPVictoryWait == 'true'){
	Sepher.Param.YEPVictoryWait = true;
}else{
	Sepher.Param.YEPVictoryWait = false;
};
// YEPBoostSwitch型変換
if (Sepher.Param.YEPBoostSwitch == 'true'){
	Sepher.Param.YEPBoostSwitch = true;
}else{
	Sepher.Param.YEPBoostSwitch = false;
};

//------------------------------------------------------------------------------
// QuickMode Speed Setting
//------------------------------------------------------------------------------

Sprite_StateIcon.prototype.animationWait = function() {
	var speed = Sepher.Param.StateIcon / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_StateOverlay.prototype.animationWait = function() {
	var speed = Sepher.Param.StateOverlay / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_Weapon.prototype.animationWait = function() {
	var speed = Sepher.Param.Weapon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
   	return speed;
};

Sprite_Balloon.prototype.waitTime = function() {
	var speed = Sepher.Param.Balloon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
    return speed;
};

// Alias - startMove
var _SSEP_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
	if (Input.isPressed('ok') || TouchInput.isPressed()){
  		duration = duration / Sepher.Param.BattleSpeedBoost;
  	} else {
  		duration = duration / Sepher.Param.BattleSpeedDefault;
	}
	_SSEP_Battler_startMove.call(this, x, y, duration);
};


Sprite_Actor.prototype.motionSpeed = function() {
	var speed = Sepher.Param.Motion;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	} else {
		speed = speed / Sepher.Param.BattleSpeedDefault;
	}
    return speed;
};

// Alias - Animation setup
var _SSEP_Animation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	delay = delay / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		delay = delay / Sepher.Param.BattleSpeedBoost;
	} else {
		delay = delay / Sepher.Param.BattleSpeedDefault;
	}
	_SSEP_Animation_setup.call(this, target, animation, mirror, delay);
};


// Alias - Animation_setupRate
var _SSEP_Animation_setupRate = Sprite_Animation.prototype.setupRate;
Sprite_Animation.prototype.setupRate = function() {
    _SSEP_Animation_setupRate;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		this._rate = this._rate / Sepher.Param.BattleSpeedBoost;
	} else {
	    this._rate = this._rate / Sepher.Param.BattleSpeedDefault;
	}
	this._rate = (Math.round(this._rate));
	if (this._rate < 1){
		this._rate = 1;
	}
};


var _SSEP_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
	_SSEP_Damage_initialize.call(this);
    this._duration = Sepher.Param.Damage;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
		this._duration = this._duration / Sepher.Param.BattleSpeedBoost;
	} else {
		this._duration = this._duration / Sepher.Param.BattleSpeedDefault;
	}
    if (this._duration <= Sepher.Param.DamageMin){
    	this._duration = Sepher.Param.DamageMin;
    }
};

// BattleLog Window

Window_BattleLog.prototype.animationBaseDelay = function() {
	var speed = Sepher.Param.LogBase;
    return speed;
};

Window_BattleLog.prototype.animationNextDelay = function() {
	var speed = Sepher.Param.LogNext;
    return speed;
};

Window_BattleLog.prototype.updateWaitCount = function() {
	var waitMax;
	var waitMin;
	if (Input.isPressed('ok') || TouchInput.isPressed()){
   	    waitMax = 3 * Sepher.Param.logWaitBoost;
    	waitMin = 1 * Sepher.Param.logWaitBoost;
   	}else{
   	    waitMax = 3 * Sepher.Param.logWaitDefault;
    	waitMin = 1 * Sepher.Param.logWaitDefault;
	}

    if (this._waitCount > 0) {
        this._waitCount -= this.isFastForward() ? waitMax : waitMin;
        if (this._waitCount < 0) {
            this._waitCount = 0;
        }
    	return true;
    }
    return false;
};

//------------------------------------------------------------------------------
// Support - Yanfly Engine BattleCore
//------------------------------------------------------------------------------

if (Imported.YEP_BattleEngineCore){

	//Overwrite actionPerformAction
	BattleManager.actionPerformAction = function() {
		wait = Sepher.Param.YEPMotionWait;
		if (Input.isPressed('ok') || TouchInput.isPressed()){
			wait = wait / Sepher.Param.BattleSpeedBoost;
		} else {
			wait = wait / Sepher.Param.BattleSpeedDefault;
		}
				
	    this._logWindow.performAction(this._subject, this._action);
			if (this._subject.isActor() && this._subject.isSpriteVisible) {
				this._logWindow._waitCount += wait;
				return false;
			}
 	   return true;
	};

	//Overwrite actionFloat
	BattleManager.actionFloat = function(name, actionArgs) {
		var movers = this.makeActionTargets(name);
		if (movers.length < 1) return true;
		var cmd = actionArgs[0];
		var frames = actionArgs[1] || 12;

		if (Input.isPressed('ok') || TouchInput.isPressed()){
			frames = frames / Sepher.Param.BattleSpeedBoost;
		} else {
			frames = frames / Sepher.Param.BattleSpeedDefault;
		}
		
	    var pixels = 0;
	    if (cmd.match(/(\d+)([%％])/i)) {
	    	var floatPeak = parseFloat(RegExp.$1 * 0.01);
		} else if (cmd.match(/(\d+)/i)) {
			pixels = parseInt(RegExp.$1);
			var floatPeak = 0.0;
    	} else {
    		var floatPeak = 1.0;
    	}
    	movers.forEach(function(mover) {
    		var floatRate = floatPeak + (pixels / mover.spriteHeight());
    		mover.spriteFloat(floatRate, frames);
    	});
    	return false;
	};

	//Overwrite actionJump
	BattleManager.actionJump = function(name, actionArgs) {
	    var movers = this.makeActionTargets(name);
	    if (movers.length < 1) return true;
	    var cmd = actionArgs[0];
	    var frames = actionArgs[1] || 12;

		if (Input.isPressed('ok') || TouchInput.isPressed()){
			frames = frames / Sepher.Param.BattleSpeedBoost;
		} else {
			frames = frames / Sepher.Param.BattleSpeedDefault;
		}
		
	    var pixels = 0;
		if (cmd.match(/(\d+)([%％])/i)) {
			var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    	} else if (cmd.match(/(\d+)/i)) {
    		pixels = parseInt(RegExp.$1);
    		var jumpPeak = 0.0;
    	} else {
    		var jumpPeak = 1.0;
    	}
    	movers.forEach(function(mover) {
    		var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
    		mover.spriteJump(jumpRate, frames);
    	});
    	return true;
    };
}

//------------------------------------------------------------------------------
// Support - YanflyEngine Active Time Battle
//------------------------------------------------------------------------------

if (Imported.YEP_X_BattleSysATB){
	//Overwrite atbTickRate
	BattleManager.atbTickRate = function() {
	    var rate = 0.1 * ConfigManager.atbSpeed;
    	//Add
	    if (Sepher.Param.YEPBoostSwitch){
			if (Input.isPressed('ok') || TouchInput.isPressed()){
				rate = rate * Sepher.Param.ATBSpeedBoost;
			} else {
				rate = rate * Sepher.Param.ATBSpeedDefault;
			}
		}
    	return rate;
	};
}


//------------------------------------------------------------------------------
// Support - Yanfly Engine Victory Aftermath
//------------------------------------------------------------------------------

if (Imported.YEP_VictoryAftermath){
	//Overwrite isFinishedVictoryCheer
	BattleManager.isFinishedVictoryCheer = function() {
		if (Sepher.Param.YEPVictoryWait){
			if (Input.isPressed('ok') || TouchInput.isPressed()){
				return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait / Sepher.Param.BattleSpeedBoost;
			} else {
				return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait / Sepher.Param.BattleSpeedDefault;
			}
		} else {
			return ++this._victoryCheerWait >= Yanfly.Param.VACheerWait;
		}
	};
}

//------------------------------------------------------------------------------
// Support - Ellye's ATB
//------------------------------------------------------------------------------

//Check if there is Window_CTB function
if (typeof Window_CTB == "function"){
    //Changing the flow of battle
    //_BattleManager_update=BattleManager.update;
    BattleManager.update=function() {
        if(!this.isBusy()&&!this.updateEvent()) {
            switch(this._phase) {
                case 'atb':
                	//Add script
                	if (Input.isPressed('ok') || TouchInput.isPressed()){
	                	var speed = Sepher.Param.ATBSpeedBoost;
	                }else{
	                	var speed = Sepher.Param.ATBSpeedDefault;
	                }
                    this.increaseAtbGauges(speed);
                    break;
                default:
                    _BattleManager_update.call(this);
                    break;
            }
        }
    };

    //Alias - increaseAtbGauses
    var _SSEP_increaseAtbGauges = BattleManager.increaseAtbGauges;
    BattleManager.increaseAtbGauges = function(speed) {
    	//Add variable　and Rate calculation
    	var copy_base_atb_increase = base_atb_increase;
        base_atb_increase = base_atb_increase * speed;
        //original method
        _SSEP_increaseAtbGauges.call(this);
        //return global variable
        base_atb_increase = copy_base_atb_increase;
    };
}
