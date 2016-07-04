var krpano, WHRatio, chatData, chatCanvas; resizeTriggerNum = 0; whElementArr = []; screen_nameArr = []; uidArr = []; fritoken = ''; uidString = ''; leftCount = 0; totalCount = 7; playCount = 0; respondTxt = ''; getPrizeCount = 0; simulateClickResult = 0; getFLowerCount = 0; ifGetNull = false; ifGetPrize = false;

//字体图片随窗体缩放
function door() {
	
	var sreen = $(window).width();
	
	$("html").css("fontSize", sreen / 32);
	
}


function calcWHratio () {
	
	
	var orgDeg = window.orientation;
	
	if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
		
		WHRatio = document.documentElement.clientHeight / document.documentElement.clientWidth;
		
	} else {
		
		WHRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
	}
	
	
	console.log('calcWHratio WHRatio '+WHRatio);
	
	
	/*if (orgDeg == 0) {
				
		WHRatio = document.documentElement.clientHeight / document.documentElement.clientWidth;
		
	} else {
		
		WHRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
		
	}*/
	
	var curElementWidth, curElementHeight;
	
	
	$('*').filter(function() {
		
		
		if ( $(this).css('width').toLowerCase().indexOf('vw') > -1 ) {
			
			curElementWidth = $(this).css('width');
			
			curElementHeight = $(this).css('height');
			
			console.log('curElementHeight  '+curElementHeight+' curElementWidth '+curElementWidth)
		
			return $(this);
		}
		
	
//	  	return $(this).css('width').toLowerCase().indexOf('vw') > -1;
	  	
	  
	}).css('width', curElementWidth * WHRatio+'vw').css('height', curElementWidth * WHRatio+'vh');
	
	
	
}


/*alert('window.orientation  '+window.orientation);

alert('window.devicePixelRatio  '+window.devicePixelRatio); 
*/


// Listen for orientation changes      
window.addEventListener("orientationchange", function() {
	
    // Announce the new orientation number
    
    
    console.log('orientationchange  window.screen.orientation  '+window.screen.orientation);
    
    
}, false);



window.onresize = function() {
	
	
	resizeTriggerNum++;
	
	
	calcWHratio();
	
	
	console.log('onresize  resizeTriggerNum  '+resizeTriggerNum);
	
	
	/*alert('onresize  screen.width   '+ window.screen.width + '  screen.height  '+ window.screen.height);
	
	
	alert('onresize  outerWidth  '+ window.outerWidth + '  outerHeight  '+ window.outerHeight);
	
	
	alert('onresize  clientWidth  '+ document.documentElement.clientWidth + '  clientHeight  '+ document.documentElement.clientHeight);
	
	
	alert('onresize  offsetWidth  '+ document.documentElement.offsetWidth + '  offsetHeight  '+ document.documentElement.offsetHeight);
	*/
	
	
}


//$(".userInfo").textfill();


$('#pano').on('click', function () { 
	
    $('.chatTxtVal').blur(); 

});


$('#begin').on('click', function () {
	
	hideGameInfo();
})


function hideGameInfo () {
	
	$('.gameInfo').hide();
	
	$('#overlay').hide();
		
	$('#overlay').fadeOut('fast');
	
}


$('#treaNum').on('click',function () {
	
	window.location.href = 'http://www.weibo.com';
	
})



function showGameInfo () {
	
	$('.gameInfo').show();
	
	$('#overlay').show();
		
	$('#overlay').fadeIn('fast');
}


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
				
//				$('.yinLNum').attr('src','http://hcvr.github.io/hc/hcvr/img/yinlianPlus.png');
				
				respondTxt = '太好了，采到隐莲了！';
			
				break;
				
			case 2:
				
				getFLowerCount --;
				
				$('.titbg').html('隐莲-1');
				
//				$('.yinLNum').attr('src','http://hcvr.github.io/hc/hcvr/img/yinlianSub.png');
				
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
		
		
		$('#clickShow').css('top', ( krpano.get('mouse.stagey') + 45 ) +'px');
		
		$('#clickShow').css('left', ( krpano.get('mouse.stagex') - showHeight ) +'px');
		
		
		console.log('clickShow top '+$('#clickShow').css('top') + '  stagey  ' +krpano.get('mouse.stagey') )
		
		console.log('clickShow left '+$('#clickShow').css('left') + '  stagex  ' +krpano.get('mouse.stagex') )
		
		
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
		
		
		$('#clickShow').css('width','70vw');
		
		$('#clickShow').css('height', '10rem');
		
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
	
	
	/*
	$('.chat').show();
	
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
	
				window.location.href = 'http://www.weibo.com';
				
			})
			
			
			$('#treaNum').removeClass('trea');
							
							
			$('#treaNum').addClass('treaNum');
			
			
			$('#treaNum').children('p').show();
			
			
			
		} else if ( $('#gobtn').text() == '邀请好友' ) {
			
			getFri();
			
			
		} else {
			
			
			
		}
		
	
	});
	
	
	$('#changeFir').on('click', getFri);
	
	
	function getFri() {
		
		if (IF_NET) {
					
			ajaxRequest(false, "get", 'getfriend', '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
						
						
						} else {
							
							
							Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 获取随机邀请好友 接口 成功  '
							    }
							);
							
							uidString = '';
							
							uidArr = [];
							
							screen_nameArr = [];
							
							fritoken = result.data.token;
							
							$('.picCon').empty();
							
							console.log('fritoken  '+fritoken);
							
							for (var i = 0; i < result.data.user.length; i++) {
								
								uidArr.push(String(result.data.user[i].uid))
								
								screen_nameArr.push(String(result.data.user[i].screen_name))
								
//										uidString += String(result.data.user[i].uid)+',';
								
								var content = '<div class="friendP"><img src="'+ result.data.user[i].avatar_large +'" class="clip-circle" /></div>'
								
								$('.picCon').append(content);
							}
							
							
							uidString = uidArr[0]+','+uidArr[1]+','+uidArr[2];
							
							screen_nameStr = screen_nameArr[0]+','+screen_nameArr[1]+','+screen_nameArr[2];
							
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
									
									
									Lobibox.alert(
									    'error', // Any of the following
									    {
									        msg:result.msg
									    }
									);
								
								
								} else {
									
									
									Lobibox.alert(
									    'success', // Any of the following
									    {
									        msg:'调取 发送邀请好友 接口 成功  '
									    }
									);
									
									
									$('.friendsP').hide();
									
									
									$('#overlay').hide();
		
									$('#overlay').fadeOut('fast');
									
									
									krpano.call("loadscene('scene_____________2-ok');");
									
									
									$('.chatDiv').show();
									
									
									$('#treaNum').on('click',function () {
	
										window.location.href = 'http://www.weibo.com';
										
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
	                
	                console.log('imgageData  '+imgageData);
	                
	                var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
	                
	                console.log('newData  '+newData);
	                
	                console.log('chatData  '+chatData);
	                
	             }
         	});
		    
		    krpano.call("addhotspot(chatPng);set(hotspot[chatPng].url,"+ chatData +");set(hotspot[chatPng].height,30);set(hotspot[chatPng].width,30);set(hotspot[chatPng].ath,0);set(hotspot[chatPng].atv,0);set(hotspot[chatPng].onhover,showtext('hovering the new chatPng'));set(hotspot[newspot].zoom,true);set(hotspot[chatPng].onclick, removelayer(chatPng) );");
		    
		    console.log('render chatPng');
		  }
	})
	
	
	var krpanoDiv = document.getElementById('krpanoSWFObject');
	
	
	document.addEventListener("hideChat", function (event) {
		
		
		$('.chatDiv').hide();
		
		
		$('#treaNum').off('click',function () {
	
			window.location.href = 'http://www.weibo.com';
			
		})
		
		
		$('#treaNum').removeClass('trea');
							
							
		$('#treaNum').addClass('treaNum');
			
		
		$('#treaNum').children('p').show();
		
		
		showGameInfo();
		
//		$('.chat').hide();
		
	});
	
	
	document.addEventListener("updateClick", function (event) {
		
		
		if (IF_NET) {
			
			ajaxRequest(false, "get", "picklotus", '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
							
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
	
	
	console.log('krpano  '+krpano);
	
	console.log('krpanoDiv  '+krpanoDiv);
	
	
	if (IF_NET) {
		
	
			ajaxRequest(false, "get", "getvruser", '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
						
						
						} else {
							
							$('#userImg').attr('src',result.data.avatar_large);
							
							$('.userInfo').children('p').text(result.data.screen_name);
							
//							$('.userInfo').children('p').autoshrink();

//							$(".userInfo").textfill();	
							
							totalCount = result.data.tickets;
							
							
							Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'获取 登录用户的基本信息和隐莲信息 成功   当前用户 剩余可玩次数   '+totalCount
							    }
							);
							
							console.log('当前用户 剩余可玩次数   '+totalCount)
						}
						
						
				
					}, errorReturn);
					
			} else {
				
				
				
			}
					
					
				
}