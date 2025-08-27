import { TelemetryDevices } from "../../models/device/telemetryDevice.js"

export class TelemetryServices {
    async createDevice(props) {
        console.log({ ...props })
        const device = await TelemetryDevices.create({
            name: 'humid_sensor', // Non-null string
            location: 'your_mom_house', // Non-null string
            status: 'offline' // Must be 'online', 'offline', or 'unknown'
        });
        return device;
    }

    async getDeviceByID(id) {
        const device = await TelemetryDevices.findByPk(id);
        return device;
    }

    async getAllDevices() {
        const devices = await TelemetryDevices.findAll();
        return devices;
    }

    async updateDevice(id, props) {
        const [affectedCount] = await TelemetryDevices.update(id, { ...props })
        if (affectedCount === 0) {
            return { status: 'failed', message: `No device found with ID ${id}` };
        }

        return { status: 'success', message: `Device with ID ${id} updated successfully` };
    }

    async deleteDevice(id) {
        await TelemetryDevices.delete(id);
        return { message: `Device of id: ${id} is deleted sucessfully` }
    }
}