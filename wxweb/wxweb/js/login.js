$(function () {
    var _this = this;
    var ServiceAPI = WellApi(api);
    _this.partnercode = Sktap.queryString("partnercode");
    _this.psalecode = Sktap.queryString("psalecode");


    $(".btn-submit").tap(function () {
        var phone = $(".login-box").find(".phone").val();
        var code = $(".login-box").find(".code").val();
        var username = $(".login-box").find(".username").val();
        var captcha = $(".login-box").find(".captcha").val();

        var stringHan = /^[\u4e00-\u9fa5]+$/;

        if (username.trim() == "") {
            alert("姓名不能为空！");
            return false;
        }
        if (username.trim().length < 2) {
            alert("请输入正确的姓名！");
            return false;
        }
        if (!stringHan.test(username)) {
            alert("请输入汉字");
        } else if (!phone.isMobileNo()) {
            alert("请输入正确的手机号！");
        } else if (captcha.trim() == "") {
            alert("请输入验证码！")
        } else {
            ServiceAPI.postRegisterMsg.fire({}, {
                partnercode: _this.partnercode,
                psalecode: _this.psalecode,
                empname: username,
                mobile: phone,
                code: captcha
            })
                .done(function (res) {
                    console.log(res);
                    if (res.code == 0) {
                        window.location = "success.html?id=" + res.id;
                    } else {
                        alert(res.msg)
                    }
                })
                .fail(function (res) {
                    alert(res.msg)
                });
        }
    });


    var isTap = false;
    $(".code").tap(function () {
        if (!isTap) {
            var phoneNumber = $(".phone").val();
            if (!phoneNumber.isMobileNo()) {
                alert("请输入正确的手机号码！")
            } else {
                ServiceAPI.isRegistered.fire({
                    id: phoneNumber
                })
                    .done(function (res) {
                        console.log(res);
                        if (!res.flag) {
                            alert("该号码已被注册，请重新输入")
                        }else{
                            isTap = true;
                            new countTime(".code");
                            $.ajax({
                                url: '/api/sendPhoneCode/' + phoneNumber,
                                type: 'GET',
                                dataType: "json",
                                headers: {
                                    Accept: "application/json; charset=utf-8",
                                    token: "" + sessionStorage.getItem("token")
                                }
                            }).done(function (res) {
                                console.log(res);
                                if (res.code != 0) {
                                    alert(res.msg)
                                } else {
                                    console.log("获取验证码成功")
                                }
                            }).fail(function (res) {
                                alert(res.msg);
                                $("#data-loading").hide();
                            })
                        }
                    })
                    .fail(function (res) {
                        alert(res.msg)
                    });

            }
        }
    });

    //倒计时获取验证码
    function countTime(obj) {
        var count = 60;
        setTime(obj);

        function setTime(obj) {
            if (count == 0) {
                $(obj).text("获取验证码");
                count = 60;
                isTap = false;
                return;
            } else {
                $(obj).text(count + "s后重新发送");
                count--;
            }
            setTimeout(function () {
                setTime(obj)
            }, 1000)
        }
    }
});

