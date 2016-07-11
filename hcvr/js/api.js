//var host = window.location.host;

/**
 * Determine the mobile operating system.
 * This function either returns 'iOS', 'Android' or 'unknown'
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';

  }
  else if( userAgent.match( /Android/i ) )
  {

    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

/*var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};*/

var reqObj = {
	
//	appTestAddress:'http://*.weibo.cn/hc/aj/',
	

	appTestAddress:'/hc/aj/'

	
//	activityTestAddress:'http://h5.api.test.miaomore.com:801/v1/'

};

function errorReturn (errorMsg) {
	console.log('errorReturn  '+errorMsg);
}

var set_Timeout = 20000;

function ajaxRequest(ifacv, reqType, reqName, arg, succCallback, errorCallback) {
    
//  if(reqType == "get"){
//      reqName =  reqName+"?" +arg;
//      arg = "";
//  }

	var reqData;

	if (arg) {
		
    	reqData = JSON.stringify(arg);
	
	}

    
    var requrl;
    
    if (ifacv) {
    	
    	requrl = reqObj.activityTestAddress+reqName;
    	
    } else {
    	
    	requrl = reqObj.appTestAddress+reqName
    	
    }
    
   	console.log('requrl  '+requrl)
   
   	console.log("reqData:"+reqData);
   
    $.ajax({
    	
        type: reqType,
        url: requrl,
        dataType: "json",
//      jsonpCallback:"jsoncallback",
        /*dataType: "jsonp",
        jsonp:"callback",
        jsonpCallback:"success_jsonpCallback",*/
        data :arg,
        timeout : set_Timeout,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(result){
        	
        	succCallback(result);
        	
            /*if(result.status == 10008){
                var from = localStorage.getItem("from");
                localStorage.clear();
                if(from == "app"){
                     window.location.href = "index.html?from=app";
                }else{
                    window.location.href = "index.html";
                }
                
            } else{
                succCallback(result);
            }*/
           
        },
        error: errorCallback
    });
}


