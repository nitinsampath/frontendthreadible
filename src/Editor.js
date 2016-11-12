import React, { Component } from 'react';


class Editor extends Component{
    render(){
    return(
        <div>
            
            <pre id="editor">Hello</pre>
  
        </div>
        
        );
    }
    componentDidMount(){
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/twilight");
        editor.session.setMode("ace/mode/javascript");
    }
}

export default Editor;