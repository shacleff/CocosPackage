"use strict";

var OnHookManager = function(){
	this.ctor();
};

OnHookManager.prototype.ctor = function(){
	this.interval = 0;
	this.maxInterval = 0.3;
	this.mainScene = null;
	this.applyCloseLeftTime = null;
	this.curTime = null;
	this.refreshBtnTime = null;
};

OnHookManager.prototype.init = function(scene){
	this.mainScene = scene
};

OnHookManager.prototype.update = function(interval){
	this.interval = this.interval + interval;
	if(this.interval < this.maxInterval){
		return;
	} else {
		interval = this.interval;
		this.interval = 0;
	}
	if (this.applyCloseLeftTime !== null) {
		this.applyCloseLeftTime = this.applyCloseLeftTime - interval;

		if (h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show) {
			if (Math.floor(this.applyCloseLeftTime) < Math.floor(this.applyCloseLeftTime + interval)){
				h1global.curUIMgr.applyclose_ui.update_left_time(this.applyCloseLeftTime);
			}
		}
		if (this.applyCloseLeftTime <= 0) {
			this.applyCloseLeftTime = null;
			var player = h1global.entityManager.player();
			if(player.curGameRoom){
				player.curGameRoom.applyCloseLeftTime = 0;
			}
			if (h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show) {
				h1global.curUIMgr.applyclose_ui.hide();
			}
		}
	}
	if (this.curTime !== null) {
		// this.curTime = this.curTime + Math.floor(interval * 1000);
		if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show) {
			if(Math.floor(this.curTime/60) < Math.floor((this.curTime + interval)/60)){
				var curDateTime = new Date();
				this.curTime = (curDateTime.getTime())/1000;
				h1global.curUIMgr.gameroominfo_ui.update_curtime(curDateTime);
			} else {
				this.curTime = this.curTime + interval;
			}
		} else {
			this.curTime = null;
		}
	}
	if (this.refreshBtnTime != null) {
		this.refreshBtnTime -= interval;
		if (this.refreshBtnTime <= 0) {
			this.refreshBtnTime = null
		}
	}
};

OnHookManager.prototype.setApplyCloseLeftTime = function(leftTime){
	this.applyCloseLeftTime = leftTime;
};

OnHookManager.prototype.setCurTime = function(curTime){
	// 单位是秒
	this.curTime = curTime;
};

OnHookManager.prototype.setRefreshBtnTime = function(refreshBtnTime){
	// 单位是秒
	this.refreshBtnTime = refreshBtnTime;
};