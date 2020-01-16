# Purpose
Test api speed periodically and save result into csv file.
# How to use it
1. `npm i` install all npm package.<br />
1. add `.env` file at root of directory. 
```
URL='http://localhost:3000?q=abc&qarr=1&qarr=2'
CRONTAB='*/5 * * * *'
RESULTFILENAME='apiTestResult'
AUTH='myAuth'
```
Variable         | Description          | Example
-----------------|----------------------|------------------------
URL              | TESTING URL          | https://github.com/
CRONTAB          | TESTING FREQUENCY    | * * * * *
RESULTFILENAME   | TESTING RESULT NAME  | apiTestResult
AUTH             | API AUTH             | sj2oi.jdos.012sl.kjdx

ref: [CronTab說明](https://crontab.guru/)
### Start the test
```
npm start
```
### Result
```
duration,startTime,endTime,non2xx,mean,std,min,max,statusOne,statusThree,statusFour,statusFive,p0_001,p0_01,p0_1,p1,p2_5,p10,p25,p50,p75,p90,p97_5,p99,p99_9,p99_99,p99_999
1.06,2020-01-16 13:34:26,2020-01-16 13:34:27,0,357.2,7.0,338.0,363.6,0,0,0,0,338,338,338,338,338,338,357,358,361,363,363,363,363,363,363
```