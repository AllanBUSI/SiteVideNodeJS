module.exports = {
    sendReturn: (res, status = 500, data = { error: true, message: "Processing error" }) => {
        try {
            res.status(status).json(data)
        } catch (error) {
            let sendError = { error: true, message: "Processing error" }
            res.status(500).json(sendError)
        }
    }
}