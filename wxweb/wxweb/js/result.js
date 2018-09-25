$(function () {
    Sktap.Init();
    var _this = this;
    var ServiceAPI = WellApi(api);
    _this.tip = $(".tip");
    _this.btn_continue = $(".btn-continue");
    _this.tipText = $(".tipText");
    _this.success_box = $(".success-box");
    _this.vcode_box = $(".vcode-box");
    _this.saleCode = $(".saleCode");
    _this.institutionCode = $(".institutionCode");
    _this.btn_download = $(".btn-download");

    _this.btn_download.click(function(){
        window.location="https://app.zrbxyun.com/bxy/";
    });

    ServiceAPI.checkStatus.fire()
        .done(function (res) {
            console.log(res);
            if (res.code == 0) {
                if (res.status == -1) {
                    window.location = "login.html";
                } else if (res.status == 1) {
                    _this.tip.addClass("no-msg");
                    _this.btn_continue.show();
                    _this.tip.css("margin-top","150px")
                } else if (res.status == 2) {
                    _this.tip.addClass("examine");
                    _this.vcode_box.show();
                } else if (res.status == 3) {
                    _this.tip.addClass("success");
                    _this.success_box.show();
                } else if (res.status == 4) {
                    _this.btn_continue.show();
                    _this.tip.css("margin-top","150px")
                    _this.tip.addClass("fail");
                }
            } else {
                alert(res.msg)
            }
        })
        .fail(function (res) {
            alert(res.msg)
        });

    ServiceAPI.getInfo.fire()
        .done(function (res) {
            console.log(res);
            var results = res.data;
            if (res.code == 0) {
                if(results.status == 4){
                    _this.tipText.text(results.approvecomment)
                }else if(results.status == 3){
                    _this.saleCode.text(results.salecode);
                    _this.institutionCode.text(results.companycode);
                }
            } else {
                alert(res.msg)
            }
        })
        .fail(function (res) {
            alert(res.msg)
        });
});