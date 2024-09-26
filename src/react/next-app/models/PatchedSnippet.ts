/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { StyleEnum } from './StyleEnum';
import {
    StyleEnumFromJSON,
    StyleEnumFromJSONTyped,
    StyleEnumToJSON,
} from './StyleEnum';
import type { LanguageEnum } from './LanguageEnum';
import {
    LanguageEnumFromJSON,
    LanguageEnumFromJSONTyped,
    LanguageEnumToJSON,
} from './LanguageEnum';

/**
 * 
 * @export
 * @interface PatchedSnippet
 */
export interface PatchedSnippet {
    /**
     * 
     * @type {number}
     * @memberof PatchedSnippet
     */
    readonly id?: number;
    /**
     * 
     * @type {Date}
     * @memberof PatchedSnippet
     */
    readonly created?: Date;
    /**
     * 
     * @type {string}
     * @memberof PatchedSnippet
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedSnippet
     */
    code?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PatchedSnippet
     */
    linenos?: boolean;
    /**
     * 
     * @type {LanguageEnum}
     * @memberof PatchedSnippet
     */
    language?: LanguageEnum;
    /**
     * 
     * @type {StyleEnum}
     * @memberof PatchedSnippet
     */
    style?: StyleEnum;
}



/**
 * Check if a given object implements the PatchedSnippet interface.
 */
export function instanceOfPatchedSnippet(value: object): value is PatchedSnippet {
    return true;
}

export function PatchedSnippetFromJSON(json: any): PatchedSnippet {
    return PatchedSnippetFromJSONTyped(json, false);
}

export function PatchedSnippetFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedSnippet {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'created': json['created'] == null ? undefined : (new Date(json['created'])),
        'title': json['title'] == null ? undefined : json['title'],
        'code': json['code'] == null ? undefined : json['code'],
        'linenos': json['linenos'] == null ? undefined : json['linenos'],
        'language': json['language'] == null ? undefined : LanguageEnumFromJSON(json['language']),
        'style': json['style'] == null ? undefined : StyleEnumFromJSON(json['style']),
    };
}

export function PatchedSnippetToJSON(value?: Omit<PatchedSnippet, 'id'|'created'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'code': value['code'],
        'linenos': value['linenos'],
        'language': LanguageEnumToJSON(value['language']),
        'style': StyleEnumToJSON(value['style']),
    };
}

