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
duration,start,end,non2xx,avg,mean,min,max,statusOne,statusThree,statusFour,statusFive
1.05,Wed Jan 15 2020 16:45:44 GMT+0800 (GMT+08:00),Wed Jan 15 2020 16:45:45 GMT+0800 (GMT+08:00),0,529.3,529.3,509.0,542.5,0,0,0,0
1.04,Wed Jan 15 2020 16:45:52 GMT+0800 (GMT+08:00),Wed Jan 15 2020 16:45:53 GMT+0800 (GMT+08:00),0,519.0,519.0,497.0,533.5,0,0,0,0
```