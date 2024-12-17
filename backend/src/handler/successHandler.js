function getObject(detail, code = 200) {
    return {
        code,
        detail
    }
}

module.exports = { getObject }