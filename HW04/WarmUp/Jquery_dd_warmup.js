$(function() { // $ is for jQuery

  $("#draggable").draggable({ // 1. select the HTML id="draggable", and uses the draggable method from js 
    revert: "invalid",  // if not dropped into right location return to orginal postion 
    cursor: "move"      // change the mouse to a move cursor when being draged, looks like cross
    //this makes the draggable container move and have a cross cursor
  });

  $("#droppable").droppable({ //2. select html id="droppable" and use the droppable method form js to drop the other container 
    accept: "#draggable", // 3.acceplt the other class container by the HTML id="draggable"
    
    drop: function(event, ui) { // 4. when item 1 is dropped inside item 2
      $(this).css({ // 5. call css to change style 
        "background-color": "pink",
        "color": "black"
      }).text("Dropped!");
    }
  });
});