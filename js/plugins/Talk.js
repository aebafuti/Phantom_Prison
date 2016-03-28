
var talk_table = {};
var talk_list = [];


function talkSort(val1, val2){
	var ruleA = ['黒', '白', '赤', '青', '緑', '銀', '金'];
	//var ruleB = ['の', 'と'];
	var ruleB = ['聖', '黒', '白', '赤', '青', '緑', '銀', '金'];
	var ruleC = ['①', '②', '③', '④'];
	
	
 	index1A = sortRule(val1, ruleA, 0);
 	index2A = sortRule(val2, ruleA, 0);
 	//index1B = sortRule(val1, ruleB, 1);
 	//index2B = sortRule(val2, ruleB, 1);
 	index1B = sortRule(val1, ruleB, 2);
 	index2B = sortRule(val2, ruleB, 2);
 	index1C = sortRuleLast(val1, ruleC);
 	index2C = sortRuleLast(val2, ruleC);
 	
 	
 	val1 = index1A * ruleB.length * ruleC.length + index1B * ruleC.length + index1C;
 	val2 = index2A * ruleB.length * ruleC.length + index2B * ruleC.length + index2C;
 	//val1 = index1A * ruleB.length * ruleC.length * ruleD.length + index1B * ruleC.length * ruleD.length + index1C * ruleD.length + index1D;
 	//val2 = index2A * ruleB.length * ruleC.length * ruleD.length + index2B * ruleC.length * ruleD.length + index2C * ruleD.length + index2D;
	return val1 - val2;
}


function sortRule(val, rule, from){
	for (i = 0; i < rule.length; i++ ){
	 	if (val.indexOf(rule[i], from) == from){
	 		return i;
		}
	}
	return rule.length - 1;
}

function sortRuleLast(val, rule){
	for (i = 0; i < rule.length; i++ ){
	 	if (val.lastIndexOf(rule[i]) != -1){
	 		return i;
		}
	}
	return rule.length - 1;
}


function talkCheckUnread(){
	setTalkList();
	if(Object.prototype.toString.call($gameVariables.value(51)) === '[object Object]'){
		talk_table = $gameVariables.value(51);
	}
	var key;
	for(i = 0; i < talk_list.length; i++){
		key = talk_list[i];
		if(!talk_table[key] && talkCondition(key)){ talk_table[key] = 'unread'; }
		if(talk_table[key] === 'unread') { return key; break; }
	}
	return false;
}

function setTalkList(){
	talk_list = [];
	talk_list.push('黒の聖霊①');
	talk_list.push('黒の聖霊②');
	talk_list.push('黒の聖霊③');
	talk_list.push('白の聖霊①');
	talk_list.push('白の聖霊②');
	talk_list.push('赤の聖霊①');
	talk_list.push('赤の聖霊②');
	talk_list.push('青の聖霊①');
	talk_list.push('青の聖霊②');
	talk_list.push('緑の聖霊①');
	talk_list.push('緑の聖霊②');
	talk_list.push('銀の聖霊①');
	talk_list.push('銀の聖霊②');
	talk_list.push('金の聖霊①');
	talk_list.push('金の聖霊②');
	talk_list.push('黒と赤');
	talk_list.push('黒と金');
	talk_list.push('白と黒');
	talk_list.push('白と緑');
	talk_list.push('赤と青');
	talk_list.push('赤と緑');
	talk_list.push('青と白');
	talk_list.push('青と緑');
	talk_list.push('緑と黒');
	talk_list.push('緑と金');
	talk_list.push('銀と黒');
	talk_list.push('銀と白');
	talk_list.push('銀と青');
	talk_list.push('金と赤');
	talk_list.push('金と銀');
}

function talkCondition(key){
	var black = $gameParty.members().contains($gameActors.actor(2));
	var white = $gameParty.members().contains($gameActors.actor(3));
	var red = $gameParty.members().contains($gameActors.actor(4));
	var blue = $gameParty.members().contains($gameActors.actor(5));
	var green = $gameParty.members().contains($gameActors.actor(6));
	var silver = $gameParty.members().contains($gameActors.actor(7));
	var gold = $gameParty.members().contains($gameActors.actor(8));
	
	switch (key){
	case '黒の聖霊①':
	case '黒の聖霊②':
		return black;
		break;
	case '黒の聖霊③': // 黒が風刃を覚えている
		return black && $gameActors.actor(2).isLearnedSkill(14);
		break;
	case '黒と赤': // 
		return black && red;
		break;
	case '黒と金': // 
		return black && gold;
		break;
	case '白の聖霊①':
	case '白の聖霊②':
		return white;
		break;
	case '白と黒': // 初めての商人 がON
		return white && black && $gameSwitches.value(15);
		break;
	case '白と緑': // 緑が堅剛を覚えている
		return white && green && $gameActors.actor(6).isLearnedSkill(22);
		break;
	case '赤の聖霊①':
	case '赤の聖霊②':
		return red;
		break;
	case '赤と青': // 赤が業炎を覚えている
		return red && blue && $gameActors.actor(4).isLearnedSkill(29);
		break;
	case '赤と緑': // 残り日数7日未満
		return red && green && $gameParty.gold() < 7;
		break;
	case '青の聖霊①':
	case '青の聖霊②':
		return blue;
		break;
	case '青と白': // 
		return blue && white;
		break;
	case '青と緑': // 緑が堅剛を覚えている
		return blue && green && $gameActors.actor(6).isLearnedSkill(22);
		break;
	case '緑の聖霊①':
	case '緑の聖霊②':
		return green;
		break;
	case '緑と黒': // 白がパーティにいる && 主人公が豪気を覚えている
		return green && black && white && $gameActors.actor(1).isLearnedSkill(15);
		break;
	case '緑と金': // 
		return green && gold;
		break;
	case '銀の聖霊①':
	case '銀の聖霊②':
		return silver;
		break;
	case '銀と黒': // 
		return silver && black;
		break;
	case '銀と白': // 
		return silver && white;
		break;
	case '銀と青': // 銀が闇薙を覚えている
		return silver && blue && $gameActors.actor(7).isLearnedSkill(25);
		break;
	case '金の聖霊①':
	case '金の聖霊②':
		return gold;
		break;
	case '金と赤': // 金が魔力集中を覚えている
		return gold && red && $gameActors.actor(8).isLearnedSkill(26);
		break;
	case '金と銀': // 
		return gold && silver;
		break;
	}
	return false;
}

(function() {

var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'TalkUnreadJump') {
		this.TalkUnreadJump();
	}
};

Game_Interpreter.prototype.TalkUnreadJump = function() {
	var label = talkCheckUnread() ? talkCheckUnread() : '会話リスト';
	for (var i = 0; i < this._list.length; i++) {
		command = this._list[i];
		if (command.parameters[0] === label) {
		this.jumpTo(i)
		}
	}
};

})();