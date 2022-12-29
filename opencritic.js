const axios = require("axios");
const cheerio = require("cheerio");
const MongoClient = require("mongodb").MongoClient;

const getHtml = async () => {
   try {
      var url = "https://opencritic.com/browse/all/2022?page=";
      var gamelist = [];
      for(let i = 1; i <= 5; i++)
      {
         var new_url = url + i;
         var html = await axios.get(new_url);
         var $ = cheerio.load(html.data);
         var bodyList = $("div.row.no-gutters.py-2.game-row.align-items-center");
         for (let j = 0; j < 20; j++)
         {
            var index = (i - 1) * 20 + j;
            gamelist[index] = {
               site: "opencritic",
               rank: bodyList.eq(j).find("div:eq(0)").text().replace(".","").trim(),
               title: bodyList.eq(j).find("div:eq(3) a").text().trim(),
               platform: bodyList.eq(j).find("div:eq(4)").text().trim(),
               released: bodyList.eq(j).find("div:eq(5) span").text().replace("Jan","January").
               replace("Feb","Febuary").replace("Mar","March").replace("APR","April").
               replace("Jun","June").replace("Jul","July").
               replace("Aug","August").replace("Sep","September").replace("Oct","October").
               replace("Nov","November").replace("Dec","December").trim() + ", 2022",
               score: bodyList.eq(j).find("div:eq(1)").text().trim()
            };
         }
      }
      var db;
      MongoClient.connect('mongodb+srv://cse20181660:rlrkdldktm@cluster0.xzos63t.mongodb.net/?retryWrites=true&w=majority', function(err,db)
      {
         if (err) throw err;
         dbo = db.db('opencritic');
         dbo.collection('game').insertMany(gamelist, function(err, res){
            if (err) throw err;
            console.log("success");
            db.close();
         });
      });
   } catch (error) {
      console.error(error);
   }
};
getHtml();