const { where } = require("sequelize");
const {generalResponse} = require("../helpers/response_helper")
const {createUser,getUser, updateUser} = require("../repositories/user_repository")

async function register(req,res){
    res.render("register", {data:null})
}

async function insertUser(req,res){
    try {
        // console.log(req.body);
        const {fname,lname,email,pwd,dob} = req.body;
        const newUser = await createUser({first_name:fname,last_name:lname,email:email,password:pwd,dob:dob});
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
            {success: false},
            "Something went wrong while inserting user",
            "error",
            true
        )
    }
}

async function getUsers(req,res){
    try {
        const allUsers = await getUser();
        // return generalResponse(
        //     res,
        //     allUsers,
        //     "Users retrieved",
        //      true);
        res.render("users",{allUsers})
    } catch (error) {
        console.log("Error fetching users", error);
        return generalResponse(
            res,
            {success: false},
             "Something went wrong while fetching data",
            error,
            true
            );
    }
}

async function editUser(req,res){
    try {
        const userId = req.params.id;
        if(userId){
            const updateUsers = await getUser({
                where: {
                    id: '1'
                }
            });
            // console.log(updateUsers)
            res.render("register", {data: updateUsers[0]})
        } 
        
    } catch (error) {
        console.log("Error", error);
        return generalResponse(
            res,
            {success: false},
             "Something went wrong while fetching data",
            error,
            true
        )
    }
}
module.exports = {register, insertUser, getUsers, editUser}