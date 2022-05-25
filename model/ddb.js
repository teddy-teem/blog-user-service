const AWS = require("aws-sdk");
const { blogUserTable } = require("../variables/index");
const variables = require("../variables/index");
AWS.config.update({
  region: variables.awsRegion,
  endpoint: variables.ddbEndpoint
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.getUser = async contactId => {
  const params = {
    TableName: variables.blogUserTable,
    // TableName: "totp",
    Key: {
      contactId: contactId
    }
  };
  return docClient
    .get(params)
    .promise()
    .then(res => res)
    .catch(e => {
      throw { msg: e };
    });
};
exports.getUserByEmail = async email => {
  const params = {
    TableName: variables.blogUserTable,
    IndexName: "email",
    Key: {email: email},
    KeyConditionExpression: "email = :email",
    // FilterExpression: "email= :email",
    ExpressionAttributeValues: {
      ":email": email
    }
  };
  return docClient
    .query(params)
    .promise()
    .then(res => res)
    .catch(e => {
      throw { msg: e };
    });
};
exports.createUser = async userInfo => {
  var params = {
    TableName: variables.blogUserTable,
    Item: userInfo
  };
  return docClient
    .put(params)
    .promise()
    .then(res => res)
    .catch(e => e);
};

exports.deleteUser = async contactId => {
  const params = {
    TableName: blogUserTable,
    Key: { contactId: contactId }
  };
  return docClient
    .delete(params)
    .promise()
    .then(res => res);
};
