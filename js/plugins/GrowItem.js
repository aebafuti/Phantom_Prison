Game_Action.prototype.testApply = function(target) {
var paramId = false;
this.item().effects.some(function(effect) {
        paramId = effect.code == Game_Action.EFFECT_GROW ? effect.dataId : false;
    }, this);
    return ((this.isForDeadFriend() === target.isDead() ) &&
    		(paramId ? target.actorId() != 1 : true) &&
    		(paramId === 7 ? target.level != target.maxLevel() : true) &&
            ($gameParty.inBattle() || this.isForOpponent() ||
            (this.isHpRecover() && target.hp < target.mhp) ||
            (this.isMpRecover() && target.mp < target.mmp) ||
            (this.hasItemAnyValidEffects(target))));
};


