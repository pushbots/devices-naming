const mongoose = require("mongoose");

const { Schema } = mongoose;

const { ObjectId } = Schema;

const AppSchema = new Schema({
  title: {
    type: String,
    required: true,
    unqie: true
  },
  secret: {
    type: String,
    required: true,
    unique: true
  },
  userid: {
    type: ObjectId,
    required: true
  },

  platforms: {
    ios: {
      cert: String,
      pass: String,
      prod: {
        type: Boolean,
        default: false
      },
      // Certificate status
      // 0 => working
      // 1 => Expired
      // 2 => corrupted
      s: {
        type: Number,
        default: 0
      },
      // Expiring certificate in 30 days
      expiring: {
        type: Boolean,
        default: false
      },
      // Expiring certificate in 1 day
      expiringsoon: {
        type: Boolean,
        default: false
      },
      enhanced: {
        type: Boolean,
        default: true
      },
      cache: {
        type: Number,
        default: 5
      }
    },
    safari: {
      cert: String,
      pass: String,
      expiry: String,
      uid: String
    },
    android: {
      api: {
        type: String
      }
    },
    chrome: {
      type: String
    },
    web: {
      icon: {
        type: String
      },
      url: {
        type: String
      }
    }
  },
  a: {
    t: {
      s: {
        type: Number,
        default: 0
      },
      o: {
        type: Number,
        default: 0
      }
    },
    ios: {
      s: {
        type: Number,
        default: 0
      },
      o: {
        type: Number,
        default: 0
      }
    },
    android: {
      s: {
        type: Number,
        default: 0
      },
      o: {
        type: Number,
        default: 0
      }
    },
    chrome: {
      s: {
        type: Number,
        default: 0
      },
      o: {
        type: Number,
        default: 0
      }
    }
  },
  devices: {
    t: {
      type: Number,
      default: 0
    },
    ios: {
      type: Number,
      default: 0
    },
    android: {
      type: Number,
      default: 0
    },
    chrome: {
      type: Number,
      default: 0
    },
    firefox: {
      type: Number,
      default: 0
    },
    opera: {
      type: Number,
      default: 0
    },
    safari: {
      type: Number,
      default: 0
    }
  },
  u_devices: {
    t: {
      type: Number,
      default: 0
    },
    ios: {
      type: Number,
      default: 0
    },
    android: {
      type: Number,
      default: 0
    },
    chrome: {
      type: Number,
      default: 0
    },
    firefox: {
      type: Number,
      default: 0
    },
    opera: {
      type: Number,
      default: 0
    },
    safari: {
      type: Number,
      default: 0
    }
  },
  old_u_devices: {
    t: {
      type: Number,
      default: 0
    },
    ios: {
      type: Number,
      default: 0
    },
    android: {
      type: Number,
      default: 0
    },
    chrome: {
      type: Number,
      default: 0
    },
    firefox: {
      type: Number,
      default: 0
    },
    opera: {
      type: Number,
      default: 0
    },
    safari: {
      type: Number,
      default: 0
    }
  },
  debug: {
    type: Boolean,
    default: false
  },
  parse: {
    type: Number
  },
  sdk: {
    android: String,
    ios: String
  },
  ver: {
    ios: Array,
    android: Array,
    web: Array
  }
});

const App = mongoose.model("App", AppSchema);

module.exports = App;
