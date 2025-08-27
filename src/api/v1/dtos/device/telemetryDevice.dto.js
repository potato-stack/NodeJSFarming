export class TelemetryDevicesDTO {
    constructor({ id, name, location, status }) {
        this.id = id;
        this.name = name || "";
        this.location = location || 'unknown';
        this.status = status || 'unknown'; // online/offline/unknown
    }
}