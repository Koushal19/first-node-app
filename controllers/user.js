const user = require("../models/users");
// const {v4: uuidv4} = require("uuid");
const {setUserForSessionId} = require("../service/auth");

async function handleCreateUser(req, res) {
    const body = req.body;

    if (!body.email || !body.password || !body.name) {
        return res.status(400).json({ error: "bad request, email and password is required" });
    }

    await user.create({
        name: body.name,
        email: body.email,
        password: body.password
    }); 
    
    return res.redirect("/signin");
}

async function handleLoginUser(req, res) {
    const body = req.body;

    if (!body.email || !body.password ) {
        return res.status(400).json({ error: "bad request, email and password is required" });
    }

    const result = await user.findOne({
        email: body.email,
        password: body.password
    });
    
    if (!result) {
        return res.status(401).render("signin", { error: "Invalid email or password" });
    }

    // const session = uuidv4();

    const token = setUserForSessionId(result);
    res.cookie("uid", token);    
    return res.redirect("/");
}

module.exports = { 
    handleCreateUser,
    handleLoginUser 
};