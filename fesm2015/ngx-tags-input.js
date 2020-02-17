import { Component, forwardRef, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => { });
/** @type {?} */
const TAGS_INPUT_TEMPLATE = `
    <div class="tags-input">
        <span class="tags-input__tag label label-primary badge badge-primary" *ngFor="let tag of tags">
            {{tag[displayField]}}
            <span *ngIf="isDeleteable(tag)" role="button" class="tags-input__tag-remove-btn" (click)="removeTag(tag)" (touch)="removeTag(tag)">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </span>
        </span>
        <input
            *ngIf="options === null; else withTypeahead" 
            class="tags-input__input-field" 
            type="text" 
            [placeholder]="getPlaceholder()"
            name="tags"
            (keyup)="keyDownEvent($event, tagInput)"
            (keyup.enter)="addTag(tagInput)" (keydown.backspace)="removeLastTag(tagInput)"
            [disabled]="!canAddTags || maximumOfTagsReached()"
            [hidden]="!canAddTags || maximumOfTagsReached()"
            #tagInput />
        <ng-template #withTypeahead>
          <input
            *ngIf="options !== null" 
            class="tags-input__input-field" 
            type="text" 
            [placeholder]="getPlaceholder()"
            name="tags"
            (keydown.backspace)="removeLastTag(tagInput)"
            [(ngModel)]="selected" 
            [typeahead]="options"
            [typeaheadOptionField]="displayField"
            (typeaheadOnSelect)="typeaheadOnSelect($event)"
            (typeaheadNoResults)="typeaheadOnNoMatch($event)"
            [typeaheadMinLength]="minLengthBeforeOptions"
            [typeaheadScrollable]="scrollableOptions"
            [typeaheadLatinize]="true"
            [typeaheadOptionsInScrollableView]="scrollableOptionsInView"
            [disabled]="!canAddTags || maximumOfTagsReached()"
            [hidden]="!canAddTags || maximumOfTagsReached()"
            #tagInput />
        </ng-template>
    </div>
`;
/** @type {?} */
const TAGS_INPUT_STYLE = `
    :host {
        overflow: auto;
        white-space: nowrap;
    }

    .tags-input {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
    }

    .tags-input__tag {
        display: inline-block;
        margin-bottom: 2px;
        margin-right: 5px;
        padding-right: 0.3em;
    }

    .tags-input__tag-remove-btn {
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        margin: -3px 0 0 3px;
        padding: 0;
        vertical-align: top;
    }

    .tags-input__input-field {
        border: none;
        flex-grow: 1;
        outline: none;
    }
`;
/** @type {?} */
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgxTagsInputComponent)),
    multi: true
};
class NgxTagsInputComponent {
    constructor() {
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
        this.onTagsChanged = new EventEmitter();
        this.onMaxTagsReached = new EventEmitter();
        this.onNoOptionsMatch = new EventEmitter();
    }
    /**
     * @return {?}
     */
    getPlaceholder() {
        if (this.tags && this.tags.length > 0) {
            return '';
        }
        return this.placeholder;
    }
    /**
     * @private
     * @param {?} type
     * @param {?} tag
     * @return {?}
     */
    tagsChanged(type, tag) {
        this.onChangeCallback(this.tags);
        this.onTagsChanged.emit({
            change: type,
            tag: tag
        });
        if (this.maximumOfTagsReached()) {
            this.onMaxTagsReached.emit();
        }
    }
    /**
     * @param {?} tagInput
     * @return {?}
     */
    removeLastTag(tagInput) {
        if (!this.removeLastOnBackspace || !this.tags.length) {
            return;
        }
        if (tagInput.value === '') {
            this.removeTag(this.tags[this.tags.length - 1]);
        }
    }
    /**
     * @param {?} tagInput
     * @return {?}
     */
    addTag(tagInput) {
        if (tagInput.value.trim() !== '') {
            /** @type {?} */
            let tag = {
                [this.displayField]: tagInput.value
            };
            this.addPredefinedTag(tag);
        }
        tagInput.value = '';
    }
    /**
     * @param {?} event
     * @param {?} tagInput
     * @return {?}
     */
    keyDownEvent(event, tagInput) {
        if (event.which === 188) {
            tagInput.value = tagInput.value.slice(0, -1);
            this.addTag(tagInput);
        }
    }
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    addPredefinedTag(tag) {
        if (!this.maximumOfTagsReached()) {
            this.tags.push(tag);
            this.tagsChanged('add', tag);
        }
    }
    /**
     * @param {?} tagToRemove
     * @return {?}
     */
    removeTag(tagToRemove) {
        if (!this.isDeleteable(tagToRemove)) {
            return;
        }
        this.tags = this.tags.filter((/**
         * @param {?} tag
         * @return {?}
         */
        tag => tagToRemove !== tag));
        this.tagsChanged('remove', tagToRemove);
    }
    /**
     * @return {?}
     */
    maximumOfTagsReached() {
        return typeof this.maxTags !== 'undefined' && this.tags && this.tags.length >= this.maxTags;
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    isDeleteable(tag) {
        if (typeof tag.deleteable !== "undefined" && !tag.deleteable) {
            return false;
        }
        return this.canDeleteTags;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    typeaheadOnSelect(e) {
        if (typeof e.item === 'string') {
            this.addPredefinedTag({
                [this.displayField]: e.value
            });
        }
        else {
            this.addPredefinedTag(e.item);
        }
        this.selected = '';
    }
    /**
     * @param {?} e
     * @return {?}
     */
    typeaheadOnNoMatch(e) {
        if (typeof this.onNoOptionsMatch !== 'undefined') {
            this.onNoOptionsMatch.emit(e);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.tags) {
            this.tags = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
NgxTagsInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tags-input',
                template: TAGS_INPUT_TEMPLATE,
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [TAGS_INPUT_STYLE]
            }] }
];
NgxTagsInputComponent.propDecorators = {
    maxTags: [{ type: Input }],
    removeLastOnBackspace: [{ type: Input }],
    canDeleteTags: [{ type: Input }],
    canAddTags: [{ type: Input }],
    placeholder: [{ type: Input }],
    options: [{ type: Input }],
    displayField: [{ type: Input }],
    minLengthBeforeOptions: [{ type: Input }],
    scrollableOptions: [{ type: Input }],
    scrollableOptionsInView: [{ type: Input }],
    onTagsChanged: [{ type: Output }],
    onMaxTagsReached: [{ type: Output }],
    onNoOptionsMatch: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTagsInputModule {
}
NgxTagsInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxTagsInputComponent],
                imports: [
                    FormsModule,
                    CommonModule,
                    TypeaheadModule.forRoot()
                ],
                exports: [NgxTagsInputComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxTagsInputComponent, NgxTagsInputModule };

//# sourceMappingURL=ngx-tags-input.js.map