


export const userList = (req, res) => {
    res.render("users", {title: "Users"});
};

export const userProfile = (req, res) => {
    res.send(`user ${req.params.id} profile`)
};


