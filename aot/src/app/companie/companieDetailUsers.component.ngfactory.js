/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as import0 from './companie.component.css.shim.ngstyle';
import * as import1 from '@angular/core';
import * as import2 from '@angular/forms';
import * as import3 from '@angular/router';
import * as import4 from '@angular/common';
import * as import5 from '../../../../src/app/companie/companieFilter.pipe';
import * as import6 from '../../../../src/app/companie/companieDetailUsers.component';
import * as import7 from '../../../../src/app/companie/companie.service';
import * as import8 from '../../../../src/app/admin/services/admin.service';
import * as import9 from 'ng2-toastr/src/toast-manager';
import * as import10 from '@angular/material';
import * as import11 from '../../../../src/app/auth/auth.service';
var styles_CompanieDetailUsersComponent = [import0.styles];
export var RenderType_CompanieDetailUsersComponent = import1.ɵcrt({
    encapsulation: 0,
    styles: styles_CompanieDetailUsersComponent,
    data: {}
});
function View_CompanieDetailUsersComponent_1(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 3, 'option', [], null, null, null, null, null)),
        import1.ɵdid(73728, null, 0, import2.NgSelectOption, [
            import1.ElementRef,
            import1.Renderer,
            [
                2,
                import2.SelectControlValueAccessor
            ]
        ], { value: [
                0,
                'value'
            ]
        }, null),
        import1.ɵdid(73728, null, 0, import2.ɵq, [
            import1.ElementRef,
            import1.Renderer,
            [
                8,
                null
            ]
        ], { value: [
                0,
                'value'
            ]
        }, null),
        (l()(), import1.ɵted(null, [
            '',
            ''
        ]))
    ], function (ck, v) {
        var currVal_0 = import1.ɵinlineInterpolate(1, '', v.context.$implicit._id, '');
        ck(v, 1, 0, currVal_0);
        var currVal_1 = import1.ɵinlineInterpolate(1, '', v.context.$implicit._id, '');
        ck(v, 2, 0, currVal_1);
    }, function (ck, v) {
        var currVal_2 = v.context.$implicit.name;
        ck(v, 3, 0, currVal_2);
    });
}
function View_CompanieDetailUsersComponent_2(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 13, 'th', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵeld(0, null, null, 10, 'div', [[
                'class',
                'tbl-center'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'p', [[
                'class',
                'tblnav-cl'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['Stylist'])),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('stylist') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-up'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('-stylist') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-down'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵted(null, ['\n          ']))
    ], null, null);
}
function View_CompanieDetailUsersComponent_4(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 6, 'td', [[
                'routerLinkActive',
                'active'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 1).onClick() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, [[
                5,
                4
            ]
        ], 0, import3.RouterLink, [
            import3.Router,
            import3.ActivatedRoute,
            [
                8,
                null
            ],
            import1.Renderer,
            import1.ElementRef
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(1),
        import1.ɵdid(860160, null, 2, import3.RouterLinkActive, [
            import3.Router,
            import1.ElementRef,
            import1.Renderer,
            import1.ChangeDetectorRef
        ], { routerLinkActive: [
                0,
                'routerLinkActive'
            ]
        }, null),
        import1.ɵqud(301989888, 5, { links: 1 }),
        import1.ɵqud(301989888, 6, { linksWithHrefs: 1 }),
        (l()(), import1.ɵted(null, [
            '\n              ',
            '\n          '
        ]))
    ], function (ck, v) {
        var currVal_0 = ck(v, 2, 0, ('/user/' + v.parent.context.$implicit._id));
        ck(v, 1, 0, currVal_0);
        var currVal_1 = 'active';
        ck(v, 3, 0, currVal_1);
    }, function (ck, v) {
        var currVal_2 = v.parent.context.$implicit.profile.name;
        ck(v, 6, 0, currVal_2);
    });
}
function View_CompanieDetailUsersComponent_6(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 1, 'div', [[
                'class',
                'mdl-sty'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, [
            '\n              ',
            '\n            '
        ]))
    ], null, function (ck, v) {
        var currVal_0 = v.context.$implicit.profile.name;
        ck(v, 1, 0, currVal_0);
    });
}
function View_CompanieDetailUsersComponent_5(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 9, 'td', [[
                'routerLinkActive',
                'active'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 1).onClick() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, [[
                7,
                4
            ]
        ], 0, import3.RouterLink, [
            import3.Router,
            import3.ActivatedRoute,
            [
                8,
                null
            ],
            import1.Renderer,
            import1.ElementRef
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(1),
        import1.ɵdid(860160, null, 2, import3.RouterLinkActive, [
            import3.Router,
            import1.ElementRef,
            import1.Renderer,
            import1.ChangeDetectorRef
        ], { routerLinkActive: [
                0,
                'routerLinkActive'
            ]
        }, null),
        import1.ɵqud(301989888, 7, { links: 1 }),
        import1.ɵqud(301989888, 8, { linksWithHrefs: 1 }),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_6)),
        import1.ɵdid(401408, null, 0, import4.NgForOf, [
            import1.ViewContainerRef,
            import1.TemplateRef,
            import1.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n          ']))
    ], function (ck, v) {
        var currVal_0 = ck(v, 2, 0, ('/user/' + v.parent.context.$implicit._id));
        ck(v, 1, 0, currVal_0);
        var currVal_1 = 'active';
        ck(v, 3, 0, currVal_1);
        var currVal_2 = v.parent.context.$implicit.profile.parentUser;
        ck(v, 8, 0, currVal_2);
    }, null);
}
function View_CompanieDetailUsersComponent_8(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 2, 'div', [[
                'class',
                'rightdate'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, [
            '\n              ',
            '\n            '
        ])),
        import1.ɵppd(2)
    ], null, function (ck, v) {
        var currVal_0 = import1.ɵunv(v, 1, 0, ck(v, 2, 0, import1.ɵnov(v.parent.parent.parent, 1), v.parent.parent.context.$implicit.lastVisit, 'dd-MMM-yyyy'));
        ck(v, 1, 0, currVal_0);
    });
}
function View_CompanieDetailUsersComponent_7(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 9, 'td', [[
                'routerLinkActive',
                'active'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 1).onClick() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, [[
                9,
                4
            ]
        ], 0, import3.RouterLink, [
            import3.Router,
            import3.ActivatedRoute,
            [
                8,
                null
            ],
            import1.Renderer,
            import1.ElementRef
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(1),
        import1.ɵdid(860160, null, 2, import3.RouterLinkActive, [
            import3.Router,
            import1.ElementRef,
            import1.Renderer,
            import1.ChangeDetectorRef
        ], { routerLinkActive: [
                0,
                'routerLinkActive'
            ]
        }, null),
        import1.ɵqud(301989888, 9, { links: 1 }),
        import1.ɵqud(301989888, 10, { linksWithHrefs: 1 }),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_8)),
        import1.ɵdid(401408, null, 0, import4.NgForOf, [
            import1.ViewContainerRef,
            import1.TemplateRef,
            import1.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n          ']))
    ], function (ck, v) {
        var currVal_0 = ck(v, 2, 0, ('/user/' + v.parent.context.$implicit._id));
        ck(v, 1, 0, currVal_0);
        var currVal_1 = 'active';
        ck(v, 3, 0, currVal_1);
        var currVal_2 = v.parent.context.$implicit.profile.parentUser;
        ck(v, 8, 0, currVal_2);
    }, null);
}
function View_CompanieDetailUsersComponent_3(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 10, 'tr', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_4)),
        import1.ɵdid(8192, null, 0, import4.NgIf, [
            import1.ViewContainerRef,
            import1.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_5)),
        import1.ɵdid(8192, null, 0, import4.NgIf, [
            import1.ViewContainerRef,
            import1.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_7)),
        import1.ɵdid(8192, null, 0, import4.NgIf, [
            import1.ViewContainerRef,
            import1.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n        ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = (v.context.$implicit.role == 'client');
        ck(v, 3, 0, currVal_0);
        var currVal_1 = ((v.context.$implicit.role == 'client') && co.showColumnStylist());
        ck(v, 6, 0, currVal_1);
        var currVal_2 = (v.context.$implicit.role == 'client');
        ck(v, 9, 0, currVal_2);
    }, null);
}
export function View_CompanieDetailUsersComponent_0(l) {
    return import1.ɵvid(0, [
        import1.ɵpid(0, import5.CompanieFilterPipe, []),
        import1.ɵpid(0, import4.DatePipe, [import1.LOCALE_ID]),
        (l()(), import1.ɵeld(0, null, null, 115, 'div', [[
                'class',
                'container'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵeld(0, null, null, 7, 'div', [[
                'class',
                'goldgradient beigeborder subnav'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'subnav-btnleft'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.goBack() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-left'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'h3', [[
                'style',
                'text-align: center;'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['Clients'])),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵeld(0, null, null, 50, 'div', [[
                'class',
                'subsubnav-clients'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 24, 'div', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵeld(0, null, null, 21, 'div', [], null, null, null, null, null)),
        import1.ɵdid(139264, null, 0, import4.NgClass, [
            import1.IterableDiffers,
            import1.KeyValueDiffers,
            import1.ElementRef,
            import1.Renderer
        ], { ngClass: [
                0,
                'ngClass'
            ]
        }, null),
        import1.ɵpod(['hidden']),
        (l()(), import1.ɵted(null, ['\n        '])),
        (l()(), import1.ɵeld(0, null, null, 16, 'select', [[
                'class',
                'form-control'
            ]
        ], [
            [
                2,
                'ng-untouched',
                null
            ],
            [
                2,
                'ng-touched',
                null
            ],
            [
                2,
                'ng-pristine',
                null
            ],
            [
                2,
                'ng-dirty',
                null
            ],
            [
                2,
                'ng-valid',
                null
            ],
            [
                2,
                'ng-invalid',
                null
            ],
            [
                2,
                'ng-pending',
                null
            ]
        ], [
            [
                null,
                'ngModelChange'
            ],
            [
                null,
                'change'
            ],
            [
                null,
                'blur'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('change' === en)) {
                var pd_0 = (import1.ɵnov(v, 24).onChange($event.target.value) !== false);
                ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
                var pd_1 = (import1.ɵnov(v, 24).onTouched() !== false);
                ad = (pd_1 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_2 = ((co.companieIdToSelect = $event) !== false);
                ad = (pd_2 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_3 = (co.onChangeCompanie($event) !== false);
                ad = (pd_3 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(139264, null, 0, import4.NgClass, [
            import1.IterableDiffers,
            import1.KeyValueDiffers,
            import1.ElementRef,
            import1.Renderer
        ], {
            klass: [
                0,
                'klass'
            ],
            ngClass: [
                1,
                'ngClass'
            ]
        }, null),
        import1.ɵpod(['hidden']),
        import1.ɵdid(8192, null, 0, import2.SelectControlValueAccessor, [
            import1.Renderer,
            import1.ElementRef
        ], null, null),
        import1.ɵprd(512, null, import2.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [import2.SelectControlValueAccessor]),
        import1.ɵdid(335872, null, 0, import2.NgModel, [
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                2,
                import2.NG_VALUE_ACCESSOR
            ]
        ], { model: [
                0,
                'model'
            ]
        }, { update: 'ngModelChange' }),
        import1.ɵprd(1024, null, import2.NgControl, null, [import2.NgModel]),
        import1.ɵdid(8192, null, 0, import2.NgControlStatus, [import2.NgControl], null, null),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵeld(0, null, null, 3, 'option', [
            [
                'disabled',
                ''
            ],
            [
                'selected',
                ''
            ],
            [
                'value',
                ''
            ]
        ], null, null, null, null, null)),
        import1.ɵdid(73728, null, 0, import2.NgSelectOption, [
            import1.ElementRef,
            import1.Renderer,
            [
                2,
                import2.SelectControlValueAccessor
            ]
        ], { value: [
                0,
                'value'
            ]
        }, null),
        import1.ɵdid(73728, null, 0, import2.ɵq, [
            import1.ElementRef,
            import1.Renderer,
            [
                8,
                null
            ]
        ], { value: [
                0,
                'value'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['Select Salon'])),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_1)),
        import1.ɵdid(401408, null, 0, import4.NgForOf, [
            import1.ViewContainerRef,
            import1.TemplateRef,
            import1.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n        '])),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 5, 'input', [
            [
                'name',
                'Search'
            ],
            [
                'placeholder',
                'Search'
            ],
            [
                'type',
                'text'
            ]
        ], [
            [
                2,
                'ng-untouched',
                null
            ],
            [
                2,
                'ng-touched',
                null
            ],
            [
                2,
                'ng-pristine',
                null
            ],
            [
                2,
                'ng-dirty',
                null
            ],
            [
                2,
                'ng-valid',
                null
            ],
            [
                2,
                'ng-invalid',
                null
            ],
            [
                2,
                'ng-pending',
                null
            ]
        ], [
            [
                null,
                'ngModelChange'
            ],
            [
                null,
                'input'
            ],
            [
                null,
                'blur'
            ],
            [
                null,
                'compositionstart'
            ],
            [
                null,
                'compositionend'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('input' === en)) {
                var pd_0 = (import1.ɵnov(v, 42)._handleInput($event.target.value) !== false);
                ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
                var pd_1 = (import1.ɵnov(v, 42).onTouched() !== false);
                ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
                var pd_2 = (import1.ɵnov(v, 42)._compositionStart() !== false);
                ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
                var pd_3 = (import1.ɵnov(v, 42)._compositionEnd($event.target.value) !== false);
                ad = (pd_3 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_4 = ((co.search.search = $event) !== false);
                ad = (pd_4 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_5 = (co.searchInput() !== false);
                ad = (pd_5 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, null, 0, import2.DefaultValueAccessor, [
            import1.Renderer,
            import1.ElementRef,
            [
                2,
                import2.COMPOSITION_BUFFER_MODE
            ]
        ], null, null),
        import1.ɵprd(512, null, import2.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [import2.DefaultValueAccessor]),
        import1.ɵdid(335872, null, 0, import2.NgModel, [
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                2,
                import2.NG_VALUE_ACCESSOR
            ]
        ], {
            name: [
                0,
                'name'
            ],
            model: [
                1,
                'model'
            ]
        }, { update: 'ngModelChange' }),
        import1.ɵprd(1024, null, import2.NgControl, null, [import2.NgModel]),
        import1.ɵdid(8192, null, 0, import2.NgControlStatus, [import2.NgControl], null, null),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 6, 'button', [
            [
                'class',
                'newclientbig-btn'
            ],
            [
                'routerLinkActive',
                'active'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 49).onClick() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, [[
                1,
                4
            ]
        ], 0, import3.RouterLink, [
            import3.Router,
            import3.ActivatedRoute,
            [
                8,
                null
            ],
            import1.Renderer,
            import1.ElementRef
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(1),
        import1.ɵdid(860160, null, 2, import3.RouterLinkActive, [
            import3.Router,
            import1.ElementRef,
            import1.Renderer,
            import1.ChangeDetectorRef
        ], { routerLinkActive: [
                0,
                'routerLinkActive'
            ]
        }, null),
        import1.ɵqud(301989888, 1, { links: 1 }),
        import1.ɵqud(301989888, 2, { linksWithHrefs: 1 }),
        (l()(), import1.ɵted(null, ['ADD A NEW CLIENT'])),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 6, 'button', [
            [
                'class',
                'newclientsml-btn'
            ],
            [
                'routerLinkActive',
                'active'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            if (('click' === en)) {
                var pd_0 = (import1.ɵnov(v, 57).onClick() !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        import1.ɵdid(8192, [[
                3,
                4
            ]
        ], 0, import3.RouterLink, [
            import3.Router,
            import3.ActivatedRoute,
            [
                8,
                null
            ],
            import1.Renderer,
            import1.ElementRef
        ], { routerLink: [
                0,
                'routerLink'
            ]
        }, null),
        import1.ɵpad(1),
        import1.ɵdid(860160, null, 2, import3.RouterLinkActive, [
            import3.Router,
            import1.ElementRef,
            import1.Renderer,
            import1.ChangeDetectorRef
        ], { routerLinkActive: [
                0,
                'routerLinkActive'
            ]
        }, null),
        import1.ɵqud(301989888, 3, { links: 1 }),
        import1.ɵqud(301989888, 4, { linksWithHrefs: 1 }),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [
            [
                'aria-hidden',
                'true'
            ],
            [
                'class',
                'fa fa-plus'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵeld(0, null, null, 51, 'div', [[
                'class',
                'beigeback'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵeld(0, null, null, 47, 'table', [[
                'class',
                'table table-hover table-responsive table-condensed'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵeld(0, null, null, 37, 'thead', [[
                'class',
                'head-clts'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n        '])),
        (l()(), import1.ɵeld(0, null, null, 34, 'tr', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵeld(0, null, null, 13, 'th', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵeld(0, null, null, 10, 'div', [[
                'class',
                'tbl-left'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'p', [[
                'class',
                'tblnav-cl'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['Client'])),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('-client') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-up'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('client') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-down'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵand(8388608, null, null, 1, null, View_CompanieDetailUsersComponent_2)),
        import1.ɵdid(8192, null, 0, import4.NgIf, [
            import1.ViewContainerRef,
            import1.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵeld(0, null, null, 13, 'th', [], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵeld(0, null, null, 10, 'div', [[
                'class',
                'tbl-right'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'p', [[
                'class',
                'tblnav-cl'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['Last Visit'])),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('lastVisit') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-up'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n              '])),
        (l()(), import1.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'updownbtn'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.orderBy('-lastVisit') !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import1.ɵeld(0, null, null, 0, 'i', [[
                'class',
                'fa fa-chevron-down'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n            '])),
        (l()(), import1.ɵted(null, ['\n          '])),
        (l()(), import1.ɵted(null, ['\n        '])),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵeld(0, null, null, 5, 'tbody', [[
                'class',
                'clienttbl'
            ]
        ], null, null, null, null, null)),
        (l()(), import1.ɵted(null, ['\n        '])),
        (l()(), import1.ɵand(8388608, null, null, 2, null, View_CompanieDetailUsersComponent_3)),
        import1.ɵdid(401408, null, 0, import4.NgForOf, [
            import1.ViewContainerRef,
            import1.TemplateRef,
            import1.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        import1.ɵppd(3),
        (l()(), import1.ɵted(null, ['\n      '])),
        (l()(), import1.ɵted(null, ['\n    '])),
        (l()(), import1.ɵted(null, ['\n\n    '])),
        (l()(), import1.ɵted(null, ['\n  '])),
        (l()(), import1.ɵted(null, ['\n'])),
        (l()(), import1.ɵted(null, ['\n']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = ck(v, 19, 0, (co.fetchedCompanies.length < 2));
        ck(v, 18, 0, currVal_0);
        var currVal_8 = 'form-control';
        var currVal_9 = ck(v, 23, 0, co.isSalesRep());
        ck(v, 22, 0, currVal_8, currVal_9);
        var currVal_10 = co.companieIdToSelect;
        ck(v, 26, 0, currVal_10);
        var currVal_11 = '';
        ck(v, 31, 0, currVal_11);
        var currVal_12 = '';
        ck(v, 32, 0, currVal_12);
        var currVal_13 = co.fetchedCompanies;
        ck(v, 36, 0, currVal_13);
        var currVal_21 = 'Search';
        var currVal_22 = co.search.search;
        ck(v, 44, 0, currVal_21, currVal_22);
        var currVal_23 = ck(v, 50, 0, '/user/newuser');
        ck(v, 49, 0, currVal_23);
        var currVal_24 = 'active';
        ck(v, 51, 0, currVal_24);
        var currVal_25 = ck(v, 58, 0, '/user/newuser');
        ck(v, 57, 0, currVal_25);
        var currVal_26 = 'active';
        ck(v, 59, 0, currVal_26);
        var currVal_27 = co.showColumnStylist();
        ck(v, 89, 0, currVal_27);
        var currVal_28 = import1.ɵunv(v, 111, 0, ck(v, 112, 0, import1.ɵnov(v, 0), co.fetchedCompanie._users, co.search.search, co.search.orderBy));
        ck(v, 111, 0, currVal_28);
    }, function (ck, v) {
        var currVal_1 = import1.ɵnov(v, 28).ngClassUntouched;
        var currVal_2 = import1.ɵnov(v, 28).ngClassTouched;
        var currVal_3 = import1.ɵnov(v, 28).ngClassPristine;
        var currVal_4 = import1.ɵnov(v, 28).ngClassDirty;
        var currVal_5 = import1.ɵnov(v, 28).ngClassValid;
        var currVal_6 = import1.ɵnov(v, 28).ngClassInvalid;
        var currVal_7 = import1.ɵnov(v, 28).ngClassPending;
        ck(v, 21, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7);
        var currVal_14 = import1.ɵnov(v, 46).ngClassUntouched;
        var currVal_15 = import1.ɵnov(v, 46).ngClassTouched;
        var currVal_16 = import1.ɵnov(v, 46).ngClassPristine;
        var currVal_17 = import1.ɵnov(v, 46).ngClassDirty;
        var currVal_18 = import1.ɵnov(v, 46).ngClassValid;
        var currVal_19 = import1.ɵnov(v, 46).ngClassInvalid;
        var currVal_20 = import1.ɵnov(v, 46).ngClassPending;
        ck(v, 41, 0, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20);
    });
}
function View_CompanieDetailUsersComponent_Host_0(l) {
    return import1.ɵvid(0, [
        (l()(), import1.ɵeld(0, null, null, 1, 'app-companie', [], null, null, null, View_CompanieDetailUsersComponent_0, RenderType_CompanieDetailUsersComponent)),
        import1.ɵdid(57344, null, 0, import6.CompanieDetailUsersComponent, [
            import7.CompanieService,
            import8.AdminService,
            import9.ToastsManager,
            import10.MdDialog,
            import3.Router,
            import4.Location,
            import3.ActivatedRoute,
            import2.FormBuilder,
            import11.AuthService
        ], null, null)
    ], function (ck, v) {
        ck(v, 1, 0);
    }, null);
}
export var CompanieDetailUsersComponentNgFactory = import1.ɵccf('app-companie', import6.CompanieDetailUsersComponent, View_CompanieDetailUsersComponent_Host_0, {}, {}, []);
//# sourceMappingURL=companieDetailUsers.component.ngfactory.js.map