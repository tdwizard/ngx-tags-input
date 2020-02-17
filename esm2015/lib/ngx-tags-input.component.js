/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => { });
const ɵ0 = noop;
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
/**
 * @record
 */
export function TagsChangedEvent() { }
if (false) {
    /** @type {?} */
    TagsChangedEvent.prototype.change;
    /** @type {?} */
    TagsChangedEvent.prototype.tag;
}
export class NgxTagsInputComponent {
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
if (false) {
    /** @type {?} */
    NgxTagsInputComponent.prototype.selected;
    /** @type {?} */
    NgxTagsInputComponent.prototype.tags;
    /**
     * @type {?}
     * @private
     */
    NgxTagsInputComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    NgxTagsInputComponent.prototype.onChangeCallback;
    /** @type {?} */
    NgxTagsInputComponent.prototype.maxTags;
    /** @type {?} */
    NgxTagsInputComponent.prototype.removeLastOnBackspace;
    /** @type {?} */
    NgxTagsInputComponent.prototype.canDeleteTags;
    /** @type {?} */
    NgxTagsInputComponent.prototype.canAddTags;
    /** @type {?} */
    NgxTagsInputComponent.prototype.placeholder;
    /** @type {?} */
    NgxTagsInputComponent.prototype.options;
    /** @type {?} */
    NgxTagsInputComponent.prototype.displayField;
    /** @type {?} */
    NgxTagsInputComponent.prototype.minLengthBeforeOptions;
    /** @type {?} */
    NgxTagsInputComponent.prototype.scrollableOptions;
    /** @type {?} */
    NgxTagsInputComponent.prototype.scrollableOptionsInView;
    /** @type {?} */
    NgxTagsInputComponent.prototype.onTagsChanged;
    /** @type {?} */
    NgxTagsInputComponent.prototype.onMaxTagsReached;
    /** @type {?} */
    NgxTagsInputComponent.prototype.onNoOptionsMatch;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRhZ3MtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRhZ3MtaW5wdXQvIiwic291cmNlcyI6WyJsaWIvbmd4LXRhZ3MtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7O01BR25FLElBQUk7OztBQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTs7O01BRWYsbUJBQW1CLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBDM0I7O01BRUssZ0JBQWdCLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWlDeEI7O01BRUssbUNBQW1DLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDWjs7OztBQUVELHNDQUdDOzs7SUFGQyxrQ0FBZTs7SUFDZiwrQkFBUTs7QUFTVixNQUFNLE9BQU8scUJBQXFCO0lBTmxDO1FBT0UsYUFBUSxHQUFVLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBZSxFQUFFLENBQUM7UUFDckIsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7UUFHekMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBQ3ZDLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFX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LEVBQU87UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUE5SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxtQkFBbUI7Z0JBRTdCLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO3lCQUR2QyxnQkFBZ0I7YUFFMUI7OztzQkFPRSxLQUFLO29DQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3FDQUNMLEtBQUs7Z0NBQ0wsS0FBSztzQ0FDTCxLQUFLOzRCQUNMLE1BQU07K0JBQ04sTUFBTTsrQkFDTixNQUFNOzs7O0lBakJQLHlDQUFxQjs7SUFDckIscUNBQTZCOzs7OztJQUM3QixrREFBNkM7Ozs7O0lBQzdDLGlEQUFrRDs7SUFFbEQsd0NBQXlCOztJQUN6QixzREFBZ0Q7O0lBQ2hELDhDQUF1Qzs7SUFDdkMsMkNBQW9DOztJQUNwQyw0Q0FBa0M7O0lBQ2xDLHdDQUE2Qjs7SUFDN0IsNkNBQStDOztJQUMvQyx1REFBNEM7O0lBQzVDLGtEQUE0Qzs7SUFDNUMsd0RBQTZDOztJQUM3Qyw4Q0FBNkU7O0lBQzdFLGlEQUFvRTs7SUFDcEUsaURBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFR5cGVhaGVhZE1hdGNoIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90eXBlYWhlYWQvcHVibGljX2FwaSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3QgVEFHU19JTlBVVF9URU1QTEFURSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGFncy1pbnB1dFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRhZ3MtaW5wdXRfX3RhZyBsYWJlbCBsYWJlbC1wcmltYXJ5IGJhZGdlIGJhZGdlLXByaW1hcnlcIiAqbmdGb3I9XCJsZXQgdGFnIG9mIHRhZ3NcIj5cbiAgICAgICAgICAgIHt7dGFnW2Rpc3BsYXlGaWVsZF19fVxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0RlbGV0ZWFibGUodGFnKVwiIHJvbGU9XCJidXR0b25cIiBjbGFzcz1cInRhZ3MtaW5wdXRfX3RhZy1yZW1vdmUtYnRuXCIgKGNsaWNrKT1cInJlbW92ZVRhZyh0YWcpXCIgKHRvdWNoKT1cInJlbW92ZVRhZyh0YWcpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5DbG9zZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwib3B0aW9ucyA9PT0gbnVsbDsgZWxzZSB3aXRoVHlwZWFoZWFkXCIgXG4gICAgICAgICAgICBjbGFzcz1cInRhZ3MtaW5wdXRfX2lucHV0LWZpZWxkXCIgXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImdldFBsYWNlaG9sZGVyKClcIlxuICAgICAgICAgICAgbmFtZT1cInRhZ3NcIlxuICAgICAgICAgICAgKGtleXVwKT1cImtleURvd25FdmVudCgkZXZlbnQsIHRhZ0lucHV0KVwiXG4gICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiYWRkVGFnKHRhZ0lucHV0KVwiIChrZXlkb3duLmJhY2tzcGFjZSk9XCJyZW1vdmVMYXN0VGFnKHRhZ0lucHV0KVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbkFkZFRhZ3MgfHwgbWF4aW11bU9mVGFnc1JlYWNoZWQoKVwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFjYW5BZGRUYWdzIHx8IG1heGltdW1PZlRhZ3NSZWFjaGVkKClcIlxuICAgICAgICAgICAgI3RhZ0lucHV0IC8+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjd2l0aFR5cGVhaGVhZD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICpuZ0lmPVwib3B0aW9ucyAhPT0gbnVsbFwiIFxuICAgICAgICAgICAgY2xhc3M9XCJ0YWdzLWlucHV0X19pbnB1dC1maWVsZFwiIFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJnZXRQbGFjZWhvbGRlcigpXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0YWdzXCJcbiAgICAgICAgICAgIChrZXlkb3duLmJhY2tzcGFjZSk9XCJyZW1vdmVMYXN0VGFnKHRhZ0lucHV0KVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGVkXCIgXG4gICAgICAgICAgICBbdHlwZWFoZWFkXT1cIm9wdGlvbnNcIlxuICAgICAgICAgICAgW3R5cGVhaGVhZE9wdGlvbkZpZWxkXT1cImRpc3BsYXlGaWVsZFwiXG4gICAgICAgICAgICAodHlwZWFoZWFkT25TZWxlY3QpPVwidHlwZWFoZWFkT25TZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAodHlwZWFoZWFkTm9SZXN1bHRzKT1cInR5cGVhaGVhZE9uTm9NYXRjaCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFt0eXBlYWhlYWRNaW5MZW5ndGhdPVwibWluTGVuZ3RoQmVmb3JlT3B0aW9uc1wiXG4gICAgICAgICAgICBbdHlwZWFoZWFkU2Nyb2xsYWJsZV09XCJzY3JvbGxhYmxlT3B0aW9uc1wiXG4gICAgICAgICAgICBbdHlwZWFoZWFkTGF0aW5pemVdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbdHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXddPVwic2Nyb2xsYWJsZU9wdGlvbnNJblZpZXdcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFjYW5BZGRUYWdzIHx8IG1heGltdW1PZlRhZ3NSZWFjaGVkKClcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCIhY2FuQWRkVGFncyB8fCBtYXhpbXVtT2ZUYWdzUmVhY2hlZCgpXCJcbiAgICAgICAgICAgICN0YWdJbnB1dCAvPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuYDtcblxuY29uc3QgVEFHU19JTlBVVF9TVFlMRSA9IGBcbiAgICA6aG9zdCB7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cblxuICAgIC50YWdzLWlucHV0IHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC50YWdzLWlucHV0X190YWcge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDAuM2VtO1xuICAgIH1cblxuICAgIC50YWdzLWlucHV0X190YWctcmVtb3ZlLWJ0biB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIG1hcmdpbjogLTNweCAwIDAgM3B4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIH1cblxuICAgIC50YWdzLWlucHV0X19pbnB1dC1maWVsZCB7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cbmA7XG5cbmNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hUYWdzSW5wdXRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUYWdzQ2hhbmdlZEV2ZW50IHtcbiAgY2hhbmdlOiBzdHJpbmcsXG4gIHRhZzogYW55XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10YWdzLWlucHV0JyxcbiAgdGVtcGxhdGU6IFRBR1NfSU5QVVRfVEVNUExBVEUsXG4gIHN0eWxlczogW1RBR1NfSU5QVVRfU1RZTEVdLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGFnc0lucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBzZWxlY3RlZDpzdHJpbmcgPSAnJztcbiAgcHVibGljIHRhZ3M6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgQElucHV0KCkgbWF4VGFnczogbnVtYmVyO1xuICBASW5wdXQoKSByZW1vdmVMYXN0T25CYWNrc3BhY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY2FuRGVsZXRlVGFnczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGNhbkFkZFRhZ3M6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc3BsYXlGaWVsZDogc3RyaW5nID0gJ2Rpc3BsYXlWYWx1ZSc7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aEJlZm9yZU9wdGlvbnM6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIHNjcm9sbGFibGVPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNjcm9sbGFibGVPcHRpb25zSW5WaWV3OiBudW1iZXIgPSA1O1xuICBAT3V0cHV0KCkgb25UYWdzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFRhZ3NDaGFuZ2VkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25NYXhUYWdzUmVhY2hlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Ob09wdGlvbnNNYXRjaDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldFBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgaWYodGhpcy50YWdzICYmIHRoaXMudGFncy5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlcjtcbiAgfVxuXG4gIHByaXZhdGUgdGFnc0NoYW5nZWQodHlwZTogc3RyaW5nLCB0YWc6IGFueSk6IHZvaWQge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudGFncyk7XG4gICAgICB0aGlzLm9uVGFnc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgY2hhbmdlOiB0eXBlLFxuICAgICAgICAgIHRhZzogdGFnXG4gICAgICB9KTtcbiAgICAgIGlmKHRoaXMubWF4aW11bU9mVGFnc1JlYWNoZWQoKSl7XG4gICAgICAgICAgdGhpcy5vbk1heFRhZ3NSZWFjaGVkLmVtaXQoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHJlbW92ZUxhc3RUYWcodGFnSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgIGlmKCF0aGlzLnJlbW92ZUxhc3RPbkJhY2tzcGFjZSB8fCAhdGhpcy50YWdzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhZ0lucHV0LnZhbHVlID09PSAnJyl7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUYWcodGhpcy50YWdzW3RoaXMudGFncy5sZW5ndGgtMV0pO1xuICAgICAgfVxuICB9XG5cbiAgYWRkVGFnKHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XG4gICAgICBpZiAodGFnSW5wdXQudmFsdWUudHJpbSgpICE9PSAnJyl7XG4gICAgICAgICAgbGV0IHRhZyA9IHtcbiAgICAgICAgICAgICAgW3RoaXMuZGlzcGxheUZpZWxkXTogdGFnSW5wdXQudmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYWRkUHJlZGVmaW5lZFRhZyh0YWcpO1xuICAgICAgfVxuICAgICAgdGFnSW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGtleURvd25FdmVudChldmVudDogYW55LCB0YWdJbnB1dDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxODgpIHtcbiAgICAgICAgdGFnSW5wdXQudmFsdWUgPSB0YWdJbnB1dC52YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMuYWRkVGFnKHRhZ0lucHV0KTtcbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkUHJlZGVmaW5lZFRhZyh0YWc6IE9iamVjdCk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLm1heGltdW1PZlRhZ3NSZWFjaGVkKCkpe1xuICAgICAgICAgIHRoaXMudGFncy5wdXNoKHRhZyk7XG4gICAgICAgICAgdGhpcy50YWdzQ2hhbmdlZCgnYWRkJywgdGFnKTtcbiAgICAgIH1cbiAgfVxuXG4gIHJlbW92ZVRhZyh0YWdUb1JlbW92ZTogYW55KTogdm9pZCB7XG4gICAgICBpZighdGhpcy5pc0RlbGV0ZWFibGUodGFnVG9SZW1vdmUpKXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MuZmlsdGVyKHRhZyA9PiB0YWdUb1JlbW92ZSAhPT0gdGFnKTtcbiAgICAgIHRoaXMudGFnc0NoYW5nZWQoJ3JlbW92ZScsIHRhZ1RvUmVtb3ZlKTtcbiAgfVxuXG4gIG1heGltdW1PZlRhZ3NSZWFjaGVkKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm1heFRhZ3MgIT09ICd1bmRlZmluZWQnICYmIHRoaXMudGFncyAmJiB0aGlzLnRhZ3MubGVuZ3RoPj10aGlzLm1heFRhZ3M7XG4gIH1cblxuICBpc0RlbGV0ZWFibGUodGFnOiBhbnkpIHtcbiAgICAgIGlmKHR5cGVvZiB0YWcuZGVsZXRlYWJsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhdGFnLmRlbGV0ZWFibGUpe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNhbkRlbGV0ZVRhZ3M7XG4gIH1cblxuICB0eXBlYWhlYWRPblNlbGVjdChlOlR5cGVhaGVhZE1hdGNoKTp2b2lkIHtcbiAgICAgIGlmKHR5cGVvZiBlLml0ZW0gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICB0aGlzLmFkZFByZWRlZmluZWRUYWcoe1xuICAgICAgICAgICAgICBbdGhpcy5kaXNwbGF5RmllbGRdOiBlLnZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgICAgdGhpcy5hZGRQcmVkZWZpbmVkVGFnKGUuaXRlbSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XG4gIH1cblxuICB0eXBlYWhlYWRPbk5vTWF0Y2goZTphbnkpOnZvaWQge1xuICAgICAgaWYodHlwZW9mIHRoaXMub25Ob09wdGlvbnNNYXRjaCAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgIHRoaXMub25Ob09wdGlvbnNNYXRjaC5lbWl0KGUpXG4gICAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy50YWdzKSB7XG4gICAgICAgICAgdGhpcy50YWdzID0gdmFsdWU7XG4gICAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG59XG4iXX0=