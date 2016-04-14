polycon
===

[![Build Status](https://travis-ci.org/YusukeHirao/polycon.svg?branch=master)](https://travis-ci.org/YusukeHirao/polycon)
[![Dependency Status](https://david-dm.org/YusukeHirao/polycon.svg)](https://david-dm.org/YusukeHirao/polycon)
[![devDependency Status](https://david-dm.org/YusukeHirao/polycon/dev-status.svg)](https://david-dm.org/YusukeHirao/polycon#info=devDependencies)

Insert a polygonal container to DOM.

## Usage

### ES module

```js
import Polycon from 'polycon';

const polycon = new Polycon(document.querySelector('.polycon'));
```

#### API

Method|parameter|return
---|---
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

Method|parameter|return
---|---
`polycon(selector)`|selector: `string` | `Array<Polycon>`
`polycon(element)`|element: `HTMLElement`|`Polycon`
`polycon(nodeList)`|nodeList: `NodeList<HTMLElement>`|`Array<Polycon>`

* * *

&copy;YusukeHirao([@cloud10designs](https://twitter.com/cloud10designs)), MIT license.