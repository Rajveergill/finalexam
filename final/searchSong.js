'use strict';

const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.searchSong = (event, context, callback) => {
  const params = {
    TableName: 'Exam93',
    Key: {
      fileName: event.pathParameters.name
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('error occur'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};