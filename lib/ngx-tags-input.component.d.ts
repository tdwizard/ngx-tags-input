import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
export interface TagsChangedEvent {
    change: string;
    tag: any;
}
export declare class NgxTagsInputComponent implements ControlValueAccessor {
    selected: string;
    tags: Array<any>;
    private onTouchedCallback;
    private onChangeCallback;
    maxTags: number;
    removeLastOnBackspace: boolean;
    canDeleteTags: boolean;
    canAddTags: boolean;
    placeholder: string;
    options: any;
    displayField: string;
    minLengthBeforeOptions: number;
    scrollableOptions: boolean;
    scrollableOptionsInView: number;
    onTagsChanged: EventEmitter<TagsChangedEvent>;
    onMaxTagsReached: EventEmitter<void>;
    onNoOptionsMatch: EventEmitter<boolean>;
    getPlaceholder(): string;
    private tagsChanged;
    removeLastTag(tagInput: HTMLInputElement): void;
    addTag(tagInput: HTMLInputElement): void;
    keyDownEvent(event: any, tagInput: HTMLInputElement): void;
    private addPredefinedTag;
    removeTag(tagToRemove: any): void;
    maximumOfTagsReached(): boolean;
    isDeleteable(tag: any): boolean;
    typeaheadOnSelect(e: TypeaheadMatch): void;
    typeaheadOnNoMatch(e: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
