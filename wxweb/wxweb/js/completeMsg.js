$(function () {
    var urlId = Sktap.queryString("id");
    var _this = this;
    _this.bankList_ul = $(".bankList ul");
    _this.bankList = $(".bankList");
    _this.dialog_page = $(".dialog-wrapper-bank");


    function isIphoneX() {
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }

    if (isIphoneX()) {
        _this.bankList.css("height", "506px")
    }


    var ServiceAPI = WellApi(api);
    // Sktap.Init();

//  ServiceAPI.getInfo.fire()
//      .done(function (res) {
//          console.log(res);
//          var results = res.data;
//          if (res.code == 0) {
//              if (urlId != "") {
//                  window.id = urlId;
//              } else {
//                  window.id = results.id;
//              }
//
//
//              if (results.idcode != null) {
//                  $(".IDCard").attr("value", results.idcode)
//              }
//              if (results.paybankname != null) {
//                  $(".bank").attr("value", results.paybankname)
//              }
//              if (results.bankaccount != null) {
//                  $(".bankID").attr("value", results.bankaccount)
//              }
//              if (results.idaurl != null) {
//                  $(".item1 img").attr("src", results.idaurl)
//              }
//              if (results.idburl != null) {
//                  $(".item2 img").attr("src", results.idburl)
//              }
//              if (results.bankcardurl != null) {
//                  $(".item3 img").attr("src", results.bankcardurl)
//              }
//              if (results.guarantorname != null) {
//                  $(".username").attr("value", results.guarantorname)
//              }
//              if (results.guarantorcode != null) {
//                  $(".workId").attr("value", results.guarantorcode)
//              }
//              if (results.gsalecode != null) {
//                  $(".workId1").attr("value", results.gsalecode)
//              }
//              if (results.licurl != null) {
//                  $(".item4 img").attr("src", results.licurl)
//              }
//          }
//      })
//      .fail(function (res) {
//          alert(res.msg)
//      });


    $(".btn-submit").click(function () {
    	alert("hahah");
    	window.location = "agreement.html";
//  	var xingMing = $(".username").val()
        var username = $(".username").val().trim();
        var workId = $(".workId").val().trim();
//      var workId1 = $(".workId1").val().trim();
        var workId1 = "";
        ServiceAPI.addMsg.fire({}, {
            id: window.id,
            guarantorname: username,
            guarantorcode: workId,
            gsalecode: workId1,
            status: 2
        })
            .done(function (res) {
                console.log(res)
                if (res.code == 0) {
                    window.location = "result.html";
                }
            })
            .fail(function (res) {
                alert(res.msg)
            });
    });


  $(".btn-submit2").click(function huoQu() {
    	let baoWen = $("#result").val()
    	if($("#result").val() == ""){
    		alert("没有签名 无法进行下一步")
    	}else{
    		alert("输入正确")
    		localStorage.setItem("baowen",baoWen)
    		let baowen = localStorage.getItem("baowen")
    		console.log(baowen)
    		let PartnerCode = localStorage.getItem("PartnerCode")
    		let wono = localStorage.getItem("WoNo")
    		console.log(wono)
    		$.ajax({
				url:"http://192.168.43.240:8080/caSignIface/signatureName", 
				contentType: "application/json",
				type:"POST",
				data:JSON.stringify({
					"WoNo":wono,
					"PartnerCode":PartnerCode,
					"fileName1":baowen
				}),
				dataType:"json",
				success:function(data){
					window.location.href="success.html"
					console.log(data) 
				},
				error:function(err){
					alert(1)
				}
			})
    	}
    	
   });
   
 
    
    $(".btn-next").click(function () {
        var idCard = $(".IDCard").val();
        var bank = $(".bank").val();
        var bankID = $(".bankID").val();
        if (idCard.trim() == "" || !idCard.isIdCard()) {
            alert("请输入正确的身份证号码 !");
        } else if (bank.trim() == "") {
            alert("请选择开户银行 !");
        } else if (bankID.trim() == "" || !bankID.isBankCard()) {
            alert("请输入正确的银行卡号 !");
        } else if ($(".item1 img").attr("src") == "") {
            alert("请添加身份证正面照!");
        } else if ($(".item2 img").attr("src") == "") {
            alert("请添加身份证反面照!");
        } else if ($(".item3 img").attr("src") == "") {
            alert("请添加银行卡正面照!");
        } else {
            ServiceAPI.addMsg.fire({}, {id: window.id, idcode: idCard, paybankname: bank, bankaccount: bankID})
                .done(function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        window.location = "completeMsg2.html"
                    }
                    else if (res.code == 301) {
                        window.location = "index.html"
                    } else {
                        alert(res.msg)
                    }
                })
                .fail(function (res) {
                    alert(res.msg)
                });
        }
    });
    $(".bank").click(function () {
        _this.dialog_page.show();
        getBankList(0);
    });
    $(".btn-close").click(function () {
        _this.dialog_page.hide();
    });

    _this.dialog_page.find(".btn-pre").click(function () {
        if (window.currentPage <= 1) {
            alert("已经是第一页啦")
        } else {
            getBankList(parseInt(window.currentPage - 1));
        }
    });
    _this.dialog_page.find(".btn-next1").click(function () {
        if (window.currentPage >= window.totalPage) {
            alert("已经是最后一页啦")
        } else {
            getBankList(parseInt(window.currentPage + 1));
        }
    });
    _this.dialog_page.find(".btn-first").click(function () {
        getBankList(0);
    });
    _this.dialog_page.find(".btn-end").click(function () {
        getBankList(window.totalPage);
    });

    _this.dialog_page.find(".search-box").click(function () {
        $(".bankList li")
            .hide()
            .filter(":contains('" + ($(".bankName").val()) + "')")
            .show();
    });
    $(".bankName").keyup(function () {
        if ($(this).val() == "") {
            $(".bankList li").show();
        }
    });


    function getBankList(index) {
        var spinner = new Spinner();
        var target = $("#data-loading").get(0);
        spinner.spin(target);
        $("#data-loading").show();
        $.ajax({
            url: '/api/getBankCode/?page=' + index,
            type: 'GET',
            dataType: "json",
            headers: {
                Accept: "application/json; charset=utf-8",
                token: "" + sessionStorage.getItem("token")
            },
        })
            .done(function (res) {
                $("#data-loading").hide();
                console.log(res);
                if (res.code == 0) {
                    window.currentPage = res.page.currPage;
                    window.totalPage = res.page.totalPage;
                    $(".current-page").text(window.currentPage + "/" + window.totalPage + "页")
                    console.log(window.currentPage, window.totalPage)
                    _this.bankList_ul.html("");
                    var temp = [];
                    var bankList = res.page.list;
                    for (var i = 0, len = bankList.length; i < len; i++) {
                        temp.push('<li>' + bankList[i].nodedesc + '</li>');
                    }
                    _this.bankList_ul.append(temp.join(''));

                    $.each(_this.bankList_ul.find("li"),
                        function (i, e) {
                            $(e).click(function () {
                                var bankName = $(this).text();
                                console.log(bankName);
                                $(".bank").attr("value", bankName);
                                $(".dialog-wrapper-bank").hide();
                            })
                        });
                } else if (res.code == 301) {
                    window.location = "index.html"
                } else {
                    alert(res.msg)
                    $("#data-loading").hide();
                }
            })
            .fail(function (res) {
                alert(res.msg)
                $("#data-loading").hide();
            });
    }
});

function a(){
	
}
$(".IDCard").change(function(){
 	
 	let ShenFen = $(".IDCard").val().trim()
 	localStorage.setItem("zhi",ShenFen)
 })
//	let a=false;
//	$(".BTN_a").click(function(){
//			$(".show").hide();
//			$("#result").val("") 
//})
//	$(".BTN_b").click(function(){
//		$(".show").show();
//})

function SearchBank() {
    $(".bankList li")
        .hide()
        .filter(":contains('" + ($(".bankName").val()) + "')")
        .show();
}

/*    $(window).scrollTop(0);
    setTimeout(function () {
        location.reload();
    }, 300);*/

function photoCompress(file, w, objDiv) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function () {
        var re = this.result;
        canvasDataURL(re, w, objDiv)
    }
}

function canvasDataURL(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

//点击上传
function UploadFile(index) {
    // $(".item" + index).find("img").attr('src', "");
    upload(index);
}

//上传文件方法
function upload(index) {
    // var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    var fileObj = $("#upload" + index).get(0).files[0];// js 获取文件对象
    var url = "/api/uploadImg"; // 接收上传文件的后台地址

    var reader = new FileReader();
    //为文件读取成功设置事件


    var form = new FormData(); // FormData 对象
    if (fileObj.size / 1024 > 1025) { //大于1M，进行压缩上传
        photoCompress(fileObj, {
            quality: 0.2
        }, function (base64Codes) {
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            var bl = convertBase64UrlToBlob(base64Codes);
            form.append("id", window.id);
            form.append("flag", index);
            form.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象

            // xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            // xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            //
            // xhr.upload.onloadstart = function () {//上传开始执行方法
            //     ot = new Date().getTime();   //设置上传开始时间
            //     oloaded = 0;//设置上传开始时，以上传的文件大小为0
            // };
            //
            // xhr.send(form); //开始上传，发送form数据
            $("#data-loading").show();
            $.ajax({
                url: url,
                type: 'POST',
                data: form,
                processData: false,  // 不处理数据
                contentType: false,   // 不设置内容类型
                headers: {
                    Accept: "application/json; charset=utf-8",
                    token: "" + sessionStorage.getItem("token")
                }
            })
                .done(function (res) {
                    if (res.code == 0) {
                        $("#data-loading").hide();
                        console.log(res);

                        if(index == 1){
                            $(".IDCard").attr("value", res.idcode);
                        }else if(index ==3){
                            $(".bank").attr("value", res.paybankname);
                            $(".bankID").attr("value", res.bankaccount);
                        }
                        reader.onload = function (e) {
                            $(".item" + index).find("img").attr('src', e.target.result);
                            //正式读取文件
                        }
                        reader.readAsDataURL(fileObj);
                        console.log(res);
                    } else if (res.code == 201) {
                        alert(res.msg);
                        $("#data-loading").hide();
                    } else if (res.code == 301) {
                        window.location = "index.html";
                    } else {
                        alert(res.msg);
                        $("#data-loading").hide();
                    }
                })
                .fail(function (res) {
                    alert(res.msg);
                    $("#data-loading").hide();
                });

        });
    } else { //小于等于1M 原图上传
        form.append("file", fileObj); // 文件对象
        form.append("id", window.id);
        form.append("flag", index);
        $("#data-loading").show();
        $.ajax({
            url: url,
            type: 'POST',
            data: form,
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            headers: {
                Accept: "application/json; charset=utf-8",
                token: "" + sessionStorage.getItem("token")
            }
        })
            .done(function (res) {
                if (res.code == 0) {
                    $("#data-loading").hide();
                    console.log(res);
                    if(index == 1){
                        $(".IDCard").attr("value", res.idcode);
                    }else if(index ==3){
                        $(".bank").attr("value", res.paybankname);
                        $(".bankID").attr("value", res.bankaccount);
                    }

                    reader.onload = function (e) {
                        $(".item" + index).find("img").attr('src', e.target.result);
                        //正式读取文件
                    }
                    reader.readAsDataURL(fileObj);
                    console.log(res);

                } else if (res.code == 201) {
                    alert(res.msg);
                    $("#data-loading").hide();
                } else if (res.code == 301) {
                    window.location = "index.html";
                } else {
                    alert(res.msg);
                    $("#data-loading").hide();
                }
            })
            .fail(function (res) {
                alert(res.msg);
                $("#data-loading").hide();
            });
    }
}



