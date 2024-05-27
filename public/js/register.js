const submitButton = document.getElementById("submitButton");
// let fname = document.getElementById("fname").value;
// let lname = document.getElementById("lname").value;
// let email = document.getElementById("email").value;
// let password = document.getElementById("password").value;
// let dob = document.getElementById("dob").value;

async function Data(){
    let form = document.getElementById("register_form");
    let data = new URLSearchParams(new FormData(form));
    let bodyData = await fetch(`/register/insertUser`,{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    });
}
async function validate(){
   await Data()
    window.location.href = "/register/getUsers"
}
submitButton.addEventListener("click", () => validate());