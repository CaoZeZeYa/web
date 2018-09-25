function WellApi(Config) {
    var headers = {
        Accept: "application/json; charset=utf-8",
        token: "" + sessionStorage.getItem("token")
    };
    var Api = function () {
    };
    Api.pt = Api.prototype;
    var util = {
        ajax: function (url, method, payload) {
            var spinner = new Spinner();
            var target = $("#data-loading").get(0);
            spinner.spin(target);
            $("#data-loading").show();

            return $.ajax({
                url: url,
                type: method || "get",
                data: JSON.stringify(payload),
                headers: headers,
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (res) {
                    $("#data-loading").hide();
                    if (res.code == 301) {
                        window.location = "index.html"
                    }
                },fail:function(res){
                    $("#data-loading").hide();
                }
            });
        },
        /**
         * [render 模板渲染]
         * 主要用于将 /users/{{userId}} 和{userId: '89898'}转换成/users/89898，和mastache语法差不多，
         * 当然我们没必要为了这么小的一个功能来引入一个模板库
         * query字符串可以当做一个参数传递进来
         * 例如： /users/{{query}}和{query:'?name=jisika&sex=1'}
         * @Author   Wdd
         * @DateTime 2017-03-13T19:42:58+0800
         * @param    {[type]} tpl [description]
         * @param    {[type]} data [description]
         * @return   {[type]} [description]
         */
        render: function (tpl, data) {
            var re = /{{([^}]+)?}}/g;
            var match = '';
            while (match = re.exec(tpl)) {
                tpl = tpl.replace(match[0], data[match[1]]);
            }
            return tpl;
        }
    };
    /**
     * [setHeader 暴露设置头部信息的方法]
     * 有些方法需要特定的头部信息，例如登录之后才能获取sesssionId,然后访问所有的接口时，必须携带sessionId
     * 才可以访问
     * @Author   Wdd
     * @DateTime 2017-03-13T10:34:03+0800
     * @param    {[type]} headers [description]
     */
    Api.pt.setHeader = function (headers) {
        headers = headers;
    };

    /**
     * [fire 发送ajax请求，this会绑定到每个接口上]
     * @Author   Wdd
     * @DateTime 2017-03-13T19:42:13+0800
     * @param    {[type]} pathParm [description]
     * @param    {[type]} payload [description]
     * @return   {[type]} [description]
     */
    function fire(pathParm, payload) {
        var url = util.render(this.path, pathParm);
        return util.ajax(url, this.method, payload);
    }

    /**
     * [for 遍历所有接口]
     * @Author   Wdd
     * @DateTime 2017-03-13T19:49:33+0800
     * @param    {[type]} var i [description]
     * @return   {[type]} [description]
     */
    for (var i = 0; i < Config.pathList.length; i++) {
        Api.pt[Config.pathList[i].name] = {
            path: Config.basePath + Config.pathList[i].path,
            method: Config.pathList[i].method,
            fire: fire
        };
    }
    return new Api();
}