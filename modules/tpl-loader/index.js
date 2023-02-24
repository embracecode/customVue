
const { tplReplace } = require('./utils')
// webpack  内置模块 获取options配置
const { getOptions } = require('loader-utils')
function TplLoader(source){
    source = source.replace(/\s+/g, '')
    const { log } = getOptions(this)

    const _log = log ? `console.log('compliled the file which is from ${this.resourcePath}')` : ''
    return `
        export default (options) => {
            ${tplReplace.toString()}
            ${ _log.toString() }
            return tplReplace('${source}', options)
        }
    `
}
module.exports = TplLoader


const regBrackets = /\{\{(.+?)\}\}/g
/**
 * replaceObject
 * const info = tpl({
    name: '测试',
    apply: '模板解析',
    funct: '解析以tpl结尾的模板'
}) 

 * template
 * <div><h1>{{name}}</h1><p>{{apply}}</p><p>{{funct}}</p></div>
 * 
 * 
 */
// function tpl (option){
//     function tplReplace(template, replaceObject) {
//         return template.replace(regBrackets, function(node, key){
//             console.log(node, key, '匹配道德之');
//             return replaceObject[key]
//         })
//     }
//     return tplReplace(`${source}`, option)
// }