class User {
  constructor(user) {
    this.id = user.id
    this.name = user.name
    this.username = this.name.split(' ')[1].toLowerCase() + this.id
  }
}

module.exports = User