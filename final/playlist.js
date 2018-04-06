'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.playlist = (event, context, callback) => {
  const data = JSON.parse(event.body);
  
  
  const params = {
    TableName: 'Exam95',
    Item: {
      id: uuid.v1(),
      playlist: data.playlist,
      
    }
    
  }
  dynamoDb.put(params, (error, result) =>{
    if (error){
      console.error(error)
      callback(new Error('playlist doesnot work'))
      return;
      
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response)
  })
}