

function cardPressed() {
    this.classList.add('card-hover');
}

function cardReleased() {
    this.classList.remove('card-hover');
}

function hamburgerMenuPressed() {
    if (this.parentNode.classList.contains('hamburger-menu-open')) {
        document.body.classList.remove('no-scroll');
        this.parentNode.classList.remove('hamburger-menu-open')
        this.setAttribute('aria-expanded', "false");
        document.body.style.paddingRight = 0 + "px";
    } else {
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px";
        document.body.classList.add('no-scroll');
        this.parentNode.classList.add('hamburger-menu-open')
        this.setAttribute('aria-expanded', "true");
    }
    
}

$(document).ready(function () {
 function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

var uid = uuidv4();
//alert(uid);
  $('#contact-submit-live').click(function(e){
    //alert('ddd');
      var first_name = $('#firstname').val();
      var email = $('#emailaddress').val();
      var message = $('#message').val();
      var o = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (first_name == '') {
          $('#name').css('display', 'block');
              return  false;
         }
         else {
          $('#name').css('display', 'none');
         }
         if (email == '' || email.search(o) == -1 ) {
            $('#email').css('display', 'block');
            return  false;
         }
         else {
            $('#email').css('display', 'none');
          }
          var form = new FormData();
          form.append("grant_type", "client_credentials");
          form.append("client_id", "7d1592bb-1b37-2350-dc30-5d838165ce67");
          form.append("client_secret", "Rnh6A$JinJFM");
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://crm.netspective.com/Api/access_token",
            "method": "POST",
            "headers": {
              "Accept": "application/vnd.api+json"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
          }

      $.ajax(settings).done(function (response) {
      var obj = $.parseJSON(response);
      var access_token= obj.access_token;
      var settings = {
          "url": "https://crm.netspective.com/Api/V8/module",
          "method": "POST",
          "headers": {
            "Accept": "application/vnd.api+json",
            "Authorization": "Bearer "+access_token+"",
            "Content-Type": "application/json"
           },
          "processData": false,
          "data": "{\r\n  \"data\": {\r\n    \"type\": \"Contacts\",\r\n    \"id\": \""+uid+ "\",\r\n    \"attributes\": {\r\n     \"first_name\":\""+first_name+"\",\r\n     \"email1\":\""+email+"\"\r\n,\r\n     \"description\":\""+message+"\"\r\n,\r\n     \"lead_source\":\"Web Site\"\r\n}\r\n  }\r\n}\r\n"
        }

      $.ajax(settings).done(function (response) {
      //console.log(response);
          var contactid = response.data.id;
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://crm.netspective.com/Api/V8/module/Accounts/4dbc839d-3e9e-78f2-b11c-5d837d6905f0/relationships",
            "method": "POST",
            "headers": {
              "Accept": "application/vnd.api+json",
              "Authorization": "Bearer "+access_token+"",
              "Content-Type": "application/json"
            },
            "processData": false,
            "data": "{  \r\n   \"data\":{  \r\n         \"type\":\"Contacts\",\r\n         \"id\":\""+contactid+"\"\r\n\t    \r\n      }\r\n}"
          }

    $.ajax(settings).done(function (response) {
         if(response.meta.message != ""){
            var url="https://formspree.io/support@netspective.media"; 
            $('#quickcontact').attr('action', url);
            $('#quickcontact').submit();
          }
          });
      });  
    });      
   
        });

});
