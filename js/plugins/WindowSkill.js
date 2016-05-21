


//-----------------------------------------------------------------------------
// Scene_Skill
//
// The scene class of the skill screen.

function Scene_Skill() {
    this.initialize.apply(this, arguments);
}

Scene_Skill.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Skill.prototype.constructor = Scene_Skill;

Scene_Skill.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_Skill.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createSkillTypeWindow();
    this.createStatusWindow();
    this.createControlHelpWindow();
    this.createItemWindow();
    this.createActorWindow();
    this.refreshActor();
    this.commandSkill();
};

Scene_Skill.prototype.createControlHelpWindow = function() {
    this._controlHelpWindow = new Window_ControlHelp(0, 0);
    this._controlHelpWindow.y = Graphics.boxHeight - this._controlHelpWindow.height;
    this._controlHelpWindow.setHandler('select', this.selectCancel.bind(this));
    this._controlHelpWindow.setHandler('cancel', this.cancel.bind(this));
    this._controlHelpWindow.setHandler('previous', this.previousActor.bind(this));
    this._controlHelpWindow.setHandler('next', this.nextActor.bind(this));
    this.addWindow(this._controlHelpWindow);
    this._controlHelpWindow.deselect();
    this._controlHelpWindow.pagingEnable(true);
};

Scene_Skill.prototype.selectCancel = function() {
    if (this._itemWindow.active) {
        this._itemWindow.deselect();
        //this._itemWindow.deactivate();
    }
};

Scene_Skill.prototype.selectCommand = function() {
	this._controlHelpWindow.deselect();
    this._itemWindow.activate();
    this._controlHelpWindow.activate();
};

Scene_Skill.prototype.cancel = function() {
    if (this._itemWindow.active) {
    	this.onItemCancel();
    }
};

Scene_Skill.prototype.createSkillTypeWindow = function() {
    var wy = this._helpWindow.height;
    this._skillTypeWindow = new Window_SkillType(0, wy);
    this._skillTypeWindow.setHelpWindow(this._helpWindow);
    this._skillTypeWindow.setHandler('skill',    this.commandSkill.bind(this));
    this._skillTypeWindow.setHandler('cancel',   this.popScene.bind(this));
    this._skillTypeWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._skillTypeWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._skillTypeWindow);
    this._skillTypeWindow.hide();
    this._skillTypeWindow.deactivate();
};

Scene_Skill.prototype.createStatusWindow = function() {
    //var wx = this._skillTypeWindow.width;
    var wx = 0
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    //var wh = this._skillTypeWindow.height;
    var wh = 180;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Skill.prototype.createItemWindow = function() {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy - this._controlHelpWindow.height;
    this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
    //this._skillTypeWindow.setSkillWindow(this._itemWindow);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('select', this.selectCommand.bind(this));
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._itemWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._itemWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Skill.prototype.refreshActor = function() {
    var actor = this.actor();
    this._skillTypeWindow.setActor(actor);
    this._statusWindow.setActor(actor);
    this._itemWindow.setActor(actor);
};

Scene_Skill.prototype.user = function() {
    return this.actor();
};

Scene_Skill.prototype.commandSkill = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_Skill.prototype.onItemOk = function() {
	this._controlHelpWindow.deactivate();
	this._controlHelpWindow.hide();
    this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

Scene_Skill.prototype.onActorCancel = function() {
    this.hideSubWindow(this._actorWindow);
    this._controlHelpWindow.activate();
    this._controlHelpWindow.show();
};

Scene_Skill.prototype.onItemCancel = function() {
	if(this._controlHelpWindow.index() >= 0){
    	this.selectCommand();
    }else{
        this._itemWindow.deselect();
    	this.popScene();
    }
    
    //this._skillTypeWindow.activate();
};

Scene_Skill.prototype.playSeForItem = function() {
    SoundManager.playUseSkill();
};

Scene_Skill.prototype.useItem = function() {
    Scene_ItemBase.prototype.useItem.call(this);
    this._statusWindow.refresh();
    this._itemWindow.refresh();
};

Scene_Skill.prototype.onActorChange = function() {
    this.refreshActor();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
    this._controlHelpWindow.activate();
    //this._skillTypeWindow.activate();
};


Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    //this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
};

//-----------------------------------------------------------------------------
// Window_ControlHelp
//-----------------------------------------------------------------------------
function Window_ControlHelp() {
    this.initialize.apply(this, arguments);
}

Window_ControlHelp.prototype = Object.create(Window_HorzCommand.prototype);
Window_ControlHelp.prototype.constructor = Window_ControlHelp;

Window_ControlHelp.prototype.initialize = function(x, y) {
    this._pagingEnable = false;
    Window_Command.prototype.initialize.call(this, x, y);
    //this.setColumnRatio([0.25, 0.25, 0.5]);
    this.refresh();
};

Window_ControlHelp.prototype.makeCommandList = function() {
    this.addCommand("前(Q)",  'previous', this._pagingEnable);
    this.addCommand("次(W)",  'next', this._pagingEnable);
    //this.addCommand(TextManager.cancel,  'cancel');
};

Window_ControlHelp.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_ControlHelp.prototype.maxCols = function() {
    return 2;
};

Window_ControlHelp.prototype.pagingEnable = function(value) {
    if (this._pagingEnable !== value) {
        this._pagingEnable = value;
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
    }
};

Window_ControlHelp.prototype.itemTextAlign = function() {
    return 'center';
};

Window_ControlHelp.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_ControlHelp.prototype.playBuzzerSound = function() {
    //SoundManager.playBuzzer();
};




