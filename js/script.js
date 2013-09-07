var Host = document.domain;
var baseUrl = 'http://198.50.99.226/~admin/';
var menuLength;
var MenuLimit = 4;		// global set accrding to theme
var isMoreActive;	// global set according by user
var html;          // global set fot get data once call many times
var RssJsonTemp = [];
var argument1, argument2, argument3, argument4;
$(document).ready(function () {
    $(document).ajaxStart(function () { $.mobile.showPageLoadingMsg("a", "Loading..."); }).ajaxStop(function () { $.mobile.hidePageLoadingMsg(); });
});

function getRsshtml() {
    var url = baseUrl + 'web/web/getTabs/' + userSite;

}
function getLicenceData() {
    var stringData;
    var index;
    var id;
    $.get('licence.txt', function (data) {
        var fileData = data.split('\n');
        $.each(fileData, function (i, item) {
            stringData = item.split(':');
            $.each(stringData, function (j, str) {
                if (str == 'userSiteId') {
                    index = j;
                    id = stringData[index + 1]
                }
            })

        })
        //alert(id);
        $('#userSiteId').val(id);
        //getMenuList();
        //alert(id);
        getUserAppereance();
        createMenu(id);
    });
}
//set android deviceId for push notification 
function registerAndroidDeviceId(userSite){
//var android_devid="APA91bFQCD9Ndd8uVggMhj1usfeWsKIfGyBUWMprpZLGciWrMjS-77bIY24IMQNeEHzjidCcddnDxqYo-UEV03xw6ySmtIgQyzTqhSxhPGAi1maf6KDMAQGuUWc6L5Khze8YK9YrL9I_WD1gl49P3f_9hr08ZAS5Tw";
var android_devid=$('#android_devid').val();
var url=baseUrl + 'web/web/set_register_id/' + userSite + "/" + android_devid;
//alert(url);
var data = '';
    doAjaxCall(url, data, false, function (html) {
		//alert(html);
	});
	
}

//set iphone device token for push notification
function registerIphoneDeviceId(userSite){
//alert('calling');	
var iphone_devtoken=$('#iphone_devtoken').val();
//alert(iphone_devtoken);
var url=baseUrl + 'web/web/setIphonetoken/' + userSite + "/" + iphone_devtoken;
var data = '';
//alert(url);
	doAjaxCall(url,data,false,function (html){
		//alert(html);
	});
}
// get user appereance
function getUserAppereance() {
    var stringData;
    var index;
    var id = '';
    var val = $('#userSiteId').val();
    if (val == null || val == undefined || val == '') {
        $.get('licence.txt', function (data) {
            var fileData = data.split('\n');
            $.each(fileData, function (i, item) {
                stringData = item.split(':');
                $.each(stringData, function (j, str) {
                    if (str == 'userSiteId') {
                        index = j;
                        id = stringData[index + 1]
                    }
                });

            });
            $('#userSiteId').val(id);
            getUserAppereanceFinal(id);
        });
    } else {
        getUserAppereanceFinal(val);
    }
}
function getUserAppereanceFinal(userSite) {

    //var userSite = $('#userSiteId').val();
    var url = baseUrl + 'web/web/getUserApprence/' + userSite;
    var data = '';
    var showMore = false;
    var cssClass = 'bottom';
    var columnNum = 3;
    //alert("appearance url "+url);
    doAjaxCall(url, data, false, function (html) {
        //console.log(html);
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we Do Not Find YourWebsite Appreance');
        } else {
            $.each(html, function (i, item) {
                if (item.appBtnIconColor != '') {
                }
                if (item.appBtnTabBackground != '') {
                    $('ul.Navigation_tabs li').css({ 'background': 'url(' + baseUrl + item.appBtnTabBackground + ')', 'background-size': '100% 100%' });
                    //	alert($('ul.Navigation_tabs li').length);
                }
                if (item.appBtnTabColor != '') {
                    $('ul.Navigation_tabs .coloroverlay').css({ 'background-color': "#" + item.appBtnTabColor + ' ', 'background-size': '100% 100%' });
                } if (item.appBtnTabTextColor != '') {//alert(item.appBtnTabColor);
                    $('ul.Navigation_tabs li a').css({ "color": "#" + item.appBtnTabTextColor });
                }
                if (item.appGlobalAppSectEvenRowBarColor != '') {
                    $(".evenbg").css("background-color", "#" + item.appGlobalAppSectEvenRowBarColor);
                }
                if (item.appGlobalAppSectEvenRowTextColor != '') {
                    $(".evenbg h3").css("color", "#" + item.appGlobalAppSectEvenRowTextColor);
                }
                if (item.appGlobalAppSectOddRowBarColor != '') {
                    $(".oddbg").css("background-color", "#" + item.appGlobalAppSectOddRowBarColor);
                }
                if (item.appGlobalAppSectOddRowTextColor != '') {
                    $(".oddbg h3").css("color", "#" + item.appGlobalAppSectOddRowTextColor);
                }
                if (item.appGlobalAppNavBarColor != '') {

                    if (item.appGlobalAppNavTextColor != '') {

                        if (item.appHeaderGlobalImage != '') {
                            //alert(item.appBtnTabColor);
                            // alert($('ul.ui-listview li.ui-li-divider').length);
                            $('.header-content').css({ 'background': '#' + item.appGlobalAppNavBarColor + ' ', 'background-size': '100% 100%', "color": "#" + item.appGlobalAppNavTextColor });
                            $('.header-content').css('background', 'url(' + baseUrl + item.appHeaderGlobalImage + ')');
                        }
                    }
                }
                console.log(item);
                if (item.appGlobalAppSectBarColor != '') {
                    $(".ui-li-divider").css("background", "#" + item.appGlobalAppNavBarColor);
                }
                if (item.appGlobalAppSectTextColor != '') {
                    $(".ui-li-divider").css("color", "#" + item.appGlobalAppNavTextColor);
                }
                if (item.appGlobalAppNavShadowColor != '') {
                    // $('.header-content h1').css('text-shadow', "#" + item.appGlobalAppNavShadowColor + ' 1px 1px 0px');
                }
                if (item.appGlobalAppFeatureButtonColor != '') {
                }
                if (item.appGlobalAppFeatureButtonTextColor != '') {

                } if (item.appGlobalAppFeatureTextColor != '') {

                }
                if (item.appGlobalFont != '') {

                } if (item.appGlobalThemeColor != '') {

                } if (item.appHeaderColor != '') {

                } if (item.appHeaderGlobalColor != '') {

                }
                if (item.appHeaderImage != '') {


                } if (item.appLayoutColumns != '') {
                    columnNum = item.appLayoutColumns;
                    if (columnNum != '3' && columnNum != '4' && columnNum != '5') {
                        columnNum = 3;
                    }
                }

                if (item.appLayoutIsNavigation == '1') {
                    showMore = true
                }
                if (item.appLayoutRow != '') {

                }
                if (item.menuStyle != '') {
                    if (item.menuStyle == 1) {
                        cssClass = 'bottom';
                    }
                    if (item.menuStyle == 2) {
                        cssClass = 'top';
                    }
                    if (item.menuStyle == 3) {
                        cssClass = 'left';
                    }
                    if (item.menuStyle == 4) {
                        cssClass = 'right';
                    }
                    //$('.Navigation').removeClass('bottom').addClass(Class);
                }

                if (item.mobileBackgroundAutoSwitchingMode != '') {

                } if (item.mobileBackgroundIsBuyerBoard != '') {

                } if (item.mobileBackgroundIsHomeScreen != '') {

                } if (item.mobileBackgroundIsLoyaltyTab != '') {

                }
            });
        }
        if ($('#isHomePage').length > 0) {
            // this is to render menus dynamically only on index page
            getMenuList(cssClass, columnNum, showMore, userSite);

            createBackgroundSlider(html[0].appearanceId);
        }
    });

}
// getting user menu list
function getMenuList(cssClass, columnNum, showMore, userSite) {

    // var userSite = $('#userSiteId').val();
    var url = baseUrl + 'web/web/getTabs/' + userSite;
    //alert("menu url "+url);
    var data = '';
    // 
    // ajax calling
    $('.Navigation').removeClass('bottom');
    $('.Navigation').addClass(cssClass);
    doAjaxCall(url, data, false, function (html) {
        $('.header-content .add').hide();
        //console.log(html);
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we Do Not Find YourWebsite');
        } else {
            var menuHtml = '';
            var menuWithShowMore = '';
            var scrollableMenu = '';
            // append the menu
            var moreVisibility = false;
            if (html.length >= columnNum) {
                moreVisibility = true;
            }
            var j = 0;
            $.each(html, function (i, item) {
                j++;
                if (showMore) { // show all

                    if (i < (moreVisibility ? columnNum - 1 : columnNum)) {

                        menuWithShowMore += '<li class="theme_1" onclick="menuData(this);"  featureRelId="' + item.featureRelId + '" featureId="' + item.featureId + '"  userSiteId="' + item.userSiteId + '" ><div class="coloroverlay"></div><a href="javascript:" ><div class="icon_img"><img src="' + baseUrl + 'assets/uploads/icons/' + item.image_name + '" width="30"/></div><span>' + item.featureName + '</span></a></li>';
                    }
                } else {

                    if ((j % columnNum == 0 || i == (html.length - 1))) {

                        menuHtml += "<li><ul class='Navigation_tabs primary'>";
                    }

                    scrollableMenu += '<li class="theme_1" onclick="menuData(this);"  featureRelId="' + item.featureRelId + '" featureId="' + item.featureId + '"  userSiteId="' + item.userSiteId + '" ><div class="coloroverlay"></div><a href="javascript:" ><div class="icon_img"><img src="' + baseUrl + 'assets/uploads/icons/' + item.image_name + '" width="30"/></div><span>' + item.featureName + '</span></a></li>';

                    if ((j % columnNum == 0 || i == (html.length - 1))) {

                        menuHtml += scrollableMenu + "</ul></li>";
                        scrollableMenu = '';
                    }
                }
            });
            if (showMore) {
                if (moreVisibility) {

                    menuWithShowMore += '<li class="more theme_1"><div class="coloroverlay"></div><a data-ajax="false" href="menu.htm?num=' + columnNum + '">   <div class="icon_img"><img src="images/nav-icon.png" width="30"></div>More...</a></li>';
                }
                menuWithShowMore = '<ul class="Navigation_tabs primary ">' + menuWithShowMore + '</ul>';
                menuHtml = menuWithShowMore;
            } else {

                /* scrollableMenu = "<ul class='scrollTabs clearfix '><li><ul class='Navigation_tabs Col4'>" + scrollableMenu + "</ul></li></ul>"; */
                menuHtml = '<ul class="scrollTabs clearfix ">' + menuHtml + '</ul>';
                // menuHtml = menuHtml;
            }
            $('.Navigation').html(menuHtml);


            if (showMore) {
                if (columnNum == 3) { $('.Navigation_tabs').addClass('Col3'); }
                if (columnNum == 4) { $('.Navigation_tabs').addClass('Col4'); }
                if (columnNum == 5) { $('.Navigation_tabs').addClass('Col5'); }
            } else {
                if (cssClass == "top" || cssClass == "bottom") {
                    createSlider(true);
                } else {
                    createSlider(false);
                }
                if (columnNum == 3) { $('.Navigation_tabs').addClass('Col3'); }
                if (columnNum == 4) { $('.Navigation_tabs').addClass('Col4'); }
                if (columnNum == 5) { $('.Navigation_tabs').addClass('Col5'); }
            }

        }
    });




}

function createSlider(horizontal) {
    var mode = '';
    if (horizontal) {
        mode = "horizontal";
        $('.Navigation').removeClass('vscroll');
    } else {
        mode = "vertical";
        $('.Navigation').addClass('vscroll');
    }

    $('.scrollTabs').bxSlider({
        mode: mode,
        auto: false,
        pager: true,
        controls: false

    });
    $('.Navigation > .bx-wrapper').css({ 'height': '84px' });
}
function createBackgroundSlider(appearanceid) {
    if (appearanceid != undefined && appearanceid != '' && appearanceid != null) {
        var sliderhtml = '';
        var i = 0;
        var url = baseUrl + 'web/web/getImageSliderImages/' + appearanceid;
        doAjaxCall(url, null, false, function (html) {
           console.log(html);
		  
            $.each(html, function (i, item) {

                if (i == 0) {
				var	mode = item.mobileBackgroundAutoSwitchingMode;
					
                    if (item.mobileSlider1Image != null && item.mobileSlider1Image != undefined && item.mobileSlider1Image != '') {
                        i++;
                        sliderhtml += '<div><img src="' + baseUrl + item.mobileSlider1Image + '" width="100%" height="100%" /></div>';
                    }
                    if (item.mobileSlider2Image != null && item.mobileSlider2Image != undefined && item.mobileSlider2Image != '') {
                        i++;
                        sliderhtml += '<div><img src="' + baseUrl + item.mobileSlider2Image + '" width="100%" height="100%" /></div>';
                    }
                    if (item.mobileSlider3Image != null && item.mobileSlider3Image != undefined && item.mobileSlider3Image != '') {
                        i++;
                        sliderhtml += '<div><img src="' + baseUrl + item.mobileSlider3Image + '" width="100%" height="100%" /></div>';
                    }
                    if (item.mobileSlider4Image != null && item.mobileSlider4Image != undefined && item.mobileSlider4Image != '') {
                        i++;
                        sliderhtml += '<div><img src="' + baseUrl + item.mobileSlider4Image + '" width="100%" height="100%" /></div>';
                    }
                    if ($('.bgslides').length > 0) {
                        if (i > 0) {
                            $('.bgslides').html(sliderhtml);
								if(mode == null || mode =='' || mode ==0){
									$('.bgslides').bxSlider({auto: false ,pager: false,controls: true});
								}
								if(mode == 1){
									$('.bgslides').bxSlider({auto: true ,pager: false,controls: true });
								}
								if(mode == 2){
									$('.bgslides').bxSlider({auto: true,pager: false,controls: true , mode:'fade'});
								}
                        }

                    }
                }
            });



        });
    }
}

function createMenu(userSite) {
    var num = getUrlVars()['num'];
    if (num == '' || num == null || num == undefined) {
        num = 0;
    }
    //var userSite = $('#userSiteId').val();
    if ($('#menupage').length > 0) {

        var url = baseUrl + 'web/web/getTabs/' + userSite;
        var data = '';
        doAjaxCall(url, data, false, function (html) {

            var menuHtml = '';
            $.each(html, function (i, item) {
                var className = 'evenbg';
                if (i % 2 == 0) {
                    className = "oddbg";
                }
                var k = i + 1;
                if (k > num) {
                    menuHtml += '<li class="' + className + '" onclick="menuData(this);"  featureRelId="' + item.featureRelId + '" featureId="' + item.featureId + '"  userSiteId="' + item.userSiteId + '" ><a href="javascript:" ><img class="ui-li-icon" src="' + baseUrl + 'assets/uploads/icons/' + item.image_name + '"/>' + item.featureName + '</a></li>';
                }
            });
            $('#liMenu').html(menuHtml);
            $("#liMenu").listview('refresh');
        });
    }
}
function addBackground(item) {
    var globalTextColor = item.globalTextColor;
    var globalBackground = item.globalBackground;
    if (globalTextColor != null && globalTextColor != undefined && globalTextColor != '') {
        $('.ui-content').css('color', globalTextColor);
    }
    if (globalBackground != null && globalBackground != undefined && globalBackground != '') {
        $('.ui-content').css('background-color', globalBackground);
    }
    var bg = item.mobileBackground;
    if (bg != null && bg != undefined && bg != '') {
        //alert(bg);
        $('body').css('background-size', '100% 100%');
        $('body').css('background-color', '#000000');
        $('body').css('background-image', 'url(' + baseUrl + bg + ')');

    }
}
// get menu data 
function menuData(obj) {

    var featureRelId = $(obj).attr('featureRelId');
    var featureId = $(obj).attr('featureId');
    var menuhtml = $(obj).find('span').html();
    var userSiteId = $('#userSiteId').val();
    var backGroundColor;
    var textColor;

    if (featureId == 1) {
        //homeTabInfo(html);
        window.location.href = "homeTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;

    }
    if (featureId == 2) {
        //gallaryImageInfo(html);
        window.location.href = "gallaryImageInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;

    }
    if (featureId == 3) {
        //geteventTab(html);
        window.location.href = "geteventTab.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 4) {
        //QRCoupon Tab
        window.location.href = "qrlist.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if(featureId == 5){
		//emailPhoto()
	    window.location.href="email_photo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;;
    }
	
    if (featureId == 6) {
        //getfanwallTab(html);
        window.location.href = "getfanwallTab.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 7) {
        //Arround us Tab
        window.location.href = "app_aroundus.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 8) {
        //artistInfoTab(html);

        window.location.href = "artistInfTab.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 9) {
        //infoTab1Info(html);
        window.location.href = "infoTab1Info.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 10) {
        //locationTab(html);
        window.location.href = "locationTab.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 12) {
        //Tell a Friend
        window.location.href = "app_tell_a_friend.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 14) {
        //webSiteInfo(html);
        window.location.href = "webSiteInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 16) {
        //youtubeTabInfo(html);
        window.location.href = "youtubeTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 23) {
        //Car finder
       // window.location.href = "app_gps.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 25) {
        //GPS Coupon
        window.location.href = "app_gps.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 26) {
        //MortgageTabInfo()
        window.location.href = "mortgageTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if(featureId == 27)
	{
	//Music Tab
	window.location.href = "audioPlayer/player.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
	}
	if (featureId == 28) {
		//wofoo
        window.location.href = "app_wufoo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 29) {
        //callUSInfo(html);
        window.location.href = "callUSInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 30) {
        //Changer;
        //window.location.href = "callUSInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 31) {
        //deliver tab;
        window.location.href = "deliver.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if(featureId == 32){
		//Direction view Tab
		window.location.href="directions.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
	}
	if(featureId == 33){
		//Event Tab2
		//window.location.href="directions.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
	}
	if(featureId == 34){
		//Fanwall2
		//window.location.href="directions.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
	}
    if (featureId == 35) {
        //aboutUSInfo(html);
        window.location.href = "aboutUSInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 37) {
        //Loyalty Tab
        window.location.href = "loyality.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 38) {
        //NewsletterInfo(html);

        window.location.href = "NewsletterInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 39) {
        //menuTabInfo(html);
        window.location.href = "menuTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 40) {
        //PDF tab
        window.location.href = "pdf.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 41) {
        //Podcast
        window.location.href = "app_podcast.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 42) {
        //QR scanner
        window.location.href = "QR_Scanner.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 43) {
        //RssTabInfo(html);
        window.location.href = "RssTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;

    }
    if (featureId == 44) {
        //sportTabInfo(html);
        window.location.href = "sportTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 45) {
        //Tip calculator
        window.location.href = "tipcalcTabInfo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	 if (featureId == 46) {
        //Voice recording
        window.location.href = "app_recording.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
   if (featureId == 47) {
        //sportTabInfo(html);
        window.location.href = "emailform.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId +"&featureName=" + featureName;
    }
	if (featureId == 48) {
        //Reservation 
        window.location.href = "app_reservation.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 49) {
        //News 
        //window.location.href = "app_reservation.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	if (featureId == 50) {
        window.location.href = "food_home.html?transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
    if (featureId == 51) {
		
        window.location.href = "merchandise.html?transferId=" + featureRelId + "&touchId=" + userSiteId;
    }
	
    if (featureId == 52) {
        //infoTab3Info(html);
        window.location.href = "infoTab3Info.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
    }

    $('#lastClick').val(featureRelId);

}

/******************************/
/*		ABOUT US INFO		  */
/******************************/
function aboutUSInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
		
            var backGroundColor, textColor;
            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
			
            $.each(html, function (i, item) {
			
                if (item.parentId != 0) {
                   // data += '<li data-role="list-divider">' + item.section + '</li>';
                    if (i % 2 == 0) {
                        className = 'evenbg';
                    } else {
                        className = 'oddbg';
                    }
					//}
                   // data += '<li class="'+className+'"><a href="AboutUsDescription.html?itemId=' + item.itemId + '&touchId=' + userSiteId + '&featureName=' + item.featureName + '" rel="external" >' + item.name + '</a></li>';
				  
                    $.each(html, function (i, innerItem) {
					
                        if (item.itemId == innerItem.parentId) {
                            //alert('child'+innerItem.itemId);
							 
                            data += '<li><a href="AboutUsDescription.html?itemId=' + item.itemId + '&touchId=' + userSiteId + '&featureName=' +featureName+'" rel="external"><img src="'+baseUrl+innerItem.thumbnail+'"class="ul-li-thumb" height="100" width="100"/><h2 class="ul-li-heading">' + innerItem.section + '</h2></a></li>';
                        }
                    })
                }
                backGroundColor = item.globalBackground;
                textColor = item.globalTextColor;
				
                $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
            })
            data += '</ul>';
            $('#main-content').html(data);
            try {
                $("#aboutclass").listview('refresh');
            } catch (e) {
                $("#aboutclass").listview();
            }

        }
        getUserAppereance();
    });
}
// get description for about us
function getAboutData() {

    //var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var itemId = getUrlVars()['itemId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var menuhtml = $("userSiteId").find('a').html();
    //var userSiteId = $('#userSiteId').val();
    var url = baseUrl + 'web/web/getAboutUsDescription/' + itemId;
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        //console.log(html);
        $('title,.header-content h1').html(menuhtml);
        $('.header-content .back').show();
        $('#main-content').html(html[0].description);
    });
	getUserAppereance();
}


/******************************/
/*		END ABOUT US INFO	  */
/******************************/

/******************************/
/*		WEBSITE  INFO		  */
/******************************/
function webSiteInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {

            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
            $.each(html, function (i, item) {
			
                if (i == 0) { addBackground(item); }
				 if (i % 2 == 0) {
                                className = 'evenbg';
                            } else {
                                className = 'oddbg';
                            }
                data += '<li  src="' + item.url + '"><a href="detail.html?id=' + i + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId + '&return_url=' + item.url + '&featureName=' + item.name + '" class="'+className+'" rel="external">' + item.name + ' </a></li>';

            })
            data += '</ul>';
            $('#main-content').html(data);

            try {
                $("#aboutclass").listview('refresh');
            } catch (e) {
                $("#aboutclass").listview();
            }
        }
        getUserAppereance();
    });
}
function openWebsite() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var id = getUrlVars()['id'];

    //var src= getUrlVars()['return_url'];
    //alert("src="+src);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        var menuhtml = $(id).find('a').html();
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {

            $.each(html, function (i, item) {

                var src = getUrlVars()['return_url'];

                var data = '<iframe src="' + src + '" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes">';
                data += '<iframe>';
               // $('title,.header-content h1').html(menuhtml);
                $('.header-content .back').show();
                $('#main-content').html(data);

            })
        }
		getUserAppereance();
    });
}

/****************************/
/*	END	WEBSITE  INFO		*/
/****************************/

/****************************/
/*	 START INFO TAB 1		*/
/****************************/
function infoTab1Info(html) {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            var backGroundColor, textColor, description;
            $.each(html, function (i, item) {
                backGroundColor = item.globalBackground;
                textColor = item.globalTextColor;
                description = item.description;
            })
            if (description == '') {
                $('#main-content').html('Sorry We Have An Empty Data');
            } else {
                $('#main-content').html(description);
            }
            $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
        }
        getUserAppereance();
    });

}

/******************************/
/*	  INFO TAB 2			  */
/*****************************/



/******************************/
/*	 START INFO TAB 3	      */
/******************************/

function infoTab3Info() {
    //alert("hello");
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];

	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        }
        else {
            var backGroundColor, textColor;
            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';

            
			 var i = 1;
			 var mobileBackground
            $.each(html, function (i, item) {
			//featureName = item.featureName;
				//alert(item.catImage);
			   mobileBackground = item.mobileBackground;
                if (i == 0) { addBackground(item); }
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
			
			 
                data += '<li  data-role="list-divider">' + item.catSection + '</li>';
                data += '<li class="' + className + '"><a  rel="external" href="infotab3category.html?&categoryId=' + item.categoryId + '&info3id=' + item.info3id + '&mId=' + featureId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&featureName=' + item.catName + '"><img src="'+baseUrl+item.catImage+'"height="80" width="80" class="ui-li-thumb"/><h2 class="ui-li-heading">' + item.catName + '</h2></a></li>';
                backGroundColor = item.globalBackground;
                textColor = item.globalTextColor;
                $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
            });
            data += '</ul>';
            $('#main-content').html(data);
            try {
                $("#aboutclass").listview('refresh');
            } catch (e) {
                $("#aboutclass").listview();
            }

        }
        getUserAppereance();
    });
}
function getInfo3Data() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var categoryId = getUrlVars()['categoryId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);

    var info3id = getUrlVars()['info3id'];

    var menuhtml = $("#btn").find('a').html();
    //var userSiteId = $('#userSiteId').val();
    var url = baseUrl + 'web/web/getInfotabList/' + categoryId + '/' + info3id;
    var data = '';
	
    doAjaxCall(url, data, false, function (html) {
        //console.log(html);
        var backGroundColor, textColor;
        var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
        var i = 1;
			 var mobileBackground
            $.each(html, function (i, item) {
			//featureName = item.featureName;
			
				//alert(item.thumbnail);
			   mobileBackground = item.mobileBackground;
                if (i == 0) { addBackground(item); }
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
            if (item.parentId == 0) {
			
                data += '<li data-role="list-divider">' + item.section + '</li>';
				
                data += '<li class="'+className+'"><a href="infotab3description.html?itemId=' + item.itemId + '&touchId=' + userSiteId + '&featureName=' + item.name + '" rel="external"><img src="'+baseUrl+item.thumbnail+'"width="80" height="80"class="ui-li-thumb" /><h2 class="ui-li-heading">' + item.name + '<h2></a></li>';
                $.each(html, function (i, innerItem) {
                    if (item.itemId == innerItem.parentId) {
                        //alert('child'+innerItem.itemId);

                        if (i % 2 == 0) {
                            className = 'evenbg';
                        } else {
                            className = 'oddbg';
                        }
                        data += '<li class="'+ className +'"><a href="infotab3description.html?itemId=' + item.itemId + '&touchId=' + userSiteId + '&featureName=' + innerItem.name + '"  rel="external">' + innerItem.name + '</a></li>';
                    }
                });
            }
            backGroundColor = item.globalBackground;
            textColor = item.globalTextColor;
            $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
        })
        data += '</ul>';
        $('title,.header-content h1').html(menuhtml);
        $('.header-content .back').show();
        $('#main-content').html(data);
        try {
            $("#aboutclass").listview('refresh');
        } catch (e) {
            $("#aboutclass").listview();
        }
		getUserAppereance();
    });
}
function getInfo3Desc() {
    var userSiteId = getUrlVars()['touchId'];
    var itemId = getUrlVars()['itemId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);

    var menuhtml = $('#btn').find('a').html();
    //var userSiteId = $('#userSiteId').val();
    var url = baseUrl + 'web/web/getinfo3Description/' + itemId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        //console.log(html);
        $('title,.header-content h1').html(menuhtml);
        $('#main-content').html(html[0].Description);

    });
	getUserAppereance();
}


/******************************/
/*	 END INFO TAB 3	     	 */
/******************************/

/******************************/
/*	 START MENU TAB		      */
/******************************/

function menuTabInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
		var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {

            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
            $.each(html, function (i, item) {
           //alert(item.menuId);
		   //alert(item.parentId);
                        if (item.menuId == item.parentId) {
                            //alert('child'+innerItem.itemId);
                            if (i % 2 == 0) {
                                className = 'evenbg';
                            } else {
                                className = 'oddbg';
                            }
                            data += '<li class="' + className + '"><a href="menuDescription.html?id=' + item.menuId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId +'&featureName=' + featureName + '" rel="external"><img src="'+baseUrl+item.thumbnail+'" width="80" height="80" class="ul-li-thumb"/><h2 class="ul-li-heading">' + item.name + '</h2><p class="ui-li-aside"><strong>' + item.price + '</strong></p></a></li>';
                        }
                   
            })
            data += '</ul>';
            $('#main-content').html(data);
            try {
                $("#aboutclass").listview('refresh');
            } catch (e) {
                $("#aboutclass").listview();
            }

        }
        getUserAppereance();
    });
}

function getMenuDesc() {
    var backGroundColor, textColor;
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var id = getUrlVars()['id'];
    var data = '';

    var menuhtml = $(id).find('a').text();
    doAjaxCall(url, data, false, function (html) {
	if($.isEmptyObject(html))
	{
	$('#main-content').html('Sorry we have an Empty data');
	}
	else
	{
	//var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
	        $.each(html,function(i,item){
	           if(id==item.menuId)
	             {
	                    if (i % 2 == 0) {
                                className = 'evenbg';
                            } else {
                                className = 'oddbg';
                            }
	               data += '<ul class="' + className + '">' + item.description + '</h2></ul>';
                  backGroundColor = item.globalBackground;
				 textColor = item.globalTextColor;
                   }
	
	})
	//data += '</ul>';
	//$('title,.header-content h1').html(menuhtml);
	   $('#main-content').html(data);
	    $('.header-content .back').show();
        $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
	}
	});
	
	
        //$('title,.header-content h1').html(menuhtml);
     
        //backGroundColor = html[0].globalBackground;
        //textColor = html[0].globalTextColor;
        $('.header-content .back').show();
        //$('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
    
	
	getUserAppereance();
}
/******************************/
/*	 END MENU TAB		      */
/******************************/


/******************************/
/*	 Start Artist info 		  */
/******************************/
function artistInfoTab() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
			var featureName='';
            var backGroundColor, textColor, description;
            $.each(html, function (i, item) {
                backGroundColor = item.globalBackground;
                textColor = item.globalTextColor;
                description = item.description;
                featureName = item.featureName;
				thumbnail=item.thumbnail;
				
				data='<li ><div  class="ui-btn-text" style="font-family: Courier;"><img src="'+baseUrl+thumbnail+'" width="80" height="80" alt="" rel="external" class="ui-li-thumb" style="margin-top: -29px"><h3 class="align-center">'+description+'</h3></div> </li>';
				
            })
            if (description == '') {
                $('#main-content').html('Sorry We Have An Empty Data');
            } else {
                $('#main-content').html(data);
				
				featureNameTitle(featureName);
			
				 getUserAppereance();
				
			}
            $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
			
			
        }
       
    });
}


/******************************/
/*	 Start LOCATION TAB       */
/******************************/
var locationTemp;
function locationTab() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
		var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            locationTemp = html;
            var backGroundColor, textColor;
            var count = 1;
            var data;
            var firstHomeId = html[0].homeId;
            //alert(firstHomeId);
            $.each(html, function (i, item) {
                if (item.homeId != firstHomeId) {
                    count++;
                }
            });
            if (count == 1) {
                //alert('heere');
                $.each(html, function (i, item) {
                    if (i == 0) {
                        data += '<h3 class="align-center">' + item.city + '</h3>';
                        data += '<a href="#" data-role="button" lat="' + item.latitude + '" long="' + item.longitude + '" onclick="showGMap(this)">View Map</a>';
                        data += '<a href="tel:' + item.telephone + '" data-role="button">Call Us</a>';
                        data += '<a href="javascript:" site="' + item.website + '" data-role="button" onclick="openIframe(this)">View Website</a>';
                        data += '<a href="mailto:' + item.email + '" data-role="button">View Email Us</a>';
                        data += '<p><strong>Opening Hours</strong></p>';
                        $.each(html, function (i, item) {
                            data += '<fieldset class="ui-grid-a"><div class="ui-block-a">' + item.day + '</div><div class="ui-block-b">' + item.openFrom + ' to ' + item.openTo + '</div></fieldset>';
                        })

                    }
                });
                $('#main-content').html(data);
                $('#main-content').trigger('create');

            } else {
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
                var homeArray = [];
                $.each(html, function (i, item) {
                    if (i == 0) {
                        addBackground(item);
                    }
					
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
                    if ($.inArray(item.homeId, homeArray) == -1) {
                        homeArray[i] = item.homeId;
                        data += '<li class="'+className+'"><a href="LocationInfo.html?homeId=' + item.homeId + '&mId=' + featureId + '&touchId=' + userSiteId + '&transferId=' + featureRelId + '" rel="external" >' + item.city + '</a></li>';
                    }

                })
                data += '</ul>';

                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
            }

        }
        getUserAppereance();
    });
}
function goToMap(lat, longi) {

    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 10,
        center: new google.maps.LatLng(lat, longi),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, longi, 4),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent('hello');
            infowindow.open(map, marker);
        }
    })(marker, i));
}


function showGMap(btn) {
    var lat = $(btn).attr('lat');
    var longi = $(btn).attr('long');
    $('#main-content').html('<div id="map_canvas" style="min-height:460px;width:100%;"></div>');
    goToMap(lat, longi);
}


function getLocationInfo() {
    var homeId = getUrlVars()['homeId'];
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            $.each(html, function (i, item) {

                if (homeId == item.homeId) {
                    data += '<h3 class="align-center">' + item.city + '</h3>';
                    data += '<a href="mapPage.html?" data-role="button">View Map</a>';
                    data += '<a href="Callus.html?tel:' + item.telephone + '" data-role="button">Call Us</a>';
                    data += '<a href="Viewwebsite.html" site="' + item.website + '" data-role="button" onclick="openIframe(this)">View Website</a>';
                    data += '<a href="Viewmails.html?mailto:' + item.email + '" data-role="button">View Email Us</a>';
                    data += '<p><strong>Opening Hours</strong></p>';
                    $.each(html, function (i, item) {
                        if (homeId == item.homeId) {
                            data += '<fieldset class="ui-grid-a"><div class="ui-block-a">' + item.day + '</div><div class="ui-block-b">' + item.openFrom + ' to ' + item.openTo + '</div></fieldset>';
                        }
                    })
                }
            });
            //alert(data);
            $('#main-content').html(data);
            $('#main-content').trigger('create');
        }
		getUserAppereance();
    });
}
function openIframe(btn) {
    var menuhtml = $(btn).html();
    var src = $(btn).attr('site');
    var data = '<iframe src="' + src + '" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes">';
    data += '<iframe>';
    $('title,.header-content h1').html(menuhtml);
    $('.header-content .back').show();
    $('#main-content').html(data);
}

function homeTabInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
		var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            var popdata = '';
            console.log(html);
            var data = '<div class="TopBar"><ul id="headerHome">';
            $.each(html, function (i, item) {
                if (i == 0) {
                    if (item.callButton == 1) {
                        data += '<li><a href="#popcallus"  data-position-to="window" data-inline="true" data-rel="popup" >Call Us</a> </li>';
                    }
                    if (item.directionButton == 1) {
                        data += '<li><a href="#popdirections"  data-position-to="window" data-inline="true" data-rel="popup" >Directions</a> </li>';
                    }
                    if (item.tellFriend == 1) {
                        data += '<li><a href="#popshare"  data-position-to="window" data-inline="true" data-rel="popup" >Tell Friend</a> </li>';
                    }
                }
            });
            data += '</ul></div>';

            popdata += '<div data-role="popup" id="popcallus" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Call Us</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Which location would you like to call?</h3>';
            $.each(html, function (i, item) {
                popdata += '<a href="tel:' + item.telephone + '" data-role="button" data-theme="b">' + item.city + '   ( Tel. ' + item.telephone + ' ) </a>';
            });
            popdata += '</div></div>';



            popdata += '<div data-role="popup" id="popdirections" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div <div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Directions</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Select location to get direction</h3>';
            $.each(html, function (i, item) {
                popdata += '<a data-ajax="false" href="directions.html?lat=' + item.latitude + '&long=' + item.longitude + '&location=' + item.city + '" data-role="button" data-theme="b">' + item.address1 + ' , ' + item.address2 + ' , ' + item.city + '</a>';
            });
            popdata += '</div> </div>';

            popdata += '<div data-role="popup" id="popshare" data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div <div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Tell Friend</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Share your location- via Email or Facebook</h3>';

            popdata += '   <div data-role="collapsible-set">'
            $.each(html, function (i, item) {

                var address = item.address1 + ' , ' + item.address2 + ' , ' + item.city + ',' + item.state;
                popdata += '<div data-role="collapsible" data-collapsed="false" data-theme="b" data-content-theme="b"><h3>' + item.address1 + ' , ' + item.address2 + ' , ' + item.city + '</h3>';
                popdata += '<p>';
                popdata += '<a href="mailto:' + item.email + '?&body=' + address + '" data-role="button" data-theme="b">Share by email</a>';
                popdata += '<a href="http://www.facebook.com" data-role="button" data-theme="b">Share by facebook</a>';
                popdata += '</p></div>';
            });
            popdata += '</div></div>';
			
            //popdata += '</div> </div>';
			$.each(html, function (i, item) {
			var mbackground=item.mobileBackground;
			//alert(mbackground);
			$('body').css('background-image','url('+baseUrl+mbackground+')');
			});
			
            $('.header-content').html(data);
            $('#main-content').html(popdata);
            $('div[data-role="popup"]').trigger('create');
            $('div[data-role="popup"]').popup();
            try {
                $('.header-content').trigger('create');
                //$("#headerHome").listview('refresh');
            } catch (e) {
                $('.header-content').page();
                // $("#headerHome").listview();
            }

        }
        
    });
	getUserAppereance();
}

var youtubeTemp;
function youtubeTabInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
		var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {

        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            var data = '';
            youtubeTemp = html;

            $.each(html, function (i, item) {
                if (i == 0) { addBackground(item); }
                data += '<div class="youtube align-center" onclick="showYouTubeVideo(this);" videoId="' + item.videoId + '"><a href="javascript:"><img src="http://img.youtube.com/vi/' + item.videoId + '/1.jpg" width="320" height="200" /></a><br><div style="text-overflow:ellipsis;white-space: nowrap; overflow: hidden; text-align:center !important;"><strong>' + item.title + '</strong></div></div>';
				mobileBackground=item.mobileBackground;
				
				$(body).css('background-image','url('+baseUrl+mobileBackground+')');
            })
            $('#main-content').html(data);
            $('#main-content').trigger('create');

        }
        
    });
	getUserAppereance();
}

function showYouTubeVideo(btn) {
    videoId = $(btn).attr('videoId');

    var data = '';
    data += '<iframe width="100%" height="200" src="http://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
    $('.header-content .back').show();
    $('#main-content').html(data);
    $('#main-content').trigger('create');
}

function sportTabInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            var data = ' <div class="Sports"><table data-role="table" id="" data-mode="" class="ui-responsive "><tbody>';
            var sportsEmail;
            var sportsMessage;

            $.each(html, function (i, item) {
                if (i == 0) { addBackground(item); }
                sportsEmail = item.sendTo;
                sportsMessage = item.message;
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
                data += '<tr id="' + item.sportsStartsTabId + '"><td class="stateVal "' + className + '> ' + item.statName + ' <input type="hidden"  class="sportRate" name="sportRate" value="1"/></td><td class="statevalchange"> 1 </td><td><div class="inc button increment">+</div></td><td><div class="dec button decrement">-</div></td></tr>';
            });
            data += '</tbody></table></div><a href="mailto:' + sportsEmail + '?body=' + sportsMessage + '" data-theme="b" data-role="button" id="submitSportsButton">Email Results</a>';
            $('#main-content').html(data);

            $('.Sports .increment').click(function () {
                var currentRate = $(this).closest('tr').find('.sportRate').val();

                currentRate = parseInt(currentRate) + 1;
                $(this).closest('tr').find('.statevalchange').html(currentRate);
                $(this).closest('tr').find('.sportRate').val(currentRate)
            });
            $('.Sports .decrement').click(function () {
                var currentRate = $(this).closest('tr').find('.sportRate').val();
                currentRate = parseInt(currentRate) - 1;
                if (currentRate < 1) {
                    currentRate = 1;
                }
                $(this).closest('tr').find('.statevalchange').html(currentRate);
                $(this).closest('tr').find('.sportRate').val(currentRate)
            });

            $('#main-content').trigger('create');
        }
        getUserAppereance();
    });
}


var eventJsonTemp = '';
function geteventTab() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        //alert('fdsaf');
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
			console.log(html);
            var data = '';
            data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
            var month = '';
            var error = '';
            var featureName = '';
            eventJsonTemp = html;
            $.each(html, function (i, item) {
                if (i == 0) { addBackground(item); }
                if (month != item.month) {
                    month = item.month;
                    featureName = item.featureName;
					
                    data += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-first-child">' + item.month + ' ' + item.year + '</li>';
                }
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
                data += '<li  class="' + className + '" ><a href="eventDetail.html?eventId=' + item.eventId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId + '" rel="external"><img src="images/Event_icon.png" alt=""><h3>' + item.name + '</h3><span class="ui-li-month">' + item.month + '</span><span class="ui-li-day">' + item.date + '</span></a></li>';
                if (item.error != '') {

                    error = item.error;
                }
            });
            data += '</ul>';
        }
        $('#main-content').html(data);
		featureNameTitle(featureName);
        if (error) {
            $('#main-content').html(error);
        }
        try {
            $("#aboutclass").listview('refresh');
        } catch (e) {
            $("#aboutclass").listview();
        }
        getUserAppereance();
    });
}

function eventDescription() {

    var eventId = getUrlVars()['eventId'];
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    var featureName = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {

            $.each(html, function (i, item) {

                if (eventId == item.eventId) {
                    backGroundColor = item.globalBackground;
                    textColor = item.globalTextColor;
                    description = item.description;
                    featureName = item.featureName;
                    name = item.name;
                    if (description == '') {
                        $('#main-content').html('Sorry We Have An Empty Data');
                    } else {
                        $('#main-content').html(description);
                    //    $('.ui-title').html(name);
						getUserAppereance();
						featureNameTitle(name);
					}
                    $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
                }
            });
        }
    });

}


var gallaryTemp = '';
function gallaryImageInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
	//alert(url);
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            var data = '';
			
            gallaryTemp = html;
            data += '<ul id="Gallery" class="gallery">';
            var i = 1;
            $.each(html, function (i, item) {
				var img = item.imageName;
				if(img.match("http")){
				baseUrl = '';
				}
                data += '<li id="' + item.imageId + '" > <a href="' + baseUrl + item.imageName + '"><img src="' + baseUrl + item.imageName + '" alt="Gallary" /></a></li>';
            })
            data += '</ul>';
            $('#main-content').html(data);
            try {
                $("#main-content").trigger('create');
            } catch (e) {
                $("#main-content").listview();
            }
            $("#Gallery a").photoSwipe({ enableMouseWheel: true, enableKeyboard: true });
        }
        getUserAppereance();



    });

}





function RssTabInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
	
    doAjaxCall(url, data, false, function (html) {
        
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we do not have an RSS Tab data');
        } else {
          //  console.log(html);
            var data = '';
            // data='<link rel="stylesheet" type="text/css" href="css/jquery.mobile-1.3.1_mobilePrev.css">';

            data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="Rssclass">';
            var date = '';
            var error = '';
            var image = '';
          //  var featureName = '';
            var i = 1;
			//alert('else condition');
			 //var mobileBackground
            $.each(html, function (i, item) {
			//featureName = item.featureName;
				//alert(featureName);
			   mobileBackground = item.mobileBackground;
			  
			  
                if (i == 0) { addBackground(item); }
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
                if (date != item.date) {
                    date = item.date;
                    data += '<li   data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-first-child" rel="external">' + item.date + '</li>';
                }
                if (item.RsstIcon !=''){
                    image = item.RsstIcon;
                }else{
                    image = 'assets/images/rss.png';
                }
				data += '<li id="' + i + '" class="' + className + '" style=""><a href="RssDescription.html?id=' + i + '&mId=' + featureId + '&touchId=' + userSiteId + '&transferId=' + featureRelId + '" rel="external"><img src="' + baseUrl + image + '" alt="" rel="external"><h3>' + item.title + '</h3></a></li>';
                if (item.error != '') {

                    error = item.error;
                }
                 $(body).css('background-image','url(" '+ baseUrl + mobileBackground + '")' );

            });
            data += '</ul>';
        }
		
        $('#main-content').html(data);
			
	$(body).css('background-image','url(" '+ baseUrl + mobileBackground + '")' );
		if (error) {
            $('#main-content').html(error);
        }
        try {
            $("#Rssclass").listview('refresh');
        } catch (e) {
            $("#Rssclass").listview();
        }
		//featureNameTitle(featureName);
        getUserAppereance();
    });
}


function RssDescription() {
    var RssDescriptionid = getUrlVars()['id'];
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
	featureNameTitle('');
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {

            $('#main-content').html('Sorry we have an Podcast Tab data');
        } else {

            $.each(html, function (i, item) {
                //alert(RssJsonTemp);
                if (RssDescriptionid == i) {
                    backGroundColor = item.globalBackground;
                    textColor = item.globalTextColor;
                    description = item.description;
                    title = item.title;
					

                    description += '<a href="ArticalDetail.html?id=' + RssDescriptionid + '&mId=' + featureId + '&touchId=' + userSiteId + '&transferId=' + featureRelId + '" rel="external"  class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" ><span class="ui-btn-inner"><span class="ui-btn-text">Read Article</span></span></a>';
                    if (description == '') {
                        $('#main-content').html('Sorry We Have An Empty Data');
                    } else {
							featureNameTitle(title);
                    
                        $('#main-content').html(description);
                    }
                    $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
					  var mobileBackground = item.mobileBackground;
					$('body').css({ 'background-image': 'url(" '+ baseUrl + mobileBackground + '")' });
                }
            })
             getUserAppereance();
        }
    });
}
function readmeRss() {

    var id = getUrlVars()['id'];

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Podcast Tab data');
        } else {
			console.log(html);
            $.each(html, function (i, item) {
			if(i== id){
			//alert('dsa');
                var RssDescriptionrel = item.link;
                var mobileBackground = item.mobileBackground;
                title = item.title;
                //alert(RssDescriptionrel);
                var description = '<iframe src="' + RssDescriptionrel + '" frameborder="0" height="100%" width="100%" scrolling="yes" allowtransparency="yes" seamless>';
                description += '</iframe>';
                if (description == '') {
                    $('#main-content').html('Sorry We Have An Empty Data');
                } else {
					featureNameTitle(title);
					$('#main-content').html(description);
					$('#main-content').trigger('create');
                }
                $('body').css({ 'background-image': 'url(" '+ baseUrl + mobileBackground + '")' });
                getUserAppereance();
			}
            })
        }
    });
}



function NewsletterInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
            var data = '<h3 class="align-center">Sign up for our newsletter</h3><label for="name">Name</label><input type="text" id="name" ><label for="email">email</label><input type="email" id="email" ><br>';

            $.each(html, function (i, item) {
                if (i == 0) { addBackground(item); }
                data += '<label for="slider' + item.categoryId + '">' + item.categoryName + '</label><select name="slider' + item.categoryId + '" id="slider' + item.categoryId + '" data-role="slider" data-mini="true"><option class="ui-btn-up-b" value="off">No</option><option class="ui-btn-up-b" value="on">Yes</option></select>';
            });
            var newsletterEmail;
            var newsletterMessage;
            data += '<div class="sendNewsletterdetails"><input type="submit" value="Join"></div>';
            $('#main-content').html(data);
            $('#main-content').trigger('create');

            $('.sendNewsletterdetails').click(function () {

                var name = $('#name').val();
                var email = $('#email').val();
                email = email.replace('@', '-');
                var url = baseUrl + 'web/web/newsletterentry/' + name + '/' + email + '/';
                data = '{"employees": [';
                var more = '';
                var categoryvalue = '';
                $.each(html, function (i, item) {

                    if (more == 1) {
                        data += ',';
                    }
                    categoryvalue = $('#slider' + item.categoryId).val();
                    data += '{ "categoryId":"' + item.categoryId + '" , "value":"' + categoryvalue + '" }';
                    more = 1;

                });

                data += ']}';
                data = $.parseJSON(data);
                //	data = {"employees": [{ "ram":"asdfasdf" , "value":"fdasf" },{ "ramasd":"asdfasdasdf" , "valasdue":"fasddasf" }]};
                doAjaxCall(url, data, true, function (html) {
                    if (html == 1) {
                        alert('data submited');
                    } else {
                        alert('some error occured');
                    }
                });

            });

        }
        getUserAppereance();
    });
}
var callUSHTML;
function callUSInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        console.log(html);
        callUSHTML = html;
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have no data for call us tab');
        } else {
            var i = 1;
            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="callclass">';
            $.each(html, function (i, item) {
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
                //data += '<li class="' + className + '" onclick="getcallData(' + item.callusId + ',' + featureId + ',' + userSiteId + ',' + featureRelId + ',this)"><a href="#popupcallus" data-position-to="window" data-rel="popup" ><h3>' + item.title + '</h3></a></li>';
                data += '<li class="' + className + '"><a href="tel:' + item.phoneNo + '" ><h3>' + item.title + '</h3></a></li>';
            })
            data += '</ul>';
            $('#main-content').html(data);
            try {
                $("#callclass").listview('refresh');
            } catch (e) {
                $("#callclass").listview();
            }

        }
        getUserAppereance();
    });
}
function getcallData(callusId, featureId, userSiteId, featureRelId, btn) {
    var callId = callusId
    var featureRelId = featureRelId;
    var userSiteId = userSiteId;
    var featureId = featureId;
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have no data for call us tab');
        } else {
            //var callId=callId;
            var popdata = '';



            $.each(callUSHTML, function (i, item) {

                if (callId == item.callusId) {
                    popdata = '<div data-role="popup" id="popupcallus"  data-overlay-theme="a" data-theme="c" class="ui-corner-all"><div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Call Us</h1></div><div data-role="content" data-theme="d" class="ui-corner-bottom ui-content"><h3 class="ui-title">Would You like to call ' + item.title + '?</h3><a href="tel:' + item.phoneNo + '" data-role="button" data-theme="b">' + item.title + '<br>' + item.phoneNo + '</a></div></div>';
                    //alert(popdata);
                }
                $('#main-content').html(popdata);
                $('div[data-role="popup"]').trigger('create');
                $('div[data-role="popup"]').popup();
                try {
                    $('.header-content').trigger('create');
                    //$("#headerHome").listview('refresh');
                } catch (e) {
                    $('.header-content').page();
                    // $("#headerHome").listview();
                }
            });
        }
    });
}
var callfanwall = '';
function getfanwallTab() {
    $('.header-content .add').show();
    //callfanwall = html;
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have no data for fanwall tab');
        } else {
            var val = "getfanwallData();";
            $('#addSteps').attr('onclick', val);


            var data = '';

            $('#main-content').html(data);
            try {
                $("#callclass").listview('refresh');
            } catch (e) {
                $("#callclass").listview();
            }


        }
        getUserAppereance();
    });
}
function getfanwallData() {

    var popdata = '';

    popdata += '<div data-role="popup" id="fanwallPopup" data-overlay-theme="a" data-theme="c" class="ui-corner-all"> <div data-role="header" data-theme="b" class="ui-corner-top ui-header ui-bar-b" role="banner"><h1 class="ui-title" role="heading" aria-level="1">Login</h1></div><a href="https://www.facebook.com/"  data-role="button" data-theme="b">Facebook</a><a href="https://twitter.com/" data-role="button" data-theme="b">twitter</a>';


    $('#main-content').html(popdata);
    $('div[data-role="popup"]').trigger('create');
    $('div[data-role="popup"]').popup();
    try {
        $('.header-content').trigger('create');
        //$("#headerHome").listview('refresh');
    } catch (e) {
        $('.header-content').page();
        // $("#headerHome").listview();
    }

}

/******************************/
/*							*/
/*	GLOBAL FUNCTIONS		*/
/***************************/




// get values form query string
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function goBackSteps() {
    if ($('#BackSteps').val() == 1) {
        $('ul.Navigation_tabs li[featurerelid="' + $('#lastClick').val() + '"]').click();
    }


}
function goAddSteps() {
    $('#addSteps').trigger('click');
}
// toggle more
function dispalyMore() {
    $('.Navigation .Navigation_tabs.primary').hide('slow');
    $('.Navigation').find('.toggle_display').show('slow');
}
function showPrimaryMenu() {
    $('.Navigation').find('.toggle_display').hide('slow');
    $('.Navigation .Navigation_tabs.primary').show('slow');
}


// ajax calling function
function doAjaxCall(url, data, showLoading, callback) {
    if (showLoading) {
        $('.loadingDiv').show();
    }
    //alert(url);
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "json",
        cache: false,
        success: function (html) {
            callback(html);
            if (showLoading) {
                $('.loadingDiv').hide();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        	//alert("error"+html);
        	/*alert(xhr.responseText);
        	alert(xhr.status);
        	alert(thrownError);*/
            //console.log(html);
        }
    });
}

/********************************/
/*								*/
/*	END GLOBAL FUNCTIONS		*/
/********************************/

function closeShop(html) {

    // for close shop
    var counter = html.length;
    counter = counter - 1;
    var description, CuisineType = '';
    var delivery = '', dineIn = '', takeout = '';
    $('title,.header-content h1').html(html[0].name);
    var data = '<div class="timings"><table summary=""  data-role="table" id="" data-mode="" class="ui-responsive ui-body-c table-stripe"><caption>We are closed at this moment. Business hours are:</caption><thead><tr><th >Days:</th><th >From:</th><th >To:</th></tr></thead><tbody>';
    $.each(html, function (i, item) {
        if (i == 0) {
            if (counter > i) {

                if (item.description != '') {
                    description = item.description;
                }
                if (item.CuisineType != '') {
                    CuisineType = item.CuisineType;
                }
                if (item.delivery != 0) {
                    delivery = 'delivery';
                }
                if (item.dineIn != 0) {
                    dineIn = 'dineIn';
                }
                //alert(item.takeout);
                if (item.takeout != 0) {
                    takeout = 'takeout';
                }
                var twoTime = [];
                /*Monday*/

                twoTime = item.monday.split(',');

                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Monday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*Tuesday*/
                twoTime = item.tuesday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Tuesday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*wednesday*/
                twoTime = item.wednesday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Wednesday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*thursday*/
                twoTime = item.thursday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>thursday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*friday*/
                twoTime = item.friday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Friday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*saturday*/
                twoTime = item.saturday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Saturday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
                /*sunday*/
                twoTime = item.sunday.split(',');
                $.each(twoTime, function (j, Time) {
                    var filterTime = Time.split('-');
                    if (j == 0) {
                        data += '<tr><th>Sunday</th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    } else {
                        data += '<tr><th> </th><td>' + filterTime[0] + ' am</td><td>' + filterTime[1] + ' pm</td></tr>';
                    }
                });
            }


        }
    });
    data += '</tbody><tfoot><tr><td colspan="5"><p><strong>Detail: </strong>' + description + '</p><p><strong>Cuisine Type: </strong>' + CuisineType + '</p><p><strong>We Offer: </strong><br>' + delivery + '<br>' + dineIn + '<br>' + takeout + '</p></td></tr></tfoot></table></div>';
    $('#main-content').html(data);
    try {
        $(".timings").trigger('create');
    } catch (e) {
        $(".timings").trigger();
    }

}

function hideBackButton() {
    // $('.header-content a[data-rel=back]').hide();

}

function createMap() {

    var lat = getUrlVars()['lat'];
    var long = getUrlVars()['long']; location
    var userLocation = getUrlVars()['location'];
    if (lat == '' || lat == undefined || lat == null) {
        userLocation = ' another location';
    }
    var i = 0;
    if (lat != '' && lat != undefined && lat != null) {
        i++;
    }
    if (lat != '' && lat != undefined && lat != null) {
        i++;
    }
    if (i == 2) {

        var html = "<h3>Get directions</h3>";
        html += "<div style='padding:10px'><h4>Path between <strong>your current location</strong> and <strong>" + userLocation + "</strong></h4> </div>";
        $('#direction-detail').html(html);
        $('#map_canvas').gmap().bind('init', function (evt, map) {
            $('#map_canvas').gmap('getCurrentPosition', function (position, status) {
                if (status === 'OK') {
                    var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var Position2 = new google.maps.LatLng(lat, long);
                    $('#map_canvas').gmap('addMarker', { 'position': clientPosition, 'bounds': true }).click(function () {
                        $('#map_canvas').gmap('openInfoWindow', { 'content': '<div>My current location</div>' }, this);
                    });
                    $('#map_canvas').gmap('addMarker', { 'position': Position2, 'bounds': true }).click(function () {
                        $('#map_canvas').gmap('openInfoWindow', { 'content': '<div>' + userLocation + '</div>' }, this);
                    });
                    $('#map_canvas').gmap('addShape', 'Polyline', {
                        'strokeColor': "#FF0000",
                        'strokeWeight': 2,
                        'path': [clientPosition, Position2]
                    });
                }
            });
        });
    } else {
        var html = "<h3>Get directions</h3>";
        html += "<div style='padding:10px'>Sorry ! Failed to load directions. </div>";
        $('#main-content').html(html);
    }



}


function MortgageTabInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
		 
            var data = ' <div class="mortgage ui-content corner-all">';
			 $.each(html, function (i, item) {
			 data+='<form method="post"><input type="hidden" name="mortgageCalculatorTabId" id="mortgageCalculatorTabId" value="'+item.mortgageCalculatorTabId+'"><div data-role="fieldcontain"><label for="loanAmmount">Loan Amount: </label><input type="text" name="loanAmmount" id="loanAmmount" placeholder="Input Amount" value=""></div><div data-role="fieldcontain"><label for="loanterm">Loan term: </label><input type="text" name="loanterm" id="loanterm" placeholder="Input term in Years" value=""></div>';
			 if(item.readonly==0){
			 data+='<div data-role="fieldcontain"><label for="loanRate">Loan Rate in %: </label><input type="text" name="loanRate" id="loanRate" placeholder="Input Rate in %" value="'+item.interestRate+'"></div></form>';
			 }else{
			 data+='<div data-role="fieldcontain"><label for="loanRate">Loan Rate in %: </label><input  disabled="disabled" type="text" placeholder="Input Rate in %" name="loanRate" id="loanRate" value="'+item.interestRate+'">(enter 10 % as 10)</div></form>';}
			 });



            data += '</div><a href="" data-theme="b" data-role="button" id="calculate">Calculate</a><center><p>Your Monthly Payment Will Be:</p><p style="width:20%;"><input  disabled="disabled" type="text" name="totalAmt" id="totalAmt" value=""></p><p>These Figures are only a guide. We Recomend that </p><p> you obtain Exact Figures from Specific lender</p><p> before commiting to any loan </p></center>';
			
            $('#main-content').html(data);

            $(' #calculate').click(function () {
                var LoanAmt = parseFloat($('#loanAmmount').val());
				 var loanterm = parseFloat($('#loanterm').val());
				  var loanRate = parseFloat($('#loanRate').val());
			if(LoanAmt!=NaN)
            {if(loanRate!=NaN)
            {if(loanterm!=NaN)
            {var rate= loanRate/1200;
			var months=loanterm*12;
			var base=1+rate;
			for(;months>1;months--){
			base=base*(1+rate);
			}
			base=base-1;
			var val=(rate+(rate/base))*LoanAmt;
			//alert(val);
			$('#totalAmt').attr('value',val);
			}}} 			
            });
            $('#main-content').trigger('create');
        }
        getUserAppereance();
    });
}

//deliver tab
function deliverInfoTab() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];

    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';

    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
			var featureName ='';
			data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="deliverclass">';
			$.each(html, function (i, item) {
			  if (i == 0) { addBackground(item); }
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
				featureName = item.featureName;
				data += '<li class="'+className+'"><a data-ajax="false" href="delivermap.html?lat=' + item.latitude + '&long=' + item.longitude + '&location=' + item.city + '&mId=' + featureId  + '&touchId=' + userSiteId  + '&transferId=' + featureRelId  + '&telephone=' + item.telephone   + '&email=' + item.email  + '&website=' + item.website   + '" ><img src="images/tab_home.png" alt="" class="ui-li-icon" style="margin-top:20px"/><h2>'+item.address1+' '+item.address2+'</h2> <br><p>'+item.city+' '+item.state+'</p></a></li>';
			 });

			data+='</ul>';
            $('#main-content').html(data);
			featureNameTitle(featureName);
            $('#main-content').trigger('create');
        }
		 
		 });
        try {
            $("#deliverclass").listview('refresh');
        } catch (e){
            $("#deliverclass").listview();
        }
        getUserAppereance();
    
}

//show map for deliver tab
function showMap() {

    var website = getUrlVars()['website'];
	 var email = getUrlVars()['email'];
	  var telephone = getUrlVars()['telephone'];
	   var featureRelId = getUrlVars()['transferId'];
	    var userSiteId = getUrlVars()['touchId'];
		 var featureId = getUrlVars()['mId'];

	   var lat = getUrlVars()['lat'];
	   var long = getUrlVars()['long']; location
    var userLocation = getUrlVars()['location'];
    if (lat == '' || lat == undefined || lat == null) {
        userLocation = ' another location';
    }
    var i = 0;
    if (lat != '' && lat != undefined && lat != null) {
        i++;
    }
    if (lat != '' && lat != undefined && lat != null) {
        i++;
    }
    if (i == 2) {

        var html = "";
        html += "<div style='padding:10px'><h4>Points showing <strong>your current location</strong> and <strong>and entered location</strong></h4> </div>";
		
		var showButton='<div data-role="controlgroup" data-type="horizontal"> <a href="tel:'+telephone+'" data-role="button"  data-iconpos="top">Call us</a>  <a rel="external" href="detail.html?id=0&transferId='+featureRelId+'&touchId=' + userSiteId + '&mId=' + featureId + '&return_url=' + website + '" data-role="button" data-iconpos="top">Website</a>   <a rel="external" href="mailto:'+email+'?Subject=share location?body=latitude is '+lat+' and longitude is '+long+'" data-role="button"  data-iconpos="top">Email</a></div>';
        $('#direction-detail').html(html);
		$('#direction-buttons').html(showButton);
      
	  $('#map_canvas').gmap().bind('init', function (evt, map) {
			var Position2 = new google.maps.LatLng(lat, long);
		$('#map_canvas').gmap('addMarker', { 'position': Position2, 'bounds': true }).click(function () {
		$('#map_canvas').gmap('openInfoWindow', { 'content': '<div>' + userLocation + '</div>' }, this);
		});
            $('#map_canvas').gmap('getCurrentPosition', function (position, status) {
		
                if (status === 'OK') {
                    var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    
                    $('#map_canvas').gmap('addMarker', { 'position': clientPosition, 'bounds': true }).click(function () {
                        $('#map_canvas').gmap('openInfoWindow', { 'content': '<div>My current location</div>' }, this);
                    });

                   
                }
            });
        });
		
    } else {
        var html = "<h3>Get directions</h3>";
        html += "<div style='padding:10px'>Sorry ! Failed to load directions. </div>";
		$('#main-content').html(html);
    }


 try {
                $("#main-content").trigger('create');
            } catch (e) {
                $("#main-content").listview();
            }
}

//direction view tab
function directionViewTab() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    alert(url);
    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an empty data');
        } else {
		 
             data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="deliverclass">';
			 $.each(html, function (i, item) {
			 data += '<li ><a data-ajax="false" href="directionmap.html?lat=' + item.latitude + '&long=' + item.longitude + '&location=' + item.city + '&mId=' + featureId  + '&touchId=' + userSiteId  + '&transferId=' + featureRelId  + '" ><img src="images/tab_home.png" alt="" class="ui-li-icon" style="margin-top:20px"/><h2>'+item.address1+' '+item.address2+'</h2> <br><p>'+item.city+' '+item.state+'</p></a></li>';
			 });

			data+='</ul>';
            $('#main-content').html(data);
			
            $('#main-content').trigger('create');
        }
		 
		 });
        try {
            $("#deliverclass").listview('refresh');
        } catch (e) {
            $("#deliverclass").listview();
        }
        getUserAppereance();
    
}
//Loyalty Tab
function loyaltyInfo() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        console.log(html);
		LoyalityHTML = html;
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have no data for call us tab');
        } else {
            var i = 1;
			var backgroundImage;
            var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="loyalityclass">';
            $.each(html, function (i, item) {
                if (i % 2 == 0) {
                    className = 'evenbg';
                } else {
                    className = 'oddbg';
                }
			//	"loyaltyTabId":"1","reward":"1","secretcode":"123","imageUpload":"","squareCount":"4","mobileBackground":"assets\/images\/set_default_mobile.jpg","iphone5Background":"assets\/images\/set_default_iphone.jpg","tabletBackground":"assets\/images\/set_default_tablet.jpg"
              
			  backgroundImage=item.mobileBackground;
			  
			  
                data += '<li class="' + className + '"><a href="loyaltycoupon.html?touchId='+userSiteId+'&transferId='+featureRelId+'&tabid='+item.loyaltyTabId+'&mId='+featureId+'" rel="external"><img src="'+baseUrl+item.imageUpload+'" class="ui-li-thumb" height="100" width="100"/><h2 class="ui-li-heading">' + item.reward + '</h2></a></li>';
				hiddendata=item.squareCount;
            })
            data += '</ul>';
		
            $('#main-content').html(data);
			$('#no_of_coupon').val(hiddendata);
            try {
                $("#loyalityclass").listview('refresh');
            } catch (e) {
                $("#loyalityclass").listview();
            }

        }
        getUserAppereance();
    });
}

//Loyalty coupon
function couponloyaltyInfo(no_of_coupon) {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
	 var featureId = getUrlVars()['mId'];
    var tabid = getUrlVars()['tabid'];

    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        console.log(html);
      
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have no data for loyality tab');
        } else {
            var i = 1;
           
				
            $.each(html, function (i, item) {
			
           if(item.loyaltyTabId==tabid)
		   {
		   //alert('hi');
		
            var    backgroundImage=item.mobileBackground;
		
			var    imageUpload=item.imageUpload;
			var    squareCount=item.squareCount;
			
			 $('#secretcode').val(item.secretcode);
			//alert(imageUpload);
			 $('#CouponName').text(item.reward);
			  var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="loyalityclass">';
			
			 for(var i=1;i<=squareCount;i++)
			  {
				 if(no_of_coupon==0)
				 { 
					  data += '<div id= "'+i+'"><img src="images/003.png"  height="50" width="50" class="loyalityimage"/></div>';
				      
				}
				else
				{
				 data += '<div id= "'+i+'"><img src="images/005.png"  height="50" width="50" class="loyalityimage"/></div>';
				     
				}
			}
			  $('#CouponImage').html(data);
			  $('#no_of_coupon').val(squareCount);
               
           }
		   })
            data += '</ul>';
           // $('#main-content').html(data);
            try {
                $("#loyalityclass").listview('refresh');
            } catch (e) {
                $("#loyalityclass").listview();
            }

        }
        getUserAppereance();
    });
}


//Tip Calculator
function tipcalcTabInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
        } else {
		 
            var data = ' <div class="tipcalc ui-content corner-all">';
			 $.each(html, function (i, item) {
			 data+='<form method="post"><input type="hidden" name="tipCalculatorId" id="tipCalculatorId" value="'+item.tipCalculatorId+'"><div data-role="fieldcontain"><label for="CheckAmmount">Check Amount: </label><input type="text" name="CheckAmmount" id="CheckAmmount" placeholder="Input Amount" value="1000"></div>';
			data+='<div data-role="fieldcontain" id="sliderval"><label for="slider">tip in % </label><input name="slider" id="slider" value="1" min="1" max="30" type="range"></div>';
			 });

			data+='<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true" id="personCount" ><legend>Number of Persons</legend><input name="radio-choice-b" id="radio-choice-c" checked="checked"  type="radio" value="1"><label for="radio-choice-c">1</label><input name="radio-choice-b" id="radio-choice-d" value="2" type="radio"><label for="radio-choice-d">2</label><input name="radio-choice-b" id="radio-choice-e" value="3" type="radio"><label for="radio-choice-e">3</label><input name="radio-choice-b" id="radio-choice-f" value="4" type="radio"><label for="radio-choice-f">4</label><input name="radio-choice-b" id="radio-choice-g" value="5" type="radio"><label for="radio-choice-g">5</label><input name="radio-choice-b" id="radio-choice-h" value="6" type="radio"><label for="radio-choice-h">6</label><input name="radio-choice-b" id="radio-choice-i" value="7" type="radio"><label for="radio-choice-i">7</label><input name="radio-choice-b" id="radio-choice-j" value="8" type="radio"><label for="radio-choice-j">8</label><input name="radio-choice-b" id="radio-choice-k" value="9" type="radio"><label for="radio-choice-k">9</label></fieldset>';

            data += '</div><div data-role="fieldcontain"><label>Total tip </label><span id="totalTip"></span></div><div data-role="fieldcontain"><label for="totalAmt">Total Amount </label><span id="totalAmt"></span></div><div data-role="fieldcontain"><label for="TipPerPerson">Tip Each Pays </label><span id="TipPerPerson"></span></div><div data-role="fieldcontain"><label for="AmtPerPerson">Each Pays </label><span id="AmtPerPerson"></span></div><a href="#" data-role="button" data-inline="true"  id="calculate">Calculate</a><a href="#" data-role="button" data-inline="true" id="reset" >Reset</a>';
			
            $('#main-content').html(data);
			$('#personCount input[name=radio-choice-b]').click(function (){
			updatetip();
			});
			$('#CheckAmmount').change(function (){
			updatetip();
			});
            $('#reset').click(function () {
 			$('#totalTip').text(0.00);
			$('#totalAmt').text(0.00);
			$('#TipPerPerson').text(0.00);
			$('#AmtPerPerson').text(0.00);
			$('#CheckAmmount').val(0);
			
			
            });
			 $('#calculate').click(function () {
 			updatetip();
            });
			$('#sliderval a').click(function () {
 			updatetip();
            });
            $('#main-content').trigger('create');
        }
        getUserAppereance();
    });
}
function updatetip() {
			//alert($('#personCount input[name=radio-choice-b]:checked').val());
                var CheckAmmount = parseFloat($('#CheckAmmount').val());
				 var percent = parseFloat($('#sliderval a').attr('title'));
				 var percount=$('#personCount input[name=radio-choice-b]:checked').val();
			if(CheckAmmount!=NaN)
			{if(percent!=NaN)
            {var tip = percent*CheckAmmount/100;
			var totAmt=CheckAmmount+tip;
			var TipPerPer=tip/percount;
			var personAmt=totAmt/percount;
	
			$('#totalTip').text(tip);
			$('#totalAmt').text(totAmt);
			$('#TipPerPerson').text(TipPerPer);
			$('#AmtPerPerson').text(personAmt);
			
			}}
}

//Music List
function musicList()
		{
		var featureRelId = getUrlVars()['transferId'];
	var userSiteId = 	getUrlVars()['touchId'];
	
	var url = baseUrl+'web/web/getMusicPlayer/'+featureRelId+'/'+userSiteId;
	//alert(url);
	var data = '';
		doAjaxCall(url,data,false,function(html){		
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
		var backGroundColor,textColor;
		var data =' <div class="ui-content"  > <ul data-role="listview" data-split-icon="custom" data-autodividers="true" data-filter="true" data-inset="false" id="music-list" >';
		var list='<div data-role="content" data-theme="d" class="ui-content" ><ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="false">';
			    
          var tintColor;
		  var album_art_image;
			$.each(html,function(i,item){
					list+='<li rel="'+item.track_url+'" tit="'+item.title+'" art="'+item.artist+'"><h3>'+item.title+'</h3><p>Album : '+item.album+'</p></li>';
					
				tintColor= item.tintColor;
					data +=' <li style="background:url(images/010.jpg) no-repeat; background-size:100% 100%;"><span class="play2 toogle ui-corner-all" rel="'+item.track_url+'" tit="'+item.title+'" art="'+item.artist+'"></span><a href="../musicAlbum_details.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&playerId='+item.trackId+'" rel="external" ><h3>'+item.title+'</h3><p>Album : '+item.album+'</p></a> <a href="detail.html?id=' + 0 + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=0&return_url='+item.Pur_url+'">Buy</a></li>';
					//alert("hi");
					});
			data +='</ul></div>';	
			list +='</ul></div>';	
			$('#music-data').html(data);
			$('#showallsongs').html(list);
			
			$("#music-list span").bind('click',function(){
			if($(this).hasClass("play2"))
			{
				$(this).removeClass('play2');
				$(this).addClass('pause2');
				
				var url= $(this).attr('rel');
				var title= $(this).attr('tit');
				var artist= $(this).attr('art');
				 $('#songurl').attr('value',url);
				 $('#songtitle').attr('value',title);
				 $('#songArtist').attr('value',artist);
				 $("#player-play").trigger('click');
				}
			else{
			
				$(this).removeClass('pause2');
				$(this).addClass('play2');
				 $("#player-play").trigger('click');
				}
			});
			}try {
          $("#music-list").listview('refresh');
      } catch (e) {
          $("#music-list").listview();
      }
			getUserAppereance();
			});
		}
	//Music detail	
	function musicDetail() {
		var featureRelId = getUrlVars()['transferId'];
	var userSiteId = 	getUrlVars()['touchId'];
	var trackId = 	getUrlVars()['playerId'];
	
	var url = baseUrl+'web/web/getMusicById/'+featureRelId+'/'+userSiteId+'/'+trackId;
	//alert(url);
	var data = '';
		doAjaxCall(url,data,false,function(html){		
		if($.isEmptyObject(html)){
			$('#main-content').html('Sorry we have an Empty data');
		}else{
			$.each(html,function(i,item){
					
					
					$('#artistImage').attr('src',item.album_art_image);
	$('#artistName').text(item.artist);
	$('#songname').html(item.title);
	$('#albumName').html(item.album);
	$('#buyurl').attr('href',item.Pur_url);
					});
			
			
			
			}
			getUserAppereance();
			});
	
	}
//GPS Coupon
function getGPSPosition() {

    //$('#map_canvas').gmap({ 'zoom': 15, 'center': '28.459497, 77.02663799999999' }).bind('init', function () {
    //    $('#map_canvas').gmap('addMarker', { 'position': '28.459497, 77.02663799999999', 'bounds': false }).click(function () {
    //        $('#map_canvas').gmap('openInfoWindow', { 'content': 'Hello World' }, this);
    //    });
    //});


    $('#map_canvas').gmap().bind('init', function (evt, map) {

        $('#map_canvas').gmap('getCurrentPosition', function (position, status) {
            if (status === 'OK') {

                console.log(position);
                var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                $('#map_canvas').gmap('addMarker', { 'position': clientPosition, 'bounds': true, icon: "images/Map-Marker-Marker-Outside-Pink.png" }).click(function () {
                    $('#map_canvas').gmap('openInfoWindow', { 'content': '<div>My current location</div>' }, this);
                });
            }
        });

    });

}

function emailFormList(){
	 var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
	
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

    var data = '';
    doAjaxCall(url, data, false, function (html) {
		  if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an info Tab data');
				} else {
					var data = '';
					data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="Rssclass">';
						$.each(html, function (i, item) {
						   mobileBackground = item.mobileBackground;
							if (i % 2 == 0) {
								className = 'evenbg';
							} else {
								className = 'oddbg';
							}
							
						
							data += '<li id="' + i + '" class="' + className + '" style=""><a href="eform.html?pk=' + item.publicKey + '&mId=' + featureId + '&touchId=' + userSiteId + '&transferId=' + featureRelId + '&featureName=' + featureName + '" rel="external">' + item.formTitle + '</a></li>';
						});
					data += '</ul>';
					 $('#main-content').html(data);
					 getUserAppereance();
						try {
							$("#Rssclass").listview('refresh');
						} catch (e) {
							$("#Rssclass").listview();
						}
						
					}
				});
}

function emailFormsubmission() {
	var featureRelId 	= getUrlVars()['transferId'];
    var userSiteId 		= getUrlVars()['touchId'];
    var featureId 		= getUrlVars()['mId'];
    var publicKey 		= getUrlVars()['pk'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var url = baseUrl + 'web/web/emailContactForm/'+ publicKey + '/' + featureId + '/' + featureRelId + '/' + userSiteId;
	data ='';
		doAjaxCall(url, data, false, function(html){
		  if ($.isEmptyObject(html)){
            $('#main-content').html('Sorry we have an info Tab data..!');
			}else{
			var formhtml;
			var success;
				console.log(html);
				$.each(html,function(i,item){
					 formhtml = item.FormHtml;
					 success = item.success;
					 
				})
				   // var text = '&lt;p&gt;name&lt;/p&gt;&lt;p&gt;&lt;span style="font-size:xx-small;"&gt;ajde&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;da&lt;/em&gt;&lt;/p&gt;';
				//var decoded = $('<div/>').html(formhtml).text();
				//alert(decoded);
				formhtml += '<input type="hidden" name="publicKey" value="'+ publicKey +'" />';
				$('#emailformsubmit').append(formhtml);
				$('#emailformsubmit').attr('action',baseUrl+'emailform/emailsubmission');
				
				$('#emailformsubmit').trigger('create');
				$('#emailformsubmit').validate();
				var url1 = baseUrl + 'web/web/emailContactFormDesign/'+ publicKey + '/' + featureId + '/' + featureRelId + '/' + userSiteId;
				
				doAjaxCall(url1, data, false, function(html){
					if ($.isEmptyObject(html)) {
						}else{
						console.log(html);
						$.each(html,function(i,item){
							EmailColorFormat(item.theme_content_background_color,item.theme_title_font_family,item.theme_form_color,item.theme_form_text_shadow,item.theme_section_color,item.theme_section_text_shadow,item.theme_section_border_top_color,item.theme_main_label_font_family,item.theme_main_label_color,item.theme_main_label_text_shadow,item.theme_detail_label_font_family,item.theme_detail_label_color,item.theme_detail_label_text_shadow,item.theme_input_font_family,item.theme_input_background_color,item.theme_input_color,item.theme_input_text_shadow,item.theme_radio_font_family,item.theme_radio_background_color,item.theme_radio_border_color,item.theme_radio_shadow_color,item.theme_submit_font_family,item.theme_submit_background_color,item.theme_submit_border_color,item.theme_submit_text_shadow,item.theme_submit_color);
						})
						}
				});
			}
	   })
	    getUserAppereance();
	}
	
	function EmailColorFormat (theme_content_background_color,theme_title_font_family,theme_form_color,theme_form_text_shadow,theme_section_color,theme_section_text_shadow,theme_section_border_top_color,theme_main_label_font_family,theme_main_label_color,theme_main_label_text_shadow,theme_detail_label_font_family,theme_detail_label_color,theme_detail_label_text_shadow,theme_input_font_family,theme_input_background_color,theme_input_color,theme_input_text_shadow,theme_radio_font_family,theme_radio_background_color,theme_radio_border_color,theme_radio_shadow_color,theme_submit_font_family,theme_submit_background_color,theme_submit_border_color,theme_submit_text_shadow,theme_submit_color)
	{	
		$("#Elements").css({"background":"#"+theme_content_background_color});
		$("#form_Title, #form_Desc").css("font-family", theme_title_font_family);
		$("#form_Title, #form_Desc").css({"color":"#"+theme_form_color});	
		$("#form_Title, #form_Desc").css({"text-shadow":"1px 1px #"+theme_form_text_shadow});
		$(".Break label").css({"color":"#"+theme_section_color});
		$(".Break label").css({"text-shadow":"1px 1px 0px #"+theme_section_text_shadow});
		$(".Break").css({"border-top":"1px solid #"+theme_section_border_top_color});
		$("#Elements li .primary").css("font-family", theme_main_label_font_family);
		$(".element_div > label, .element_div > legend").css({"color":"#"+theme_main_label_color});
		$(".element_div > label, .element_div > legend").css({"text-shadow":"1px 1px#"+theme_main_label_text_shadow});
		$("#Elements li .label_bottom").css("font-family", theme_detail_label_font_family);
		$(".element_div > label_bottom").css({"color":"#"+theme_detail_label_color});
		$(".element_div > label_bottom").css({"text-shadow":"1px 1px#"+theme_detail_label_text_shadow});
		$("#Elements li .ui-input-text, #Elements li .ui-select div").css({"background":"#"+theme_input_background_color});
		$("#Elements li input.ui-input-text, #Elements li .ui-select .ui-btn-inner").css({"color":"#"+theme_input_color});
		$("#Elements li input.ui-input-text, #Elements li .ui-select .ui-btn-inner").css({"text-shadow":"1px 1px #"+theme_input_text_shadow});
		$(".ui-radio label, .ui-checkbox label").css({"background":"#"+theme_radio_background_color});
		$(".ui-radio label, .ui-checkbox label").css({"color":"#"+theme_radio_border_color});
		$(".ui-radio label, .ui-checkbox label").css({"text-shadow":"1px 1px #"+theme_radio_shadow_color});
		$(".ui-submit").css({"background":"#"+theme_submit_background_color});
		$(".ui-submit").css({"border-color":"#"+theme_submit_border_color});
		$(".ui-submit .ui-btn-text").css({"color":"#"+theme_submit_color});
		$(".ui-submit .ui-btn-text").css({"text-shadow":"1px 1px #"+theme_submit_text_shadow});
		$("#Elements li .ui-input-text, #Elements li .selectDropdown").css("font-family", theme_input_font_family);
		$("#Elements li .ui-radio .ui-btn-text, #Elements li .ui-checkbox .ui-btn-text").css("font-family", theme_radio_font_family);
		$("#Elements .ui-submit .ui-btn-text").css("font-family", theme_submit_font_family);
		getUserAppereance();
 }	

	


// One-shot position request.
