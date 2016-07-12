var krpano, constantScreenWidth, constantScreenHeight, resizeTimer, 
WRatio, HRatio, chatData, whPortraitArr = [], whLandscapeErr = [], chatCanvas, 
ifshowChat = false, adoptRatio, devicefontSize, friPage = 1,
resizeTriggerNum = 0, screen_nameArr = [], uidArr = [], fritoken = '', 
uidString = '', leftCount = 0, totalCount = 7, playCount = 0, respondTxt = '', 
getPrizeCount = 0, simulateClickResult = 0, getFLowerCount = 0, ifGetNull = false, 
ifGetPrize = false;

//$('.chat').hide();

$(document).on("touchmove", function(evt) {
				
				evt.preventDefault();
				
			}, false);

//字体图片随窗体缩放
function door() {
	
	var orgDeg = window.orientation;
	
//	alert('屏幕方向   '+orgDeg);
	
	var dePxRatio = window.devicePixelRatio;
	
	if ( dePxRatio < 3) {
		
		dePxRatio = 3;
	}
	
	
	/*adoptRatio = window.innerHeight / ( window.screen.height * dePxRatio );
	
	devicefontSize = Math.round( window.innerWidth * adoptRatio );*/
	
	
	if (window.innerHeight > window.innerWidth) {
		
		
		adoptRatio = window.innerHeight / ( window.screen.height * dePxRatio);
	
		devicefontSize = Math.round( window.innerWidth * adoptRatio );

		
	} else {
		
		
		adoptRatio = window.innerWidth / ( window.screen.width * dePxRatio);
	
		devicefontSize = Math.round( window.innerHeight * adoptRatio );

	}
		
	
	/*if (orgDeg == 0) {
		
		adoptRatio = window.innerHeight / ( window.screen.height * dePxRatio);
	
		devicefontSize = Math.round( window.innerWidth * adoptRatio );

		
	} else if (orgDeg == 90 || orgDeg == -90) {
		
		
		adoptRatio = window.innerWidth / ( window.screen.width * dePxRatio);
	
		devicefontSize = Math.round( window.innerHeight * adoptRatio );

	}*/
	
	 
	console.log('adoptRatio '+adoptRatio + '  window.innerWidth  '+ window.innerWidth);
	
	console.log('devicefontSize  '+devicefontSize);
	
	
	$("html").css("fontSize",  devicefontSize +'px');
	
}


door();


window.onresize = function () {
	
	
	door();
	
	
	/*alert('window.screen.width  '+window.screen.width+ '  window.screen.height  '+window.screen.height);


	alert('window.innerWidth  '+window.innerWidth + '  window.innerHeight  '+window.innerHeight);
	
	
	alert('document.documentElement.clientWidth  '+ document.documentElement.clientWidth + '  document.documentElement.clientHeight  '+ document.documentElement.clientHeight);
*/
	
	console.log('onresize door ');
}


/*alert(' $(this).width()  '+$(this).width()+ '  $(this).height()  '+$(this).height())


alert('window.screen.width  '+window.screen.width+ '  window.screen.height  '+window.screen.height);


alert('window.innerWidth  '+window.innerWidth + '  window.innerHeight  '+window.innerHeight);


alert('document.documentElement.clientWidth  '+ document.documentElement.clientWidth + '  document.documentElement.clientHeight  '+ document.documentElement.clientHeight);

*/

constantScreenWidth = window.innerWidth;

constantScreenHeight = window.innerHeight;



$('#clofri').on('click',function () {
	
	
	$('.friendsP').hide();
									
									
		respondTxt = '正在返回大厅...';
		
		
		showTxt(false);
		
		
		setTimeout(function () {
			
			$('#overlay').fadeOut('fast');
		
			$('#overlay').hide();
			
			krpano.call("loadscene('scene_____________2-ok');");
			
			$('#VR').show();
			
//										$('#chatIcon').show();
		
		},700);
		
		
		
		$('.chatDiv').show();
		
		
		$('#treaNum').on('click',function () {

			window.location.href = 'hc/chest';
			
		})
		
		
		$('#treaNum').removeClass('treaNum');
		
		$('#treaNum').addClass('trea');
		
		$('#treaNum').children('p').hide();
	
})



console.log('constantScreenHeight  '+ constantScreenHeight + ' constantScreenWidth  '+constantScreenWidth)


storeEleWHPortrait();


function storeEleWHLandscape () {
	
	
	var curElementWidth, curElementHeight;
	
	
	$('[class]').filter( function() {
		
		
		console.log(" filter  " + $(this).attr('class')+ ' css width is ' +$(this).css('width') + '  width val is  '+$(this).width() );
		
		
		if ( $(this).attr('class') == 'userInfo' || $(this).attr('class') == 'packageInfo') {
			
			
			if ( $(this).css('width').toLowerCase().indexOf('%') == -1 && $(this).css('height').toLowerCase().indexOf('%') == -1) {
				
				
				if ( $(this).css('width') != undefined && $(this).css('height') != undefined ) {
					
					
					curElementWidth = $(this).width() * 100 / constantScreenHeight;
					
					curElementHeight = $(this).height() * 100 / constantScreenWidth;
					
					
					whLandscapeErr.push({className: $(this).attr('class') , curElementWidth: curElementWidth, curElementHeight: curElementHeight})
					
					
					console.log('whLandscapeErr curElementHeight  '+curElementHeight+' curElementWidth '+curElementWidth)
				
				
				}
				
			}
		}
		
	
	} );
	
}


function storeEleWHPortrait () {
	
	
	var curElementWidth, curElementHeight;
	
	
	$('[class]').filter( function() {
		
		
//		console.log(" filter  " + $(this).attr('class')+ ' css width is ' +$(this).css('width') + '  width val is  '+$(this).width() );
		
		
		if ( $(this).attr('class') == 'userInfo' || $(this).attr('class') == 'packageInfo') {
			
			
			if ( $(this).css('width').toLowerCase().indexOf('%') == -1 && $(this).css('height').toLowerCase().indexOf('%') == -1) {
				
				
				if ( $(this).css('width') != undefined && $(this).css('height') != undefined ) {
					
					
					curElementWidth = $(this).width() * 100 / constantScreenWidth;
					
					curElementHeight = $(this).height() * 100 / constantScreenHeight;
					
					
					whPortraitArr.push({className: $(this).attr('class') , curElementWidth: curElementWidth, curElementHeight: curElementHeight})
					
					
					console.log('whPortraitArr  curElementHeight  '+curElementHeight+' curElementWidth '+curElementWidth)
				
				
				}
				
			}
		}
		
	
	} );
	 
	
	console.log('whPortraitArr.length  '+ whPortraitArr.length)
	
}


$('#chatIcon').on('click', function () {
	
	toogleShowChat();
	
});


$('.chatTxtVal').on('click', function () {
	
	
	
});



$('#VR').on('click', function () {
	
	krpano.call("webvr.enterVR()");
	
})


function toogleShowChat () {
	
	if (ifshowChat) {
		
		$('.chat').hide();
				
		/*$('.chatDiv').animate({'top': '100%' },500);
		
		$('.chatDiv').css('position','absolute');
		
		$('.chatDiv').hide();*/
		
	} else {
		
		$('.chat').show();
	
		$messages.mCustomScrollbar();
		
		setTimeout(function() {
	    	fakeMessage();
	  	}, 100);
	  	
				
		/*$('.chatDiv').show();
		
		$('.chatDiv').animate({'top': '94%' },500);
		
		$('.chatDiv').css('position','fixed');*/
	}
		
	
	ifshowChat = !ifshowChat;
	
}



function calcWHratio() {
	
	
	var orgDeg = window.orientation;
	
	
	console.log('orgDeg from '+orgDeg);
	
	
	if (orgDeg == undefined) {
		
		alert('not support orientationchange event');
		
		return;
		
	}
	
	
	if (orgDeg == 0) {
		
		
			for (var i = 0; i < whPortraitArr.length; i++) {
				
				if (whPortraitArr[i]['curElementWidth'] == whPortraitArr[i]['curElementHeight']) {
					
					$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] +'vw').css('height', whPortraitArr[i]['curElementHeight'] +'vw');
					
				} else {
					
					$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] +'vw').css('height', whPortraitArr[i]['curElementHeight'] +'vh'); 
				}
				
				
			}
			
		} else if (orgDeg == 90 || orgDeg == -90) {
			
			for (var i = 0; i < whPortraitArr.length; i++) {
				
				if (whPortraitArr[i]['curElementWidth'] == whPortraitArr[i]['curElementHeight']) {
					
					$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] +'vh').css('height', whPortraitArr[i]['curElementHeight'] +'vh');
					
				} else {
					
					$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] +'vh').css('height', whPortraitArr[i]['curElementHeight'] +'vw'); 
					
				}
				
				
			}
			
		}
	
	
	
	/*console.log('document.documentElement.clientHeight  '+document.documentElement.clientHeight + ' document.documentElement.clientWidth '+document.documentElement.clientWidth);
	
	
	WRatio = document.documentElement.clientHeight / document.documentElement.clientWidth;
	
	
	HRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
	
	
	
	console.log('calcWHratio WRatio '+WRatio);
	
	console.log('calcWHratio HRatio '+HRatio);
	
	
	if ( whLandscapeErr.length > 0) {
		
		
		if (orgDeg == 0) {
		
		
			for (var i = 0; i < whPortraitArr.length; i++) {
				
				$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] +'vw').css('height', whPortraitArr[i]['curElementHeight'] +'vh'); 
				
			}
			
		} else if (orgDeg == 90 || orgDeg == -90) {
			
			for (var i = 0; i < whLandscapeErr.length; i++) {
			
				$('.'+whLandscapeErr[i]['className']).css('width', whLandscapeErr[i]['curElementWidth'] +'vw').css('height', whLandscapeErr[i]['curElementHeight'] +'vh'); 
				
			}
			
		}
		
		
	} else {
		
		
		for (var i = 0; i < whPortraitArr.length; i++) {
			
			$('.'+whPortraitArr[i]['className']).css('width', whPortraitArr[i]['curElementWidth'] * WRatio+'vw').css('height', whPortraitArr[i]['curElementHeight'] * HRatio+'vh'); 
			
		}
		
		
		storeEleWHLandscape();
		
	}*/
	
	
	  
}



// Listen for orientation changes      
window.addEventListener("orientationchange", function() {
	
    // Announce the new orientation number
    
//	alert('window.orientation  '+window.orientation);
    
    /*$(window).one('resizestop', 0, function() {
	
		console.log('resizestop');
		
		calcWHratio(); 
		
	});*/
    
    console.log('orientationchange  window.screen.orientation  '+window.screen.orientation);
    
    
}, false);


/*
window.onresize = function() {
	
	clearTimeout(resizeTimer);
	
  	resizeTimer = setTimeout(function() {

    // Run code here, resizing has "stopped"
    
//		calcWHratio();
    
		console.log('onresize  resizeTimer  '+resizeTimer);
            
  }, 350);
	
	
	/*resizeTriggerNum++;
	
	
	if (resizeTriggerNum == 2) {
		
		resizeTriggerNum = 0;
		
	}
	
	
	
	
	/*alert('onresize  screen.width   '+ window.screen.width + '  screen.height  '+ window.screen.height);
	
	
	alert('onresize  outerWidth  '+ window.outerWidth + '  outerHeight  '+ window.outerHeight);
	
	
	alert('onresize  clientWidth  '+ document.documentElement.clientWidth + '  clientHeight  '+ document.documentElement.clientHeight);
	
	
	alert('onresize  offsetWidth  '+ document.documentElement.offsetWidth + '  offsetHeight  '+ document.documentElement.offsetHeight);
	
	
	
}*/


//$(".userInfo").textfill();


$('#pano').on('click', function () { 
	
    $('.chatTxtVal').blur(); 

});


$('#begin').on('click', function () {
	
	krpano.call('showHotSpots');
	
	hideGameInfo();
})


function hideGameInfo () {
	
	$('.gameInfo').hide();
	
	$('#overlay').hide();
		
	$('#overlay').fadeOut('fast');
	
}


$('#treaNum').on('click',function () {
	
	window.location.href = 'hc/chest';
	
})



function onnewSceneLay() {
	
//	$('.gameInfo').show();
	
	$('#overlay').show();
		
	$('#overlay').fadeIn('fast');
}


document.addEventListener("showGameInfo", function (event) {
	
	var curSce = krpano.get('xml.scene');
	
	console.log('showGameInfo  curSce  '+curSce);
	
	if (curSce == 'scene_____________2-ok') {
		
		$('#VR').show();
		
//		$('#chatIcon').show();
		
		$('.packageInfo').show();
		
		$('.userInfo').css('display','inline-block');
		
		$('.userInfo').show();
		 
		
/*		html2canvas( $('.chatShow'), {
		
			    	
	     	onrendered: function (canvas) {
	     	
	     	
	            var imgageData = canvas.toDataURL("image/png");
	            
			    krpano.call("addhotspot(chatPng1);set(hotspot[chatPng1].url,'"+ imgageData + "');set(hotspot[chatPng1].ath,0);set(hotspot[chatPng1].atv,0);");
	            
		    	console.log('render chatPng1');
		    	
	            console.log('imgageData  '+imgageData);
	            
	            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
	            
	            console.log('newData  '+newData);
	            
	            
         	}
	     	
 		});*/
  	
//		$('.chatShow').hide();
		
	} else {
		
		$('.gameInfo').show();
		
	}
	
	
	console.log('showGameInfo  received  event.sceneNum  ')
	
});

function getClickLotus (prizeName) {
	
		console.log('总 采摘次数  totalCount  '+totalCount);
	
		if (totalCount < 5) {
			
			// 不够次数，需要邀请好友  邀请好友弹窗
				
				respondTxt = ' OMG! 您的采摘次数已经没有了，邀请好友参与游戏，就可获得新的采摘次数哦！';
				
				$('#gobtn').text('邀请好友');
				
				showTxt(true);
				
				return;
				
		} 
	
		playCount++;
		
		
		if (playCount == 5) {
			
			
			if (leftCount == 0) {
				
				
				leftCount = totalCount - playCount;
				
			} else {
				
				leftCount = leftCount - playCount;
				
			}
			
			console.log('剩余 采摘次数  leftCount  '+leftCount)
			
			
			if (leftCount < 5) {
				
				// 不够次数，需要邀请好友  邀请好友弹窗
				
				respondTxt = ' OMG! 您的采摘次数已经没有了，'+'\n'+'邀请好友参与游戏，'+'\n'+'就可获得新的采摘次数哦！';
				
				$('#gobtn').text('邀请好友');
				
				showTxt(true);
				
				return;
				
			} else {
				
				playCount = 0;
				
				respondTxt = '这一轮的采摘已经结束，您可以再玩一次！';
				
				$('#gobtn').text('再玩一次');
				
				showTxt(true);
				
				return;
				
			}
			
		}
	
		
//				simulateClickResult = 4;
		
		console.log('simulateClickResult   '+simulateClickResult );
		
		switch (simulateClickResult) {
			
			case 1:
			
				getFLowerCount ++;
				
				$('.titbg').html('隐莲+1');
				
				$('.yinLNum').attr('src','http://hcvr.github.io/hc/hcvr/img/yinlianPlus.png');
				
				respondTxt = '太好了，采到隐莲了！';
			
				break;
				
			case 2:
				
				getFLowerCount --;
				
				$('.titbg').html('隐莲-1');
				
				$('.yinLNum').attr('src','http://hcvr.github.io/hc/hcvr/img/yinlianSub.png');
				
				respondTxt = '倒霉！不小心 采到毒药了！';
				
				break;
				
			case 3:
			
				ifGetNull = true;
			
				respondTxt = '这个好像什么都没采到';
			
				break;
				
			case 4:
				
				ifGetPrize = true;
				
				if (prizeName!= '') {
					
					respondTxt = '恭喜！您采到了'+prizeName+'！';
					
				} else {
					
					respondTxt = '恭喜！您采到了宝箱！';
				}
				
			
				break;

		}
		
		
		if (ifGetPrize) {
			
			
			ifGetPrize = false;
			
			getPrizeCount ++;
			
			
			var treaWidth = $("#trea").width() / 2;
			
			var treaHeight = $("#trea").height() / 2;
			
			
			$('#trea').css('display','block');
			
			$('#trea').css('opacity','100');					
			
			$('#trea').css('top', ( krpano.get('mouse.stagey') - treaHeight )+'px');
			
			$('#trea').css('left', ( krpano.get('mouse.stagex') - treaWidth )+'px');
			
			
			setTimeout(function () {
				
				
				$('#trea').animate({'top':'0','opacity':'0'},500,function() {
			
				    // Animation complete.
				    
					$('#trea').css('display','none');
					
				    
				  });
				
			}, 700);
			
			
			
			console.log('mouse.stagey  '+krpano.get('mouse.stagey'));
			
			console.log('mouse.stagex  '+krpano.get('mouse.stagex'));
			
			
			$('#treaNum').children('p').text(String(getPrizeCount));
			
			
		} else {
			
			if (ifGetNull) {
				
				ifGetNull = false;
				
			} else {
				
				
				var yinLWidth = $(".yinL").width() / 2;
				
				var yinLHeight = $(".yinL").height() / 2;
				
				console.log('yinLWidth   '+yinLWidth + '  yinLHeight  '+yinLHeight)
				
				
				$('.yinL').css('display','block');
				
				$('.yinL').css('opacity','100');					
				
				
				$('.yinL').css('top', ( krpano.get('mouse.stagey') - yinLHeight )+'px');
				
				$('.yinL').css('left', ( krpano.get('mouse.stagex') - yinLWidth )+'px');
				
				
				
				/*$('.yinL').css('top', '50%');
				
				$('.yinL').css('left', '50%');*/
				
				
				setTimeout(function () {
					
					
					$('.yinL').animate({'top':'0','opacity':'0'},500,function() {
				
					    // Animation complete.
					    
						$('.yinL').css('display','none');
						
					    
					  });
					
				}, 700);
				
			}
			
			
			$('#yinlianNum').children('p').text(String(getFLowerCount));
		
		}
		
		
		showTxt(false);
		
		
   		console.log('clickTime from kranpo '+ krpano.get('clickTime') );
	
}


function showTxt (ifTriggerInvite) {
	
	
	/*if ( $('#clickShow').css('visibility') === 'hidden' ) {
		
		$('#clickShow').show();
		
	}*/
	
	if (!ifTriggerInvite) {
		
		$('#gobtn').css('display','none');
		
	} else {
		
		$('#gobtn').css('display','inline-block');
		
	}
	
	
	$('#clickShow').children('p').html(respondTxt);
	
	
	$('#clickShow').css('display','inline-block');
	
	$('#clickShow').css('opacity','100');					
	
	
	var showWidth = $("#clickShow").width() / 2;
			
	var showHeight = $("#clickShow").height() / 2;
	
	
	console.log('gobtn display  '+$('#gobtn').css('display'))
	
	console.log('showWidth  '+showWidth +'  showHeight  '+showHeight);
	
	
	console.log('ifTriggerInvite  '+ifTriggerInvite);
	
	
	if (!ifTriggerInvite) {
		
		
		if (respondTxt == '邀请成功，正在返回大厅' || respondTxt == '正在返回大厅...') {
			
			
			$('#clickShow').css('width','1.5rem');
		
			$('#clickShow').css('height', '.6rem');
			
			$('#clickShow').css('top', '0');
		
			$('#clickShow').css('left', '0');
			
			$('#clickShow').css('bottom', '0');
			
			$('#clickShow').css('right', '0');
			
			
		} else {
			
			
			$('#clickShow').css('top', ( krpano.get('mouse.stagey') + 45 ) +'px');
			
			$('#clickShow').css('left', ( krpano.get('mouse.stagex') - showWidth ) +'px');
			
			
			console.log('clickShow top '+$('#clickShow').css('top') + '  stagey  ' +krpano.get('mouse.stagey') )
			
			console.log('clickShow left '+$('#clickShow').css('left') + '  stagex  ' +krpano.get('mouse.stagex') )
			
			
			
		}
		
		
		
		/*$('#clickShow').css('top', ( krpano.get('mouse.stagey') + showHeight )+'px');
		
		$('#clickShow').css('left', ( krpano.get('mouse.stagex') - showWidth )+'px');
		
		*/
		
		setTimeout(function () {
			
			
			$('#clickShow').animate({'opacity':'0'},500,function() {
		
			    // Animation complete.
			    
				$('#clickShow').css('display','none');
				
			    
			  });
			
		}, 700);
		
		
	} else {
		
		
		krpano.call('hideHotSpots');
		
		
		$('#clickShow').css('width','2rem');
		
		$('#clickShow').css('height', '1.3rem');
		
		$('#clickShow').css('top', '0');
		
		$('#clickShow').css('left', '0');
		
		$('#clickShow').css('bottom', '0');
		
		$('#clickShow').css('right', '0');
		
		$('#overlay').show();
		
		$('#overlay').fadeIn('fast');
		
	}
	
		
}


embedpano({swf:"http://hcvr.github.io/hc/hcvr/tour.swf", xml:"http://hcvr.github.io/hc/hcvr/tour.xml", target:"pano", html5:"only+webgl", initvars:{design:"flat"}, passQueryParameters:true, onready:krpanoReady});


function krpanoReady(krpanObj)
{
	
	krpano = krpanObj;
	
//	krpano.call("moveto(-90,0,smooth())");
	
	
	console.log('hlookat  '+krpano.get('view.hlookat'));
	
	console.log('vlookat  '+krpano.get('view.vlookat'));
	
	
	/*$('.chat').show();
	
	$messages.mCustomScrollbar();
	
	setTimeout(function() {
    	fakeMessage();
  	}, 100);*/
  	
  	
  
	$('#gobtn').on('click', function(e) {
		
		
		console.log('gobtn txt  '+$('#gobtn').text() );
		
		
		$('#clickShow').css('width','auto');
		
		$('#clickShow').css('height', 'auto');
		
		$('#clickShow').css('top', 'auto');
		
		$('#clickShow').css('left', 'auto');
		
		$('#clickShow').css('bottom', 'auto');
		
		$('#clickShow').css('right', 'auto');
		
		
		$('#clickShow').css('display','none');
		
		
		if ( $('#gobtn').text() == '再玩一次' ) {
			
			
			$('#overlay').hide();
		
			$('#overlay').fadeOut('fast');
			
			
			krpano.call("loadscene('scene__________');");
			
			
			$('#treaNum').off('click',function () {
	
				window.location.href = 'hc/chest';
				
			})
			
			
			$('#treaNum').removeClass('trea');
							
							
			$('#treaNum').addClass('treaNum');
			
			
			$('#treaNum').children('p').show();
			
			
			
		} else if ( $('#gobtn').text() == '邀请好友' ) {
			
			getFri();
			
			
		} else {
			
			
			
		}
		
	
	});
	
	
	$('#changeFir').on('click', function () {
		
		friPage++;
		
		getFri();
		
	});
	
	
	function getFri() {
		
		var postFri = {
			
			page: friPage
		}
		
		if (IF_NET) {
					
			ajaxRequest(false, "post", 'getfriend', postFri, function(result) {
			
			
						if (result.code != 10000) {
							
							
							/*Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
						    */
						
						} else {
							
							
							/*Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 获取随机邀请好友 接口 成功  '
							    }
							);*/
							
							uidString = '';
							
							uidArr = [];
							
							screen_nameArr = [];
							
							fritoken = result.data.token;
							
							$('.picCon').empty();
							
							console.log('fritoken  '+fritoken);
							
							if (result.data.user.length > 0) {
								
								
								for (var i = 0; i < result.data.user.length; i++) {
									
									uidArr.push(String(result.data.user[i].uid))
									
									screen_nameArr.push(String(result.data.user[i].screen_name))
									
	//										uidString += String(result.data.user[i].uid)+',';
									
									var content = '<div class="friendP"><img src="'+ result.data.user[i].avatar_large +'" class="clip-circle" /></div>'
									
									$('.picCon').append(content);
								}
								
							}
							
							
							if (uidArr.length < 3) {
								
								
								if (uidArr.length == 2) {
									
									
									uidString = uidArr[0]+','+uidArr[1];
									
									screen_nameStr = screen_nameArr[0]+','+screen_nameArr[1];
									
									
								} else {
									
									
									uidString = uidArr[0];
									
									screen_nameStr = screen_nameArr[0];
									
								}
								
								
							} else {
								
								uidString = uidArr[0]+','+uidArr[1]+','+uidArr[2];
								
								screen_nameStr = screen_nameArr[0]+','+screen_nameArr[1]+','+screen_nameArr[2];
								
							}
							
							
							
							console.log('if uidString is string '+ typeof uidString);
							
							console.log('uidString.length  '+uidString.length)


//									uidString.substring(0, uidString.length - 1);
//									
//									uidString.slice(1, - 1);
							
							
							console.log('uidString  '+uidString);
							
							console.log('screen_nameStr  '+screen_nameStr);
							
							
//									$('.friendsP').append('<div id="gobtn2"></div>');
							
//									$('#gobtn2').text('一键邀请');

							
							$('.friendsP').css('display','inline-block');
							
						}
						
				
					}, errorReturn);
			
		}
	}
	
	
	$('#invite').on('click', function(e) {
		
		if (IF_NET) {
			
					var postData = {
						
						uid: uidString,
						screen_name: screen_nameStr,
						token: fritoken 
						
					}
					
					
					ajaxRequest(false, "post", 'invitefriend', postData, function(result) {
					
					
								if (result.code != 10000) {
									
									
									/*Lobibox.alert(
									    'error', // Any of the following
									    {
									        msg:result.msg
									    }
									);
								*/
								
								} else {
									
									
									/*Lobibox.alert(
									    'success', // Any of the following
									    {
									        msg:'调取 发送邀请好友 接口 成功  '
									    }
									);*/
									
									
									$('.friendsP').hide();
									
									
									
									respondTxt = '邀请成功，正在返回大厅';
									
									
									showTxt(false);
									
									
									setTimeout(function () {
										
										$('#overlay').fadeOut('fast');
									
										$('#overlay').hide();
										
										krpano.call("loadscene('scene_____________2-ok');");
										
										$('#VR').show();
										
//										$('#chatIcon').show();
									
									},700);
									
									
									
									$('.chatDiv').show();
									
									
									$('#treaNum').on('click',function () {
	
										window.location.href = 'hc/chest';
										
									})
									
									
									$('#treaNum').removeClass('treaNum');
									
									$('#treaNum').addClass('trea');
									
									$('#treaNum').children('p').hide();
									
								}
								
						
							}, errorReturn);
					
				}
		
	});

	
	$('#sentTxt').on('click', function () {
		
		
		if ($('.chatTxtVal').val() != '') {
			
		    
		    var chatTxt = $('.chatTxtVal').val();
		    
		    
		    $('.chatUI').html(chatTxt);
		    
		    
		    html2canvas( $('.chatUI'), {
		    	
		    	
	         onrendered: function (canvas) {
	         	
	                chatCanvas = canvas;
	                
	                var imgageData = chatCanvas.toDataURL("image/png");
	                
	                chatData = imgageData;
	                
				    krpano.call("addhotspot(chatPng);set(hotspot[chatPng].url,'"+ chatData + "');set(hotspot[chatPng].height,70);set(hotspot[chatPng].width,70);set(hotspot[chatPng].ath,0);set(hotspot[chatPng].atv,0);");
	                
			    	console.log('render chatPng');
			    	
	                console.log('imgageData  '+imgageData);
	                
	                var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
	                
	                console.log('newData  '+newData);
	                
	                console.log('chatData  '+chatData);
	                
	             }
         	});
		    
		    
		  }
	})
	
	
	var krpanoDiv = document.getElementById('krpanoSWFObject');
	
	
	document.addEventListener("hideChat", function (event) {
		
		
		console.log("krpano.get('xml.scene')  "+krpano.get('xml.scene') );
		
		
		$('.chatDiv').hide();
		
		
		$('#treaNum').off('click',function () {
	
			window.location.href = 'hc/chest';
			
		})
		
		
//		krpano.call('hideHotSpots');
		
		
		$('#VR').hide();
			
			
		$('#chatIcon').hide();
		
		
		$('#treaNum').removeClass('trea');
							
							
		$('#treaNum').addClass('treaNum');
			
		
		$('#treaNum').children('p').show();
		
		
		onnewSceneLay();
		
		
//		$('.chat').hide();
		
	});
	
	
	document.addEventListener("updateClick", function (event) {
		
		
		if (IF_NET) {
			
			ajaxRequest(false, "get", "picklotus", '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							/*Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);*/
							
							respondTxt = ' OMG! 您的采摘次数已经没有了，'+'\n'+'邀请好友参与游戏，'+'\n'+'就可获得新的采摘次数哦！';
				
							$('#gobtn').text('邀请好友');
							
							showTxt(true);
						
						
						} else {
							
							
							/*Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 采隐莲接口 成功  '
							    }
							);*/
							
							
							simulateClickResult = result.data.type;
							
							
//									totalCount = result.data.tickets;
							
							
							if (simulateClickResult == 4) {
								
								
								getClickLotus(result.data.prize.content);
								
							} else {
								
								
								getClickLotus('');
								
							}
							
							
						}
						
				
					}, errorReturn);
			
		} else {
			
			
			simulateClickResult = Math.round(Math.random() * 4);
			
			
			if (simulateClickResult == 0) {
				
				simulateClickResult = 1
				
			}
			
			getClickLotus('');
			
		}
		
	
	});
	
	
 	krpano.set('clickTime', 0);
 	
 	krpano.set('sceneNum', 0);
	
	
	console.log('krpano  '+krpano);
	
	console.log('krpanoDiv  '+krpanoDiv);
	
	
	if (IF_NET) {
		
	
			ajaxRequest(false, "get", "getvruser", '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							/*Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);*/
						
						
						} else {
							
							$('#userImg').attr('src',result.data.avatar_large);
							
							$('.userInfo').children('p').text(result.data.screen_name);
							
//							$('.userInfo').children('p').autoshrink();

//							$(".userInfo").textfill();	
							
							totalCount = result.data.tickets;
							
							
							$('#yinlianNum').children('p').text(String( result.data.lotus ));
							
							
							/*Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'获取 登录用户的基本信息和隐莲信息 成功   当前用户 剩余可玩次数   '+totalCount
							    }
							);*/
							
							console.log('当前用户 剩余可玩次数   '+totalCount)
						}
						
						
				
					}, errorReturn);
					
					
			} else {
				
				
				
			}
					
					
				
}