var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')
var promises = [people.find(), employers.find(), addresses.find()]


module.exports = {

  getPeople: function(){
return Promise.all(promises).then(function(data){
  people = data[0];
  employers = data[1];
  addresses = data[2];
  for(var i = 0; i < people.length; i++){
    if(!people[i].address){
        for(var j = 0; j < addresses.length; j++){
          if(people[i].addressId.toString() === addresses[j]._id.toString()){
            people[i].address = addresses[j]
          }
        }
      }
    if(!people.employers){
        var temp = []
        for(var j = 0; j < people[i].employerIds.length; j++){
          for(var k = 0; k < employers.length; k++){
            if(people[i].employerIds[j].toString() === employers[k]._id.toString()){
              temp.push(employers[k]);
            }
          } people[i].employers = temp
        }
      }
    if(people[i].employers){
      for(var j = 0; j < people[i].employers.length; j++){
        for(var k = 0; k < addresses.length; k++){
          if(people[i].employers[j].addressId.toString() ===        addresses[k]._id.toString()){
            people[i].employers[j].address = addresses[k]
           }
         }
       }
     }
  }
   return people
})
}
}
