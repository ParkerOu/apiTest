/* eslint-disable camelcase */
'use strict';
require('dotenv').config();
import fs from 'fs';
import autocannon from 'autocannon';
import request from 'request';
import {promisify} from 'util';
import {CronJob} from 'cron';
import moment from 'moment';
import * as csv from '@fast-csv/format';

const requestAsync = promisify(request);
const postAsync = promisify(request.post);
const {
    URL, CRONTAB, RESULTFILENAME, AUTH_URL, AUTH_USER, AUTH_PWD,
} = process.env;

let errorArr = [];
let token = '';
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const resultPath = `./${RESULTFILENAME}.csv`;
// create file if not exists
fs.createWriteStream(resultPath, {flags: 'a'});

new CronJob(CRONTAB, () => {
    const instance = autocannon({
        url: URL, connections: 3, duration: 10, headers: {authorization: `Bearer ${token}`},
    });
    instance.on('response', handleResponse);
    instance.on('done', writeResults2csv);
}).start();

/**
 * @param {object} client
 * The http-client itself. Can be used to modify the headers and body the client will send to the server.
 * @param {object} statusCode
 * The http status code of the response.
 */
async function handleResponse(client, statusCode) {
    // 如果token過期或沒token，就更新token，並重新request
    if (!(statusCode === 401 || statusCode === 403)) return;
    const authOptions = {
        url: AUTH_URL,
        headers: {'Content-Type': 'application/json'},
        body: {
            grantType: 'password',
            user: {
                username: AUTH_USER,
                password: AUTH_PWD,
            },
        },
        json: true,
    };
    await postAsync(authOptions).then((response) => {
        const {access_token} = response.body;
        token = access_token;
    }).catch((error) => {
        console.log({error});
    });
    const options = {
        url: URL,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        qs: {machineNames: ['AP', 'APL']},
        time: true,
        json: true,
    };
    await requestAsync(options).then((response) => {
        const statusCode = response.statusCode;
        const responseTime = response.elapsedTime;
        if (statusCode !== 200) {
            errorArr = errorArr.concat({
                statusCode, responseTime,
            });
        }
        // const {body} = response;
        // console.log({body});
    }).catch((error) => {
        console.log({error});
    });
}

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
    const opts = {
        headers: true, includeEndRowDelimiter: true, writeHeaders,
    };
    const results = [{
        duration, startTime, endTime, non2xx, mean, std, min, max,
        statusOne, statusThree, statusFour, statusFive,
        p0_001, p0_01, p0_1, p1, p2_5, p10, p25, p50,
        p75, p90, p97_5, p99, p99_9, p99_99, p99_999,
    }];
    csv.writeToStream(fs.createWriteStream(resultPath, {flags: 'a'}), results, opts);
    // console.log({errorArr}, `2xx: ${result['2xx']}`);
};
