var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CompanieFilterPipe = (function () {
    function CompanieFilterPipe() {
    }
    CompanieFilterPipe.prototype.transform = function (items, search, orderBy) {
        //  console.log(items)
        var orderByDirection = '+';
        if (orderBy.charAt(0) === '-') {
            orderBy = orderBy.slice(1);
            orderByDirection = '-';
        }
        var returnItems = [];
        items.forEach(function (item) {
            var str1 = item.profile.name.toLowerCase();
            var str2 = search.toLowerCase();
            if (str1.includes(str2))
                returnItems.push(item);
        });
        var map = returnItems.map(function (e, i) {
            var returnObj = { index: i, value: e.profile.name.toLowerCase() };
            if (orderBy === 'client')
                returnObj = { index: i, value: e.profile.name.toLowerCase() };
            if (orderBy === 'stylist') {
                if (e.profile.parentUser[0]) {
                    //console.log(e.profile.parentUser[0].profile.name.toLowerCase(), 'alan')
                    returnObj = { index: i, value: e.profile.parentUser[0].profile.name.toLowerCase() };
                }
            }
            if (orderBy === 'lastVisit') {
                if (e.lastVisit)
                    returnObj = { index: i, value: e.lastVisit };
            }
            return returnObj;
        });
        // on trie l'objet temporaire avec les valeurs réduites
        if (orderByDirection === '-')
            map.sort(function (a, b) {
                return -(a.value > b.value) || -(a.value === b.value) + 1;
            });
        if (orderByDirection === '+')
            map.sort(function (a, b) {
                return +(a.value > b.value) || +(a.value === b.value) - 1;
            });
        // on utilise un objet final pour les résultats
        var result = map.map(function (e) {
            return returnItems[e.index];
        });
        return result;
    };
    return CompanieFilterPipe;
}());
CompanieFilterPipe = __decorate([
    Pipe({
        name: 'companieFilter'
    })
], CompanieFilterPipe);
export { CompanieFilterPipe };
//# sourceMappingURL=companieFilter.pipe.js.map