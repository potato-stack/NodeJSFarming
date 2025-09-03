export class Device {
    constructor({ id, type, name, location, status, createAt, lastUpdated }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.location = location;
        this.status = status;
        this.createAt = createAt;
        this.lastUpdated = lastUpdated;
    }
}