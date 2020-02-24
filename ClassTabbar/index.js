/*
 * @Author: your name
 * @Date: 2020-02-23 12:10:56
 * @LastEditTime: 2020-02-24 12:05:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ClassTabbar\index.js
 */
let self;

class Tab {
    constructor(id) {
        self = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector(".add")
        this.ul = this.main.querySelector("ul")
        this.sectionParent = this.main.querySelector(".sections")
        this.init()
    }

    init() {
        this.spans = this.main.querySelectorAll("ul li span:first-child")
        this.lis = this.main.querySelectorAll("li")
        this.sections = this.main.querySelectorAll("section")
        this.add.onclick = self.addTab
        this.lis.forEach((li, index) => {
            li.index = index
            // 点击才执行 不加(), 防止直接执行函数
            li.onclick = this.toggleTab
            const removeNode = li.querySelector(".remove")
            // 双击事件
            this.spans[index].ondblclick = self.editTab
            this.sections[index].ondblclick = self.editTab
            removeNode.onclick = self.removeTab

        })


    }

    // 切换tab
    /*
    1.点击li => 修改li active => section sec-active
    2.
    */
    toggleTab() {
        self.removeClass()
        this.className = "active"
        // 获取对应下标
        self.sections[this.index].className = "sec-active"

    }
    removeClass() {
        self.lis.forEach((li, index) => {
            li.className = ""
            self.sections[index].className = ""
        })
    }

    //  添加tab
    addTab() {
        self.removeClass()
        let random = Math.random()
        const li = '<li class="active"><span>标题1</span><span class="remove">x</span></li>'
        const section = `<section class="sec-active">测试${random}</section>`
        self.ul.insertAdjacentHTML("beforeend", li)
        self.sectionParent.insertAdjacentHTML("beforeend", section)
        self.init()
    }
    // 删除tab
    removeTab(e) {
        let index = this.parentNode.index
        e.stopPropagation();
        self.ul.removeChild(self.lis[index])
        self.sectionParent.removeChild(self.sections[index])

        self.init()
        index--

        // 当我们删除的不是选中状态的li 的时候, 原来的选中状态li保持不变
        if (this.parentNode.className != "active") {
            return
        }
        // 当我们删除的是选中状态的li的时候, 让他的前一个li处于选定状态
        console.log("删除tab", this.parentNode.index);
        // 有这个节点则自点击
        self.lis[index] && self.lis[index].click()

    }
    // 修改tab
    editTab(e) {
        let spanText = this.innerText
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.innerHTML ='<input type="text">'
        let input = this.firstChild
        input.value = spanText
       
        //让其处于选中状态 
        input.select()

        // 离开文本框, 文本框值赋值给span
        // 失去焦点事件
        input.onblur = function(){
            this.parentNode.innerHTML = this.value
        }

        input.onkeyup = function(e){
            if(e.keyCode===13){
                this.blur()
            }
        }
    }


}

new Tab(".container")