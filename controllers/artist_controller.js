const db = require("../models/index");
const { artists } = db;
const { generalResponse } = require("../helpers/response_helper")
const { createArtist, getArtist, updateArtist } = require("../repositories/artist_repository")

async function insertArtist(req, res) {
    const { name, genre } = req.body;
    console.log("response: ", req.body);
    const t = db.sequelize.transaction();
    try {
        const newArtist = await createArtist(
            {
                name: name,
                genre: genre
            },
        {transaction:t}
        );
        await t.commit();
        return generalResponse(
            res,
            newArtist,
            "Inserted new artist successfully!",
            true
        );
         
    } catch (error) {
        console.log("Error inserting artist", error);
        await t.rollback();
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while inserting artist",
            "error",
            true
        )
    }

}

async function getArtists(req, res) {
    try {
        const allArtists = await getArtist();
        return generalResponse(
            res,
            allArtists,
            "Artists retrieved",
            true
        );
    } catch (error) {
        console.log("Error fetching artists", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        );
    }
}

async function editArtist(req, res) {
    try {
        const Id = req.params.id;
        const updateUsers = await updateArtist(userId);
        return generalResponse(
            res,
            updateUsers,
            "Artist updated",
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
async function deleteArtist(req, res) {
    try {
        const id = req.params.id;
        const deleteResult = await artists.destroy({
            where: {
                id: id
            }
        })
        return generalResponse(
            res,
            deleteResult,
            "Artist deleted successfully",
            true
        )
    } catch (error) {
        console.log("Error deleting artist", error);
        return generalResponse(
            res,
            { success: false },
            "Error deleting artist",
            "error",
            false
        )
    }
}

module.exports = { insertArtist, getArtists, deleteArtist,editArtist }