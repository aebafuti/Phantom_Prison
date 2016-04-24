BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if (success) {
    	if($gameSwitches.value(4)) this.dragonLife();
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};

BattleManager.dragonLife = function() {
	$gameVariables.setValue(6, $gameTroop.members()[0].hp);
	$gameVariables.setValue(7, $gameTroop.members()[0].mp);
	$gameSwitches.setValue(5, true);
}
