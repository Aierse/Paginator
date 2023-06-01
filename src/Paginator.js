/**
 * 페이지네이션을 적용해주는 클래스입니다.
 *
 * @example
 * const paginator = new Paginator({
 * 		itemContainer: ".pageBody",
 *		pageContainer: ".pageFooter",
 *		data: html,
 *		callback: (data) => `<div>test${data}</div>`,
 * }
 */
class Paginator {
	/**
	 * @param {Object} option
	 * @param {string} option.itemContainer
	 * @param {string} option.pageContainer
	 * @param {any[]} option.data
	 * @param {function} option.callback
	 * @param {int} [option.pageSize=10]
	 * @param {int} [option.itemSize=10]
	 */
	constructor(option) {
		this.pageSize = option.pageSize || 10;
		this.itemSize = option.itemSize || 10;

		this.itemContainer = document.querySelector(option.itemContainer);
		this.pageContainer = document.querySelector(option.pageContainer);

		this.data = option.data;
		this.callback = option.callback;

		this.page = 1;
	}
	get page() {
		return this._page;
	}
	/**
	 * 현재 페이지를 수정하면 화면이 전환됩니다.
	 * page의 값은 min과 max의 사이입니다.
	 * @example
	 * instance.page = 5 // then change pageContainer
	 */
	set page(value) {
		this._page = value < this._min ? this._min : value > this._max ? this._max : value;
		this._show(this.page);
		this._pagination();
	}
	/**
	 * 데이터의 길이
	 */
	get length() {
		return this.data.length;
	}

	get _min() {
		return 1;
	}

	get _max() {
		return this.length % this.itemSize === 0 ? this.length / this.itemSize : Math.ceil(this.length / this.itemSize);
	}
	/**
	 * 현재 등장한 페이지버튼의 첫번째 값, 내부 연산에서 사용됨.
	 */
	get _first() {
		const temp = Math.floor((this.page - 1) / this.pageSize) * this.pageSize + 1;
		return temp <= this._min ? this._min : temp;
	}
	/**
	 * 현재 등장한 페이지버튼의 마지막 값, 내부 연산에서 사용됨.
	 */
	get _last() {
		const temp = this._first + this.pageSize - 1;
		return temp > this._max ? this._max : temp;
	}
	/**
	 * this.callback의 값으로 itemContainer를 채웁니다.
	 * 콜백으로 리턴되는 값은 html 코드여야합니다.
	 * @example
	 * dataList = [1, 2, 3, 4, 5]
	 * this.callback = (target) => (`<div>Explain ${target}</div>`)
	 */
	_show() {
		const items = [];
		const size = this.length < this.page * this.itemSize ? this.length : this.page * this.itemSize;

		for (let i = (this.page - 1) * this.itemSize; i < size; i++) {
			items.push(this.callback(this.data[i]));
		}

		this.itemContainer.innerHTML = items.join("");
	}
	/**
	 * pageContainer에 버튼리스트를 할당합니다.
	 */
	_pagination() {
		this.pageContainer.innerHTML = "";
		const self = this;
		const html = [];

		if (this._first > this.pageSize) {
			const first = document.createElement("a");
			const prev = document.createElement("a", "class=paginatorPrev");

			first.setAttribute("class", "paginatorFirst");
			prev.setAttribute("class", "paginatorPrev");

			first.innerHTML = "<<";
			prev.innerHTML = "<";

			first.onclick = (e) => (self.page = 1);
			prev.onclick = (e) => (self.page = self._first - 1);

			html.push(first);
			html.push(prev);
		}

		for (let i = this._first; i <= this._last; i++) {
			let pageButton = undefined;
			if (this.page === i) {
				pageButton = document.createElement("a");
				pageButton.setAttribute("class", "paginatorItem active");
			} else {
				pageButton = document.createElement("a");
				pageButton.setAttribute("class", "paginatorItem");
			}

			pageButton.innerHTML = i;

			pageButton.onclick = (e) => (self.page = i);

			html.push(pageButton);
		}

		if (this._last < this._max) {
			const next = document.createElement("a");
			const last = document.createElement("a");

			next.setAttribute("class", "paginatorNext");
			last.setAttribute("class", "paginatorLast");

			next.innerHTML = ">";
			last.innerHTML = ">>";

			next.onclick = (e) => (self.page = self._last + 1);
			last.onclick = (e) => (self.page = self._max);

			html.push(next);
			html.push(last);
		}

		html.forEach((v) => {
			this.pageContainer.appendChild(v);
		});
	}
}
