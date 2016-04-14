polycon
===

[![Build Status](https://travis-ci.org/YusukeHirao/polycon.svg?branch=master)](https://travis-ci.org/YusukeHirao/polycon)
[![Dependency Status](https://david-dm.org/YusukeHirao/polycon.svg)](https://david-dm.org/YusukeHirao/polycon)
[![devDependency Status](https://david-dm.org/YusukeHirao/polycon/dev-status.svg)](https://david-dm.org/YusukeHirao/polycon#info=devDependencies)

Insert a polygonal container to DOM.

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
`data-points`|flex points|`points` attribute value of the extended to the `<polygon>` svg elements so as to correspond to a relative value

### Style

```css
.polycon {
	position: relative; /* REQUIRED: Must other than "static" */
	width: 400px; /* REQUIRED */
	height: 300px; /* REQUIRED */
}
.polycon > * {
	position: relative; /* REQUIRED: Must other than "static" */
	z-index: 0; /* REQUIRED */
}
.polycon > svg {
	position: absolute; /* REQUIRED */
	top: 0; /* REQUIRED */
	left: 0; /* REQUIRED */
	z-index: -1; /* REQUIRED */
}
```

* * *

&copy;YusukeHirao([@cloud10designs](https://twitter.com/cloud10designs)), MIT license.