BattleManager.makeRewards = function() {
    this._rewards = {};
    this._rewards.gold = $gameTroop.goldTotal();
    this._rewards.exp = $gameTroop.expTotal() * (4 / Math.min($gameParty.size(), 4));
    this._rewards.items = $gameTroop.makeDropItems();
};