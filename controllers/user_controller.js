const db = require("../models/index");
const { users } = db;
const { generalResponse } = require("../helpers/response_helper")
const { createUser, getUser, updateUser, getUserByWhere } = require("../repositories/user_repository")

async function register(req, res) {
    res.render("register", { data: null })
}

async function insertUser(req, res) {
    const { id, fname, lname, email, pwd, dob } = req.body;
    console.log("response: ", req.body);
    if (id) {
        const t = db.sequelize.transaction();
        try {
            const updateUsersave = await users.update(
                {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    password: pwd,
                    dob: dob
                },
                {
                    where: {
                        id: id
                    }
                },
                {transaction:t}
            )
            await t.commit();
            return generalResponse(
                res,
                updateUsersave,
                "User updated successfully!",
                true
            )  
        } catch (error) {
            console.log("Error updating user", error);
            await t.rollback();
            return generalResponse(
                res,
                { success: false },
                "Something went wrong while updating user",
                "error",
                true
            )
        }
    }
    else {
        const t = db.sequelize.transaction();
        try {
            const newUser = await createUser({ first_name: fname, last_name: lname, email: email, password: pwd, dob: dob },
                {transaction:t}
            );
            await t.commit();
            return generalResponse(
                res,
                newUser,
                "Inserted new user successfully!",
                true
            );
        } catch (error) {
            await t.rollback();
            console.log("Error inserting user", error);
            return generalResponse(
                res,
                { success: false },
                "Something went wrong while inserting user",
                "error",
                true
            )
        }
    }
}

async function getUsers(req, res) {
    try {

        const allUsers = await getUser();
        // return generalResponse(
        //     res,
        //     allUsers,
        //     "Users retrieved",
        //      true);
        res.render("users", { allUsers })
    } catch (error) {
        console.log("Error fetching users", error);
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        );
    }
}

async function editUser(req, res) {
    const t = db.sequelize.transaction();
    try {
        const userId = req.params.id;
        if (userId) {
            const updateUsers = await getUserByWhere(userId, {transaction:t});
            res.render("register", { data: updateUsers[0] })
        }
        await t.commit();
    } catch (error) {
        console.log("Error", error);
        await t.rollback();
        return generalResponse(
            res,
            { success: false },
            "Something went wrong while fetching data",
            error,
            true
        )
    }
}
async function deleteUser(req,res){
    const t = db.sequelize.transaction();
   try {
     const id = req.params.id;
     const deleteResult = await users.destroy({
         where:{
             id: id
         }
     })
     await t.commit();
     return generalResponse(
        res,
        deleteResult,
        "User deleted successfully",
        true
     )
   } catch (error) {
    console.log("Error deleting user", error);
    await t.rollback();
    return generalResponse(
        res,
        { success: false },
        "Error deleting user",
        "error",
        false
    )
   }
}

module.exports = { register, insertUser, getUsers, editUser , deleteUser}