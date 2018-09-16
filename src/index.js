require("dotenv").config();
require("./db");
const iosDevices = require("ios-device-list");
const phoneModels = require("find-phone-model");
const ProgressBar = require("progress");

const Device = require("./models/Device");

const getDeviceName = model => {
    if (!model) {
        return "";
    }
    const result = phoneModels.findPhone(model);
    if (result.length === 1 && result[0]["Retail Branding"]) {
        return `${result[0]["Retail Branding"]} ${result[0]["Marketing Name"]} `;
    }

    if (result.length > 1 && result[1]["Retail Branding"]) {
        return `${result[1]["Retail Branding"]} ${result[1]["Marketing Name"]} `;
    }
    return "";
};

const unNamedDeviceQuery = {
    "installed":{
        $ne:false
    },
    "m.d": {
        $exists: true
    },
    "m.n": {
        $exists: false
    }
};

async function main() {
    const devicesCount = await Device.where(unNamedDeviceQuery)
        .countDocuments()
        .exec();

    const bar = new ProgressBar(
        "naming Devices :bar :percent :eta sec remaining",
        {
            total: devicesCount
        }
    );

    console.log(`count: ${devicesCount}`);
    const devicesDocs = await Device.where(unNamedDeviceQuery).select({"m.d":1, "platform":1}).exec();

    for (let index = 0; index < devicesCount; index += 1) {
        let model = "";

        if (devicesDocs[index].platform === 0) {
            model = iosDevices.generationByIdentifier(devicesDocs[index].m.d);
        } else {
            model = getDeviceName(devicesDocs[index].m.d);
        }
        if (!model) {
            bar.tick(1);
            continue;
        }

        try {
            await Device.updateOne(
                {
                    _id: devicesDocs[index]._id
                },
                {
                    "m.n": model
                }
            ).exec();
        } catch (error) {
            console.log(error);
        }

        bar.tick(1);
    }
}

main();
