export class TelemetryDevicesDTO {
    constructor({ id, type, name, location, status }) {
        this.id = id;
        this.type = type;
        this.name = name || "";
        this.location = location || 'unknown';
        this.status = status || 'unknown'; // online/offline/unknown
    }
}