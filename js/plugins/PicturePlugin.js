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
		var realPictureId = this.realPictureId(pictureId);
    	var picture = new Game_Picture();
    	var x;
    	var newx;
    	switch (pictureId) {
		case 1:
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
	
	Game_Screen.prototype.activePicture = function(pictureId) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.tint([0, 0, 0, 0], 10);
  		}
	};
	
	Game_Screen.prototype.unactivePicture = function(pictureId) {
  	 	var picture = this.picture(pictureId);
  	 	if (picture) {
  			picture.tint([-60, -60, -60, 60], 10);
  		}
	};
	
	
	Game_Picture.prototype.change = function(name) {
 	   this._name = name;
	};
	
	
	Game_Picture.prototype.fade = function(opacity, duration) {
    	this._targetOpacity = opacity;
    	this._duration = duration;
	};
	


})();
 
