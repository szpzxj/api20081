const express = require('express')   //引入模块
const mysql = require('mysql')
const app = express()           //调用express
const port = 8080             //服务运行的端口

app.get('/user', function (req, res) {
    // 向客户端响应数据
    res.send("欢迎访问用户接口")
})
app.get('/list', (req, res) => {
    //设置连接参数
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: '2008'
    });
    connection.connect();
    //执行query
    connection.query('select user_id,user_name,email from p_users limit 10', function (error, results, fields) {
        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        //获取查询的结果 results
        // console.log(error)
        // console.log(results)
        res.send(JSON.stringify(results))
    });
    connection.end();

})
app.get('/find', (req, res) => {
    //设置连接参数
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: '2008'
    });
    connection.connect();
    //执行query
    connection.query("select * from p_users where user_name like '%张爽", function (error, results, fields) {
        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        //获取查询的结果 results
        // console.log(error)
        // console.log(results)
        res.send(JSON.stringify(results))
    });
    connection.end();
})
app.get('/', (req, res) => {

    const list = [
        {
            userid: 1001,
            name: "wangming",
            age: 18
        },
        {
            userid: 1002,
            name: "xiaozong",
            age: 17
        },
        {
            userid: 1003,
            name: "songzhipeng",
            age: 18
        }
    ]
    //将数组转为JSON字符串
    res.send(JSON.stringify(list))
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})