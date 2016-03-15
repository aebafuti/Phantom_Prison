//=============================================================================
// KMS_AltGauge.js
//  last update: 2015/11/25
//=============================================================================

/*:
 * @plugindesc
 * [v0.1] Display alternative gauge.
 * 
 * @author TOMY (Kamesoft)
 *
 * @param HP gauge image
 * @default GaugeHP
 * @desc HP gauge image. Load from 'img/system'.
 *
 * @param HP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * Specify HP gauge position/width/angle.
 * Format: X, Y, Width, Angle (deg)
 *
 * @param MP gauge image
 * @default GaugeMP
 * @desc MP gauge image. Load from 'img/system'.
 *
 * @param MP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * Specify MP gauge position/width/angle.
 * Format: X, Y, Width, Angle (deg)
 *
 * @param TP gauge image
 * @default GaugeTP
 * @desc TP gauge image. Load from 'img/system'.
 *
 * @param TP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * Specify TP gauge position/width/angle.
 * Format: X, Y, Width, Angle (deg)
 *
 * @param EXP gauge image
 * @default GaugeEXP
 * @desc EXP gauge image. Load from 'img/system'.
 *
 * @param EXP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * Specify EXP gauge position/width/angle.
 * Format: X, Y, Width, Angle (deg)
 *
 * @param Use exp gauge
 * @default 1
 * @desc 0: Hide exp gauge  1: Show exp gauge
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc
 * [v0.1.0] 画像を使用した汎用のゲージです。
 *
 * @author TOMY (Kamesoft)
 *
 * @param HP gauge image
 * @default GaugeHP
 * @desc HP ゲージ画像です。'img/system' から読み込みます。
 *
 * @param HP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * HP ゲージの位置、幅、傾き (度) を指定します。
 * 書式: X, Y, 幅, 傾き
 *
 * @param MP gauge image
 * @default GaugeMP
 * @desc MP ゲージ画像です。'img/system' から読み込みます。
 *
 * @param MP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * MP ゲージの位置、幅、傾き (度) を指定します。
 * 書式: X, Y, 幅, 傾き
 *
 * @param TP gauge image
 * @default GaugeTP
 * @desc TP ゲージ画像です。'img/system' から読み込みます。
 *
 * @param TP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * TP ゲージの位置、幅、傾き (度) を指定します。
 * 書式: X, Y, 幅, 傾き
 *
 * @param EXP gauge image
 * @default GaugeEXP
 * @desc EXP ゲージ画像です。'img/system' から読み込みます。
 *
 * @param EXP gauge config
 * @default -31, -2, -4, 30
 * @desc
 * EXP ゲージの位置、幅、傾き (度) を指定します。
 * 書式: X, Y, 幅, 傾き
 *
 * @param Use exp gauge
 * @default 1
 * @desc
 * EXP ゲージを表示するか指定します。
 * 0: 表示しない  1: 表示する
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function()
{

var parseConfig = function(param)
{
    var configReg = /([-]?\d+),\s*([-]?\d+),\s*([-]?\d+),\s*([-]?\d+)/;
    var DefaultGaugeConfig = { x: -31, y: -2, width: -4, angle: 30 };
    var config = {
        x: DefaultGaugeConfig.x,
        y: DefaultGaugeConfig.y,
        width: DefaultGaugeConfig.width,
        angle: DefaultGaugeConfig.angle
    };

    var match = configReg.exec(pluginParams[param]);
    if (match)
    {
        config.x = Number(match[1]);
        config.y = Number(match[2]);
        config.width = Number(match[3]);
        config.angle = Number(match[4]);
    }

    return config;
}

var pluginParams = PluginManager.parameters('KMS_AltGauge');
var Params = {};
Params.imageDir = pluginParams['Image dir'] || 'img/system/';
Params.isEnableExp = Number(pluginParams['Use exp gauge'] || 1);
Params.gaugeImage = {};
Params.gaugeImage.hp = pluginParams['HP gauge image'];
Params.gaugeImage.mp = pluginParams['MP gauge image'];
Params.gaugeImage.tp = pluginParams['TP gauge image'];
Params.gaugeImage.exp = pluginParams['EXP gauge image'];
Params.gaugeConfig = {};
Params.gaugeConfig.hp = parseConfig('HP gauge config');
Params.gaugeConfig.mp = parseConfig('MP gauge config');
Params.gaugeConfig.tp = parseConfig('TP gauge config');
Params.gaugeConfig.exp = parseConfig('EXP gauge config');

var GaugeImageKeys = ['hp', 'mp', 'tp', 'exp'];

//-----------------------------------------------------------------------------
// Bitmap

Bitmap.prototype.skewBlt = function(source, slope, sx, sy, sw, sh, dx, dy, dw)
{
    slope.clamp(-90, 90);
    var offset = sh / Math.tan(Math.PI * (90 - Math.abs(slope)) / 180.0);
    var diff = offset / sh;
    if (slope >= 0)
    {
        dx += Math.round(offset);
        diff = -diff;
    }

    for (var i = 0; i < sh; ++i)
    {
        this.blt(source, sx, sy + i, sw, 1, dx + Math.round(diff * i), dy + i, dw);
    }
};

//-----------------------------------------------------------------------------
// Game_Actor

Game_Actor.prototype.nextExpRate = function()
{
    var diff = Math.max(this.nextLevelExp() - this.currentLevelExp(), 1);
    var rest = Math.max(this.nextRequiredExp(), 1);
    return (diff - rest) / diff;
};

//-----------------------------------------------------------------------------
// Window_Base

var _KMS_AltGauge_Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height)
{
    _KMS_AltGauge_Window_Base_initialize.call(this, x, y, width, height);
    this.loadGaugeImages();
};

Window_Base.prototype.loadGaugeImages = function()
{
    GaugeImageKeys.forEach(function(key)
    {
        this.getGaugeImage(key);
    }, this);
};

Window_Base.prototype.getGaugeImage = function(gaugeType)
{
    if (Params.gaugeImage[gaugeType])
    {
        return ImageManager.loadBitmap(Params.imageDir, Params.gaugeImage[gaugeType]);
    }
    else
    {
        return ImageManager.loadEmptyBitmap();
    }
};

Window_Base.prototype.drawKmsGauge = function(x, y, width, rate, gaugeType)
{
    var config = Params.gaugeConfig[gaugeType];
    x += config.x;
    y += config.y;
    width += config.width;

    var grid = 32;
    var fillW = Math.floor(width * rate);
    var bitmap = this.getGaugeImage(gaugeType);
    var gaugeW = bitmap.width / 2;
    var gaugeH = bitmap.height / 3;
    var gaugeY = y + this.lineHeight() - gaugeH - 2;

    // 背景
    this.contents.skewBlt(bitmap, config.angle, 0, 0, grid, gaugeH, x, gaugeY);
    this.contents.skewBlt(bitmap, config.angle, grid, 0, gaugeW, gaugeH, x + grid, gaugeY, width);
    this.contents.skewBlt(bitmap, config.angle, grid + gaugeW, 0, grid, gaugeH, x + width + grid, gaugeY);

    // 本体
    var gw = gaugeW * fillW / width;
    this.contents.skewBlt(bitmap, config.angle, 0, gaugeH, gw, gaugeH, x + grid, gaugeY, fillW);
};

if (Params.isEnableExp)
{
    var _KMS_AltGauge_Window_Base_drawActorLevel = Window_Base.prototype.drawActorLevel;
    Window_Base.prototype.drawActorLevel = function(actor, x, y, showGauge)
    {
        if (showGauge)
        {
            var width = 120;
            this.drawKmsGauge(x, y, width, actor.nextExpRate(), 'exp');
        }

        _KMS_AltGauge_Window_Base_drawActorLevel.call(this, actor, x, y);
    };
}

Window_Base.prototype.drawActorHp = function(actor, x, y, width)
{
    width = width || 186;
    this.drawKmsGauge(x, y, width, actor.hpRate(), 'hp');
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width)
{
    width = width || 186;
    this.drawKmsGauge(x, y, width, actor.mpRate(), 'mp');
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           this.mpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width)
{
    width = width || 96;
    this.drawKmsGauge(x, y, width, actor.tpRate(), 'tp');
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

Window_Base.prototype.drawActorNextExp = function(actor, x, y, width)
{
    width = width || 270;
    this.drawKmsGauge(x, y, width, actor.nextExpRate(), 'exp');
    this.changeTextColor(this.normalColor());
    var value = actor.isMaxLevel() ? '-------' : actor.nextRequiredExp();
    this.drawText(value, x, y, width, 'right');
};

if (Params.isEnableExp)
{
    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width)
    {
        var lineHeight = this.lineHeight();
        var x2 = x + 180;
        var width2 = Math.min(200, width - 180 - this.textPadding());
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x, y + lineHeight * 1, true);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y);
        this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
        this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    };
}

//-----------------------------------------------------------------------------
// Window_Status

if (Params.isEnableExp)
{
    Window_Status.prototype.drawExpInfo = function(x, y)
    {
        var lineHeight = this.lineHeight();
        var expTotal = TextManager.expTotal.format(TextManager.exp);
        var expNext = TextManager.expNext.format(TextManager.level);
        var value = this._actor.currentExp();
        if (this._actor.isMaxLevel())
        {
            value = '-------';
        }
        this.changeTextColor(this.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, 270);
        this.drawText(expNext, x, y + lineHeight * 2, 270);
        this.resetTextColor();
        this.drawText(value, x, y + lineHeight * 1, 270, 'right');
        this.drawActorNextExp(this._actor, x, y + lineHeight * 3, 270);
    };
}

})();
