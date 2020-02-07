const navMenuItems = document.querySelectorAll("#nav-menu a")
const indicator = document.querySelector(".indicator")


function handleMenuItemClick(target) {
    // 激活样式置空
    navMenuItems.forEach(item =>{
        item.classList.remove('active')
        item.style = ''
    });

    // 点击元素添加样式类
    target.classList.add('active')
    // offsetWidth 水平方向 width + 左右padding + 左右border-width
    indicator.style.width = `${target.offsetWidth}px`
    // offsetLeft 获取当前元素到 定位父节点 的left方向的距离
    indicator.style.left = `${target.offsetLeft}px`

    const currentSection = document.querySelector(".active-section")
    currentSection.classList.remove("active-section");
    const newCurrentSection = document.querySelector(`.${target.getAttribute("data-rel")}`)
    newCurrentSection.classList.add('active-section')

}

navMenuItems.forEach(item => {
    item.addEventListener("click", e=> handleMenuItemClick(e.target))

    // 解决下划线默认样式无的问题
    item.classList.contains("active") && handleMenuItemClick(item)
})