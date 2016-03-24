
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
