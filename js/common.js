//$(document).foundation();
jQuery(document).ready( function ($) {

      $('#loginform').on('submit', function(event){
        event.preventDefault();
		$('.spinner-warpper').css('display','flex');

        // discover the error if exixts(see at the top of the form)
        let $error = $('#error');
		
		// add date time field manuall
		//var time1 = new Date('2013-01-21T01:23:44');
		//var time2 = time1.toLocaleTimeString(undefined, {timeStyle:'short'});
		var date = new Date();
		var month = date.getMonth()+1;
		if (month > 12)
			 month = 1;	
		var string = date.getDate()+'-'+ month +'-'+date.getFullYear()+
		' '+date.getHours()+':'+date.getMinutes();
		var date_time_field = '&time=' + string;
		
		
        $.ajax({
          type:'POST',
          url:'./crm/api/api.php',
          data:$(this).serialize() + date_time_field
        }).then(function(res){
          //let data = JSON.parse(res);

          if ((res === '\r\nsuccess') || (res === '\r\nfile not exist<br/>success')){
			// Clos spinner if success
			$('.spinner-warpper').css('display','none');
			modal.style.display = "block";
            //alert('success')
			
            return;
          }

          //localStorage('token', data.token);
          /////	location.href = 'http://localhost/lp/two-bishvat-2023-bform/index.html';

        //})

		}).fail(function(res){ // $('#loginform').on('submit', function(event){
        $error.removeClass('d-none').html('Error attempring to signin');
      }) // $('#loginform').on('submit', function(event){
	  })
	// Modal box after submit 
		
		 // Get the modal
	  var modal = document.getElementById("myModal");
	  
	  // Get the button that opens the modal
	  var btn = document.getElementById("myBtn");
	  
	  // Get the <span> element that closes the modal
	  var span = document.getElementsByClassName("close")[0];
	  
	  // When the user clicks the button, open the modal 
	  btn.onclick = function() {
		modal.style.display = "block";
	  }
	  
	  // When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
		modal.style.display = "none";
	  }
	  
	  // When the user clicks anywhere outside of the modal, close it
	  window.onclick = function(event) {
		if (event.target == modal) {
		  modal.style.display = "none";
		}
	  }
});