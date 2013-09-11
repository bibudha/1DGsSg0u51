<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>MobileApp</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MyRestro">
<meta name="apple-itunes-app" content="app-id=">

<link rel="apple-touch-icon" href="uploads/icons/152026.png">
<link rel="apple-touch-startup-image" href="uploads/splash_shots/152026.png">

<link rel="stylesheet" type="text/css" href="css/jquery.mobile-1.3.1_mobilePrev.css">
<link href="css/jquery.bxslider.css" rel="stylesheet" />

<style type="text/css">
</style>

<script src="js/jquery-1.9.1.js" type="text/javascript"></script>
<script type="text/javascript">
		$(document).bind("mobileinit", function() {
		  $.mobile.defaultPageTransition = "slide";
		})

</script>
<script src="js/jquery.nicescroll.min.js"></script>
<script src="js/jquery.bxslider.js"></script>
<script type="text/javascript" src="js/jquery.mobile-1.3.1.js"></script>
<script src="cordova.js"></script>
<script src="cdv-plugin-fb-connect.js"></script>
<script src="facebook-js-sdk.js"></script>
<script src="js/script.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function(){
	//alert('document ready');
	    $("html").niceScroll();
		
		$('.bxslider').bxSlider({
			auto:true,
			pager: false,
			controls:true
		});
		getfanwall2data();
	
          
	});
</script>

</head>
<body>
<div data-role="page" data-theme="a" style="background:#066;">
<div data-role="header" style="background:url(images/02.jpg) no-repeat; background-size: 100% 100%;">
<div class="Headercoloroverlay"></div>
	<a href="javascript:" data-rel="back" data-icon="back">Back</a>
        <h1></h1>
  	<fieldset data-role="controlgroup" data-type="horizontal"  data-mini="true" class="ui-btn-right">
            <input type="radio" name="loc" id="Recent" value="Recent" checked="checked">
            <label for="Recent">Recent</label>
            <input type="radio" name="loc" id="NearBy" value="NearBy">
            <label for="NearBy">Near By</label>
    	</fieldset>
</div>
	<div data-role="content" style="color:#fff; min-height:410px; padding:0">
    <script type="text/javascript">
		$(document).ready(function(){
			//$ tab
			
			$(".tab-content").hide(); //Hide all content
			$("ul.tabs li:first").find('a').addClass("active").show(); //Activate first tab
			 $("ul.tabs li:first a").addClass("ui-btn-active") //Activate first tab
			$(".tab-content:first").show(); //Show first tab content
			//On Click Event
			$("ul.tabs li").click(function() {
				$("ul.tabs li").find('a').removeClass("ui-btn-active"); //Remove any "active" class
				$(this).find('a').addClass("ui-btn-active"); //Add "active" class to selected tab
				$(".tab-content").hide(); //Hide all tab content
				var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
				$(activeTab).fadeIn(200); //Fade in the active content
				return false;
			});
		if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
            
            FB.Event.subscribe('auth.login', function(response) {
                              // alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                              // alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                              // alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                              // alert('auth.statusChange event');
                               });
							   
							   $('#facebook_login').click(function(){
							   alert('click');
							   if($('#user_id').val()!=0)
							   {
							   var fb_id=$('#user_id').val();
							   var fb_user_name= $("#fb_user_name").val();
							   var userSiteId= $("#userSIteId").val();
							   var featureRelId= $("#featRelId").val();
							   var featureId= $("#featureId").val();
								
								var fb_profile_pic = $("#fb_profile_pic").val();
					 fb_profile_pic = fb_profile_pic.replace(new RegExp("/", "g"), '^');
					           //fb_profile_pic = encodeURIComponent(orignal);
							   	alert('should go on comment page');
                             
							   alert(userSiteId);
							   alert(featureRelId);
							   alert(fb_id);
							   alert(fb_user_name);
							   alert(fb_profile_pic);
							   
                              window.location.href="post_comments.html?siteId="+userSiteId+"&featurerelId="+featureRelId+"&user_id="+fb_id+"&fb_user_name="+fb_user_name+"&fb_profile_pic="+fb_profile_pic+"&featureId="+featureId; 
							  
							   }
							   else
							   {
							   alert('else part');
								login();
								
							   }
							   });
							   
			function login() {
			alert('login');
                FB.login(
                         function(response) {
						 alert('got success');
                         if (response.status == 'connected') {
                         	
                         alert('logged in');
						 myPics();
                         } else {
                         alert('not logged in');
                         }
                         },
                         { scope: "email" }
                         );
            }
			function myPics(){
				alert('inside my pics');
			 FB.api('/me', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       alert(JSON.stringify(response.error));
                       } else {
                       
                       
                        //var user_id=JSON.stringify(response.id);
                        var user_id=response.id;
						$('#user_id').val(user_id);
                       	alert('user_id='+user_id);
                       //	var fb_user_name= JSON.stringify(response.name);
                       	var fb_user_name= response.name;
						$("#fb_user_name").val(fb_user_name);
                       	var fb_pic = response.picture;
                       //	alert(fb_pic.data.url);
					   var userSiteId= $("#userSIteId").val();
							   var featureRelId= $("#featRelId").val();
							   var featureId= $("#featureId").val();
					    var fb_id=$('#user_id').val();
                       	var fb_profile_pic = fb_pic.data.url;
						$("#fb_profile_pic").val(fb_profile_pic);
				fb_profile_pic = fb_profile_pic.replace(new RegExp("/", "g"), '^');
					           
							   alert('pic after changing'+fb_profile_pic);
						alert('going to poist comment page');
				window.location.href="post_comments.html?siteId="+userSiteId+"&featurerelId="+featureRelId+"&user_id="+fb_id+"&fb_user_name="+fb_user_name+"&fb_profile_pic="+fb_profile_pic+"&featureId="+featureId; 
					  
                  
                	 }
				
                       });
			}
		});
		 document.addEventListener('deviceready', function() {
								alert('device ready');
                                      try {
                                      alert('Device is ready! Make sure you set your app_id below this alert.');
                                      FB.init({ appId: "687342247948239", nativeInterface: CDV.FB, useCachedDialogs: false });
                                      document.getElementById('data').innerHTML = "";
                                      } catch (e) {
                                      alert(e);
                                      }
                                      }, false);
	</script>
      <div class="tabcontainer" >
      <input type="hidden" name="user_id" id="user_id" value="0"/>
      <input type="hidden" name="userSIteId" id="userSIteId" value=""/>
      <input type="hidden" name="featRelId" id="featRelId" value=""/>
      <input type="hidden" name="fb_profile_pic" id="fb_profile_pic" value=""/>
      <input type="hidden" name="fb_user_name" id="fb_user_name" value=""/>
      <input type="hidden" name="featureId" id="featureId" value=""/>
    <div data-role="navbar">
          <ul class="tabs" >
             <li > <a href="#tab1">Comments</a> </li>
              <li > <a href="#tab2">Location </a></li>
              <li > <a href="#tab3">Gallery</a></li>
          </ul>
    </div>
          <div class="tab-body">
              
              <div class="tab-content  ui-content ui-body-c" id="tab1">
              
              <span data-role="button"  data-mini="true">Load More</span>
              </div>
              
              <div class="tab-content  clearfix ui-content ui-body-c" id="tab2">


              </div>
              <div class="tab-content ui-content ui-body-c" id="tab3">
			  <div class="clearfix">
                	Share Photo<span class="ui-corner-all bottom-margin-xxl pull-right" data-mini="true" data-theme="a" data-role="button">Add a Photo</span>
                </div>
 				<ul data-role="listview" data-inset="false">

    				<li class=""><a href="event2-inner_gallery.html" rel="external"><h3>2 photos added</h3></a></li>
              </ul>

              </div>
          </div>
      </div>
    
    </div><!-- /content -->

<div data-role="footer" class="clearfix" data-position="fixed">
	<a href="#share" data-position-to="window" data-transition="slideup" data-rel="popup" class="pull-right padding-x"  data-role="none" >
    	<img src="images/comments.png" alt="" />
	</a>
</div>

	<div data-role="popup" id="share" data-overlay-theme="a" data-dismissible="false" data-theme="c" class="ui-corner-all" style="width:320px;">
       		<div data-role="header" data-theme="b" class="ui-corner-top ">
		        <h5 class="nowrap">Choose Login Account</h5>
        	</div>
            <ul data-role="content" data-theme="d" class="ui-corner-bottom ui-content" >
                    <li id="facebook_login"><a href="" data-role="button" data-theme="b">Facebook</a></li>
                   <li><a href="" data-role="button" data-theme="b">Twitter</a></li>
                    <li><a href="" data-role="button" data-theme="a" data-rel="back">Cancel</a></li>
                    
            </ul>
        </div>

</div><!-- /page -->

</body>
</html>
