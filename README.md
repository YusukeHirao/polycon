polycon
===

[![NPM version](https://badge.fury.io/js/polycon.svg)](http://badge.fury.io/js/polycon)
[![Build Status](https://travis-ci.org/YusukeHirao/polycon.svg?branch=master)](https://travis-ci.org/YusukeHirao/polycon)
[![Dependency Status](https://david-dm.org/YusukeHirao/polycon.svg)](https://david-dm.org/YusukeHirao/polycon)
[![devDependency Status](https://david-dm.org/YusukeHirao/polycon/dev-status.svg)](https://david-dm.org/YusukeHirao/polycon#info=devDependencies)

Create polygonal container.

## Demo and Description

[English](http://yusukehirao.github.io/polycon/) | [Japanese](http://yusukehirao.github.io/polycon/index.ja.html)

* * *

## Usage

### ES module

```js
import Polycon from 'polycon';

const polycon = new Polycon(document.querySelector('.polycon'));
```

#### API

method|parameter|return
---|---|---
`new Polycon(element)`|element: `HTMLElement`|`Polycon`
`Polycon.new(selector)`|selector: `string` | `Array<Polycon>`
`Polycon.new(element)`|element: `HTMLElement`|`Polycon`
`Polycon.new(nodeList)`|nodeList: `NodeList<HTMLElement>`|`Array<Polycon>`

### Browser

```html
<script src="polycon.min.js"></script>
<script>
polycon('.polycon');
</script>
```

#### API

method|parameter|return
---|---|---
`polycon(selector)`|selector: `string` | `Array<Polycon>`
`polycon(element)`|element: `HTMLElement`|`Polycon`
`polycon(nodeList)`|nodeList: `NodeList<HTMLElement>`|`Array<Polycon>`

### HTML Markup

```html
<!-- basic -->
<div class="polycon" data-points="0,0 50%,50% w,0 w,h 0,h">
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quis temporibus dicta illo magnam consequuntur quod tempora non dolorum, libero voluptas, aliquam ipsum quam eius quae error sequi, unde alias.</p>
</div>

<!-- mediaquery -->
<div class="polycon" data-points="
	@media default { 0,0 50%,50% w,0 w,h 0,h }
	@media (max-width: 640px) { 0,0 50%,90% w,0 w,h 0,h }
	@media (orientation: landscape) { 10,10 50%,50%, w-10,10 w-10,h-10 10,h-10 }">
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, mollitia nesciunt vero voluptates natus? Accusamus assumenda rem consectetur. Ullam sapiente voluptatibus praesentium deleniti quae culpa ab consequatur perferendis iste quam.</p>
</div>
```

#### Required attributes

mame|value|description
---|---|---
`data-points`|flex points|`points` attribute value of the extended to the `<polygon>` svg elements so as to correspond to a relative value. Separate the x and y by a comma, each apexes by spaces `x1,y1 x2,y2 x3,y3...`. Numeric value without unit (`0`, `300`) is absolute pixel. Numeric value with percent (`30%`, `98%`) is relative value. Numeric value with alphabet and symbol (`w-30,h+30`) is offset number.<br />Usable with media queries `@media [mediaQueryString] { [coordinates for each apexes] } ...`.

### StyleSheet

Automatically define into `<style>` element.

```css
[data-polycon-node="root"] {
	position: relative;
	background: none !important;
}
[data-polycon-node="root"] > * {
	position: relative;
	z-index: 1;
}
[data-polycon-node="root"] > [data-polycon-node="background"] {
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
}
```

* * *

# Support browsers

- Chrome
- Firefox
- Edge
- Safari 5.1+
- Internet Explorer 9<sup>[†](#ie9)</sup> and 11
- iOS Safari 8+
- Android Browser 4.0+

<a name="ie9">†</a>: IE9 is not support mediaQuery syntax because that was not support [matchMedia API](http://caniuse.com/#search=matchmedia). Allways refrect default value in that syntax.

* * *

&copy;YusukeHirao([@cloud10designs](https://twitter.com/cloud10designs)), MIT license.
