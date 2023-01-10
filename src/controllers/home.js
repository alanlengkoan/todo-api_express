const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to the TODO API v1.0.0",
    });
};

export {
    home,
};