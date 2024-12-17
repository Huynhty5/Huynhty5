function camelToSnakeString(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function snakeToCamelString(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// Hàm chuyển từ camelCase sang snake_case
/**
 * chuyển object.camelCase thành object.snake_case
 * @param {object} obj 
 * @returns newObj
 */
function camelToSnake(obj) {
    const newObj = {};

    Object.keys(obj).forEach(key => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        newObj[snakeKey] = obj[key];
    });

    return newObj;
}

// Hàm chuyển từ snake_case sang camelCase
/**
 * chuyển object.snake_case thành object.camelCase
 * @param {object} obj 
 * @returns newObj
 */
function snakeToCamel(obj) {
    const newObj = {};

    Object.keys(obj).forEach(key => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        newObj[camelKey] = obj[key];
    });

    return newObj;
}

function removeNullProps(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key]
        }
    })
}

function getSortString(sortField, isAsc = null) {
    if (isAsc === null) {
        return ''
    }

    let sortStr = ''
    if (isAsc == 1) {
        sortStr = 'asc'
    } else if (isAsc == -1) {
        sortStr = 'desc'
    }

    return `order by ${sortField} ${sortStr};`
}

function transformStringForSearch(str) {
    return `%${str.trim().replace(/\s+/g, '%')}%`
}

module.exports = {
    camelToSnake,
    snakeToCamel,
    camelToSnakeString,
    snakeToCamelString,
    removeNullProps,
    getSortString,
    transformStringForSearch
}