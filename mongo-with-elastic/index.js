const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

//mongoose.connect('mongodb://localhost:27017/mongosync');
mongoose.connect('mongodb://<user>:<password>@<IP>:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
 
var UserSchema = new mongoose.Schema({
    name: String
  , email: String
  , city: String
  , numero: Number
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",  // Url Elastic
    "port": 9200
});

var User = mongoose.model('user', UserSchema);

User.createMapping((err, mapping) => {
    console.log('mapping created');
});

var newUser = new User({
    name: 555,
    email: 'shahid@codeforgeek.com',
    city: 'mumbai',
    numero: 3953
});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('user added in both the databases');
})

newUser.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});
