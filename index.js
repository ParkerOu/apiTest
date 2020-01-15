'use strict';
require('dotenv').config();
const autocannon = require('autocannon');
const fs = require('fs');
const {CronJob} = require('cron');
const csv = require('fast-csv');

const {
    URL, CRONTAB, RESULTFILENAME, AUTH,
} = process.env;

const resultPath = `./${RESULTFILENAME}.csv`;
const writeStream = fs.createWriteStream(resultPath, {flags: 'a'});

new CronJob(CRONTAB, () => {
    const instance = autocannon({
        url: URL, connections: 3, duration: 1, headers: {auth: AUTH},
    });
    instance.on('done', writeResults2csv);
}).start();

/**
 * @param {object} result
 * Save http request statement into csv file.
 */
function writeResults2csv(result) {
    const {
        duration, start, finish: end, non2xx,
    } = result;

    const avg = result.latency.average.toFixed(1);
    const mean = result.latency.mean.toFixed(1);
    const min = result.latency.min.toFixed(1);
    const max = result.latency.max.toFixed(1);
    const statusOne = result['1xx'];
    const statusThree = result['3xx'];
    const statusFour = result['4xx'];
    const statusFive = result['5xx'];

    const {size} = fs.statSync(resultPath);
    const writeHeaders = size ? false : true;
    const csvStream = csv.format({
        headers: true, includeEndRowDelimiter: true, writeHeaders,
    });
    csvStream.pipe(writeStream).on('end', process.exit);
    csvStream.write({
        duration, start, end, non2xx, avg, mean, min, max,
        statusOne, statusThree, statusFour, statusFive,
    });
    csvStream.end();
};
