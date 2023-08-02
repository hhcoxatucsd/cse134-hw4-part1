/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        printNodes();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advAddBtn');
    element.addEventListener('click', function () {
        advAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('queryRemoveBtn');
    element.addEventListener('click', function () {
        queryRemove();
    });
}

function walk() {
   let el;

   document.getElementById('walkOutput').textContent = '';

   el = document.getElementById('p1');
   printNode(el);

   el = el.firstChild;
   printNode(el);

   el = el.nextSibling;
   printNode(el);

   el = el.lastChild;
   printNode(el);

   el = el.parentNode.parentNode.parentNode;
   printNode(el);

   el = el.querySelector('section > *');
   printNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function printNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    let printOutput = document.getElementById('walkOutput');

    printOutput.textContent += (`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`);
}

function printNodes() {
    let printOutput = document.getElementById('walkOutput');
    let tree = Array.from(document.childNodes);
    tree.shift(); //Get rid of <!DOCTYPE> node
    let depth = [];
    tree.forEach(node => depth.push(''));

    printOutput.textContent = '';

    while (tree.length != 0) {
        let nodeType = tree[0].nodeType;
        let nodeName = tree[0].nodeName;
        let nodeValue = tree[0].nodeValue;

        if (nodeName != '#text' && nodeName != '#comment') {
            printOutput.textContent += (`${depth[0]}${nodeName}\n`)
        }

        Array.from(tree.shift().childNodes).reverse().forEach(node => {
            tree.unshift(node);
            depth.splice(1,0,depth[0] + '    ');
        });
        depth.shift();
    }
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    let el = document.querySelector('h1');
    el.textContent = 'DOM Manipulation is Fun!';
    el.style.color = 'var(--darkcolor' + (Math.floor(Math.random() * 6) + 1) + ')';
    document.querySelectorAll('p').forEach(node => {
        if (node.className == 'shmancy') {
            node.className = '';
        }
        else {
            node.className = 'shmancy';
        }
    });
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advAdd() {
    let selected = document.getElementById('addSelect').selectedOptions[0].textContent;
    let options = document.getElementById('addInput').value;
    let output = document.getElementById('addOutput');

    if (selected == '--Please choose an element--') {
        return;
    }

    if (options == '') {
        options = 'New ' + selected;
    }

    if (selected != 'Element') {
        options += (' ' + Date().toLocaleString())
    }

    if (selected == 'Text Node') {
        output.appendChild(document.createTextNode(options));
    }
    else if (selected == 'Comment') {
        output.appendChild(document.createComment(options));
    }
    else if (selected == 'Element') {
        let newElement = document.createElement(options.replaceAll(' ','-'));
        newElement.appendChild(document.createTextNode('New Element ' + Date().toLocaleString()));
        output.appendChild(newElement);
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
    let toDelete = document.body.children[document.body.children.length -1]
    if (toDelete.id == 'controls') {
        toDelete = document.body.children[document.body.children.length -2]
    }
    document.body.removeChild(toDelete);
}

function queryRemove() {
    document.querySelectorAll(document.getElementById('queryRemoveInput').value).forEach(element => element.remove())

}
document.querySelectorAll('p')

window.addEventListener('DOMContentLoaded', init);
