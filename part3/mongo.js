/*const mongoose = require('mongoose')
const length = process.argv.length
if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  const password = process.argv[2]
  const url = `mongodb+srv://teperyazadrot:${password}@cluster0.5isbinn.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({

    name: String,
    number: String
  })
  if (length == 5){
    const name = process.argv[3]
    const number = process.argv[4]
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person ({
    name,
    number
  })
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
            mongoose.connection.close()
        })
    })
}
*/