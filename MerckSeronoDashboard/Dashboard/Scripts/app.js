// make console.log safe to use
window.console||(console={log:function(){}});

//Internet Explorer 10 in Windows 8 and Windows Phone 8 fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}

//Android stock browser
var nua = navigator.userAgent
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
if (isAndroid) {
    $('select.form-control').removeClass('form-control').css('width', '100%');
}

//attach fast click
window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);

//doc ready function
$(document).ready(function() {

 	//Disable certain links
    $('a[href^=#]').click(function(e) {
        e.preventDefault();
    });
   
 	//------------- Init our plugin -------------//
 	$('body').appStart({
        sidebar: {
            fixed: false,//fixed sidebar
            rememberToggle: false, //remember if sidebar is hided
            offCanvas: false //make sidebar offcanvas in tablet and small screens
        },
        sideNav : {
            toggleMode: true, //close previous open submenu before expand new
            hover: false, //shows subs on hover or click
            showArrows: true,//show arrow to indicate sub
            sideNavArrowIcon: 'fa-caret-down', //arrow icon for navigation
            subOpenSpeed: 200,//animation speed for open subs
            subCloseSpeed: 300,//animation speed for close subs
            animationEasing: 'linear',//animation easing
            absoluteUrl: false, //put true if use absolute path links. example http://www.host.com/dashboard instead of /dashboard
            subDir: '' //if you put template in sub dir you need to fill here. example '/html'
        },
        tooltips: true, //activate tooltip plugin build in bootstrap
        backToTop: {
            active: true, //activate back to top
            scrolltime: 800, //scroll time speed
            imgsrc: 'Content/Images/backtop.png', //image 
            width: 42, //width of image
            place: 'bottom-right', //position top-left, top-right, bottom-right, bottom-left
            fadein: 500, //fadein speed
            fadeout: 500, // fadeOut speed
            opacity: 0.5, //opacity
            marginX: 0.5, //X margin
            marginY: 2 //Y margin
        }
 	});
    
    //get settings object
 	var adminObj = $('body').data('appStart');
    //If new user set the localstorage variables
 	if (firstImpression()) {
 	    if (adminObj.settings.sidebar.fixed) {
 	        store.set('fixed-left-sidebar', 1);
 	    } else { store.set('fixed-left-sidebar', 0); }
 	}
});
