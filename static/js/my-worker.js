importScripts("worker-base.js");
ace.define('ace/worker/my-worker',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var MyWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$dialect = null;
    };

    oop.inherits(MyWorker, Mirror);

    (function() {

        this.onUpdate = function() {
            var value = this.doc.getValue();
            var annotations = validate(value);
            this.sender.emit("annotate", annotations);
        };

    }).call(MyWorker.prototype);

    exports.MyWorker = MyWorker;
});

// load antlr4 and myLanguage
var antlr4;
var myLexer, MyParser;
try {
	console.log("LOADING");
	// load nodejs compatible require
	var ace_require = require;
	require = undefined;
	var Honey = { 'requirePath': ['.', '..', 'js'] }; // walk up to js folder, see Honey docs
	importScripts("/js/lib/require.js");
	console.log('imported scripts')
	var antlr4_require = require;
	require = antlr4_require;
    antlr4 = require('antlr4/index');
    MyLexer = require('generated-parser/todoLexer');
    MyParser = require('generated-parser/todoParser');
} finally {
    require = ace_require;
}
console.log("LOADED antlr4 "+antlr4);
console.log("LOADED MyLexer "+MyLexer);
console.log("LOADED MyParser "+MyParser);

// class for gathering errors and posting them to ACE editor
var AnnotatingErrorListener = function(annotations) {
    antlr4.error.ErrorListener.call(this);
    this.annotations = annotations;
    return this;
};

AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.annotations.push({
        row: line - 1,
        column: column,
        text: msg,
        type: "error"
 });
};

var validate = function(input) {
    console.log("ANTLR4 "+antlr4);
	var stream = new antlr4.InputStream(input);
    var lexer = new MyLexer.todoLexer(stream);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new MyParser.todoParser(tokens);
    var annotations = [];
    var listener = new AnnotatingErrorListener(annotations)
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    parser.elements();
    return annotations;
    //return [ { row: 0, column: 0, text: "MyMode says Hello!", type: "error" } ];
};