Game_Action.prototype.testApply = function(target) {
var growItem = false;
var paramId = false;
this.item().effects.some(function(effect) {
		growItem = effect.code == Game_Action.EFFECT_GROW
        paramId = effect.code == Game_Action.EFFECT_GROW ? effect.dataId : false;
    }, this);
    return ((this.isForDeadFriend() === target.isDead() ) &&
    		(growItem ? target.actorId() != 1 : true) &&
    		(paramId === 7 ? target.level != target.maxLevel() : true) &&
            ($gameParty.inBattle() || this.isForOpponent() ||
            (this.isHpRecover() && target.hp < target.mhp) ||
            (this.isMpRecover() && target.mp < target.mmp) ||
            (this.hasItemAnyValidEffects(target))));
};


