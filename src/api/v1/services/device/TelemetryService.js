import { TelemetryDevices } from "../../models/device/telemetryDevice.js"
import { DeviceError } from "../../errors/DeviceError.js";

const HandleDBError = (error) => {
    // Fall back for database connection error or undefined error
    if (error.name === 'SequelizeDatabaseError')
        throw DeviceError.DatabaseError()
    // Forward the error
    throw error
}
export class TelemetryServices {
    async createDevice(props) {
        try {
            const device = await TelemetryDevices.create({ ...props });
            return device;
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError')
                throw DeviceError.Conflict()
            HandleDBError(error)
        }
    }

    async getDeviceByID(id) {
        try {
            const device = await TelemetryDevices.findByPk(id);
            if (!device) {
                throw DeviceError.NotFound(`Device with ID ${id} not found`)
            }
            return device;
        } catch (error) {
            HandleDBError(error)
        }
    }

    async getAllDevices() {
        try {
            const devices = await TelemetryDevices.findAll();
            if (devices.length === 0) {
                throw DeviceError.NotFound('No devices found')
            }
            return devices;
        } catch (error) {
            HandleDBError(error)
        }
    }

    async updateDevice(id, props) {
        try {
            const [affectedCount] = await TelemetryDevices.update(id, { ...props })
            if (affectedCount === 0) {
                throw DeviceError.NotFound(`Device with ID ${id} not found`)
            }
            return { status: 'success', message: `Device with ID ${id} updated successfully` };
        } catch (error) {
            HandleDBError(error)
        }
    }

    async deleteDevice(id) {
        try {
            const affectedCount = await TelemetryDevices.destroy({ where: { id } });

            if (affectedCount === 0) {
                throw DeviceError.NotFound()
            }
            return { status: 'success', message: `Device of id: ${id} is deleted sucessfully` }
        }
        catch (error) {
            HandleDBError(error)
        }
    }
}