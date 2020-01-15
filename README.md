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