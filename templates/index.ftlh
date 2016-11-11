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
<div id="editor"></div>

<script src="/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/my-mode.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    //editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setMode("ace/mode/my-mode");
</script>
</body>
</html>