var krpano; leftCount = 0; totalCount = 10; playCount = 0; respondTxt = ''; getPrizeCount = 0; simulateClickResult = 0; getFLowerCount = 0; ifGetPrize = false; 


function getClickLotus (prizeName) {
	
		console.log('总 采摘次数  totalCount  '+totalCount)
	
		if (totalCount < 5) {
			
			// 不够次数，需要邀请好友  邀请好友弹窗
				
				respondTxt = ' OMG! 您的采摘次数已经没有了，'+'\n'+'邀请好友参与游戏，'+'\n'+'就可获得新的采摘次数哦！';
				
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
				
				respondTxt = '太好了，采到隐莲了！';
			
				break;
				
			case 2:
				
				getFLowerCount --;
				
				respondTxt = '倒霉！不小心 采到毒药了！';
				
				break;
				
			case 3:
			
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
	
	
	console.log('ifTriggerInvite  '+ifTriggerInvite)
	
	
	if (!ifTriggerInvite) {
		
		
		$('#clickShow').css('top',  krpano.get('mouse.stagey') +'px');
		
		$('#clickShow').css('left', krpano.get('mouse.stagex') +'px');
		
		
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
		
		
		$('#clickShow').css('width',showWidth+'px');
		
		$('#clickShow').css('height', ( showHeight*2 + 50 ) +'px');
		
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
			
			krpano.call("loadscene('scene_____________03_-_______-ok');");
			
			
		} else {
			
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
									
									for (var i = 0; i < result.data.user.length; i++) {
							
										var content = '<div style="top: '+ ( 16 + i*16 ) + '%'  +';" class="friendP"><p style="font-size: 200%; padding-top: .5rem; margin-left: 1rem; margin-top: .5rem;">'+ result.data.user[i].screen_name
										  +'</p><p style="font-size: 200%; position:absolute; right: 1rem; top: 0rem; margin-top: .5rem;">'+ result.data.user[i].uid
										  +'</p><img src="'+ result.data.user[i].avatar_large +'" class="friendImg" /></div>'
										
									}
									
									$('.friendsP').append(content);
									
									$('.friendsP').css('display','inline-block');
									
								}
								
						
							}, errorReturn);
					
				}
			
		}
		
	
	})

	
	
	var krpanoDiv = document.getElementById('krpanoSWFObject');
	
	
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
						
						
						} else {
							
							
							Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 采隐莲接口 成功  '
							    }
							);
							
							
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