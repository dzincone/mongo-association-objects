var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')


people.findOne({_id: "55b7a0ac55aaf02320743457"}).then(function(person){
  addresses.findOne({_id: person.addressId}).then(function(address){
    person.address = address
    console.log(person)
  })  
})
