var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var SmallDescriptionPipe = (function () {
    function SmallDescriptionPipe() {
    }
    SmallDescriptionPipe.prototype.transform = function (description) {
        //description = description.replace(/<\/?[^>]+(>|$)/g, "");
        return description.substring(0, 90) + '...';
    };
    return SmallDescriptionPipe;
}());
SmallDescriptionPipe = __decorate([
    Pipe({ name: 'smallDescription' })
], SmallDescriptionPipe);
export { SmallDescriptionPipe };
//# sourceMappingURL=product.pipe.js.map