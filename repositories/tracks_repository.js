const { create } = require('domain');
const db = require('../models/index');
const { tracks } = db;

async function createTrack(data) {
    try {
        const newTracks = await tracks.create(data);
        return newTracks;
    } catch (error) {
        console.log("Error creating Track", error);
        throw error;
    }
}

async function getTracks() {
    try {
        const findTracks = await tracks.findAll();
        return findTracks;
    } catch (error) {
        console.log("Error getting tracks", error);
        throw error;
    }
}

async function updateTracks(updateId) {
    try {
        const updateRes = await tracks.update({
            where: {
                id: updateId
            }
        });
        return updateRes;
    } catch (error) {
        console.log("Error updating tracks", error);
        throw error;
    }
}

module.exports = { createTrack, getTracks, updateTracks }