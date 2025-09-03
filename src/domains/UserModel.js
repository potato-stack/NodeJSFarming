export class User {
  constructor({ id, name, email, password, createAt, lastUpdated }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createAt = createAt;
    this.lastUpdated = lastUpdated;
  }
}
