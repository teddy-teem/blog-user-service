const ddb = require("../model/ddb");
const { v4: uuidv4 } = require("uuid");

exports.getUserByContactId = async ctx => {
  try {
    const { contactId } = ctx.request.params;
    const data = await ddb.getUser(contactId);
    if (!Object.keys(data).length) {
      throw { msg: "User not found" };
    }
    ctx.body = {
      msg: "Successfully fetched userDetails",
      data: data.Item
    };
  } catch(error) {
    ctx.body = { status: "Failed", error: JSON.stringify(error, null, 2) };
  }
};
exports.getUserByEmail = async ctx => {
  try {
    const email = ctx.request.body.email;
    const data = await ddb.getUserByEmail(email);
    if (!Object.keys(data).length) {
      throw { msg: "User not found" };
    }
    ctx.body = {
      msg: "Successfully fetched userDetails",
      data: data
    };
  } catch(error) {
    ctx.body = { status: "Failed", error: JSON.stringify(error, null, 2) };
  }
};
exports.createUser = async ctx => {
  try {
    const userInfo = ctx.request.body.userInfo;
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      return (ctx.body = {
        status: "failed",
        msg: "Some required field are missing"
      });
    }
    await ddb.createUser(userInfo);
    ctx.body = {
      status: "success",
      msg: "Successfully created user"
    };
  } catch(error) {
       ctx.body = { status: "Failed", error: JSON.stringify(error, null, 2) };
  }
};

exports.deleteBlogUser = async ctx => {
  try {
    const contactId = ctx.request.params.contactId;
    await ddb.deleteUser(contactId);
    ctx.body = { status: "success", msg: "Successfully delete" };
  } catch (e) {
    return (ctx.body = { status: "Failed", msg: e });
  }
};
