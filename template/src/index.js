import tpl from './info.tpl'


const app = document.querySelector('#app')



const info = {
    name: '测试',
    apply: '模板解析',
    funct: '解析以tpl结尾的模板'
}
console.log(info)
app.innerHTML = tpl(info)