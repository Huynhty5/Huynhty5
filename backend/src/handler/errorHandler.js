function getObject(err) {
    console.log("[ERROR FROM SERVER]", err)
    return {
        code: 500,
        message: err.message
    }
}

module.exports = { getObject }