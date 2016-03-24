/*:ja
 * @plugindesc 
 * @author 
 *
 * @param 
 * @desc 
 * @default 
 *
 * @help
 *PictureChange
 */
 
(function() {
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PictureChange') {
        	$gameScreen.changePicture(Number(args[0]),args[1]);
        }
        if (command === 'PictureStand') {
        	$gameScreen.standPicture(Number(args[0]),args[1]);
        }
        if (command === 'PictureFadeOut') {
        	$gameScreen.fadeOutPicture(Number(args[0]),Number(args[1]));
        }
        if (command === 'PictureFadeIn') {
        	$gameScreen.fadeInPicture(Number(args[0]),Number(args[1]));
        }
    };
    
    
	Game_Screen.prototype.changePicture = function(pictureId, name) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.change(name);
  		}
	};
	
	Game_Screen.prototype.standPicture = function(pictureId, name) {
		this.preLoadPicture(name);
		var realPictureId = this.realPictureId(pictureId);
    	var picture = new Game_Picture();
    	var x;
    	var newx;
    	switch (pictureId) {
		case 3:
			x = 404;
			newx = 454;
			break;
		case 2:
			x = 50;
			newx = 0;
			break;
  	  	}
  	  	picture.show(name, 0, x, 0, 100, 100, 0,0);
    	this._pictures[realPictureId] = picture;
        picture.move(0, newx, 0, 100, 100, 255, 0, 20);
	};
	
	Game_Screen.prototype.namePicture = function(pictureId) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			return picture.name();
  		}
  		return false;
	};
	
	Game_Screen.prototype.xPicture = function(pictureId) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			return picture.x();
  		}
  		return false;
	};
	
	Game_Screen.prototype.yPicture = function(pictureId) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			return picture.y();
  		}
  		return false;
	};
	
	Game_Screen.prototype.fadeOutPicture = function(pictureId, duration) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.fade(0, duration);
  		}
	};
	
	Game_Screen.prototype.fadeInPicture = function(pictureId, duration) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.fade(255, duration);
  		}
	};
	
	Game_Screen.prototype.changePicture = function(pictureId, name) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.change(name);
  		}
	};
		
	Game_Picture.prototype.change = function(name) {
 	   this._name = name;
	};
	
	
	Game_Picture.prototype.fade = function(opacity, duration) {
    	this._targetOpacity = opacity;
    	this._duration = duration;
	};
	

Game_Screen.prototype.preLoadPicture = function(name) {
	var spirit;
	var spiritList = ['Black', 'Blue', 'Gold', 'Green', 'Red','Silver', 'White'];
	for (i = 0; i < spiritList.length; i++){
		if (name.indexOf(spiritList[i]) != -1){
			spirit = spiritList[i];
			break;
		}
	}
	if(spirit){
		var list = this.pictureList(spirit);
		for (i = 0; i < list.length; i++){
			ImageManager.loadPicture(list[i]);
		}
	}
}

Game_Screen.prototype.pictureList = function(spirit) {
	var list = new Array();
	switch(spirit){
	case 'Black':
		list.push('Black_Spirit');
		list.push('Black_Spirit_ExFear');
		list.push('Black_Spirit_ExNomal');
		list.push('Black_Spirit_ExSmile');
		list.push('Black_Spirit_ExSurprise');
		list.push('Black_Spirit_ExWryly');
		list.push('Black_Spirit_ExDis');
		break;
	case 'Blue':
		list.push('Blue_Spirit');
		list.push('Blue_Spirit_ExAnger');
		list.push('Blue_Spirit_ExAway');
		list.push('Blue_Spirit_ExDown');
		list.push('Blue_Spirit_ExNormal');
		list.push('Blue_Spirit_ExShock');
		list.push('Blue_Spirit_ExSmile');
		list.push('Blue_Spirit_ExWeak');
		break;
	case 'Gold':
		list.push('Gold_Spirit');
		list.push('Gold_Spirit_ExPanic');
		list.push('Gold_Spirit_ExShy');
		list.push('Gold_Spirit_ExSmile');
		list.push('Gold_Spirit_ExSurprise');
		list.push('Gold_Spirit_ExWeak');
		list.push('Gold_Spirit_ExWeak2');
		list.push('Gold_Spirit_ExThink');
		break;
	case 'Green':
		list.push('Green_Spirit');
		list.push('Green_Spirit_ExAdmire');
		list.push('Green_Spirit_ExDrive');
		list.push('Green_Spirit_ExPanic');
		list.push('Green_Spirit_ExPanic2');
		list.push('Green_Spirit_ExPuzzle');
		list.push('Green_Spirit_ExShock');
		list.push('Green_Spirit_ExSmile');
		list.push('Green_Spirit_ExHatena');
		break;
	case 'Red':
		list.push('Red_Spirit');
		list.push('Red_Spirit_ExCoax');
		list.push('Red_Spirit_ExDum');
		list.push('Red_Spirit_ExNormal');
		list.push('Red_Spirit_ExNormal2');
		list.push('Red_Spirit_ExSmile');
		list.push('Red_Spirit_ExSmile2');
		list.push('Red_Spirit_ExSulk');
		list.push('Red_Spirit_ExSurprise');
		break;
	case 'Silver':
		list.push('Silver_Spirit');
		list.push('Silver_Spirit_ExDoya');
		list.push('Silver_Spirit_ExFear');
		list.push('Silver_Spirit_ExFear2');
		list.push('Silver_Spirit_ExNormal');
		list.push('Silver_Spirit_ExNormal2');
		list.push('Silver_Spirit_ExPuzzle');
		list.push('Silver_Spirit_ExSmile');
		list.push('Silver_Spirit_ExSurprise');
		list.push('Silver_Spirit_ExGununu');
		break;
	case 'White':
		list.push('White_Spirit');
		list.push('White_Spirit_ExDum');
		list.push('White_Spirit_ExNormal');
		list.push('White_Spirit_ExPanic');
		list.push('White_Spirit_ExSmile');
		list.push('White_Spirit_ExSurprise');
		list.push('White_Spirit_ExSmile2');
		break;
	}
	return list;
}

})();
 
