var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')

module.exports = {

  getPeople: function() {
    return people.find({}).then(function(people){
      var addressIds = [];
      for(var i = 0; i<people.length; i++){
        addressIds.push(people[i].addressId)
      }
      return addresses.find({_id: {$in: addressIds}})
    }).then(function(ids){
      return people.find({}).then(function(people){
        for(var i = 0; i < people.length; i++){
          for(var j = 0; j < ids.length; j++){
            if(people[i].addressId.toString() === ids[j]._id.toString()){
              people[i].address = ids[j]
            }
          }
        }
        return people
      }).then(function(people){
          var employeeIds = [];
          for(var i = 0; i < people.length; i++){
            for(var j = 0; j < people[i].employerIds.length; j++){
              employeeIds.push(people[i].employerIds[j])
            }
          }
          return employers.find({_id: {$in: employeeIds}
          }).then(function(employers){


            var temp = [];
            for(var i = 0; i < people.length; i++){
              for(var j = 0; j < employers.length; j++){
                for(var k = 0; k < people[i].employerIds.length; k++){
                  if(people[i].employerIds[k].toString() === employers[j]._id.toString()){
                    temp.push(employers[j])
                  }
                }
              }people[i].employers = temp
              temp = []
            }
            var employerAddresses = []
            for(var i = 0; i < employers.length; i++){
              employerAddresses.push(employers[i].addressId)
            }
            return addresses.find({_id: {$in: employerAddresses}})
          }).then(function(employerids){
            for(var i = 0; i < people.length; i++){
              for(var j = 0; j < employerids.length; j++){
                for(var k = 0; k < people[i].employers.length; k++){
                  if(people[i].employers[k].addressId.toString() === employerids[j]._id.toString()){
                    people[i].employers[k].address = employerids[j]
                  }
                }
              }
            } return people
          })
        })
      })

  }
}
