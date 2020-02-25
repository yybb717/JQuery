const api1 = jQuery(".test");
//addClass函数测试
api1.addClass("yy");
//find函数测试
const api2 = api1.find(".child");
/*api2.addClass("bb");

api1.addClass("gg");
//end函数测试
api2.end().addClass("sb");

//each函数测试
api2.each(n => console.log(n));

//parent函数测试
api1.parent().print();

//children函数册数
api1.children().print();

api1.siblings().print();*/
//api2.index().print();
api1.next().print();
api1.prev().print();
