//-----------------------------------------------------------------------------
// Scene_Status
//
// The scene class of the status screen.

function Scene_Status() {
    this.initialize.apply(this, arguments);
}

Scene_Status.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Status.prototype.constructor = Scene_Status;

Scene_Status.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_Status();
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._statusWindow);
    this._standSprite = new Sprite();
    this.refreshActor();
};

Scene_Status.prototype.stand = function(actor) {
	var name= "";
    switch(actor.actorId()){
    	case 1:
    		name = "Evil";
    		break;
    	case 2:
    		name = "Black_Spirit";
    		break;
    	case 3:
    		name = "White_Spirit";
    		break;
    	case 4:
    		name = "Red_Spirit";
    		break;
    	case 5:
    		name = "Blue_Spirit";
    		break;
    	case 6:
    		name = "Green_Spirit";
    		break;
    	case 7:
    		name = "Silver_Spirit";
    		break;
    	case 8:
    		name = "Gold_Spirit";
    		break;
    }
    this._standSprite.bitmap = ImageManager.loadPicture(name);
    this._standSprite.x = Graphics.boxWidth - 429;
    this._standSprite.y = 0;
    this.addChild(this._standSprite);
};

Scene_Status.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
    this.stand(actor);
};

Scene_Status.prototype.onActorChange = function() {
    this.refreshActor();
    this._statusWindow.activate();
};


//-----------------------------------------------------------------------------
// Window_Status
//
// The window for displaying full status on the status screen.

function Window_Status() {
    this.initialize.apply(this, arguments);
}

Window_Status.prototype = Object.create(Window_Selectable.prototype);
Window_Status.prototype.constructor = Window_Status;

Window_Status.prototype.initialize = function() {
    //var width = Graphics.boxWidth;
    var width = 440;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    this.activate();
};

Window_Status.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 1);
        this.drawBlock2(lineHeight * 2);
        this.drawHorzLine(lineHeight * 8);
        this.drawBlock3(lineHeight * 9);
        this.drawHorzLine(lineHeight * 14);
        this.drawBlock4(lineHeight * 15);
    }
};

Window_Status.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    //this.drawActorClass(this._actor, 192, y);
    this.drawActorNickname(this._actor, 0, y, 404);
};

Window_Status.prototype.drawBlock2 = function(y) {
    //this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(12, y);
    //this.drawExpInfo(12, y);
};

Window_Status.prototype.drawBlock3 = function(y) {
	this.drawParameters(12, y);
    this.drawEquipments(182, y);
};

Window_Status.prototype.drawBlock4 = function(y) {
	this.drawProfile(6, y);
};

Window_Status.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

Window_Status.prototype.lineColor = function() {
    return this.normalColor();
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x + 220, y + lineHeight * 0);
    this.drawActorHp(this._actor, x, y + lineHeight * 1);
    this.drawActorMp(this._actor, x, y + lineHeight * 2);
    this.drawExpInfo(12, y+ lineHeight * 4);
};

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 5; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y2, 80);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x + 80, y2, 60, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '----';
        value2 = '----';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 1, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 0, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 1, 270, 'right');
};

Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};

Window_Status.prototype.drawProfile = function(x, y) {
	this.contents.fontSize = 20;
	var id = this._actor.actorId();
    this.drawProfileText($dataActors[id].profile, x, y - 6);
    this.resetFontSettings();
};

Window_Status.prototype.maxEquipmentLines = function() {
    return 6;
};


Window_Status.prototype.drawProfileText = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};