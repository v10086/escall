import {serve} from "https://deno.land/std/http/server.ts";
import app from "./config/app.js";//获取访问的接口路径
import route from "./config/route.js";//获取访问的接口路径

//启动http 服务
const s = serve({ port: app.get('post') });

for await (const req of s) {
    //获取接口地址
    let api;
    if(req.url.indexOf("?")==-1){
        api=req.url;
    }else{
        api=req.url.substr(0, req.url.indexOf("?"));
    }

    //接口不存在则响应 http 404
    if(!route.has(api)){
        //设置http响应头
        let headers = new Headers();
        headers.append("content-type", "text/html;charset=utf-8");
        req.respond({status:404, body: "404 Not Found",headers});
    }else{
        try {
            let controller_class = await import(route.get(api).class);
            let $class = new controller_class.default(req);
            req.respond(await eval(" $class."+route.get(api).function+"()"));
 
        } catch (error) {
            //设置http响应头
            let headers = new Headers();
            headers.append("content-type", "text/html;charset=utf-8");
            console.log("error",error)
            req.respond({status:500, body: "500 Internal Server Error",headers});
        }finally {


            
        }
    }
}