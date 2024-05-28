const db = require("../models/index");
const { tracks } = db;
const { generalResponse } = require("../helpers/response_helper")
const { createTrack, getTracks, updateTracks } = require("../repositories/tracks_repository");
const { editPlaylist } = require("./playlist_controller");

async function insertTrack(req, res) {
    const { album_id, name } = req.body;
    try {
        const newTrack = await createTrack(
            {
                album_id: album_id,
                name: name
            });
        return generalResponse(
            res,
            newTrack,
            "Inserted new track successfully!",
            true
        );
    } catch (error) {
        console.log("Error inserting track", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while inserting track",
            "error",
            true
        )
    }

}

async function getTrack(req, res) {
    try {

        const allTracks = await getTracks();
        return generalResponse(
            res,
            allTracks,
            "Track retrieved",
            true
        );
    } catch (error) {
        console.log("Error fetching tracks", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        );
    }
}

async function editTrack(req, res) {
    try {
        const Id = req.params.id;
        const updateTracklists = await updateTracks(Id);
        return generalResponse(
            res,
            updateTracklists,
            "Tracks updated",
            true
        )
    } catch (error) {
        console.log("Error", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        )
    }
}
async function deleteTracks(req, res) {
    try {
        const id = req.params.id;
        const deleteResult = await tracks.destroy({
            where: {
                id: id
            }
        })
        return generalResponse(
            res,
            deleteResult,
            "playlist deleted successfully",
            true
        )
    } catch (error) {
        console.log("Error deleting tracks", error);
        return generalResponse(
            res,
            { success: false },
            "Error deleting tracks",
            "error",
            false
        )
    }
}

module.exports = { insertTrack, getTrack, deleteTracks,editTrack }
