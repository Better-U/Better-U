var db = require('../db.js')

Social = {}
Social.updateAddress = function(id, zipcode){
	return db('user').where({id: id}).update({zipcode: zipcode})

}
Social.getUsersInZip = function(zipcode){
	return db('user').where({zipcode: zipcode}).select('username')
}

module.exports = Social