var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')

var addressIds = [];
people.find({}).then(function(people){

  for(var i = 0; i<people.length; i++){
    addressIds.push(people[i].addressId)
  }
  addressIds = addressIds
  return addresses.find({_id: {$in: addressIds}})
}).then(function(ids){

    people.find({}).then(function(people){
      for(var i = 0; i < people.length; i++){
        for(var j = 0; j < ids.length; j++){
          if(people[i].addressId.toString() === ids[j]._id.toString()){
            people[i].address = ids[j]
          }
        }
      }console.log(people)
    })
  })
