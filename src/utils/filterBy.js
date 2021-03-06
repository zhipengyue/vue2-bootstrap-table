﻿function getSearchArr(rows, columns) {
    let res = []

    rows.forEach(row => {
        let item = {}

        columns.forEach(col => {
            if(!col.field) return

            let val = getrowdata(row,col)
            if(!val) return

            //if(col.filter) {
            //    val = col.filter(val)
            //}

            item[col.field] = val
        })

        res.push(item)
    })

    return res
}

function getrowdata(row,col)
{
    if(col.field.indexOf('|')<0)
    {
        return row[col.field]
    }else{
        let childarr = col.field.split('|')
        return recursiveRowChild(row,childarr,0)
    }
}

function recursiveRowChild(row,childarr,i)
{
    console.log(i)
    if(childarr.length>0)
    {
        if(!row[childarr[0]])
        {
            return ''
        }else{
            let data = childarr.shift()
            return recursiveRowChild(row[data],childarr,i)
        }
       
    }else{
        return row
    }
}
function myFilterBy(rows, columns, q, delimiter) {
    let arr = getSearchArr(rows, columns)
    return filterBy(arr, q, delimiter)
}

/**
 * Filter filter for arrays
 *
 * @param {String} search
 * @param {String} [delimiter]
 * @param {String} ...dataKeys
 */

function filterBy(arr, search, delimiter) {
    //arr = convertArray(arr);
    if (search == null) {
        return arr;
    }
    if (typeof search === 'function') {
        return arr.filter(search);
    }
    // cast to lowercase string
    search = ('' + search).toLowerCase();
    // allow optional `in` delimiter
    // because why not
    var n = delimiter === 'in' ? 3 : 2;
    // extract and flatten keys
    var keys = Array.prototype.concat.apply([], toArray(arguments, n));
    var res = [];
    var item, key, val, j;
    for (var i = 0, l = arr.length; i < l; i++) {
        item = arr[i];
        val = item && item.$value || item;
        j = keys.length;
        if (j) {
            while (j--) {
                key = keys[j];
                if (key === '$key' && contains(item.$key, search) || contains(val, search)) {
                    res.push(item);
                    break;
                }
            }
        } else if (contains(item, search)) {
            res.push(item);
        }
    }
    return res;
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'
export function isPlainObject (obj) {
    return toString.call(obj) === OBJECT_STRING
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export const isArray = Array.isArray

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

export function toArray (list, start) {
    start = start || 0
    var i = list.length - start
    var ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}

/**
 * String contain helper
 *
 * @param {*} val
 * @param {String} search
 */

function contains(val, search) {
    var i;
    if (isPlainObject(val)) {
        var keys = Object.keys(val);
        i = keys.length;
        while (i--) {
            if (contains(val[keys[i]], search)) {
                return true;
            }
        }
    } else if (isArray(val)) {
        i = val.length;
        while (i--) {
            if (contains(val[i], search)) {
                return true;
            }
        }
    } else if (val != null) {
        return val.toString().toLowerCase().indexOf(search) > -1;
    }
}

module.exports = myFilterBy