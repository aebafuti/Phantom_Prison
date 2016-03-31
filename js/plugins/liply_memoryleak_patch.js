//=============================================================================
// liply_memoryleak_patch.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 liply
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// 2016/02/01 Canvasモード起動時や特定状況で落ちるバグを修正
// 2015/12/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://liply.net/
// [Twitter]: https://twitter.com/liplynet/
// [GitHub] : https://github.com/liply/
//=============================================================================

/*:
 * @plugindesc memory leak patch
 * @author liply
 *
 * @help Tiling_Sprite leaks memory. this patch fix it.
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc メモリリークパッチ
 * @author liply
 * 
 * @help Tiling_Spriteのメモリリークパッチです。
 * MITライセンスです！
 */

(function(){
    var TilingSprite_prototype_generateTilingTexture = TilingSprite.prototype.generateTilingTexture;
    TilingSprite.prototype.generateTilingTexture = function(arg){
        TilingSprite_prototype_generateTilingTexture.call(this, arg);
        // purge from Pixi's cache
        // Originally, we must call TilingSprite's destroy method, but RPG Maker doesn't use destroy methods and relies on GC.
        // This means TilingSprite's inner tilingTexture is never removed from the cache (PIXI.BaseTextureCache).
        // As long as we don't use destroy, we have to call removeTextureFromCache explicitly after generating TilingSprite.
        if (this.tilingTexture.canvasBuffer)
            PIXI.Texture.removeTextureFromCache(this.tilingTexture.canvasBuffer.canvas._pixiId);
    }
})();