/**
 * 페이지네이션을 적용해주는 클래스입니다.
 *
 * @example
 * const paginater = new Paginater(
 *      document.querySelecter("page"),
 *      document.querySelecter("item"),
 *      100,
 *      (i) => htmlCode[i])
 *
 * @constructor
 * @param {HTMLElement} pageContainer 페이지 번호를 할당할 컨테이너
 * @param {HTMLElement} itemContainer Item을 할당할 컨테이너
 * @param {number} length 페이지네이션 처리할 Item의 길이
 * @param {function} callback Item[i]를 받아 itemContainer에 할당합니다.
 */
class Paginater {
	static _instanse = undefined;

	constructor(pageContainer, itemContainer, length, callback, pageSize = 5, itemSize = 12) {
		this.pageSize = pageSize;
		this.itemSize = itemSize;

		this.itemContainer = itemContainer;
		this.pageContainer = pageContainer;
		this.length = length;
		this.callback = callback;

		this.page = 1;

		Paginater._instanse = this;
	}
	/**
	 * 페이지가 가질 수 있는 최소 값
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
	 * 현재 페이지 번호
	 */
	get page() {
		return this._page;
	}

	set page(value) {
		this._page = value < this.min ? this.min : value > this.max ? this.max : value;
		this._show(this.page);
		this._pagination();
	}
	/**
	 * 현재 등장한 페이지네이터의 첫번째 값
	 * @example 현재 페이지가 3이고, pageSize가 5일 경우 페이지네이터는 1 ~ 5가 등장하므로 _first는 1을 반환함
	 * @example 현재 페이지가 7이고, pageSize가 5일 경우 페이지네이터는 6 ~ 10이 등장하므로 _first는 6을 반환함
	 */
	get _first() {
		const temp = Math.floor((this.page - 1) / this.pageSize) * this.pageSize + 1;
		return temp <= this.min ? this.min : temp;
	}
	/**
	 * 현재 등장한 페이지네이터의 마지막 값
	 * @example 현재 페이지가 3이고, pageSize가 5일 경우 페이지네이터는 1 ~ 5가 등장하므로 _last는 5을 반환함
	 * @example 현재 페이지가 7이고, pageSize가 5일 경우 페이지네이터는 6 ~ 10이 등장하므로 _last는 10을 반환함
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
		let items = [];

		for (let i = (this.page - 1) * this.itemSize; i < this.page * this.itemSize; i++) {
			items.push(this.callback(i));
		}

		this.itemContainer.innerHTML = items.join("");
	}
	/**
	 * pageSize와 itemSize를 계산해 버튼 생성
	 * @description #firstPrev <<버튼
	 * @description #prev <버튼
	 * @description #next >버튼
	 * @description #lastNext >>버튼
	 * @description .pageItem 페이지 아이템
	 * @description .active 선택된 페이지 아이템
	 */
	_pagination() {
		let html = "";

		if (this._first > this.pageSize) {
			html += /*html*/ `<a href="javascript:void(0)" id='firstPrev' onclick="Paginater._instanse.page = 1"><<</a>`;
			html += /*html*/ `<a href="javascript:void(0)" id='prev' onclick="Paginater._instanse.page = Paginater._instanse._first - 1"><</a>`;
		}

		for (let i = this._first; i <= this._last; i++) {
			if (this.page === i) html += /*html*/ `<a href='javascript:void(0)' class='pageItem active'>${i}</a>`;
			else html += /*html*/ `<a href='javascript:void(0)' class='pageItem' onclick="Paginater._instanse.page = ${i}">${i}</a>`;
		}

		if (this._last < this.max) {
			html += /*html*/ `<a href="javascript:void(0)" id='next' onclick="Paginater._instanse.page = Paginater._instanse._last + 1">></a>`;
			html += /*html*/ `<a href="javascript:void(0)" id='lastNext' onclick="Paginater._instanse.page = Paginater._instanse.max">>></a>`;
		}

		this.pageContainer.innerHTML = html;
	}
}
