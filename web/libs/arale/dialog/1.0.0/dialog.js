define("arale/dialog/1.0.0/dialog",["$","arale/overlay/1.0.0/overlay","arale/position/1.0.0/position","arale/iframe-shim/1.0.0/iframe-shim","arale/widget/1.0.3/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","arale/overlay/1.0.0/mask","arale/widget/1.0.3/templatable","gallery/handlebars/1.0.0/handlebars"],function(a,b,c){function l(a){null==a.attr("tabindex")&&a.attr("tabindex","-1")}function m(a){var b=a[0].contentWindow.document;return b.body.scrollHeight&&b.documentElement.scrollHeight?Math.min(b.body.scrollHeight,b.documentElement.scrollHeight):b.documentElement.scrollHeight?b.documentElement.scrollHeight:b.body.scrollHeight?b.body.scrollHeight:void 0}var d=a("$"),e=a("arale/overlay/1.0.0/overlay"),f=a("arale/overlay/1.0.0/mask"),g=a("arale/events/1.0.0/events"),h=a("arale/widget/1.0.3/templatable"),i=".dialog",j="300px",k=e.extend({Implements:h,attrs:{template:'<div class="{{classPrefix}}">\n<div class="{{classPrefix}}-close" title="关闭本框" data-role="close"></div>\n<div class="{{classPrefix}}-content" data-role="content"></div>\n</div>',trigger:{value:null,getter:function(a){return d(a)}},classPrefix:"ui-dialog",content:{value:"",setter:function(a){return/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(a)&&(this._type="iframe"),a}},hasMask:!0,closeTpl:"×",width:500,height:null,effect:"none",zIndex:999,autoFit:!0,align:{selfXY:["50%","50%"],baseXY:["50%","50%"]}},parseElement:function(){this.model={classPrefix:this.get("classPrefix")},k.superclass.parseElement.call(this),this.contentElement=this.$("[data-role=content]"),this.contentElement.css({background:"#fff",height:"100%",zoom:1}),this.$("[data-role=close]").hide()},events:{"click [data-role=close]":function(a){a.preventDefault(),this.hide()}},show:function(){return"iframe"===this._type&&(!this.get("height")&&this.element.css("height",j),this._showIframe()),k.superclass.show.call(this),this},hide:function(){return"iframe"===this._type&&this.iframe&&this.iframe.attr({src:"javascript:'';"}),this.trigger("close"),k.superclass.hide.call(this),clearInterval(this._interval),delete this._interval,this},destroy:function(){return this.get("trigger").off("click"+i+this.cid),d(document).off("keyup."+i+this.cid),this.element.remove(),f.hide(),clearInterval(this._interval),k.superclass.destroy.call(this)},setup:function(){k.superclass.setup.call(this),this._setupTrigger(),this._setupMask(),this._setupKeyEvents(),this._setupFocus(),l(this.element),l(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0)},_onRenderContent:function(a){if("iframe"!==this._type){var b;try{b=d(a)}catch(c){b=[]}b[0]?this.contentElement.empty().append(b):this.contentElement.empty().html(a)}},_onRenderCloseTpl:function(a){""===a?this.$("[data-role=close]").html(a).hide():this.$("[data-role=close]").html(a).show()},_onRenderVisible:function(a){a?"fade"===this.get("effect")?this.element.fadeIn(300):this.element.show():this.element.hide()},_onRenderZIndex:function(a){return f.set("zIndex",parseInt(a,10)-1),k.superclass._onRenderZIndex.call(this,a)},_setupTrigger:function(){var a=this;this.get("trigger").on("click"+i+this.cid,function(b){b.preventDefault(),a.activeTrigger=d(this),a.show()})},_setupMask:function(){this.before("show",function(){this.get("hasMask")&&f.show()}),this.after("hide",function(){this.get("hasMask")&&f.hide()})},_setupFocus:function(){this.after("show",function(){this.element.focus()}),this.after("hide",function(){this.activeTrigger&&this.activeTrigger.focus()})},_setupKeyEvents:function(){var a=this;d(document).on("keyup."+i+this.cid,function(b){27===b.keyCode&&a.get("visible")&&a.hide()})},_showIframe:function(){var a=this;this.iframe||this._createIframe(),this.iframe.attr({src:this._fixUrl(),name:"dialog-iframe"+(new Date).getTime()}),this.iframe.one("load",function(){a.get("visible")&&(a.get("autoFit")&&(clearInterval(a._interval),a._interval=setInterval(function(){a._syncHeight()},300)),a._syncHeight(),a._setPosition(),a.trigger("complete:show"))})},_fixUrl:function(){var a=this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);return a.shift(),a[1]=(a[1]&&"?"!==a[1]?a[1]+"&":"?")+"t="+(new Date).getTime(),a.join("")},_createIframe:function(){var a=this;this.iframe=d("<iframe>",{src:"javascript:'';",scrolling:"no",frameborder:"no",allowTransparency:"true",css:{border:"none",width:"100%",display:"block",height:"100%",overflow:"hidden"}}).appendTo(this.contentElement),g.mixTo(this.iframe[0]),this.iframe[0].on("close",function(){a.hide()})},_syncHeight:function(){var a;if(this.get("height"))clearInterval(this._interval),delete this._interval;else{try{a=m(this.iframe)+"px"}catch(b){a=j,clearInterval(this._interval),delete this._interval}this.element.css("height",a)}}});c.exports=k});