

function tplReplace(template, relpaceObject) {
    return template.replace(/\{\{(.+?)\}\}/g, function(node, key){
        console.log(node, key, '匹配到得知');
        return relpaceObject[key]
    })
}

module.exports = {
    tplReplace
}