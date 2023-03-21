/**
 * Helpers taken from https://github.com/markedjs/marked/blob/master/lib/marked.cjs to modify the code tag behaviour
 * Built-in extension mechanism only supports override -> copying code was needed
 */
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
const getEscapeReplacement = function getEscapeReplacement(ch) {
    return escapeReplacements[ch];
};
function escape(html, encode) {
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement);
        }
    } else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}

function getBlogLanguageCode(lang) {
    /*
    * SAP Blogs code block supported languages
    *
    * language-abap
    * language-javascript
    * language-markup
    * language-css
    * language-php
    * language-ruby
    * language-python
    * language-java
    * language-c
    * language-csharp
    * language-cpp
    * language-perl
    * language-swift
    * language-sql
    */
    switch ((lang + '').toLowerCase()) {
        case 'abap':
            return 'language-abap';
        case 'javascript':
        case 'js':
        case 'coffeescript':
        case 'ecmascript':
        case 'node':
        case 'json':
        case 'ts':
        case 'typescript':
            return 'language-javascript';
        case 'html':
        case 'xhtml':
        case 'xml':
            return 'language-markup';
        case 'css':
        case 'less':
        case 'sass':
        case 'scss':
        case 'styl':
        case 'stylus':
            return 'language-css';
        case 'php':
            return 'language-php';
        case 'ruby':
        case 'jruby':
        case 'macruby':
        case 'rake':
        case 'rb':
        case 'rbx':
            return 'language-ruby';
        case 'python':
        case 'py':
            return 'language-python';
        case 'java':
            return 'language-java';
        case 'c':
            return 'language-c';
        case 'csharp':
        case 'cs':
            return 'language-csharp';
        case 'cpp':
        case 'c++':
        case 'cplusplus':
            return 'language-cpp';
        case 'perl':
        case 'pl':
            return 'language-perl';
        case 'cql':
        case 'mssql':
        case 'mysql':
        case 'plsql':
        case 'postgres':
        case 'postgresql':
        case 'pgsql':
        case 'sql':
        case 'sqlite':
            return 'language-sql';
        case 'swift':
        default: // had to use one of them as default as blogs page doesn't allow 'none'
            return 'language-swift';
    }
}

const renderer = {
    image(href, title, text) {
        return `\n<em style="color: red">put image "${text}" here</em>\n`;
    },
    code(_code, infostring, escaped) {
        const lang = (infostring || '').match(/\S*/)[0];
        const langString = getBlogLanguageCode(lang);
        _code = _code.replace(/\n$/, '') + '\n';
        if (!lang) {
            return '<pre class="language-swift"><code>' + (escaped ? _code : escape(_code, true)) + '</code></pre>\n';
        }
        return `<pre class="${langString}"><code>` + (escaped ? _code : escape(_code, true)) + '</code></pre>\n';
    }
};

export { renderer };