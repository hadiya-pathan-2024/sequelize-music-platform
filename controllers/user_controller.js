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
                }
            )
            return generalResponse(
                res,
                updateUsersave,
                "User updated successfully!",
                true
            )
        } catch (error) {
            console.log("Error updating user", error);
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
        try {
            const newUser = await createUser({ first_name: fname, last_name: lname, email: email, password: pwd, dob: dob });
            return generalResponse(
                res,
                newUser,
                "Inserted new user successfully!",
                true
            );
        } catch (error) {
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
    try {
        const userId = req.params.id;
        if (userId) {
            const updateUsers = await getUserByWhere(userId);
            res.render("register", { data: updateUsers[0] })
        }

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
async function deleteUser(req,res){
   try {
     const id = req.params.id;
     const deleteResult = await users.destroy({
         where:{
             id: id
         }
     })
     return generalResponse(
        res,
        deleteResult,
        "User deleted successfully",
        true
     )
   } catch (error) {
    console.log("Error deleting user", error);
    return generalResponse(
        res,
        { success: false },
        "Error deleting user",
        "error",
        false
    )
   }
}
// async function updateUserSave(){
//     try {
//         const {fname,lname,email,pwd,dob} = req.body;
//        const updateSave = await updateUser({
//         first_name: fname
//        });
//        return generalResponse(
//         res,
//         updateSave,
//         "User updated successfully!",
//         true
//        ) 
//     } catch (error) {
//         console.log("Error updating user", error);
//         return generalResponse(
//             res,
//             {success: false},
//             "Something went wrong while updating user",
//             "error",
//             true
//         );
//     }
// }

module.exports = { register, insertUser, getUsers, editUser , deleteUser}