The CSS Animation Store exposes a simple to use interface for accessing and modifying CSS Animations with Javascript.

#Usage

Here is the basic interface for the CSS Animation Store. Include the JavaScript just before the closing `</html>` and it will expose a new global property called `CSSAnimations`. The object contains each available CSS Animation currently available.

So, to get an animation named 'spin' you would do the following:

	var spin = CSSAnimations.spin;
	
The variable `spin` now holds an instance of a `KeyframeAnimation` object, which has the following properties and functions:

- 	`keyframes` array of `KeyframeRule` objects
- 	`original` gives access to the native `WebKitCSSKeyframesRule` or `MozCSSKeyframesRule` object this object wraps

- 	`getKeyframeTexts()` returns an array of all available keyframe texts, e.g. ['0%', '50%', '100%']
- 	`getKeyframe(text)` returns a `KeyframeRule` based on the provided text, e.g. `getKeyframe('0%')`
- 	`setKeyframe(text, css)` sets the CSS for a keyframe the given text, e.g. `setKeyframe('10%', {background: 'red', 'font-size': '2em'})`

As you can see, a few of these methods/properties also deal with another type of object called `KeyframeRule`. This is a wrapping around the `WebKitCSSKeyframeRule` and `MozCSSKeyframeRule` (note frame not frame**s**). The `KeyframeRule` object has the following properties:

- 	`css` object with the CSS for this keyframe, e.g. `{background: 'red', 'font-size': '2em'}`
- 	`keyText` the text name for this frame, e.g. `10%`
- 	`original` gives access to the native `WebKitCSSKeyframeRule` or `MozCSSKeyframeRule` object this object wraps

## Examples of use

### Getting the CSS for each frame in an animation

	var spin = CSSAnimations.spin;
	
	for(var i=0; i<spin.keyframes.length; i++)
		console.log(spin.keyframes[i].css);
		
### Adding/modifying a keyframe to an animation

	var spin = CSSAnimations.spin;
	spin.setKeyframe('10%', {background: 'red', 'font-size': '2em'});
	
# License

CSS Animation Store is Copyright &copy; 2011 [Joe Lambert](http://www.joelambert.co.uk) and is licensed under the terms of the [MIT License](http://www.opensource.org/licenses/mit-license.php).