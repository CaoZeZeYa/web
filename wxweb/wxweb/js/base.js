$.ajax({
				url:"http://192.168.43.240:8080/caSignIface/replaceKeyWord", 
				contentType: "application/json",
				type:"POST",
				data:JSON.stringify({
				"CustomerName":"刘翔",
				"CustomerIdNo":"123",
				"UserId":"111",
				"PartnerCode":"rewqrewqrewq",
				"mobile":"13890088890"
			}),
				dataType:"json",
				beforeSend:function(){
					$(".wrapper1").show()
				},
				success:function(data){
					$(".wrapper1").hide()
					$("#btn-submit2").show()
					$(".da").show()
					console.log(data)
					var c = data.msg.imgBase64
					var wono = data.msg.wono
					console.log(wono)
					localStorage.setItem("WoNo",wono)
					$("#IMG").attr("src","data:image/png;base64,"+c)
				},
				error:function(err){
					console.log(err)
				}
			})