var Promotion = (function () {
    function Promotion() {
        this._id = '';
        this.date = new DatePromoClass();
        this.name = '';
        this.form = [];
        this.owner = [];
    }
    return Promotion;
}());
export { Promotion };
var DatePromoClass = (function () {
    function DatePromoClass() {
        this.dateBegin = new Date().toISOString().substr(0, 10);
        this.dateEnd = new Date().toISOString().substr(0, 10);
    }
    return DatePromoClass;
}());
export { DatePromoClass };
// export const PromotionConst: Promotion = {
//   _id: '',
//   date: {
//     dateBegin: new Date().toISOString().substr(0, 10),
//     dateEnd: new Date().toISOString().substr(0, 10),
//   },
//   name: '',
//   form: []
// };
//# sourceMappingURL=promotion.model.js.map