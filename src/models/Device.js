const mongoose = require("mongoose");

const { Schema } = mongoose;

const subanalyticsSchema = new Schema({
  _id: String,
  date: Date
});

// Devices Document
const DeviceSchema = new Schema({
  i_d: {
    type: Date,
    default: Date.now
  },
  token: String,
  appID: String,
  udid: String,
  alias: String,
  tags: [String],
  geo: {
    type: Object,
    index: "2dsphere"
  },
  platform: {
    type: Number
  },
  stats: {
    type: Number,
    default: 0
  },
  badge: {
    type: Number,
    default: 0
  },
  status_err: String,
  ccode: String,
  debug: Boolean,
  installed: Boolean,
  ip: String,
  // notification status [Enabled/disabled notifications instead of unregister]
  sub: Boolean,
  tz: Number,
  c: String,
  sessions: {
    type: Number,
    default: 0
  },
  // Last session
  ls: Date,
  // Production Provisioing profile (true = production)
  // 2 => UIApplicationReleaseDev
  // 3 => UIApplicationReleaseAdHoc
  // 4 => UIApplicationReleaseAppStore
  pp: Number,
  m: {
    // Carrier
    c: String,
    // device name
    n: String,
    // OS Version
    osv: String,
    // Device model
    d: String,
    // device resolution
    r: String,
    // application version
    appv: String,
    // device locale/language
    l: String,
    // pushbits library version
    lib: String,
    // Jailbroken status of iOS device
    jb: Boolean
  },
  cm: {
    pub: String,
    auth: String
  },
  // Idsand date of opened notifications

  opened: [subanalyticsSchema],
  // events
  e: Object
});

// [Disabling autoIndex]
DeviceSchema.set("autoIndex", false);
DeviceSchema.index({
  appID: 1,
  token: 1,
  geo: "2dsphere"
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
