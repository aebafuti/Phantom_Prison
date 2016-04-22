
var _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.clearEnemyEncount();
    this.clearEnemyDefeat();
};

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
	if (!this._enemyEncount) this.clearEnemyEncount();
	return id ? this._enemyEncount[id]: this._enemyEncount; // || this._enemyEncount[id + 30] 
};

Game_System.prototype.enemyDefeat = function(id) {
	if (!this._enemyDefeat) this.clearEnemyDefeat();
	return id ? this._enemyDefeat[id]: this._enemyDefeat; // || this._enemDefeat[id + 30] 
};

Game_System.prototype.redEnemy = function(element, index, array) {
	return (index >= 21 && index < 30) || (index >= 51 && index < 60);
}

Game_System.prototype.redEnemyEncount = function() {
	if (!this._enemyEncount) this.clearEnemyEncount();
	return this._enemyEncount.some(this.redEnemy);
};

Game_System.prototype.redEnemyDefeat = function() {
	if (!this._enemyDefeat) this.clearEnemyDefeat();
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
            if($gameSwitches.value(23)) enemyId += 30; // HARDフラグ
            if($gameSwitches.value(25)) enemyId += 1; // 金スライムフラグ
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

