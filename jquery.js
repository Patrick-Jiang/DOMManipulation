
window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === "string") {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    const api = Object.create(jQuery.prototype)
    api.oldApi=  selectorOrArray.oldApi
    api.elements = elements
    return api
}

jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    end() {
        return this.oldApi
    },
    print() {
        console.log(this.elements)
    },
    find(selector) {
        let arr = []
        for (let i = 0; i < elements.length; i++) {
            arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)))
        }
        arr.oldApi = this
        return jQuery(arr)
    },
    parent() {
        const arr = []
        this.each(node => {
            if (arr.indexOf(node.parentNode) === -1) {
                arr.push(node.parentNode)
            }
        })
        return jQuery(arr)
    },
    children() {
        const arr = []
        this.each(node => {

            arr.push(...node.children)
        })
        return jQuery(arr)
    },
    siblings(){
        const arr = []
        this.parent().children().each(node => {
            if(node !== this.elements[0]){
                arr.push(node)
            }
        })
        return jQuery(arr)
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },
    get(index){
        return this.elements[index]
    }
}