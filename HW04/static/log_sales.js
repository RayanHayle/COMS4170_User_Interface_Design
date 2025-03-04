$(document).ready(function() {
  // Name: Rayan Hayle UNI: Rah2236
  // Step 1: Define a hardcoded salesperson's name
//-----------------------Basics-------------------------------------------
  const salesperson = "Rayan Hayle"; // Hardcoded salesperson name
  
  // Step 2: Initialize an array to hold sales records
  let salesData = [];

  // Step 3: Define an array of client names for autocomplete
  let clients = [
      "Shake Shack",
      "Toast",
      "Computer Science Department",
      "Teacher's College",
      "Starbucks",
      "Subsconsious",
      "Flat Top",
      "Joe's Coffee",
      "Max Caffe",
      "Nussbaum & Wu",
      "Taco Bell"
  ];

  // Step 4: Define initial sales data
  let sales = [
      { "salesperson": "James D. Halpert", "client": "Shake Shack", "reams": 100 },
      { "salesperson": "Stanley Hudson", "client": "Toast", "reams": 400 },
      { "salesperson": "Michael G. Scott", "client": "Computer Science Department", "reams": 1000 }
  ];

  // Step 5: Populate salesData with initial sales data
  salesData = sales;
//-----------------------Input, Submit -------------------------------------------

  // Step 6:  autocomplete populated with the names of clients from the file
  $("#client").autocomplete({
      source: clients, // Source data for autocomplete
      select: function(event, ui) {
          // When a client is selected, set the input value to the selected client
          $(this).val(ui.item.value);
          return false; // Prevent default behavior
      },
      change: function(event, ui) {
          // If the user enters a new client not in the list
          if (!ui.item) {
              let newClient = $(this).val(); // Get the new client name
              if (newClient) {
                  clients.push(newClient); // Add new client to the clients array
              }
          }
      }
  });

  // Step 7: Function to update the displayed sales list: main goal is to have columns per entery
  function updateSalesList() {
      $('.sales-list').empty(); // Clear the sales list
      salesData.forEach((sale, index) => {
          // Create a visual representation for each sale record, referncing hmtl body 
          const saleDiv = $(`
              <div class="sale-record" draggable="true" data-index="${index}">
                  <div class="record-details">
                      <strong>Client:</strong> <span>${sale.client}</span>
                  </div>
                  <div class="record-details">
                      <strong>#Reams:</strong> <span>${sale.reams}</span>
                  </div>
                  <div class="record-details">
                      <strong>Salesperson:</strong> <span>${sale.salesperson}</span>
                  </div>
                  <button class="delete-btn btn btn-danger btn-sm" data-index="${index}">Delete</button>
              </div>
          `);
          $('.sales-list').append(saleDiv); // Append the new sale record to the sales list
      });
  }

   // Step forgot:  Enter when the Enter key is pressed
   $('#client, #reams').on('keypress', function(event) {
    if (event.which === 13) { // 13 is the Enter key
        event.preventDefault();
        $('#submit').click(); // Trigger the submit button click event
    }
  });

  // Step 8: the submit button
    $('#submit').click(function() {
      const client = $('#client').val(); // Get the client input
      const reams = $('#reams').val(); // Get the reams input
      let isValid = true; // Flag to track input validity
  

  
      // Step 9: before submitting: Validate client input: no input, no int , isNaN convert str to int
      if (!client || typeof client !== "string" || client.trim().length === 0 || !isNaN(client.trim())) {
        $('#client-warning').text("Please enter a client."); // Show warning
        isValid = false; // Mark as invalid
      } else {
        $('#client-warning').text(""); // Clear warning
      }

      // Step 10: Validate reams input
      if (!reams || isNaN(reams) || reams <= 0) {
          $('#reams-warning').text("Please enter a valid number for reams."); // Show warning
          isValid = false; // Mark as invalid
      } else {
          $('#reams-warning').text(""); // Clear warning
      }

      // Step 11: If inputs are valid, add new sale to the data
      if (isValid) {
          salesData.unshift({ client: client, reams: Number(reams), salesperson: salesperson }); // Add new sale
          updateSalesList(); // Update the sales list display

          // Step 12: Reset input fields for new entry
          $('#client').val('').focus(); // Clear client input and focus
          $('#reams').val(''); // Clear reams input
      } else {
          // Step 13: Focus on the first empty or invalid input
          if (!client) {
              $('#client').focus(); // Focus on client input
          } else if (!reams || isNaN(reams)) {
              $('#reams').focus(); // Focus on reams input
          }
      }
  });
//----------------------------Deleting: use the warmup --------------------------------------

  // Step 14: delete button in the sales list
  $('.sales-list').on('click', '.delete-btn', function() {
      const index = $(this).data('index'); // Get the index of the sale to delete
      salesData.splice(index, 1); // Remove from salesData array
      updateSalesList(); // Update the sales list display
  });

  // Step 15: making the drag event on sale records
  $('.sales-list').on('dragstart', '.sale-record', function(event) {
      event.originalEvent.dataTransfer.setData("text/plain", $(this).data('index')); // Store the index of the dragged item
  });

  // Step 16: Allow the trash area to accept drops
  $('#trash').on('dragover', function(event) {
      event.preventDefault(); // Prevent default to allow drop
      $(this).css('background-color', 'yellow'); // Change background color on hover
  });

  // Step 17: Handling what happens when an item is dropped in the trash
  $('#trash').on('drop', function(event) {
      event.preventDefault(); // Prevent default action
      $(this).css('background-color', ''); // Reset background color
      const index = event.originalEvent.dataTransfer.getData("text/plain"); // Get the index of the dropped item
      salesData.splice(index, 1); // Remove from salesData array
      updateSalesList(); // Update the sales list display
  });

  // Step 18: Reset the trash area background when dragging leaves
  $('#trash').on('dragleave', function(event) {
      $(this).css('background-color', ''); // Reset background color
  });+

  // Step 19: Initialize the sales list on page load
  updateSalesList();
});