(function (window, document, undefined) {

	// Borrowed from this article: http://www.quirksmode.org/js/detect.html
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			}
		]
	};
	BrowserDetect.init();

	var centerButton = function() {
		var button = $('#preview-button');
		
		var buttonWidth = button.outerWidth(true);
		var buttonHeight = button.outerHeight(true);
		
		$(button).css({
			'left' : ((($(window).width() - $('#ui-box').outerWidth(true)) / 2) - (buttonWidth / 2)) + 'px',
			'top' : ((($(window).height() - $('#css-code-box').outerHeight(true)) / 2) - (buttonHeight / 2)) + 'px'
		});
	}

	$(function() {
		
		$(document).ready(function () {
			centerButton();
			
			$('#css-code-box > textarea').css('width', $('#css-code-box').outerWidth(true));
			$('#css-code-box > textarea').css('height', $('#css-code-box').outerHeight(true) - $('#css-code-box > h1').outerHeight(true));
		});
		
		$(window).resize(function () {
			centerButton();
			
			$('#css-code-box > textarea').css('width', $('#css-code-box').outerWidth(true));
			$('#css-code-box > textarea').css('height', $('#css-code-box').outerHeight(true) - $('#css-code-box > h1').outerHeight(true));
		});
		
	});

	(function () {
		var buttonVals = { };
		var currentMouseState = 'neutral';
		
		var toColorFriendly = function(val) {
			var hexVal = (function (val) { 
				var ceiling =  Math.ceil(val);
				
				// Force the color to remain within the bounds of
				// 0 to 255.
				return ceiling <= 255 ? (ceiling >= 0 ? ceiling : 0) : 255;
			})(val).toString(16);
		
			if (hexVal.length === 1)
				return '0' + hexVal;
				
			return hexVal;
		};
		
		var getHexRgb = function(color, brightness) {
			return '#'
				+ toColorFriendly(color.red * brightness)
				+ toColorFriendly(color.green * brightness)
				+ toColorFriendly(color.blue * brightness);
		}
		
		var getBackgroundColor = function (add) {
			var addValue = add !== undefined ? add : 0;
			return {
				red : buttonVals['red'] + addValue, 
				green : buttonVals['green'] + addValue, 
				blue : buttonVals['blue'] + addValue
			};
		};
		
		var getBackgroundHexRgb = function (brightness) {
			return getHexRgb(getBackgroundColor(), brightness);
		};
		
		var generateButtonCss = function (mouseState) {
			var isDark = ((buttonVals['red'] + (buttonVals['green'] * 0.7) + (buttonVals['blue'] * 0.5)) / 3) < 128;
		
			var backgroundColor = getBackgroundColor(mouseState === 'hover' ? 50 : (mouseState === 'active' ? -50 : 0));
			
			var bright = getHexRgb(backgroundColor, 1.0 + ((buttonVals.gradientContrast) / 100.0));
			var dark = getHexRgb(backgroundColor, 1.0 - ((buttonVals.gradientContrast) / 100.0));
			
			var webkitGradient = '-webkit-gradient(linear, left top, left bottom, from(' + bright + '), to(' + dark + '))';
			var mozGradient = '-moz-linear-gradient(top, ' + bright + ', ' + dark + ')';
			var operaGradient = '-o-linear-gradient(' + bright + ', ' + dark + ')';
			var defaultGradient = 'linear-gradient(top, ' + bright + ' , ' + dark + ')';
		
			var gradientStyle = (function () {
			
				if (BrowserDetect.browser === 'Chrome' ||
					BrowserDetect.browser === 'Safari' ||
					BrowserDetect.browser === 'Konqueror')
				{
					return webkitGradient;
				}
				else if (BrowserDetect.browser === 'Camino' ||
				    BrowserDetect.browser === 'Mozilla' ||
					BrowserDetect.browser === 'Firefox')
				{
					return mozGradient;
				}
				else if (BrowserDetect.browser === "Opera")
				{
					return operaGradient;
				}
				
				return defaultGradient;
			})();
						
			var cssCodeOuter = {
				'filter' : "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + getHexRgb(backgroundColor, 2.0) + "', endColorstr='" + getHexRgb(backgroundColor, 0.5)  +"')",
				'background-color' : getHexRgb(backgroundColor, 1.0),
				'background-image' : gradientStyle,
				'background-image-webkit' : webkitGradient,
				'background-image-moz' : mozGradient,
				'background-image-opera' : operaGradient,
				'background-image-default' : defaultGradient,
				'border-color' : getHexRgb(backgroundColor, 0.6),
				'border-style' : 'solid',
				'-webkit-border-radius' : buttonVals['borderRadius'] + 'px',
				'-moz-border-radius' : buttonVals['borderRadius'] + 'px',
				'border-radius' : buttonVals['borderRadius'] + 'px',
				'border-width' : '1px',
				'-webkit-box-shadow' : '0 1px 2px rgba(0, 0, 0, 0.5)',
				'-moz-box-shadow' : '0 1px 2px rgba(0, 0, 0, 0.5)',
				'box-shadow' : '0 1px 2px rgba(0, 0, 0, 0.5)',
				'color' : isDark ? '#fff' : getHexRgb(backgroundColor, 0.3),
				'font-size' : (buttonVals['fontSize'] / 10000) + 'em',
				'font-weight' : isDark ? 'bold' : 'normal',
				'padding' : '0'
			};
			
			var cssCodeInner = {
				'-webkit-border-radius' : (buttonVals['borderRadius'] === 0 ? 0 : buttonVals['borderRadius'] - 1) + 'px',
				'-moz-border-radius' : (buttonVals['borderRadius'] === 0 ? 0 : buttonVals['borderRadius'] - 1) + 'px',
				'border-radius' : (buttonVals['borderRadius'] === 0 ? 0 : buttonVals['borderRadius'] - 1) + 'px',
				'border-top-color' : '#fff',
				'border-top-color' : 'rgba(255, 255, 255, 0.25)',
				'border-top-style' : 'solid',
				'border-top-width' : '1px',
				'display' : 'block',
				'margin' : '0',
				'padding' : buttonVals.verticalPadding + 'px ' +  buttonVals.horizontalPadding + 'px',
				'text-shadow' : isDark ? '0 -1px 0 rgba(0, 0, 0, 0.5)' : '0 1px 0 rgba(255, 255, 255, 0.5)'
			};
			
			return {
				outer : cssCodeOuter,
				inner : cssCodeInner
			};
		}
		
		var outputCssCode = function (cssObject, customSelector) {
			if (customSelector !== undefined) { console.log(customSelector); }
			var cssString = '.super-button' + (customSelector !== undefined ? customSelector : '') + ' {\n';
			for (var key in cssObject) 
			{
				cssString = cssString + '    ' + key + ': ' + cssObject[key] + ';\n';
			}
			cssString += '}';
			return cssString;
		};
		
		var setButtonCss = function () {
			buttonCode = generateButtonCss(currentMouseState);
			$('#preview-button').css(buttonCode.outer);
			$('#preview-button > div').css(buttonCode.inner);
			
			centerButton();
			
			var neutralButtonCode = generateButtonCss('neutral');
			var hoverButtonCode = generateButtonCss('hover');
			var activeButtonCode = generateButtonCss('active');
			var finalCssCode = outputCssCode(neutralButtonCode.outer) + '\n\n' +
			                   outputCssCode(neutralButtonCode.inner, ' > div') + '\n\n' +
							   outputCssCode(hoverButtonCode.outer, ':hover') + '\n\n' +
							   outputCssCode(activeButtonCode.outer, ':active');
			
			$('#css-code-box > textarea').val(finalCssCode);
		};
		
		var setSliderValue = function(color, val) {
			buttonVals[color] = val;
			setButtonCss();
		};
		
		$(function () {
			
			var setTextBoxValues = function(key) {
				if (key === undefined) 
				{
					for (var key in buttonVals)
					{
						setTextBoxValues(key);
					}
					
					return;
				}
				
				$('#' + key + '-text-output').html('<p>' + buttonVals[key] + '</p>');
			};
			
			var createSliderOption = function (groupBoxName, key, label, initialVal, minimum, maximum, steps) {
				$('#' + groupBoxName).append(
					  '<div class="option">'
					+     '<div class="label"><p>' + label + '</p></div>'
					+     '<div class="slider" id="' + key + '-slider"></div>'
					+     '<div class="databox" id="' + key +'-text-output"></div>'
					+     '<div class="clear"></div>'
					+ '</div>');
				
				buttonVals[key] = initialVal !== undefined ? initialVal : 0;
				
				var generateSlideEventCallBack = function (key) {
			
					return function(event, ui) {
						setSliderValue(key, ui.value);
						setTextBoxValues(key);
					};
					
				};
			
				$('#' + key + '-slider').slider( (function() {
		
					var sliderOptions = {
						max : maximum !== undefined ? maximum : 255,
						min : minimum !== undefined ? minimum : 0,
						slide : generateSlideEventCallBack(key),
						start : generateSlideEventCallBack(key),
						step : steps,
						value : buttonVals[key]
					};
					
					return sliderOptions;
				})() );
			};
			
			var createGroup = function (id, title) {
				$('#ui-box').append(
					  '<div class="group-box" id="' + id +'">'
					+     '<div>'
					+         '<h1>' + title + '</h1>'
					+     '</div>'
					+ '</div>'
				);
			};
			
			createGroup('global', 'Overall Look');
			
			createSliderOption('global', 'red', 'Red', 30);
			createSliderOption('global', 'green', 'Green', 90);
			createSliderOption('global', 'blue', 'Blue', 128);
			createSliderOption('global', 'fontSize', 'Font Size', 8125, 6875, 19375, 1250);
			createSliderOption('global', 'borderRadius', 'Border Roundedness', 5, 0, 20);
			createSliderOption('global', 'gradientContrast', 'Gradient Contrast', 25, 0, 40);
			createSliderOption('global', 'horizontalPadding', 'Horizontal Padding', 5, 5, 22);
			createSliderOption('global', 'verticalPadding', 'Vertical Padding', 5, 0, 13);
			
			$('#preview-button').mouseover(function () {
				currentMouseState = 'hover';
				setButtonCss();
			})
			
			.mouseleave(function () {
				currentMouseState = 'neutral';
				setButtonCss();
			})
			
			.mousedown(function() {
				currentMouseState = 'active';
				setButtonCss();
			})
			
			.mouseup(function () {
				currentMouseState = 'hover';
				setButtonCss();
			});
			
			$('#css-code-output').click(function () {
				document.getElementById('css-code-output').focus();
				document.getElementById('css-code-output').select();
			});
			
			setTextBoxValues();
			setButtonCss();
		});
	})();
	
})(this, this.document);