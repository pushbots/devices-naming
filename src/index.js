require("dotenv").config();
require("./db");
const BluePromise = require("bluebird");
const iosDevices = require("ios-device-list");
const phoneModels = require("find-phone-model");
const ProgressBar = require("progress");

const Device = require("./models/Device");
const App = require("./models/Application");

const getAndroidDeviceName = model => {
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

const getDeviceName = (platform, model) => {
  if (platform === 0) {
    return iosDevices.generationByIdentifier(model);
  }

  return getAndroidDeviceName(model);
};

const unNamedDeviceQuery = {
  installed: {
    $ne: false
  },
  "m.d": {
    $exists: true
  },
  "m.n": {
    $exists: false
  }
};

const AppsHaveDevicesQuery = {
  "devices.t": {
    $gt: 1
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
  const AppsDocs = await App.where(AppsHaveDevicesQuery)
    .select({
      _id: 1
    })
    .exec();

  BluePromise.map(
    AppsDocs,
    async app => {
      const devicesDocs = await Device.where({
        ...unNamedDeviceQuery,
        appID: app._id
      })
        .select({
          "m.d": 1,
          platform: 1
        })
        .exec();

      if (devicesDocs.length === 0) {
        return;
      }

      for (let index = 0; index < devicesDocs.length; index += 1) {
        const model = getDeviceName(
          devicesDocs[index].platform,
          devicesDocs[index].m.d
        );

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
    },
    {
      concurrency: process.env.CONCURRENCY ? Number(process.env.CONCURRENCY) : 5
    }
  ).then(() => {
    console.log("Done");
  });
}

main();
