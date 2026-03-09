const path = require('node:path');

class IndexController {
    static async index(req, res) {
        try {

            res.sendFile(path.join(__dirname, '../../client/index.html'));
        } catch (error) {
            res.status(500).json({ message: 'Error of server!' });
        }
    }
}

module.exports = {
    IndexController
};
