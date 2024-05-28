const db = require('../models/index');
const { playlists } = db;

async function createPlaylist(userPayload) {
    try {
        const newPlaylist = await playlists.create(userPayload);
        return newPlaylist;
    } catch (error) {
        console.log("Error creating playlist", error);
        throw error;
    }
}

async function getPlaylist() {
    try {
        const findPlaylist = await playlists.findAll();
        return findPlaylist;
    } catch (error) {
        console.log("Error getting playlist", error);
        throw error;
    }
}

async function updatePlaylist(updateId) {
    try {
        const updateRes = await playlists.update({
            where: {
                id: updateId
            }
        });
        return updateRes;
    } catch (error) {
        console.log("Error updating playlist", error);
        throw error;
    }
}

module.exports = { createPlaylist, getPlaylist, updatePlaylist }