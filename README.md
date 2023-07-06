# Paginator.js

> this is vanilla javascript that provides simple customizable pagination.

![image](https://user-images.githubusercontent.com/68111814/236253290-de985669-5d1c-4220-9fe9-9e74ac977b18.png)


# Installation

1. Just Download [Paginator.js](https://github.com/Aierse/Paginator/blob/main/src/Paginator.js) from the Git Repository
2. add Code your project ```<script src="https://aierse.github.io/PaginatorJS/src/Paginator.js"></script>```

# Quick Start

> Just you have to itemContainer and PageContainer


```html
<div class="pageBody"></div>
<div class="pageFooter"></div>
```

> Paginator constructor does auto initialize.

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

# Apply CSS

> `<<` Button

```css
.paginatorFirst {
	/* custom */
}
```

> `<` Button

```css
.paginatorPrev {
	/* custom */
}
```

> `>` Button

```css
.paginatorNext {
	/* custom */
}
```

> `>>` Button

```css
.paginatorLast {
	/* custom */
}
```

> `Number` Button

```css
.paginatorItem {
	/* custom */
}

/* Now Page */
.active {
	/* custom */
}
```

# Sample

> If you want all of sample code [Click Here](https://github.com/Aierse/Paginator/blob/main/sample.html)
