const db = require("../models/index");
const { playlists } = db;
const { generalResponse } = require("../helpers/response_helper")
const { createPlaylist, getPlaylist,updatePlaylist } = require("../repositories/playlist_repository");

async function insertPlaylist(req, res) {
    const { user_id, name } = req.body;
    try {
        const newPlaylist = await createPlaylist(
            {
                user_id: user_id,
                name: name
            });
        return generalResponse(
            res,
            newPlaylist,
            "Inserted new playlist successfully!",
            true
        );
    } catch (error) {
        console.log("Error inserting playlist", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while inserting playlist",
            "error",
            true
        )
    }

}

async function getPlaylists(req, res) {
    try {

        const allPlaylists = await getPlaylist();
        return generalResponse(
            res,
            allPlaylists,
            "Playlists retrieved",
            true
        );
    } catch (error) {
        console.log("Error fetching playlists", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        );
    }
}

async function editPlaylist(req, res) {
    try {
        const Id = req.params.id;
        const updatePlaylists = await updatePlaylist(Id);
        return generalResponse(
            res,
            updatePlaylists,
            "Playlists updated",
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
async function deletePlaylist(req, res) {
    try {
        const id = req.params.id;
        const deleteResult = await playlists.destroy({
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
        console.log("Error deleting playlist", error);
        return generalResponse(
            res,
            { success: false },
            "Error deleting playlist",
            "error",
            false
        )
    }
}

module.exports = { insertPlaylist, getPlaylist, deletePlaylist,editPlaylist }