Game_System.prototype.addToEnemyEncount = function(enemyId) {
	if (!this._enemyEncount) this.clearEnemyEncount();
	this._enemyEncount[enemyId] ? this._enemyEncount[enemyId]++ : this._enemyEncount[enemyId] = 1;
};

Game_System.prototype.clearEnemyEncount = function() {
	this._enemyEncount = [];
};

Game_System.prototype.addToEnemyDefeat = function(enemyId) {
	if (!this._enemyDefeat) this.clearEnemyDefeat();
	this._enemyDefeat[enemyId] ? this._enemyDefeat[enemyId]++ : this._enemyDefeat[enemyId] = 1;
};

Game_System.prototype.clearEnemyDefeat = function() {
	this._enemyDefeat = [];
};

Game_System.prototype.enemyEncount = function(id) {
	return id ? this._enemyEncount[id] || this._enemyEncount[id + 30] : this._enemyEncount;
};

Game_System.prototype.enemyDefeat = function(id) {
	return id ? this._enemyDefeat[id] || this._enemDefeat[id + 30] : this._enemyDefeat;
};

Game_System.prototype.redEnemy = function(element, index, array) {
	return (index >= 21 && index < 30) || (index >= 51 && index < 60);
}

Game_System.prototype.redEnemyEncount = function() {
	return this._enemyEncount.some(this.redEnemy);
};

Game_System.prototype.redEnemyDefeat = function() {
	return this._enemyDefeat.some(this.redEnemy);
}


Game_Troop.prototype.setup = function(troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    this.troop().members.forEach(function(member) {
        if ($dataEnemies[member.enemyId]) {
            var enemyId = member.enemyId;
            if($gameSwitches.value(22)) enemyId += 20; // 強化敵フラグ
            var x = member.x;
            var y = member.y;
            var enemy = new Game_Enemy(enemyId, x, y);
            if (member.hidden) {
                enemy.hide();
            }
            this._enemies.push(enemy);
            if (enemy.isAppeared()) $gameSystem.addToEnemyEncount(enemy.enemyId()); // 遭遇カウント
        }
    }, this);
    this.makeUniqueNames();
};

Game_Troop.prototype.defeatCount = function() {
    this.deadMembers().forEach(function(enemy) {
        $gameSystem.addToEnemyDefeat(enemy.enemyId());
    }, this);
};

var _BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    _BattleManager_endBattle.call(this, result);
    $gameTroop.defeatCount();
};

