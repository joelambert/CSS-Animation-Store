/**
 * CSS Animation Store v0.1
 * JSON style interface to CSS Animations
 *
 * Copyright 2011, Joe Lambert (http://www.joelambert.co.uk).
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(){
	
	var KeyframeRule = function(r) {
		this.original = r;
		this.keyText = r.keyText;
		this.css = r.css();
	};
	
	var KeyframeAnimation = function(kf) {
		var _this = this;
		this.original = kf;
		this.name = kf.name;
		
		this.keyframes = [];
		var keytexts = [],
			keyframeHash = {},
		
		/**
		 * Makes the rule indexable
		 * @param {WebKitKeyframeRule} r The CSSOM keyframe rule
		 * @returns undefined
		 */
		
		indexRule = function(r) {
			var rule = new KeyframeRule(r);
			_this.keyframes.push(rule);
			keytexts.push(rule.keyText);
			keyframeHash[rule.keyText] = rule;
		},
		
		
		/**
		 * Initialises the object
		 * @returns undefined
		 */
		
		init = function() {
			_this.keyframes = [];
			keytexts = [];
			keyframeHash = {};
			
			for(var i=0; i<kf.cssRules.length; i++) {
				indexRule(kf.cssRules[i]);
			}
		};
		
		init();
		
		this.getKeyframeTexts = function() {
			return keytexts;
		};
		
		this.getKeyframe = function(text) {
			return keyframeHash[text];
		};
		
		this.setKeyframe = function(text, css) {
			var cssRule = text+" {";
			
			for(var k in css) {
				cssRule += k+':'+css[k]+';';
			}
			
			cssRule += "}";
			_this.original.insertRule(cssRule);
			init();
		};
	};
	
	var trim = function(str) {
		str = str || "";
		return str.replace(/^\s+|\s+$/g,"");
	};
	
	var prefix = "",
		prefixes = ['WebKit', 'Moz'];
		
	for(var i=0; i<prefixes.length; i++) {
		if(window[prefixes[i]+'CSSKeyframeRule'])
			prefix = prefixes[i];
	}
	
	window[prefix+'CSSKeyframeRule'].prototype.css = function() {
		var css = {};

		var rules = this.style.cssText.split(';');
		for(var i=0; i<rules.length; i++) {
			var parts = rules[i].split(':'),
				key = trim(parts[0]),
				value = trim(parts[1]);
			
			if(key !== '' && value !== '')
				css[key] = value;
		}
		
		return css;
	};
	
	var CSSAnimationStore = function(){
		
		// Find all the animations
		var animations = (function() {
			var ss = document.styleSheets,
				anims = {};
			for (var i = ss.length - 1; i >= 0; i--) {
				try {
					var s = ss[i],
						rs = s.cssRules ? s.cssRules : 
							 s.rules ? s.rules : 
							 [];

					for (var j = rs.length - 1; j >= 0; j--) {
						if ((rs[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rs[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE)){
							anims[rs[j].name] = new KeyframeAnimation(rs[j]);
						}
					}
				}
				catch(e) { /* Trying to interrogate a stylesheet from another domain will throw a security error */ }
			}
			return anims;
		})();
		
		return animations;
	};
	
	window.CSSAnimations = new CSSAnimationStore();
})();