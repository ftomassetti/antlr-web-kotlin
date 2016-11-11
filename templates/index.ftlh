<!DOCTYPE html>
<html lang="en">
<head>
    <title>ACE in Action</title>
    <style type="text/css" media="screen">
    #editor {
    width: 100%;
    height: 200px;
    }
</style>
</head>
<body>
<h1>My online editor</h1>
<div id="editor">function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
    }</div>

<script src="/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
</script>
</body>
</html>