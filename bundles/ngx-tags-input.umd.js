(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-bootstrap/typeahead'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-tags-input', ['exports', '@angular/core', 'ngx-bootstrap/typeahead', '@angular/common', '@angular/forms'], factory) :
    (factory((global['ngx-tags-input'] = {}),global.ng.core,global.typeahead,global.ng.common,global.ng.forms));
}(this, (function (exports,core,typeahead,common,forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = ( /**
     * @return {?}
     */function () { });
    /** @type {?} */
    var TAGS_INPUT_TEMPLATE = "\n    <div class=\"tags-input\">\n        <span class=\"tags-input__tag label label-primary badge badge-primary\" *ngFor=\"let tag of tags\">\n            {{tag[displayField]}}\n            <span *ngIf=\"isDeleteable(tag)\" role=\"button\" class=\"tags-input__tag-remove-btn\" (click)=\"removeTag(tag)\" (touch)=\"removeTag(tag)\">\n                <span aria-hidden=\"true\">&times;</span>\n                <span class=\"sr-only\">Close</span>\n            </span>\n        </span>\n        <input\n            *ngIf=\"options === null; else withTypeahead\" \n            class=\"tags-input__input-field\" \n            type=\"text\" \n            [placeholder]=\"getPlaceholder()\"\n            name=\"tags\"\n            (keyup)=\"keyDownEvent($event, tagInput)\"\n            (keyup.enter)=\"addTag(tagInput)\" (keydown.backspace)=\"removeLastTag(tagInput)\"\n            [disabled]=\"!canAddTags || maximumOfTagsReached()\"\n            [hidden]=\"!canAddTags || maximumOfTagsReached()\"\n            #tagInput />\n        <ng-template #withTypeahead>\n          <input\n            *ngIf=\"options !== null\" \n            class=\"tags-input__input-field\" \n            type=\"text\" \n            [placeholder]=\"getPlaceholder()\"\n            name=\"tags\"\n            (keydown.backspace)=\"removeLastTag(tagInput)\"\n            [(ngModel)]=\"selected\" \n            [typeahead]=\"options\"\n            [typeaheadOptionField]=\"displayField\"\n            (typeaheadOnSelect)=\"typeaheadOnSelect($event)\"\n            (typeaheadNoResults)=\"typeaheadOnNoMatch($event)\"\n            [typeaheadMinLength]=\"minLengthBeforeOptions\"\n            [typeaheadScrollable]=\"scrollableOptions\"\n            [typeaheadLatinize]=\"true\"\n            [typeaheadOptionsInScrollableView]=\"scrollableOptionsInView\"\n            [disabled]=\"!canAddTags || maximumOfTagsReached()\"\n            [hidden]=\"!canAddTags || maximumOfTagsReached()\"\n            #tagInput />\n        </ng-template>\n    </div>\n";
    /** @type {?} */
    var TAGS_INPUT_STYLE = "\n    :host {\n        overflow: auto;\n        white-space: nowrap;\n    }\n\n    .tags-input {\n        align-items: center;\n        display: flex;\n        flex-wrap: wrap;\n    }\n\n    .tags-input__tag {\n        display: inline-block;\n        margin-bottom: 2px;\n        margin-right: 5px;\n        padding-right: 0.3em;\n    }\n\n    .tags-input__tag-remove-btn {\n        cursor: pointer;\n        display: inline-block;\n        font-size: 12px;\n        margin: -3px 0 0 3px;\n        padding: 0;\n        vertical-align: top;\n    }\n\n    .tags-input__input-field {\n        border: none;\n        flex-grow: 1;\n        outline: none;\n    }\n";
    /** @type {?} */
    var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(( /**
         * @return {?}
         */function () { return NgxTagsInputComponent; })),
        multi: true
    };
    var NgxTagsInputComponent = /** @class */ (function () {
        function NgxTagsInputComponent() {
            this.selected = '';
            this.tags = [];
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
            this.removeLastOnBackspace = false;
            this.canDeleteTags = true;
            this.canAddTags = true;
            this.placeholder = '';
            this.options = null;
            this.displayField = 'displayValue';
            this.minLengthBeforeOptions = 1;
            this.scrollableOptions = false;
            this.scrollableOptionsInView = 5;
            this.onTagsChanged = new core.EventEmitter();
            this.onMaxTagsReached = new core.EventEmitter();
            this.onNoOptionsMatch = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NgxTagsInputComponent.prototype.getPlaceholder = /**
         * @return {?}
         */
            function () {
                if (this.tags && this.tags.length > 0) {
                    return '';
                }
                return this.placeholder;
            };
        /**
         * @private
         * @param {?} type
         * @param {?} tag
         * @return {?}
         */
        NgxTagsInputComponent.prototype.tagsChanged = /**
         * @private
         * @param {?} type
         * @param {?} tag
         * @return {?}
         */
            function (type, tag) {
                this.onChangeCallback(this.tags);
                this.onTagsChanged.emit({
                    change: type,
                    tag: tag
                });
                if (this.maximumOfTagsReached()) {
                    this.onMaxTagsReached.emit();
                }
            };
        /**
         * @param {?} tagInput
         * @return {?}
         */
        NgxTagsInputComponent.prototype.removeLastTag = /**
         * @param {?} tagInput
         * @return {?}
         */
            function (tagInput) {
                if (!this.removeLastOnBackspace || !this.tags.length) {
                    return;
                }
                if (tagInput.value === '') {
                    this.removeTag(this.tags[this.tags.length - 1]);
                }
            };
        /**
         * @param {?} tagInput
         * @return {?}
         */
        NgxTagsInputComponent.prototype.addTag = /**
         * @param {?} tagInput
         * @return {?}
         */
            function (tagInput) {
                var _a;
                if (tagInput.value.trim() !== '') {
                    /** @type {?} */
                    var tag = (_a = {},
                        _a[this.displayField] = tagInput.value,
                        _a);
                    this.addPredefinedTag(tag);
                }
                tagInput.value = '';
            };
        /**
         * @param {?} event
         * @param {?} tagInput
         * @return {?}
         */
        NgxTagsInputComponent.prototype.keyDownEvent = /**
         * @param {?} event
         * @param {?} tagInput
         * @return {?}
         */
            function (event, tagInput) {
                if (event.which === 188) {
                    tagInput.value = tagInput.value.slice(0, -1);
                    this.addTag(tagInput);
                }
            };
        /**
         * @private
         * @param {?} tag
         * @return {?}
         */
        NgxTagsInputComponent.prototype.addPredefinedTag = /**
         * @private
         * @param {?} tag
         * @return {?}
         */
            function (tag) {
                if (!this.maximumOfTagsReached()) {
                    this.tags.push(tag);
                    this.tagsChanged('add', tag);
                }
            };
        /**
         * @param {?} tagToRemove
         * @return {?}
         */
        NgxTagsInputComponent.prototype.removeTag = /**
         * @param {?} tagToRemove
         * @return {?}
         */
            function (tagToRemove) {
                if (!this.isDeleteable(tagToRemove)) {
                    return;
                }
                this.tags = this.tags.filter(( /**
                 * @param {?} tag
                 * @return {?}
                 */function (tag) { return tagToRemove !== tag; }));
                this.tagsChanged('remove', tagToRemove);
            };
        /**
         * @return {?}
         */
        NgxTagsInputComponent.prototype.maximumOfTagsReached = /**
         * @return {?}
         */
            function () {
                return typeof this.maxTags !== 'undefined' && this.tags && this.tags.length >= this.maxTags;
            };
        /**
         * @param {?} tag
         * @return {?}
         */
        NgxTagsInputComponent.prototype.isDeleteable = /**
         * @param {?} tag
         * @return {?}
         */
            function (tag) {
                if (typeof tag.deleteable !== "undefined" && !tag.deleteable) {
                    return false;
                }
                return this.canDeleteTags;
            };
        /**
         * @param {?} e
         * @return {?}
         */
        NgxTagsInputComponent.prototype.typeaheadOnSelect = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                var _a;
                if (typeof e.item === 'string') {
                    this.addPredefinedTag((_a = {},
                        _a[this.displayField] = e.value,
                        _a));
                }
                else {
                    this.addPredefinedTag(e.item);
                }
                this.selected = '';
            };
        /**
         * @param {?} e
         * @return {?}
         */
        NgxTagsInputComponent.prototype.typeaheadOnNoMatch = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (typeof this.onNoOptionsMatch !== 'undefined') {
                    this.onNoOptionsMatch.emit(e);
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgxTagsInputComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value !== this.tags) {
                    this.tags = value;
                }
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxTagsInputComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxTagsInputComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        NgxTagsInputComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-tags-input',
                        template: TAGS_INPUT_TEMPLATE,
                        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                        styles: [TAGS_INPUT_STYLE]
                    }] }
        ];
        NgxTagsInputComponent.propDecorators = {
            maxTags: [{ type: core.Input }],
            removeLastOnBackspace: [{ type: core.Input }],
            canDeleteTags: [{ type: core.Input }],
            canAddTags: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            options: [{ type: core.Input }],
            displayField: [{ type: core.Input }],
            minLengthBeforeOptions: [{ type: core.Input }],
            scrollableOptions: [{ type: core.Input }],
            scrollableOptionsInView: [{ type: core.Input }],
            onTagsChanged: [{ type: core.Output }],
            onMaxTagsReached: [{ type: core.Output }],
            onNoOptionsMatch: [{ type: core.Output }]
        };
        return NgxTagsInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxTagsInputModule = /** @class */ (function () {
        function NgxTagsInputModule() {
        }
        NgxTagsInputModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxTagsInputComponent],
                        imports: [
                            forms.FormsModule,
                            common.CommonModule,
                            typeahead.TypeaheadModule.forRoot()
                        ],
                        exports: [NgxTagsInputComponent]
                    },] }
        ];
        return NgxTagsInputModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxTagsInputComponent = NgxTagsInputComponent;
    exports.NgxTagsInputModule = NgxTagsInputModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-tags-input.umd.js.map