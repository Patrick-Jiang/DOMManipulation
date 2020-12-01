window.dom = {
    // equal to dom.create= function(){}
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.toString().trim()
        return container.content.firstChild
    },
    after(newNode, referenceNode) {
        // console.log(referenceNode.nextSibling)
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    before(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode)
    },
    append(newNode, referenceNode) {
        referenceNode.appendChild(newNode)
    },
    wrap(newNode, referenceNode) {
        dom.before(newNode, referenceNode)
        dom.append(referenceNode, newNode)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const {childNodes} = node

        const array = []
        let nodeFirstChild = node.firstChild
        while (nodeFirstChild) {
            array.push(dom.remove(nodeFirstChild))
            nodeFirstChild = node.firstChild
        }
        return array
    },
    attr(node, name, string) {
        if (arguments.length === 3) {
            node.setAttribute(name, string.toString())
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, newText) {
        if (arguments.length === 2) {
            node.textContent = newText.toString()
        } else if (arguments.length === 1) {
            return node.textContent
        }
    },
    html(node, newText) {
        if (arguments.length === 2) {
            node.innerHTML = newText.toString()
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                console.log('inside ' + name)
                return node.style[name]
            } else if (name instanceof Object) {
                const obj = name
                for (let key in obj) {
                    node.style[key] = obj[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        }, remove(node, className) {
            node.classList.remove(className)
        }, has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    sibling(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let nextNode = node.nextSibling
        while (nextNode && nextNode.nodeType === 3) {
            nextNode = nextNode.nextSibling
        }
        return nextNode
    }, previous(node) {
        let previousNode = node.previousSibling
        while (previousNode && previousNode.nodeType === 3) {
            previousNode = previousNode.previousSibling
        }
        return previousNode
    }, each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn(nodeList[i])
        }
    },
    index(node){
        const nodeLists = this.children(node.parentNode)
        for (var i = 0; i < nodeLists.length; i++) {
            if (node === nodeLists[i]){
                break
            }
        }
        return i
    }
}

