const quickchart = require('quickchart-js');
const needle = require('needle');

exports.fetchurl = async(word) => {

const url = "https://api.covid19api.com/country/india?from=2021-04-01&to=2021-05-01";
const response = await needle("get" , url , {} ,{});

const data = [] , labels = [] , da = response.body;
//console.log(response.body);
for(let i=0;i<100;i++)
{
    if(da[i].Deaths !== 0){

data.push(word === "Deaths" ? da[i].Deaths : word === "Active" ? da[i].Active : da[i].Recovered); 
        labels.push(da[i].Date);
        console.log(da[i].Deaths);

    }
}
const quick = new quickchart();
quick.setConfig({

type:'line',
data:{labels , datasets:[{label : 'deaths in India' , data , fill:false , borderColor : 'blue'}]}


});


return await quick.getShortUrl();

}