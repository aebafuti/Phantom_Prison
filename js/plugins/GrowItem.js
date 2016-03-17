Game_Action.prototype.testApply = function(target) {
var isGrow = false;
this.item().effects.some(function(effect) {
        isGrow = effect.code == Game_Action.EFFECT_GROW;
    }, this);
    
    return ((this.isForDeadFriend() === target.isDead() ) &&
    		(isGrow && target.actorId() != 1) &&
            ($gameParty.inBattle() || this.isForOpponent() ||
            (this.isHpRecover() && target.hp < target.mhp) ||
            (this.isMpRecover() && target.mp < target.mmp) ||
            (this.hasItemAnyValidEffects(target))));
};


