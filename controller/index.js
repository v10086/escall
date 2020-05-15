import base from "./base.js";//导入并继承基类
export default  class index extends base {
      
    //首页    
    async index(){
        this.response.body="欢迎来到潘达利亚风暴酿酒厂,请问你是姓陈还是姓成或者姓程?";
        return this.response;
    }
    
    //async  await Promise.all 异步批量处理请求
    async batch(){
        const [promise_0, promise_1] =  await Promise.all([
            async   function ()  {
                return '任务一 end'
            }(), 
            async   function ()  {
                return '任务二 end';
        }()]).catch((error) => {
              console.log(error);
        });
        this.response.body=promise_0+" "+promise_1;
        return this.response;
    }
    
    //async  await Promise.all 异步批量处理请求
    async batchV2(){
        const promise_0=  async   function ()  {
                return '任务一 end'
            }();
        const promise_1=  async   function ()  {
                return '任务二 end'
            }();
        this.response.body=await promise_0+" "+ await promise_1;
        return this.response;
    }
    
}

