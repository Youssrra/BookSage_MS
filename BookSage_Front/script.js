import * as $ from 'jquery';
import 'bootstrap';
import 'smartwizard';
$(document).ready(function () {
    // Initialize the form wizard
    var options = {
        theme: 'default',
        transitionEffect: 'fade',
        toolbarSettings: {
            toolbarPosition: 'bottom' // Specify the toolbar position if needed
        },
        useURLhash: false // Disable the URL hash
        // You can add more options here based on your requirements
    };
    // @ts-ignore
    $('#wizard').smartWizard(options);
});



$(document).getElementById("filterAdmin").addEventListener("input", function() {
  var filterValue = this.value.toLowerCase();
  var selectAdmin = document.getElementById("selectAdmin");
  var options = selectAdmin.getElementsByTagName("option");

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var optionText = option.text.toLowerCase();
    if (optionText.includes(filterValue)) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
});
