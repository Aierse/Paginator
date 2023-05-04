# Paginator.js

> this is vanilla javascript that provides simple customizable pagination.

# Installation

Just Download [Paginator.js](https://github.com/Aierse/Paginator/blob/main/src/Paginator.js) from the Git Repository

# Quick Start

```html
<div class="pageBody"></div>
<div class="pageFooter"></div>
```

```js
const source = [1, 2, 3, 4, 5];

const paginator = new Paginator({
	itemContainer: ".pageBody",
	pageContainer: ".pageFooter",
	data: source,
	callback: (target) => `<div>Explain ${target}</div>`,
});
```

> Paginator controls By Code

```js
paginator.page = 5; // then change itemContainer
```

