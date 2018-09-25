$(window).ready(function () {
    //分享js

    var metaTags = document.getElementsByTagName("meta");

    function getMetaContentByName(name) {
        if (metaTags.length > 0) {
            for (var i = 0; i < metaTags.length; i++) {
                var e = metaTags[i];
                if (e.getAttribute("name") == name) {
                    return e.getAttribute("content");
                }
            }
        }
        return "";
    }

    //初始化微信SDK信息
    var weixinSdkOptions = {
        url: "/api/wx/jssdk",
        //autoRequestWeixinSdk: (window.location.host == "h5.sktap.cn"),
        autoRequestWeixinSdk: true,//是否自动请求微信 SDK接口
        shareLink: getMetaContentByName("wxm:link"),//这里如果是空  默认地址是用户当前访问的网站 如果需要自定义需要填写http开头的绝对地址
        shareTimeline: {
            title: getMetaContentByName("wxm:timeline_title"),
            desc: getMetaContentByName("wxm:timeline_title"),
            link: getMetaContentByName("wxm:link"),
            imgUrl: getMetaContentByName("wxm:img_url"),//这里如果是空  默认地址是img/weiShareImg.png文件 如果需要自定义需要填写http开头的绝对地址
            events: {
                trigger: null,
                success: function () {
                    console.log("success-Timeline")
                },
                cancel: null,
                fail: null
            }
        },
        shareFriends: {
            title: getMetaContentByName("wxm:appmessage_title"),
            desc: getMetaContentByName("wxm:appmessage_desc"),
            link: getMetaContentByName("wxm:link"),//这里如果是空  默认地址是用户当前访问的网站 如果需要自定义需要填写http开头的绝对地址
            imgUrl: getMetaContentByName("wxm:img_url"),//这里如果是空  默认地址是img/weiShareImg.png文件 如果需要自定义需要填写http开头的绝对地址
            events: {
                trigger: null,
                success: function () {
                    console.log("success-shareFriends")
                },
                cancel: null,
                fail: null
            }
        },
        params: {//在这里定义用户分享出去的URL需要传递的参数 可以在代码里动态的修改 window.jssdk.options.params.cake = "sss";window.jssdk.update();
            // fromopenid: window.openid
        }
    };
    var jssdk = new WeiXinJSSDK(weixinSdkOptions);
    jssdk.setup();

    window.jssdk = jssdk;
});
