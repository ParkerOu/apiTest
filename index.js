/* eslint-disable camelcase */
'use strict';
require('dotenv').config();
const autocannon = require('autocannon');
const fs = require('fs');
const {CronJob} = require('cron');
const csv = require('fast-csv');
const moment = require('moment');

const {
    URL, CRONTAB, RESULTFILENAME, AUTH,
} = process.env;

const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const resultPath = `./${RESULTFILENAME}.csv`;
const writeStream = fs.createWriteStream(resultPath, {flags: 'a'});

new CronJob(CRONTAB, () => {
    const instance = autocannon({
        url: URL, connections: 5, duration: 1, headers: {auth: AUTH},
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
    const statusOne = result['1xx'];
    const statusThree = result['3xx'];
    const statusFour = result['4xx'];
    const statusFive = result['5xx'];
    const startTime = moment(start).format(timeFormat);
    const endTime = moment(end).format(timeFormat);

    const {
        p0_001, p0_01, p0_1, p1, p2_5, p10, p25, p50,
        p75, p90, p97_5, p99, p99_9, p99_99, p99_999,
    } = result.latency;
    const mean = result.latency.mean.toFixed(1);
    const std = result.latency.stddev.toFixed(1);
    const min = result.latency.min.toFixed(1);
    const max = result.latency.max.toFixed(1);

    const {size} = fs.statSync(resultPath);
    const writeHeaders = size ? false : true;
    const csvStream = csv.format({
        headers: true, includeEndRowDelimiter: true, writeHeaders,
    });
    csvStream.pipe(writeStream).on('end', process.exit);
    csvStream.write({
        duration, startTime, endTime, non2xx, mean, std, min, max,
        statusOne, statusThree, statusFour, statusFive,
        p0_001, p0_01, p0_1, p1, p2_5, p10, p25, p50,
        p75, p90, p97_5, p99, p99_9, p99_99, p99_999,
    });
    csvStream.end();
};
