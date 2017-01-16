export class ClassHelper {

    constructor(element) {
        this.element = element;
    }

    item(ix) {
        return this.element.className.trim().split(/\s+/)[ix];
    }
    containsClass(name) {
        var classes = this.element.className.trim().split(/\s+/);
        return classes.indexOf(name) !== -1;
    }
    addClass(name) {
        var classes = this.element.className.trim().split(/\s+/);
        if (classes.indexOf(name) === -1) {
            classes.push(name);
            this.element.className = classes.join(' ');
        }
    }
    swapClass(currClass, newClass) {
        let obj = new ClassHelper(this.element);
        if (obj.contains(currClass)) {
            obj.remove(currClass);
        }
        obj.add(newClass);
        obj = null;
    }
    removeClass(name) {
        var classes = this.element.className.trim().split(/\s+/);
        var ix = classes.indexOf(name);
        if (ix !== -1) {
            classes.splice(ix, 1);
            this.element.className = classes.join(' ');
        }
    }
    toggleClass(name) {
        var classes = this.element.className.trim().split(/\s+/);
        var ix = classes.indexOf(name);
        if (ix !== -1)
            classes.splice(ix, 1);
        else
            classes.push(name);
        this.element.className = classes.join(' ');
    }
}


export class WindowHelper {
    constructor() {
        this.keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
        this.body = document.getElementsByTagName("body");
        this.windowDimensions = {
            Width: window.innerWidth,
            Height: window.innerHeight
        };
    }

    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }

    disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;
    }

    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }


    ScrollValue = () => window.scrollY;

    GetWindowsDim() {
        let _self = this;
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}


module.exports = {
    windowHelper: WindowHelper,
    classHelper: ClassHelper
}