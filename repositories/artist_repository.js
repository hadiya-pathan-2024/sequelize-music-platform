const db = require('../models/index');
const {artists} = db;

async function createArtist(artistPayload){
    try {
        const newArtist = await artists.create(artistPayload);
        return newArtist;
    } catch (error) {
        console.log("Error creating artist", error);
        throw error;
    }
}

async function getArtist(){
    try {
        const findArtists = await artists.findAll();
        return findArtists;
    } catch (error) {
        console.log("Error getting artists", error);
        throw error;
    }
}

async function updateArtist(updateId){
    try {
        const updateRes = await artists.update({
            where:{
                id: updateId
            }
        });
        return updateRes;
    } catch (error) {
        console.log("Error updating artist", error);
        throw error;
    }
}

module.exports = {createArtist, getArtist,updateArtist }