
var config = {
    apiKey: 'RGAPI-F0E13B61-9BA4-4C99-90DF-9427441DE947',
    requestLimit: '10 requests every 10 seconds'
}

//var chid = 421; // resaki
//var chid  = 76; //udyr
//var chid = 62;//wukong
//var summoner = 321694; // happy dead
//var chid = 84; // akali
//var chid = 107; // rengar
var chid = 121; //kha six
//var chid = 64; // Lee sin
//var chid = 79; //gragas
//var chid = 67; //vayne
//var chid = 103; // ahri

//var summoner = 21944884; //OmarGod
//var summoner = 331637; // issho
//var summoner = 20947579; //lyon oddie
//var summoner = 32932398; // contractz
//var summoner = 612384; //Litopao
//var summoner = 331663;//Kejomi
//var summoner = 321701; //RobSee
//var summoner = 29420083; //radara na
//var summoner = 9652867; //cuss kr
var summoner =76993173; //Nightweebxd

var region = 'na';

// Finding Reksai match
var matchListUrl = 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.2/matchlist/by-summoner/'+summoner+'?championIds='+chid+'&rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5&seasons=PRESEASON3,SEASON3,PRESEASON2014,SEASON2014,PRESEASON2015,SEASON2015,PRESEASON2016,SEASON2016';
var matchUrl = 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.2/match/';
var riotApi = require('riot-api-client')(config);
var _ = require('underscore');

var jsonfile = require('jsonfile');
var exec = require('child_process').exec;
var file = 'data.json';

riotApi.get(matchListUrl, function callback(err, matchList){
    var data = [{}];
    if(err) {
        console.log(err);
    } else {
        var len = matchList.matches.length;
        console.log(len);
        setTimeout(function(){
            var iid = setInterval(function(){
                if(len >= 0) {
                    var indx  = (len > 0)? len-1 :0 ;
                    riotApi.get(matchUrl+matchList.matches[indx].matchId, function callback(err,matchInfo){
                        if(matchInfo != null) {
                            var tmp_match = _.findWhere(matchInfo.participants,{championId:chid});
                            data.push(tmp_match.stats);
                        }
                        len--;
                        console.log("Progress -> %"+len);
                        if(len <= 0){
                            jsonfile.writeFile(file, data, function (err) {
                                exec("convert2csv -i data.json -o "+chid+".csv", function (error, stdout, stderr) {
                                    if (error !== null) {
                                        console.log('exec error: ' + error);
                                    }
                                });
                                clearInterval(iid);
                            })


                        }
                    });
                }
            },2000);
        },1500);

    }
    
});
