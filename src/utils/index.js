// 参数处理
export function tansParams(params) {
    let result = ''
    for (const [propName, value] of Object.entries(params)) {
        let part = encodeURIComponent(propName) + "="
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        result += encodeURIComponent(propName + '[' + key + ']') + "=" + encodeURIComponent(value[key]) + "&"
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&"
            }
        }
    }
    return result
}

// 日期格式化
export function parseTime(date, pattern = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (date instanceof Date) {
        return pattern?.replace(/{(y|m|d|h|i|s|a)}/g, (_, key) => {
            return {
                y: date.getFullYear(),
                m: (date.getMonth() + 1).toString().padStart(2, '0'),
                d: (date.getDate()).toString().padStart(2, '0'),
                h: (date.getHours()).toString().padStart(2, '0'),
                i: (date.getMinutes()).toString().padStart(2, '0'),
                s: (date.getSeconds()).toString().padStart(2, '0'),
                a: (date.getDay())
            }[key]
        })
    }
}

// 短横线转大驼峰
export function dashToCamel(str) {
    return `-${str}`.replace(/-[a-zA-Z]/g, s => s.at(-1).toUpperCase())
}

// 执行一个副作用操作
export function tap(func) {
    return func.bind(this)()
}

// dataURL转blob
export function dataURLToBlob(dataUrl) {
    const type = dataUrl.match(/data:(.+);/)[1]
    const binStr = atob(dataUrl.split(',')[1])
    const u8a = new Uint8Array(binStr.length)
    let p = binStr.length
    while (p--) u8a[p] = binStr.codePointAt(p)
    return new Blob([u8a], { type })
}

// 删除数组中符合条件元素
export function removeIf(arr, func) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (func(arr[i], i)) {
            arr.splice(i, 1)
        }
    }
}
