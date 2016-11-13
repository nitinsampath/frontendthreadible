var EXAMPLE_USER = {
    userid: 12345,
    username: "kimkardashian"
};
var HOME_SERVER = "https://threadible-frontend-akc.c9users.io";

var user = EXAMPLE_USER;
var input;
var cells = [];
var socket = null;



/*
CELL OBJECT TYPE SPECIFICATION:
cell.id == the unique id of the cell.
cell.userid == the authoring user's unique user id
cell.code == (string) the code snippet inside the cell
cell.output == (OUTPUT OBJECT) the output associated with the cell
*/
/*
OUTPUT OBJECT TYPE SPECIFICATION:
output.type == (string) "terminal" for terminal/text output, "image" for graphical output
output.data == (string) text output iff (output.type == "terminal") else image URL string
*/

/*
addCell - Adds the specified cell to the DOM.
@param cell - input Cell object to add
*/
function addCell(cell) {
    cells.push(cell);
    //create the HTMLelement for the new cell
    var new_cell = document.createElement('div');
    new_cell.className += " size";
    new_cell.id = "cell" + cell.id;
    
    //create the editor window for the cell's code snippet
    var new_cell_editor = ace.edit(new_cell);
    var color_switcher = 0;
    var color_options = ["ace/theme/solarized_light","ace/theme/twilight", "ace/theme/monokai"];
    new_cell_editor.setTheme(color_options[0]);
    color_switcher= color_switcher + 1;
    new_cell_editor.setValue(cell.code);
    
    //append cell output to the cell.
    var output = document.createElement('div');
    output.className = "out";
    output.id = "out" + cell.id;
    if (cell.output.type == "terminal") {
        output.innerHTML = (cell.output.data);
    }
    else {
        var imgOut = new Image(200, 200);
        imgOut.src = cell.output.data;
        $(output).append($(imgOut));
    }
    var run_again = document.createElement('div');
    run_again.className += "run";
    run_again.innerHTML += "Run code again";
     $(run_again).click(function(){
       socket.emit("eval_cell_input",cell);
       console.log("button being pressed");
    });
    new_cell_editor.on("focus", function(){
        console.log("got clicked");
        
        socket.emit("cell_highlight", {user: user, cell_id: cell.id});
    
    });
    $("#chat").append(new_cell);
    $("#chat").append(run_again);
    $("#chat").append(output);
    
  
    
}


$(document).ready(function() {
    socket = io.connect(HOME_SERVER);
    socket.on("eval_cell_output", function(cell) {
        /*
        If the evaluated cell matches any of the existing cells, update the output accordingly.
        */
        var updatedCell = false;
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].id == cell.id) {
                cells[i].output = cell.output;
                updatedCell = true;
                //now change output shown in HTML
                var cellOutputEl = $("#out" + cell.id);
                if (cell.output.type == "terminal") {
                    cellOutputEl.html(cell.output.data);
                }
                else {
                    var imgOut = new Image(200, 200);
                    imgOut.src = cell.output.data;
                    cellOutputEl.append($(imgOut));
                }
            }
        }
        if (!updatedCell) {
            addCell(cell);
        }
    });
    socket.on("cell_highlight", function(msg) {
        
       //make the theme change for the cell corresponding to msg.cell_id,
       //and add a little avatar for msg.user indicating that user is editing the highlighted cell (TODO)
        console.log("Received cell_highlight");
        /*
        new_cell_editor.setTheme(color_options[1])
        for (x in cells){
            if (x.id == msg.cell_id){
                $("#cell"+msg.cell_id).css("background-color","red");
                //$(".ace-solarized-light").css("color","red");
            }
        }
        */
    });
    
    input = ace.edit("input");
    input.setTheme("ace/theme/twilight");
    input.getSession().setMode("ace/mode/python");
    $("button").click(function() {
        var newCell = {
            id: -1, //PLACEHOLDER. should post API endpoint to get id instead.
            userid: user.userid,
            code: input.getValue(),
            output: null
        };
        socket.emit("eval_cell_input", newCell);
        console.log("Cell sent to server");
    });
   
});

