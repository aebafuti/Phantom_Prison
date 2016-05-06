// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Chikuwa","status":true,"description":"「どのデータをロードしても共有した変数を読み込める」プラグイン","parameters":{"FileName":"chikuwa","WebStorageKey":"Chikuwa"}},
{"name":"YEP_CoreEngine","status":true,"description":"v1.12 Needed for the majority of Yanfly Engine Scripts. Also\r\ncontains bug fixes found inherently in RPG Maker.","parameters":{"---Screen---":"","Screen Width":"816","Screen Height":"624","Scale Battlebacks":"true","Scale Title":"true","Scale Game Over":"true","Open Console":"false","Reposition Battlers":"true","---Gold---":"","Gold Max":"99999999","Gold Font Size":"28","Gold Icon":"0","Gold Overlap":"a lotta","---Items---":"","Default Max":"99","Quantity Text Size":"20","---Stats---":"","Max Level":"20","Actor MaxHP":"9999","Actor MaxMP":"9999","Actor Parameter":"999","Enemy MaxHP":"999999","Enemy MaxMP":"9999","Enemy Parameter":"999","---Battle---":"","Animation Rate":"4","Flash Target":"false","---Font---":"","Chinese Font":"SimHei, Heiti TC, sans-serif","Korean Font":"Dotum, AppleGothic, sans-serif","Default Font":"GameFont, Verdana, Arial, Courier New","Font Size":"28","Text Align":"left","---Windows---":"","Digit Grouping":"true","Line Height":"36","Icon Width":"32","Icon Height":"32","Face Width":"144","Face Height":"144","Window Padding":"18","Text Padding":"6","Window Opacity":"192","Gauge Outline":"true","Gauge Height":"18","Menu TP Bar":"false","---Window Colors---":"","Color: Normal":"0","Color: System":"16","Color: Crisis":"17","Color: Death":"18","Color: Gauge Back":"19","Color: HP Gauge 1":"20","Color: HP Gauge 2":"21","Color: MP Gauge 1":"22","Color: MP Gauge 2":"23","Color: MP Cost":"23","Color: Power Up":"24","Color: Power Down":"25","Color: TP Gauge 1":"28","Color: TP Gauge 2":"29","Color: TP Cost Color":"29"}},
{"name":"YEP_BattleEngineCore","status":true,"description":"v1.33 Have more control over the flow of the battle system\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi","Default System":"atb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.1","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"0","Physical Animation":"0","Magical Animation":"0","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"Graphics.boxWidth - 216 + index * 32","Home Position Y":"Graphics.boxHeight - 344 + index * 48","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.5","Default Y Anchor":"1.0","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.9","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"使用者","Ally Help Text":"味方","Allies Help Text":"味方","Enemy Help Text":"敵","Enemies Help Text":"敵","All Help Text":"%1全体","Random Help Text":"%1 %2体 ランダム ","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"false","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"false","Show State Text":"false","Show Buff Text":"false","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"false","Show Critical Text":"false","Show Miss Text":"false","Show Evasion Text":"false","Show HP Text":"true","Show MP Text":"false","Show TP Text":"false"}},
{"name":"YEP_X_ActSeqPack1","status":true,"description":"v1.10 (Requires YEP_BattleEngineCore.js) Basic functions are\nadded to the Battle Engine Core's action sequences.","parameters":{"Default Volume":"90","Default Pitch":"100","Default Pan":"0"}},
{"name":"YEP_X_BattleSysATB","status":true,"description":"v1.21 (Requires YEP_BattleEngineCore.js) Add ATB (Active\nTurn Battle) into your game using this plugin!","parameters":{"---ATB Settings---":"","Per Tick":"user.agi","Initial Speed":"0","Full Gauge":"Math.max(5000, BattleManager.highestBaseAgi() * 100)","Charge Gauge":"Math.max(2000, BattleManager.highestBaseAgi() * 20)","Pre-Emptive Bonuses":"0.8","Surprise Bonuses":"0.8","---Escape---":"","Escape Ratio":"1.0","Fail Escape Boost":"0.025","---Turn---":"","Full Turn":"Math.min(200, BattleManager.lowestBaseAgi() * 8)","Flash Enemy":"true","---Rubberband---":"","Enable Rubberband":"true","Minimum Speed":"0.5 * BattleManager.highestBaseAgi()","Maximum Speed":"1.5 * BattleManager.highestBaseAgi()","---Sound---":"","Ready Sound":"button69","Ready Volume":"90","Ready Pitch":"120","Ready Pan":"0","---Options---":"","ATB Speed Text":"ATB Speed","Default ATB Speed":"10","---Windows---":"","Lock Status Window":"true","Gauge Style":"1","Gauge Text":"Turn","Gauge Text Align":"center","ATB Gauge Color 1":"13","ATB Gauge Color 2":"5","Slow Gauge Color 1":"12","Slow Gauge Color 2":"4","Fast Gauge Color 1":"26","Fast Gauge Color 2":"27","Stop Gauge Color 1":"7","Stop Gauge Color 2":"8","Full Gauge Color 1":"14","Full Gauge Color 2":"6","Charge Gauge Color 1":"2","Charge Gauge Color 2":"10"}},
{"name":"YEP_BattleStatusWindow","status":true,"description":"v1.04 A simple battle status window that shows the\nfaces of your party members in horizontal format.","parameters":{"---Visual---":"","No Action Icon":"16","Name Font Size":"20","Param Font Size":"20","Param Y Buffer":"7","Param Current Max":"false","Adjust Columns":"false","---Actor Switching---":"","Left / Right":"true","PageUp / PageDown":"true","Allow Turn Skip":"true","---Front View---":"","Show Animations":"true","Show Sprites":"false","Align Animations":"true","X Offset":"24","Y Offset":"-16"}},
{"name":"YEP_X_VisualHpGauge","status":true,"description":"v1.04 (Requires YEP_BattleEngineCore.js) Reveal HP Gauges\nwhen a battler is selected or takes damage in battle.","parameters":{"---General---":"","Display Actor":"false","Defeat First":"true","Always Visible":"false","---Appearance---":"","Minimum Gauge Width":"144","Gauge Height":"18","Back Color":"19","HP Color 1":"20","HP Color 2":"21","Gauge Duration":"30","Gauge Position":"false","Y Buffer":"-16","Use Thick Gauges":"true","---Text Display---":"","Show HP":"false","Show Value":"false","Show Max":"false"}},
{"name":"YEP_BattleAICore","status":true,"description":"v1.05 This plugin allows you to structure battle A.I.\npatterns with more control.","parameters":{"Dynamic Actions":"true","Element Testing":"false","Default AI Level":"0"}},
{"name":"YEP_VictoryAftermath","status":true,"description":"v1.05b Display an informative window after a battle is over\ninstead of message box text stating what the party earned.","parameters":{"---General---":"","Victory Order":"exp custom drops","---BGM---":"","Victory BGM":"Ship3","BGM Volume":"90","BGM Pitch":"100","BGM Pan":"0","---Battle Results---":"","Cheer Wait":"90","Battle Results Text":"戦闘結果","Battle Drops Text":"獲得物","---EXP Window---":"","Font Size":"28","Level Up Text":"LEVEL UP!","Max Level Text":"MAX LEVEL","Show Skills Learned":"true","Gained EXP Text":"獲得経験値","Gained EXP Format":"+%1","EXP Gauge Color 1":"30","EXP Gauge Color 2":"31","Level Gauge Color 1":"14","Level Gauge Color 2":"6","Gauge Ticks":"15","Tick SE":"Absorb2","Tick Volume":"90","Tick Pitch":"150","Tick Pan":"0"}},
{"name":"YEP_SaveEventLocations","status":true,"description":"マップに出入りする際でも、マップ上のイベントの位置を\n保存・維持させることができるようになります。","parameters":{}},
{"name":"BugFixImageOnLoad","status":true,"description":"画像ロード遅延時のエラー修正プラグイン","parameters":{}},
{"name":"RX_T_CallEvent_in_Map","status":true,"description":"マップ内に設定したイベントを他のイベントから呼び出すことができます。","parameters":{}},
{"name":"MessageWindowPopup","status":true,"description":"フキダシウィンドウプラグイン","parameters":{"フォントサイズ":"22","余白":"10","自動設定":"ON","フェイス倍率":"75","ウィンドウ連携":"ON","行間":"4"}},
{"name":"CraftingSystem","status":true,"description":"Craft items, weapons and armors based on categorized recipe books.","parameters":{"Categories":"作成するアイテムを選択","CraftingSounds":"Sword2, Ice4","Price Text":"Price","Equip Text":"装備","Type Text":"種類","Ingredients Text":"必要素材：","Currency Text":"Currency","Item Crafted Text":"作成："}},
{"name":"Torigoya_InputNamePrompt","status":true,"description":"名前入力ダイアログ機能を追加します","parameters":{"Max Length":"5","Message":"名前を入力してください","Maximum Message":"(%1 文字以内で入力)"}},
{"name":"Torigoya_SameEquipType","status":true,"description":"装備タイプ名が同じならば、同じ種別のアイテムを装備できるようにします","parameters":{}},
{"name":"Torigoya_ReplaceDeadMember","status":true,"description":"戦闘中、死亡したメンバーを自動的に控えメンバーに入れ替えます。","parameters":{}},
{"name":"Torigoya_SaveCommand","status":true,"description":"プラグインコマンドからセーブを実行できるようにします。","parameters":{}},
{"name":"SSEP_BattleSpeedUp_v2","status":true,"description":"[ver2.01] 戦闘速度を上げるプラグインです。YanflyEngine対応。\n利用時は、必ずYanflyEngineの後に読み込んでください。","parameters":{"---General Setting---":"","BattleSpeed (Default)":"1","BattleSpeed (Boost)":"2","OkayKeyBoost":"true","VisibleSwitch":"false","BoostToggleSwitch":"shift","---Detail Setting---":"","StateIcon":"40","StateOverlay":"8","Weapon":"12","Motion":"12","Balloon":"12","Damage":"90","DamageMin":"60","--BattleLog Setting--":"","LogAnime BaseDelay":"8","LogAnime NextDelay":"20","LogWaitCount Default":"1","LogWaitCount Boost":"2","---Switch Setting---":"","SE BoostON":"Decision2","SE BoostOFF":"Decision2","SE Volume":"50","SwitchImage":"Balloon","SwitchX":"10","SwitchY":"10","SwitchWidth":"48","SwitchHeight":"48","SwitchTop":"2","SwitchLeft":"1","SwitchAnimePattern":"8","SwitchAnimeSpeed":"5","---YEP BattleCore---":"","YEP Battle MotionWait":"20","---YEP ATB---":"","YEP ATB BoostSwitch":"true","---ATB Speed---":"","ATB Speed(Default)":"1","ATB Speed(Boost)":"2","---YEP Victory AM---":"","YEP Victory Wait":"true"}},
{"name":"MapRapid","status":true,"description":"マップ高速化プラグイン","parameters":{"testPlayOnly":"OFF","showMessageRapid":"ON","windowOpenRapid":"ON","fadeRapid":"OFF"}},
{"name":"CommonPopupCore","status":true,"description":"汎用的なポップアップの仕組みを提供するためのベースプラグインです。","parameters":{"Text Back Color":"rgba(0,0,0,0.6)","Text Back FileName":"popup_back%d"}},
{"name":"GetInformation","status":true,"description":"ver1.04/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。","parameters":{"Info Disable Switch Id":"21","Use Battle Info":"true","Use Rewards Info":"true","Info Font Size":"20","Info Count":"120","Info Delay":"20","Info MoveWait":"100","Info MoveFade":"10","Gold Icon Index":"314","Get Gold Text":"","Lost Gold Text":"_num\\G が経過した","Get Item Text":"\\I[_icon]_name を手に入れた！\\n\\C[6]","Lost Item Text":"","Get Item Text Num":"","Lost Item Text Num":"","Get Skill Text":"_actorは \\I[_icon]_name を覚えた！\\n\\C[6]","Lost Skill Text":"","Exp Up Text":"_actorは\\C[14]_num\\C[0]の\\C[4]_name\\C[0]を得た！","Exp Down Text":"","Lv Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_num\\C[0]上がった！","Lv Down Text":"","Param Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Param Down Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・","Abp Up Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！","Abp Down Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・","Class Lv Up Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Class Lv Down Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・"}},
{"name":"SmartPath","status":true,"description":"イベントもしくはプレイヤーに、高度な経路探索を提供します。","parameters":{}},
{"name":"HIME_MoreEnemyDrops","status":true,"description":"Allows you to add more drops to an enemy and use percentage\r\nprobabilities for drop chance.","parameters":{}},
{"name":"AltMenuScreen2","status":true,"description":"レイアウトの異なるメニュー画面","parameters":{"backGroundBitmap":"","maxColsMenu":"4","commandRows":"2","isDisplayStatus":"1"}},
{"name":"KMS_AltGauge","status":true,"description":"[v0.1.0] 画像を使用した汎用のゲージです。","parameters":{"HP gauge image":"GaugeHP","HP gauge config":"-31, -2, -4, 30","MP gauge image":"GaugeMP","MP gauge config":"-31, -2, -4, 30","TP gauge image":"GaugeTP","TP gauge config":"-31, -2, -4, 30","EXP gauge image":"GaugeEXP","EXP gauge config":"-31, -2, -4, 30","Use exp gauge":"1"}},
{"name":"TMOmitEquipCommand","status":true,"description":"装備シーンからコマンドウィンドウを削除し、\nスロットウィンドウに２行分のスペースを追加します。","parameters":{}},
{"name":"TMTopFix","status":true,"description":"パーティの先頭にいるアクターの並び替えを禁止します。","parameters":{}},
{"name":"TMAutoNewGame","status":true,"description":"起動時に自動ではじめからゲームを開始します。\nWeb用ミニゲームなど、タイトルが不要な場合に使えます。","parameters":{"autoNewGame":"1","allwaysOnTop":"1","autoDevTool":"0"}},
{"name":"TMBattlerEx","status":false,"description":"エネミーに遠近感や息づかいの表現を追加します。","parameters":{"baseY":"400","breathH":"0.005","mirrorRate":"0"}},
{"name":"AnotherNewGame","status":true,"description":"アナザーニューゲーム追加プラグイン","parameters":{"name":"会話回想","map_id":"4","map_x":"1","map_y":"1","hidden":"OFF","disable":"OFF"}},
{"name":"ResidentWindow","status":true,"description":"マップに常駐するステータス＋所持金ウィンドウを生成します。","parameters":{"StartWithHideWindow":"true","FaceWindow_ON":"false","StatusWindow_ON":"true","GoldWindow_ON":"true","FaceWindow_x":"10","FaceWindow_y":"10","FaceWindow_type":"2","FaceFrame_ON":"false","StatusWindow_x":"0","StatusWindow_y":"0","StatusWindow_type":"2","GaugeFrame_ON":"false","StatusWindow_PaddingHeight":"10","TP_Gauge_ON":"false","GoldWindow_x":"636","GoldWindow_y":"550","GoldWindow_type":"0","GoldWindow_width":"180","GoldWindow_height":"60","GoldWindow_IconNumber":"0","GoldWindow_PaddingWidth":"10\r"}},
{"name":"ExpDtiail","status":true,"description":"経験値を詳細に設定します。","parameters":{"経験値リスト":"プラグインエディタからの設定は不可能です。","自動加算値":"プラグインエディタからの設定は不可能です。"}},
{"name":"WindowStatus","status":true,"description":"","parameters":{}},
{"name":"WindowSkill","status":true,"description":"","parameters":{}},
{"name":"PicturePlugin","status":true,"description":"","parameters":{"":""}},
{"name":"TitleCommandPosition","status":true,"description":"タイトルコマンドウィンドウの位置を変更します。","parameters":{"Offset X":"-260","Offset Y":"80","Width":"180","Background":"2"}},
{"name":"CustomizeConfigDefault","status":true,"description":"Optionsデフォルト値設定プラグイン","parameters":{"alwaysDash":"ON","commandRemember":"OFF","bgmVolume":"20","bgsVolume":"20","meVolume":"20","seVolume":"20"}},
{"name":"TMTextEscape","status":true,"description":"文章の表示に使える制御文字を追加します。","parameters":{}},
{"name":"BattleActorFaceVisibility","status":true,"description":"戦闘中顔グラフィック表示プラグイン","parameters":{"ウィンドウ表示":"ON","ウィンドウX座標":"","ウィンドウY座標":""}},
{"name":"GrowItem","status":true,"description":"","parameters":{}},
{"name":"Counter","status":true,"description":"","parameters":{}},
{"name":"Tradesman","status":true,"description":"","parameters":{}},
{"name":"WeaponSkill","status":true,"description":"武器ごとに通常攻撃のスキルIDを変更します。","parameters":{}},
{"name":"Talk","status":true,"description":"","parameters":{}},
{"name":"VersionSpecified","status":true,"description":"【MMP ver.1.0】タイトル画面にバージョンを明記します。","parameters":{"version":"Ver 1.12","fontSize":"20","fontColor":"rgb(255, 255, 255)","windowX":"0","windowY":"0"}},
{"name":"CommandIcon","status":true,"description":"アイコン付きコマンドプラグイン","parameters":{}},
{"name":"EnemyCount","status":true,"description":"","parameters":{}},
{"name":"debug","status":false,"description":"","parameters":{}},
{"name":"liply_memoryleak_patch","status":true,"description":"メモリリークパッチ","parameters":{}},
{"name":"CacheManager","status":true,"description":"Selectively clear the image cache for memory usage improvements","parameters":{"Mobile only":"N","--------------------------------------------":"","Clear All":"N","Clear Animations":"Y","Clear Battlebacks":"Y","Clear Battlers":"Y","Clear Characters":"N","Clear Faces":"N","Clear Parallaxes":"N","Clear Pictures":"Y","Clear System":"N","Clear Tilesets":"N","Clear Titles":"N","Custom Images":""}},
{"name":"111_InputForm","status":true,"description":"フォーム作って文字入力","parameters":{}},
{"name":"Moogle_X_PassiveSkill","status":true,"description":"v1.14 Adds passive skills functionality to actors.","parameters":{"Default Hide in Battle":"0","Hidden Skill Type ID in Battle":"0"}},
{"name":"DragonEscape","status":true,"description":"","parameters":{}},
{"name":"RewardsAdjust","status":true,"description":"","parameters":{}}
];
