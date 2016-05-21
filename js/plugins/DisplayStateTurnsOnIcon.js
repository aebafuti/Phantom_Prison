//=============================================================================
// Display State Turns On Icon
// by lolaccount
// Last Updated: 2015.11.26
//=============================================================================

/*:
 * @plugindesc v1.04 Number of turns remaining for states/debuffs/buffs is
 * displayed on the icon.
 * <lolaccount DisplayStateTurnsOnIcon>
 * @author lolaccount
 *
 * @param Font Size
 * @desc Default: 16
 * @default 16
 *
 * @param Position
 * @desc Options: bottomleft, center, rightcenter, bottomcenter, etc  Default: topright
 * @default topright
 *
 * @param ---Compatibility---
 * @default
 *
 * @param Decimal Places
 * @desc # of decimal places for non-integer turn counts
 * Default: 0    
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * Patch Notes
 * ============================================================================
 * v1.04 - Added Font Size Parameter, Added Position Parameter
 * v1.03 - Added check if state has an icon, added compatibility for Yanfly's ATB
 * added decimal place parameter for non-integer turn counts, like in Yanfly's
 * ATB. Fixed crashing when using tofixed out of battle
 * v1.02 - Fixed slicing issue that caused more numbers than should be shown
 * v1.01 - Added buff and debuffs turns, fixed displaying 1 or 0 for states
 * that don't have turns, moved text up a bit
 * ============================================================================
 * How To Use
 * ============================================================================
 * Plug and play.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with or
 * without credit, as long as you do not claim the script as your own.
 * Credit is appreciated though.
 */

(function () {
    var parameters = $plugins.filter(function (p) {
        return p.description.contains('<lolaccount DisplayStateTurnsOnIcon>');
    })[0].parameters; //Thanks to Iavra
// decimal places to show for turn count
    var decimalPlaces = parseInt(parameters['Decimal Places'] || 0);
// size of turn text font
    var turnFontSize = parseInt(parameters['Font Size'] || 16);
// position of turn text
    var turnTextPosition = String(parameters['Position'] || 'topright');
    
// alias function
    var _Window_Base_drawActorIcons = Window_Base.prototype.drawActorIcons;
    Window_Base.prototype.drawActorIcons = function (actor, x, y, width) {
        // the default we are making an alias for
        _Window_Base_drawActorIcons.call(this, actor, x, y, width);



        // array of turn integers corresponding to each state/debuff/buff
        var turns = [];
        // initialize loop variable
        var i = 0;
        // for each state actor has
        actor.states().forEach(function (state) {
            // check if autoremoval is not 0. If it is not 0 then it is removed
            // automatically after a certain number of turns.
            if (state.autoRemovalTiming != 0 && state.iconIndex > 0) {
                turns.push(actor._stateTurns[actor._states[i]]);
            }
            else {
                // if autoremoval is 0, then it's a state that is not removed by
                // turns, like defeat. add 0 to the array so that it is skipped
                // when we are displaying the text.
                turns.push(0);
            }
            // increment the loop variable
            i++;
        }, this);

        // for each possible parameter that can have a
        // buff or debuff
        for (var j = 0; j < actor._buffs.length; j++) {
            // check if the parameter has a buff/debuff
            if (actor._buffs[j] !== 0) {
                // if so add the number of turns the buff/debuff
                // has to the turn array
                turns.push(actor._buffTurns[j]);
            }
        }

        turns = turns.slice(0, Math.floor(width / Window_Base._iconWidth));

        // set font size to parameter
        //this.contents.fontSize = turnFontSize;
        // for each state/debuff/buff, draw text for their turns remaining
        for (var i = 0; i < actor.allIcons().length; i++) {
            // This is a check for whether the turns remaining is 0 or not
            // if we don't check we'll get a 0 displayed for states like death
            // turns[i] checks if turn is defined, if not we'll get an error with toFixed
            if (turns[i] && turns[i] != 0) {
                // draw the text for their turns remaining
                this.drawText(turns[i].toFixed(decimalPlaces), this.turnsRemainingPosX(i,x), this.turnsRemainingPosY(y), Window_Base._iconWidth, 'center');
            }
        }
        // reset font size so other stuff isn't resized as well
        //this.resetFontSettings();
    };

    Window_Base.prototype.turnsRemainingPosX = function (i, x) {
        var returnValue = x + (Window_Base._iconWidth * i);
        switch (turnTextPosition) {
            case "topleft":
            case "bottomleft":
            case "leftcenter":
                returnValue -= (Window_Base._iconWidth / 6);
                break;
            case "topright":
            case "bottomright":
            case "rightcenter":
                returnValue += (Window_Base._iconWidth / 6);
                break;
        }
        return returnValue;
    };

    Window_Base.prototype.turnsRemainingPosY = function (y) {
        var returnValue = y;
        switch (turnTextPosition) {
            case "topleft":
            case "topright":
            case "topcenter":
                returnValue -= (Window_Base._iconWidth / 6);
                break;
            case "bottomleft":
            case "bottomright":
            case "bottomcenter":
                returnValue += (Window_Base._iconWidth / 6);
                break;
        }
        return returnValue;
    };

})();