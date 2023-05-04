/**
 * 페이지네이션을 적용해주는 클래스입니다.
 *
 * @example
 * const paginator = new Paginator(
 *      document.querySelector("pageContainer"),
 *      document.querySelector("itemContainer"),
 *      100,
 *      (i) => htmlCode[i])
 *
 * @constructor
 * @param {HTMLElement} pageContainer 페이지 번호를 할당할 컨테이너
 * @param {HTMLElement} itemContainer Item을 할당할 컨테이너
 * @param {number} length 페이지네이션 처리할 Item의 길이
 * @param {function} callback Item[i]를 받아 itemContainer에 할당합니다.
 */
class Paginator {
	constructor(option) {
		this.pageSize = option.pageSize || 10;
		this.itemSize = option.itemSize || 10;

		this.itemContainer = option.itemContainer;
		this.pageContainer = option.pageContainer;
		this.length = option.length;
		this.callback = option.callback;

		this.page = 1;
	}
	/**
	 * 현재 페이지 번호
	 */
	get page() {
		return this._page;
	}
	/**
	 * 현재 페이지를 수정하면 화면이 전환됩니다.
	 * page의 값은 min과 max의 사이입니다.
	 * @example
	 * paginator.page = 5 // then change pageContainer
	 */
	set page(value) {
		this._page = value < this.min ? this.min : value > this.max ? this.max : value;
		this._show(this.page);
		this._pagination();
	}
	/**
	 * 페이지가 가질 수 있는 최소 값으로 언제나 1을 반환합니다.
	 *
	 */
	get min() {
		return 1;
	}
	/**
	 * 페이지가 가질 수 있는 최대 값
	 */
	get max() {
		return this.length % this.itemSize === 0 ? this.length / this.itemSize : Math.ceil(this.length / this.itemSize);
	}
	/**
	 * 현재 등장한 페이지버튼의 첫번째 값
	 * @example 현재 페이지가 3이고, pageSize가 5일 경우 페이지버튼은 1 ~ 5가 등장하므로 _first는 1을 반환함
	 * @example 현재 페이지가 7이고, pageSize가 5일 경우 페이지버튼은 6 ~ 10이 등장하므로 _first는 6을 반환함
	 */
	get _first() {
		const temp = Math.floor((this.page - 1) / this.pageSize) * this.pageSize + 1;
		return temp <= this.min ? this.min : temp;
	}
	/**
	 * 현재 등장한 페이지버튼의 마지막 값
	 * @example 현재 페이지가 3이고, pageSize가 5일 경우 페이지버튼은 1 ~ 5가 등장하므로 _last는 5을 반환함
	 * @example 현재 페이지가 7이고, pageSize가 5일 경우 페이지버튼은 6 ~ 10이 등장하므로 _last는 10을 반환함
	 */
	get _last() {
		const temp = this._first + this.pageSize - 1;
		return temp > this.max ? this.max : temp;
	}
	/**
	 * this.callback의 값으로 itemContainer를 채움
	 * @description 콜백으로 리턴되는 값은 반드시 html 코드여야 함
	 * @example
	 * html = [
	 *   "<tr><td>1</td><td>요소</td></tr>",
	 *   "<tr><td>2</td><td>요소</td></tr>",
	 *   "<tr><td>3</td><td>요소</td></tr>"
	 * ]
	 * this.callback = (i) => (html[i])
	 */
	_show() {
		const items = [];

		for (let i = (this.page - 1) * this.itemSize; i < this.page * this.itemSize; i++) {
			items.push(this.callback(i));
		}

		this.itemContainer.innerHTML = items.join("");
	}
	/**
	 * pageContainer에 할당합니다.
	 * @description #paginatorFirst <<버튼
	 * @description #paginatorPrev <버튼
	 * @description #paginatorNext >버튼
	 * @description #paginatorLast >>버튼
	 * @description .paginatorItem 페이지 아이템
	 * @description .active 선택된 페이지 아이템
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

		if (this._last < this.max) {
			const next = document.createElement("a");
			const last = document.createElement("a");

			next.setAttribute("class", "paginatorNext");
			last.setAttribute("class", "paginatorLast");

			next.innerHTML = ">";
			last.innerHTML = ">>";

			next.onclick = (e) => (self.page = self._last + 1);
			last.onclick = (e) => (self.page = self.max);

			html.push(next);
			html.push(last);
		}

		html.forEach((v) => {
			this.pageContainer.appendChild(v);
		});
	}
}
