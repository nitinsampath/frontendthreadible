var input;

function addCell() {
    var new_cell = document.createElement('div');
    new_cell.className += " size";
    var new_cell_editor = ace.edit(new_cell);
    new_cell_editor.setTheme("ace/theme/twilight");
    new_cell_editor.setValue(input.getValue());
    $("#chat").append(new_cell);
}


$(document).ready(function() {
            input = ace.edit("input");
            input.setTheme("ace/theme/twilight");
            input.getSession().setMode("ace/mode/python");
    $("button").click(addCell);
});

