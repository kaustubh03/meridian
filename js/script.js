window.onload = function () {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var convertTextAreaToMarkdown = function () {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();

    // Calculate Characters
    calculateCharacters();

    // Calculate Words 
    calculateWords();

    setTimeout(function(){
        document.getElementById("_meridian_loader_wrapper").style.display =
          "none";
        document.getElementById("_meridian_container").style.display = "block";
        document.getElementById("_meridian_container").scrollIntoView({ behavior: "smooth"});

    }, 4500);
};

function calculateStats() {
    // Calculate Characters
    calculateCharacters();

    // Calculate Words 
    calculateWords();
}


function calculateCharacters() {
    let elem = document.getElementById('markdown');
    let textLength = elem.textContent.length;
    document.getElementById('characters').innerHTML = textLength;
}

function calculateWords(){
    var words = get_text(document.getElementById('markdown'));
    var count = words.split(' ').length;
    document.getElementById('words').innerHTML = count;
}

function get_text(el) {
    ret = "";
    var length = el.childNodes.length;
    for (var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if (node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
        }
    }
    return ret;
}


function download(filename, text, mimeType) {
    var element = document.createElement('a');
    element.setAttribute('href', mimeType + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}   