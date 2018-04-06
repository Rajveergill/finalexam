'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteFile = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventTime = record.eventTime;
    const filesize = record.s3.object.size;

    const params = {
      TableName: 'Exam93',
      Item: {
        id: uuid.v1(),
        name: filename,
        size: filesize,
        eventTime: eventTime
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      
    })

  });
};