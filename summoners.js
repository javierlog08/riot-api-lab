
var config = {
    apiKey: 'RGAPI-F0E13B61-9BA4-4C99-90DF-9427441DE947',
    requestLimit: '10 requests every 10 seconds'
}

var riotApi = require('riot-api-client')(config);
var jsonfile = require('jsonfile')
var file = '';
var _ = require('underscore');
var exec = require('child_process').exec;

var start_id = 200000;
var last_id = 0;

setInterval(function () {
    last_id = start_id+40;
    var test_ids = _.range(start_id,last_id).slice(0);
    var summonUrl = "https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/"+test_ids;
    var summonLeague = "https://lan.api.pvp.net/api/lol/lan/v2.5/league/by-summoner/";
    var data = [];
    riotApi.get(summonUrl, function callback(err, summonerList){
        if(err != null)
            console.log(err);
        
        for(i in summonerList) {
            var summoner = summonerList[i];

            // Only Level +30
            if(summoner.summonerLevel >= 30) {
                riotApi.get(summonLeague, function callback(err, leagues) {
                    switch(leagues[0].tier) {
                        case "BRONZE":
                            break;

                        case "SILVER":
                            break;

                        case "GOLD":
                            break;

                        case "PLATINUM":

                            break;

                        case "DIAMOND":
                            break;

                        case "MASTER":
                            break;

                        case "CHALLENGER":
                            break;
                    }

                    data.push(summoner);
                });
            }
        }






    });
},1500);

function createFile(fileda) {
    jsonfile.writeFile(file, data, function (err) {
        if(err != null) {
            console.log(err);
        } else {
            exec("convert2csv -i "+file+" -o "+file+".csv", function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                } else {
                    console.log("DONE file -> "+file);
                }
            });
        }
        start_id = last_id;
    })
}







