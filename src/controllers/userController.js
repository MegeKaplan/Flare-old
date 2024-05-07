


export const userList = (req, res) => {
    res.send('user list');
};

export const userProfile = (req, res) => {
    res.send(`user ${req.params.id} profile`)
};


