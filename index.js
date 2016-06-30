
var config = {
    apiKey: 'RGAPI-F0E13B61-9BA4-4C99-90DF-9427441DE947',
    requestLimit: '10 requests every 10 seconds'
}

// Finding Reksai match
var matchListUrl = 'https://lan.api.pvp.net/api/lol/lan/v2.2/matchlist/by-summoner/331637?championIds=421&rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=PRESEASON2016,SEASON2016';
var matchUrl = 'https://lan.api.pvp.net/api/lol/lan/v2.2/match/';
var riotApi = require('riot-api-client')(config);
var _ = require('underscore');
var jsonfile = require('jsonfile')

var file = 'data.json'

riotApi.get(matchListUrl, function callback(err, matchList){
    var data = [{}];
    if(err) {
        console.log(err);
    } else {
        var len = matchList.matches.length;
        console.log(len);
        setTimeout(function(){
            setInterval(function(){
                riotApi.get(matchUrl+matchList.matches[len-1].matchId, function callback(err,matchInfo){
                    if(matchInfo != null) {
                        data.push(_.findWhere(matchInfo.participants,{championId:421}));
                    }
                    len--;
                    if(len <= 0){
                        jsonfile.writeFileSync(file, data)
                    }
                });
            },1000);
           /* matchList.matches.forEach(function(match){

                riotApi.get(matchUrl+match.matchId, function callback(err,matchInfo){
                    if(matchInfo != null) {
                        data.push(_.findWhere(matchInfo.participants,{championId:421}));
                    }
                    len--;
                    if(len <= 0){
                        jsonfile.writeFileSync(file, data)
                    }
                });

            });*/
        },1000);

    }
    
});
