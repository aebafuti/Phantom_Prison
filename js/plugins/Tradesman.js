(function() {
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Tradesman') {
        	this.tradeStart();
        }
    };
    
    Game_Interpreter.prototype.tradeStart = function() {
    	this.tradeExport();
    	this.tradeInport();
    	this.tradePrice();
    }
    
    Game_Interpreter.prototype.tradeExport = function() {
    	var array = [1,2,3,4,5,6,7,10,11,12,13,14,21,22,23,24,25,26,27];
    	var rand;
		for(i=31; i<=39; i+=4){
			// 所持数3未満のアイテムの場合はやり直し
    		for(j=0; j<10; j++){
    			rand = this.tradeList(array);
				if($gameParty.numItems($dataItems[rand]) >= 3) break;
			}
			$gameVariables.setValue(i,rand);
		}
    };
    
    Game_Interpreter.prototype.tradeInport = function() {
    	var main_array = [7,8,9,13,14,16,17,18,19,21,22,23,24,25,26,27,52,53,55,56,62,64,71,73,74,75,76];
    	var rand ;
		for(i=32; i<=40; i+=4){
			var sub_array = main_array;
			// 支払い品との被りを除外
			for(j=0; j<sub_array.length; j++){
				var id = sub_array[j];
    			if(id == $gameVariables.value(i-1)) {
    				this.tradeListClear(sub_array, id);
    				break;
    			}
			}
			
			// 欠片→鉱物の除外
			for(j=0; j<sub_array.length; j++){
				var id = sub_array[j];
    			if((id >= 16 && id <= 19) && (id == $gameVariables.value(i-1) + 5 )) {
    				this.tradeListClear(sub_array, id);
    				break;
    			}
			}
			
			// すでに十分に持っているアイテムの場合はやり直し
			for(j=0; j<10; j++){
				rand = this.tradeList(sub_array);
				var item = $dataItems[rand];
				if($gameParty.numItems(item)/item.price >= 3 ){
					this.tradeListClear(sub_array, rand);
				}else{
					break;
				}
			}
			
			// 被り防止
			this.tradeListClear(main_array, rand);
			$gameVariables.setValue(i,rand);
		}
    };
    
    Game_Interpreter.prototype.tradeList = function(array) {
    	return array[ Math.floor( Math.random() * array.length )];
    }
    
    Game_Interpreter.prototype.tradeListClear = function(array,item) {
    	//配列をループして値を照合して要素を削除
		for(k=0; k<array.length; k++){
		    if(array[k] == item){
		        array.splice(k, 1);
		    }
		}
    }
    
    Game_Interpreter.prototype.tradePrice = function() {
	    for(i = 31; i<=39; i+=4){
			var a = $gameVariables.value(i); 
			var a_price = $dataItems[a].price;
			var b = $gameVariables.value(i+1); 
			var b_price = $dataItems[b].price;
			var x,y;
			if (a_price > b_price){
				x = 1; 
				y= Math.ceil(a_price/b_price);
			}else{
				y = 1; 
				x= Math.ceil(b_price/a_price);
			}
			$gameVariables.setValue(i+2,x);
			$gameVariables.setValue(i+3,y);
		}
    };
    
})();