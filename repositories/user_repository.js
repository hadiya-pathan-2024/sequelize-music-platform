const db = require('../models/index');
const {users} = db;

async function createUser(userPayload){
    try {
        const newUser = await users.create(userPayload);
        return newUser;
    } catch (error) {
        console.log("Error creating user", error);
        throw error;
    }
}

async function getUser(){
    try {
        const findUsers = await users.findAll();
        return findUsers;
    } catch (error) {
        console.log("Error getting users", error);
        throw error;
    }
}

async function getUserByWhere(userId){
    try {
        const findUsers = await users.findAll({
            where: {
                id: userId
            }
        });
        return findUsers;
    } catch (error) {
        console.log("Error getting users", error);
        throw error;
    }
}

async function updateUser(updateId){
    try {
        const updateRes = await users.update({
            where:{
                id: updateId
            }
        });
        return updateRes;
    } catch (error) {
        console.log("Error updating user", error);
        throw error;
    }
}

module.exports = {createUser, getUser,updateUser,getUserByWhere }