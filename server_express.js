const e = require("express");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

/* localhost:3000/ 접속시 나올 메시지 */
app.get("/", (request, response) => {
  var all_data = request.query.all;
  var platform = request.query.platform;
  if (all_data == 1)
  {
    MongoClient.connect('mongodb+srv://cse20181660:rlrkdldktm@cluster0.xzos63t.mongodb.net/?retryWrites=true&w=majority', function(err,db)
    {
         if (err) throw err;
         dbo = db.db(platform);
         dbo.collection('game').find({}).toArray(function(err, game) {
            if (err) return response.status(500).json({error: err});
            if (!game) return response.status(404).json({error: 'game not found'});
            response.json(game);
            db.close();
         });
    });
  }
  else
  {
    var search = request.query.search;
    MongoClient.connect('mongodb+srv://cse20181660:rlrkdldktm@cluster0.xzos63t.mongodb.net/?retryWrites=true&w=majority', function(err,db)
    {
        if (err) throw err;
        dbo = db.db(platform);
        const query = "/" + search + "/";
        dbo.collection('game').find({title: query}).toArray(function(err, game) {
            if (err)return response.status(500).json({error: err});
            if (!game) return response.status(404).json({error: 'game not found'});
            response.json(game);
            db.close();
        });
    });
  }
});

/* localhost:3000/ 혹은 localhost:3000/main 외의
get하지 않은 페이지 접속시 나올 메시지. */
app.use((request, response) => {
  response.send(`<h1>Sorry, page not found (msg by Express Server !! ):(</h1>`);
});

/* 3000포트에서 서버 구동 */
app.listen(4000, () => {
  console.log("localhost:4000 에서 서버가 시작됩니다.");
});