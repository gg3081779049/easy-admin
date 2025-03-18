// 获取下一个唯一的最小值
module.exports.getNextUniqueMin = function (nums, min = 1) {
    const numSet = new Set(nums)
    while (numSet.has(min)) min++
    return min
}

// 判断日期是否在指定范围内
module.exports.dateInRange = function (date, startDate, endDate) {
    return date >= startDate && date <= endDate
}

// 提取对象中的指定键
module.exports.pick = function (obj, keys) {
    return keys.reduce((acc, key) => {
        acc[key] = obj[key]
        return acc
    }, {})
}

// 去掉对象中的指定键
module.exports.omit = function (obj, keys) {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keys.includes(key)) {
            acc[key] = obj[key]
        }
        return acc
    }, {})
}

// token 创建/解析
module.exports.tokenManager  = {
    serverKey: 'admin',
    createToken(data) {
        return btoa(JSON.stringify({
            key: this.serverKey,
            value: data
        }))
    },
    parseToken(token) {
        try {
            const { key, value } = JSON.parse(atob(token))
            return key === this.serverKey ? value : null
        } catch (error) {
            return null
        }
    }
}

// 执行一个副作用操作
module.exports.tap = function (func) {
    return func.bind(this)()
}

// 树转数组
module.exports.treeToArray = function (tree) {
    let array = []
    let childrenKey = 'children'
    let idCounter = 1
    function traverse(node, parentNodes, order) {
        node.id = idCounter++
        let newNode = { ...node, parentId: parentNodes.at(-1)?.id || 0, order, hasChild: childrenKey in node }
        delete newNode[childrenKey]
        array.push(newNode)
        node[childrenKey]?.forEach((child, index) => traverse(child, [...parentNodes, node], index + 1))
    }
    tree.forEach((node, index) => traverse(node, [], index + 1))
    return array
}