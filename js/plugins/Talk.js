
var talk_table = {};
var talk_list = [];


function talkSort(val1, val2){
	var ruleA = ['ク', '黒', '白', '赤', '青', '緑', '銀', '金', '紺', '水'];
	//var ruleB = ['の', 'と'];
	var ruleB = ['聖', '子', '黒', '白', '赤', '青', '緑', '銀', '金', '紺'];
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
	talk_table = {};
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
	talk_list.push('クリアコメント');
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
	talk_list.push('紺の聖霊①');
	talk_list.push('紺の聖霊②');
	talk_list.push('水蛭子①');
	talk_list.push('水蛭子②');
	talk_list.push('黒と赤');
	talk_list.push('黒と青');
	talk_list.push('黒と金');
	talk_list.push('黒と紺');
	talk_list.push('白と黒');
	talk_list.push('白と赤');
	talk_list.push('白と緑');
	talk_list.push('白と紺');
	talk_list.push('赤と青');
	talk_list.push('赤と緑');
	talk_list.push('赤と銀');
	talk_list.push('赤と紺');
	talk_list.push('青と白');
	talk_list.push('青と緑');
	talk_list.push('青と金');
	talk_list.push('青と紺');
	talk_list.push('緑と黒');
	talk_list.push('緑と銀');
	talk_list.push('緑と金');
	talk_list.push('緑と紺');
	talk_list.push('銀と黒');
	talk_list.push('銀と白');
	talk_list.push('銀と青');
	talk_list.push('銀と紺');
	talk_list.push('金と白');
	talk_list.push('金と赤');
	talk_list.push('金と銀');
	talk_list.push('金と紺');
	talk_list.push('水と黒と赤');
	talk_list.push('水と白と緑');
	talk_list.push('水と青と紺');
	talk_list.push('水と銀と金');
}

function talkCondition(key){
	var black = $gameParty.members().contains($gameActors.actor(2));
	var white = $gameParty.members().contains($gameActors.actor(3));
	var red = $gameParty.members().contains($gameActors.actor(4));
	var blue = $gameParty.members().contains($gameActors.actor(5));
	var green = $gameParty.members().contains($gameActors.actor(6));
	var silver = $gameParty.members().contains($gameActors.actor(7));
	var gold = $gameParty.members().contains($gameActors.actor(8));
	var dark = $gameParty.members().contains($gameActors.actor(9));
	var slime = $gameParty.members().contains($gameActors.actor(10));
	var deathEncount = $gameSystem.enemyEncount()[10] || $gameSystem.enemyEncount()[40];
	switch (key){
	case 'クリアコメント': //全員加入クリア＆会話回想
		return $gameSwitches.value(24);
		break;
	case '黒の聖霊①':
	case '黒の聖霊②':
		return black;
		break;
	case '黒の聖霊③': // 黒が二重影を覚えている
		return black && $gameActors.actor(2).isLearnedSkill(17);
		break;
	case '黒と赤': // 
		return black && red;
		break;
	case '黒と青': // 死神と遭遇
		return black && blue && deathEncount;
		break;
	case '黒と金': // 
		return black && gold;
		break;
	case '黒と紺': // 
		return black && dark;
		break;
	case '白の聖霊①':
	case '白の聖霊②':
		return white;
		break;
	case '白と黒': // 初めての商人 がON
		return white && black && $gameSwitches.value(15);
		break;
	case '白と赤': // 戦闘回数20以上
		return white && red && $gameSystem._battleCount >= 20;
		break;
	case '白と緑': // 緑が堅剛を覚えている
		return white && green && $gameActors.actor(6).isLearnedSkill(22);
		break;
	case '白と紺': // 紺が健康体を覚えてる
		return white && dark && $gameActors.actor(9).isLearnedSkill(61);
		break;
	case '赤の聖霊①':
	case '赤の聖霊②':
		return red;
		break;
	case '赤と青': // 赤が業炎を覚えている
		return red && blue && $gameActors.actor(4).isLearnedSkill(29);
		break;
	case '赤と緑': // あと6日
		return red && green && $gameParty.gold() <= 6;
		break;
	case '赤と銀': // 赤敵遭遇
		return red && silver && $gameSystem.redEnemyEncount();
		break;
	case '赤と紺': // 赤が業炎を覚えている
		return red && dark &&$gameActors.actor(4).isLearnedSkill(29);
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
	case '青と金': // あと4日
		return blue && gold && $gameParty.gold() <= 4;
		break;
	case '青と紺': // パーティが8人以上
		return blue && dark && $gameParty.size() >= 8;
		break;
	case '緑の聖霊①':
	case '緑の聖霊②':
		return green;
		break;
	case '緑と黒': // 白がパーティにいる && 主人公が豪気を覚えている
		return green && black && white && $gameActors.actor(1).isLearnedSkill(15);
		break;
	case '緑と銀': // あと2日
		return green && silver && $gameParty.gold() <= 2;
		break;
	case '緑と金': // 
		return green && gold;
		break;
	case '緑と紺': // 緑が堅剛を覚えている＆紺が健康体を覚えている
		return green && dark && $gameActors.actor(6).isLearnedSkill(22) && $gameActors.actor(9).isLearnedSkill(61);
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
	case '銀と紺': // 
		return silver && dark;
		break;
	case '金の聖霊①':
	case '金の聖霊②':
		return gold;
		break;
	case '金と白': // あと0日
		return gold && white && $gameParty.gold() <= 0;
		break;
	case '金と赤': // 金が魔力集中を覚えている
		return gold && red && $gameActors.actor(8).isLearnedSkill(26);
		break;
	case '金と銀': // 
		return gold && silver;
		break;
	case '金と紺': // 
		return gold && dark;
		break;
	case '紺の聖霊①':
	case '紺の聖霊②':
		return dark;
		break;
	case '水蛭子①':
	case '水蛭子②':
		return slime;
		break;
	case '水と黒と赤':
		return slime && black && red;
		break;
	case '水と白と緑': // 緑が堅剛を覚えている
		return slime && white && green && $gameActors.actor(6).isLearnedSkill(22);
		break;
	case '水と青と紺':
		return slime && blue && dark;
		break;
	case '水と銀と金': // 「水と黒と赤」見た
		return slime && silver && gold && talk_table['水と黒と赤'];
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