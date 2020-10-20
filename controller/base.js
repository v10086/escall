//基类
export default  class base {
    //类初始化   
    constructor(request) {
        this.request = request;
        this.response={headers:new Headers(),status:200,body:null};
        this.response.headers.set("content-type", "text/html;charset=utf-8");
    }
}

