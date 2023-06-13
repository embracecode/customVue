
// 匹配plus（1） 函数名及参数都能匹配到 ["plus('1')", 'plus', "'1'", index: 0, input: "plus('1')", groups: undefined]
const regPropIsArgs = /(.+?)\((.*?)\)/
// 匹配参数里面是否是字符串 如果是字符串的时候 ["'1'", '1', index: 0, input: "'1'", groups: undefined]
const regIsStr = /[\'|\"](.+?)[\'|\"]/g

const regQuotationMark = /\'|\"/g
// 获取第一个子节点
export function getFirstNodes(nodes) {
    const childNodes = nodes.childNodes

    for (let index = 0; index < childNodes.length; index++) {
        if (childNodes[index].nodeType === 1) {
            return childNodes[index]
        }
    }
}

// 检查获取的表达式里面是否有data的值
export function checkExpressIsIncludesData(data, express) {
    for(let key in data){
        console.log(key, express, 'express', key === express);
        if (express.includes(key) && express !== key) {
            return {
                key,
                express
            }
        } else if (express === key) {
            return {
                key,
                express: key
            }
        }
    }
}

// 检查获取的表达式里面是否有data的值和文本
export function checkExpressIsIncludesDataAndText(data, express, beforeValue, afterValue){
    for(let key in data){
        // express  是node节点里面的表达式  判断 表达式里面是否包含
        if (express.includes(key) && express !== key) {
            return {
                key,
                express,
                beforeValue,
                afterValue
            }
        } else if (express.includes(key) && express === key) {
            return {
                key,
                express: key,
                beforeValue,
                afterValue
            }
        } else if (!express.includes(key) && data[express] !== undefined) {
            continue
        } else if((!express.includes(key) && data[express] === undefined) ) {
            throw Error(`${express} is not defined`)
        }
    }
}

// 检查获取到的@click 属性值里面是否 带参数 （value）
export function checkFnHasArgs(str){
    let fnInfo = str.match(regPropIsArgs)
    if (fnInfo) {
        let pramsArr = fnInfo[2].split(',')
        let prames
        // 检查 click方法里面的参数是否是字符串， 如果是字符串走则把引号替换为''  如果不是则转换成number值  这里只对字符串和number值做了校验
        if (checkIsString(fnInfo[2], pramsArr)) {
            prames = checkIsString(fnInfo[2], pramsArr)
        } else {
            prames = pramsArr.map(item => {
                if (item==='$event') {
                    return item
                }
                if (item === '') {
                    return undefined
                }
                return Number(item)
            })
        }
        return {
            methodsName: fnInfo[1],
            prames
        }   
    } else {
        return null
    }
}
function checkIsString(str, pramsArr){
    let arr = str.match(regIsStr)
    // 如果参数 是字符串 就会匹配到值 做字符串替换处理  如果参数不是字符串 就会走 str.match(regIsStr)值为null
    if (arr) {
        return pramsArr = arr.map(item => item.replace(regQuotationMark, ''))
    }
    return str.match(regIsStr)
    console.log(str.match(regIsStr), 'regIsStr')
    let strMatch = str.match(regIsStr)
    if (strMatch) {
        return strMatch[1]
    } else {
        return strMatch
    }
}