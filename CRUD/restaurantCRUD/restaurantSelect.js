const express = require('express');// 引入 Express 模組，並建立路由
const api = express.Router();

const dbConn = require('../config');// 引入資料庫連線設定檔

// 設定路由，設定 /:id 參數，透過這個參數查詢指定的資料
api.get('/:id', (req, res) => {

    // 設定 SQL 查詢語句，查詢 shop 資料表中，shop_id 等於使用者輸入的 id
    const sql = 
    "SELECT * FROM shop WHERE shop_id = ? ; SELECT * FROM class WHERE class_id = (SELECT class_id FROM shop WHERE shop_id = ?); SELECT * FROM menu WHERE shop_id = ?;SELECT shop_id, active_title, active_picture, DATE_FORMAT(active_editdate,'%Y/%m/%d %H:%i')active_editdate, DATE_FORMAT(active_startdate,'%Y/%m/%d')active_startdate, DATE_FORMAT(active_enddate,'%Y/%m/%d')active_enddate , active_content, active_ifDel FROM active WHERE shop_id = ?ORDER BY active_startdate DESC;";
    dbConn.query(sql, //dbConn 啟動 sql //送出 sql 指令  
        [req.params.id, req.params.id, req.params.id, req.params.id], //id 是從 URL 中獲得的參數
        function (err, results) {
            if (err) {
                res.status(500).json({ error: 'select 發生錯誤', details: err });// 若出現錯誤，回傳錯誤訊息

            } else {
                // res.json({ shop_name: results[0].shop_name, shop_address: results[0].shop_address });// 若成功查詢，回傳結果
                res.json(results); // 將整個查詢結果作為 JSON 數據返回
                console.log('查詢結果:', results);//顯示查詢結果
                // console.log('查詢活動結果:', results[3]);//顯示活動查詢結果
            }
        });

})
module.exports = api; //匯出