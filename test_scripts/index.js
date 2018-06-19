var fs = require('fs');
var obj;

/* 1.
    var match=false; payload.aggregations.forEach(function(h){ h.buckets.forEach(function(g){if (g.doc_count>40){ return match;} match;})})
var match = false; 
payload.aggregations.forEach(function (h) {
     h.buckets.forEach(function (g) {
          if (g.doc_count > 40) {
               return true; 
            } 
            return match; 
        }) 
    })
*/
/* fs.readFile('./working_query_ans.json', 'utf8', function (err, data) {
    if (err) throw err;
    payload = JSON.parse(data);
    //console.log(data);
    let match = false;
    var buckets = payload.aggregations['2'].buckets;
    for (var k_0 in buckets){
        console.log(buckets[k_0]['doc_count'])
        if(buckets[k_0].doc_count > 30){
            console.log("GT 30");
            match = true;
        }
    }
    return match;
}); */

let end = 1528869894415;
let start = 1528869894415;

let date_end = new Date(end);
let date_start = new Date(start);
let diff = new Date(date_end - date_start)
console.log(diff.getHours());
console.log(diff.getMinutes());
var alarm;
var alarm_data = fs.readFileSync('./alarm.json');
alarm = JSON.parse(alarm_data);

console.log(JSON.stringify(alarm));
if (alarm._source.input.search.request.body.query.bool.must) {
    let must = alarm._source.input.search.request.body.query.bool.must;
    var newTimestamp = {};
    for (var key in must) {
        if (must.hasOwnProperty(key) && must[key].range) {
            if (must[key].range['@timestamp']) {
                if (must[key].range['@timestamp'].format) {
                    if (must[key].range['@timestamp'].format.indexOf('epoch') > -1) { // both epoch_millis and epoch_second passes
                        let start = new Date(must[key].range['@timestamp'].gte);
                        let end = new Date(must[key].range['@timestamp'].lte);
                        let diff = new Date(end - start).getTime() / 1000; // UTC timestamp in seconds
                        newTimestamp.gte = 'now-' + diff + 's/s';
                        newTimestamp.lte = 'now/s';
                        if (must[key].range['@timestamp'].format.indexOf('millis') > -1) {
                            newTimestamp.format = must[key].range['@timestamp'].format.replace('millis', 'second'); // if millis is used, replace it with second as default.
                        }
                        alarm._source.input.search.request.body.query.bool.must[key].range['@timestamp'] = newTimestamp;
                    }
                }
            }
        }
    }
}
console.log(JSON.stringify(alarm._source.input.search.request.body.query.bool))

// [millisec, sec, min, hour, day]
let getFlatUTCArray = (base_value, time_fractions) =>  {
    time_data = [base_value];
    for (i = 0; i < time_fractions.length; i++) {
        time_data.push(parseInt(time_data[i] / time_fractions[i]));
        time_data[i] = time_data[i] % time_fractions[i];
    };
    return time_data;
};

// [millisec, sec, min, hour, day]
console.log(getFlatUTCArray(63072000000, [1000, 60, 60, 24]))
// This date object is the difference between two others
/* //https://gist.github.com/havlan/0c1dce61f70b524773ec00f3d58282a8
let getFlatUTCArray = function (base_value, time_fractions) {
  time_data = [base_value];
  for (i = 0; i < time_fractions.length; i++) {
      time_data.push(parseInt(time_data[i]/time_fractions[i]));
      time_data[i] = time_data[i] % time_fractions[i];
  }; 
  return time_data;
}; */
/*
  Time fractions:
  1000 ms/sec
  60 sec/min
  60 min/hour
  24 hour/day
*/

/*
  console.log(getFlatUTCArray(63072000000,[1000,60,60,24]))
  
  0 ms, 0s, 0min, 0hrs, 730 days
  [0, 0, 0, 0, 730] 
*/
