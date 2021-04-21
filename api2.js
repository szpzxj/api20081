const express = require('express')      //引入模块
const bodyParser = require('body-parser')       //引入 body-parse 用来解析 接收到的post数据
const mysql = require('mysql')
const app = express()                   // 调用 express
const port = 8080                       // 服务运行的端口


//设置连接参数
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456abc',
    database : 'api2008'
});


//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-type",);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json())

//
app.get('/', (req, res) => {
    res.send()
})

// 登录接口
app.post('/user/login',function(req,res){
    console.log(req.body)
    let user_name = req.body.name      //接收的用户名
    let user_pass = req.body.pass      // 接收的密码

    // TODO 查询数据库
    const sql = `select * from p_users where user_name='${user_name}' and password='${user_pass}'`
    console.log(sql)
    connection.query(sql,function(err,result){
        console.log(result)

        if(result.length){      // 登录成功 ,将用户id返回
            let response = {
                errno: 0,
                msg: "ok",
                data: {
                    userid: result.user_id
                }
            }
            res.send(response)
        }else{          // 登录失败
            let response = {
                errno: 40003,       //自定义错误码
                msg: "登录失败，用户名或密码错误",
            }
            res.send(response)
        }

    })

})

//个人中心
app.get("/user/center",function(req,res){

})

//用户列表
app.get('/user/list',(req,res)=>{
    const sql = "select user_id,user_name,email,mobile from p_users order by user_id desc limit 5"
    connection.query(sql,function(err,result){
        res.send(result)
    })
})


//获取用户信息
app.get('/user/detail',(req,res)=>{
    console.log(req.query)
    let uid = req.query.uid
    let sql = `select user_id,user_name,email,mobile from p_users where user_id=${uid}`

    connection.query(sql,function(err,result){
        res.send({
            errno: 0,
            msg: 'ok',
            data:{
                u:result[0]
            }
        })
    })
})

//更新用户信息
app.post('/user/update',(req,res)=>{


    let user_id = req.body.user_id
    let user_name = req.body.user_name
    let email = req.body.email
    let mobile = req.body.mobile

    sql = `update p_users set user_name='${user_name}',email='${email}',mobile='${mobile}' where user_id=${user_id}`

    connection.query(sql,function(err,result){
        res.send({
            errno: 0,
            msg: 'ok'
        })
    })
})



// 用户注册
app.post('/user/reg',function(req,res){
    // 接收post数据
    const body = req.body
})

app.get('/cart/goods',function(req,res){
    // TODO 查询购物车数据
    const list = [
        {"id":101,"goods_id":1234,"goods_name":"IphoneX","price":8888,"num":3,"userid":1234},
        {"id":102,"goods_id":2345,"goods_name":"Iphone8","price":9999,"num":1,"userid":1234},
        {"id":103,"goods_id":5432,"goods_name":"Iphone7","price":7777,"num":2,"userid":1234},
        {"id":104,"goods_id":6789,"goods_name":"Iphone6","price":6666,"num":1,"userid":1234},
        {"id":105,"goods_id":8765,"goods_name":"Iphone5","price":5555,"num":1,"userid":1234}
    ]

    res.send({
        errno: 0,
        msg: "ok",
        data: {
            list: list
        }
    })
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})