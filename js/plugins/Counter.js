
Game_Battler.prototype.performCounter = function() {
    //SoundManager.playEvasion();
};

BattleManager.invokeAction = function(subject, target) {
	if (!eval(Yanfly.Param.BECOptSpeed))  this._logWindow.push('pushBaseLine');
	var normal = true;
	target = this.applySubstitute(target);
	if (Math.random() < this._action.itemMrf(target)) {
		this.invokeMagicReflection(subject, target);
	} else if (Math.random() < this._action.itemCnt(target)) {
		this.invokeNormalAction(subject, target);
		this.invokeCounterAttack(subject, target);
	} else {
		this.invokeNormalAction(subject, target);
	}
	subject.setLastTarget(target);
	if (!eval(Yanfly.Param.BECOptSpeed)) this._logWindow.push('popBaseLine');
};

BattleManager.invokeCounterAttack = function(subject, target) {
    var action = new Game_Action(target);
    action.setAttack();
    var targets = action.makeTargets();
    this._logWindow.displayCounter(target);
    if(action.isForAll()){
    	for(n = targets.shift(); n; n = targets.shift()){
    		action.apply(n);
    		this._logWindow.displayActionResults(n, n);
		}
	}else{
		action.apply(subject);
		this._logWindow.displayActionResults(subject, subject);
	}
    //this._logWindow.displayActionResults(subject, subject);
    //if (subject.isDead()) subject.performCollapse();
};

Game_Battler.prototype.performSubstitute = function(target) {
	SoundManager.playMagicEvasion();
};
