const UserSchema = require('../DataShemes/UserSchema');
const usercModel = require('../Models/Users');

function sendResult(err, result, reponse) {
    if (err) {
        reponse.set({ 'Content-Type' : 'application/json;charset=UTF-8'});
        return reponse.status(500).send({ message: err});
    } else {
        return reponse.status(200).send(result);
    }
}

exports.createUser = (req, res) => {
    usercModel.addUser(req.body, (err, result) => sendResult(err, result, res));
}

exports.checkUser = (req, res) => {
    usercModel.checkUser(req.body, (err, result) => sendResult(err, result, res));
}
