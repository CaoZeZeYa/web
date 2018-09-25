/**
 * Created by ZR on 2018/1/11.
 */

var api = {
    basePath: '',
    pathList: [
        {
            name: 'postRegisterMsg',
            path: '/api/register',
            method: 'POST'
        },{
            name: 'postRegisterMsg',
            path: '/api/register',
            method: 'POST'
        }, {
            name: 'addMsg',
            path: 'http://192.168.1.91:8090/api/addMsg',
            method: 'POST'
        }, {
            name: 'checkStatus',
            path: '/api/checkStatus',
            method: 'GET'
        }, {
            name: 'getInfo',
            path: '/api/getInfo',
            method: 'GET'
        }, {
            name: 'isRegistered',
            path: '/api/checkPhone/{{id}}',
            method: 'GET'
        }/*,{
        	name: 'submit1',
        	path: 'http://192.168.1.91:8090/caSignIface/signatureName',
        	method: 'POST'
        }*/
    ]
};