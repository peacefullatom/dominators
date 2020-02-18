// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/util/id.const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** source data for id generation */

exports.idSource = 'abcdefghijklmnopqrstuvwxyz0123456789';
},{}],"src/util/randomValue.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** get random value from array */

var RandomValue = function RandomValue(values) {
  return values[Math.floor(Math.random() * values.length)];
};

exports.default = RandomValue;
},{}],"src/util/id.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_const_1 = require("./id.const");

var randomValue_1 = __importDefault(require("./randomValue"));
/** generate random id */


var ID = function ID() {
  var id = [];
  var template = id_const_1.idSource.split('').sort(function () {
    return Math.random() > 0.5 ? -1 : +1;
  });

  for (var i = 0; i < 6; i++) {
    id.push(randomValue_1.default(template));
  }

  return id.join('');
};

exports.default = ID;
},{"./id.const":"src/util/id.const.ts","./randomValue":"src/util/randomValue.ts"}],"src/util/generateEntities.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** generate data from source */

var GenerateEntities = function GenerateEntities(type, length, options) {
  if (options instanceof Array && options.length) {
    return options.map(function (source) {
      return new type(source);
    });
  }

  return Array.from({
    length: length
  }, function () {
    return new type();
  });
};

exports.default = GenerateEntities;
},{}],"src/util/randomNumber.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** get random value from range */

var RandomNumber = function RandomNumber(to, from) {
  return Math.floor(Math.random() * (to !== null && to !== void 0 ? to : 100)) + (from !== null && from !== void 0 ? from : 0);
};

exports.default = RandomNumber;
},{}],"src/galaxy/system/governor/governor.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../../util/id"));
/** minimum/default skill level */

/** maximum skill level */


exports.governorSkillLevelDefault = 0.02;
exports.governorSkillLevelMaximum = 0.25;

var Governor =
/** @class */
function () {
  function Governor(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.avatar = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.avatar, _d !== null && _d !== void 0 ? _d : "");
    this.construction = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.construction, _f !== null && _f !== void 0 ? _f : exports.governorSkillLevelDefault);
    this.espionage = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.espionage, _h !== null && _h !== void 0 ? _h : exports.governorSkillLevelDefault);
    this.fleet = (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.fleet, _k !== null && _k !== void 0 ? _k : exports.governorSkillLevelDefault);
    this.population = (_m = (_l = options) === null || _l === void 0 ? void 0 : _l.population, _m !== null && _m !== void 0 ? _m : exports.governorSkillLevelDefault);
    this.research = (_p = (_o = options) === null || _o === void 0 ? void 0 : _o.research, _p !== null && _p !== void 0 ? _p : exports.governorSkillLevelDefault);
  }

  return Governor;
}();

exports.default = Governor;
},{"../../../util/id":"src/util/id.ts"}],"src/galaxy/system/planet/facilities/facility/facility.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../../../../util/id"));
/** undefined facility type */


exports.facilityTypeNotSet = 0;
/** construction facility type */

exports.facilityTypeConstruction = 1;
/** espionage facility type */

exports.facilityTypeEspionage = 2;
/** population facility type */

exports.facilityTypePopulation = 3;
/** research facility type */

exports.facilityTypeResearch = 4;
/** default facility rate */

exports.facilityRateDefault = 0.1;
/** facility rate 0.1 */

exports.facilityRate1 = exports.facilityRateDefault;
/** facility rate 0.2 */

exports.facilityRate2 = exports.facilityRate1 + exports.facilityRate1;
/** facility rate 0.3 */

exports.facilityRate3 = exports.facilityRate1 + exports.facilityRate2;
/** facility rate 0.5 */

exports.facilityRate4 = exports.facilityRate2 + exports.facilityRate3;
/** facility rate 0.8 */

exports.facilityRate5 = exports.facilityRate3 + exports.facilityRate4;
/** facility rate 1.3 */

exports.facilityRate6 = exports.facilityRate4 + exports.facilityRate5;
/** facility rate 2.1 */

exports.facilityRate7 = exports.facilityRate5 + exports.facilityRate6;
/** list of facilities rates */

exports.facilityRates = [exports.facilityRateDefault, exports.facilityRate1, exports.facilityRate2, exports.facilityRate3, exports.facilityRate4, exports.facilityRate5, exports.facilityRate6, exports.facilityRate7];
/** base facility cost */

exports.facilityCostDefault = 1e3;
/** facility cost multiplier */

exports.facilityCostRate = 1e4;
/** initial operation level */

exports.facilityOperationLevelDefault = 0;
/** maximum operation level */

exports.facilityOperationLevelMaximum = 100;
/** facility data */

var Facility =
/** @class */
function () {
  function Facility(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.name = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.name, _d !== null && _d !== void 0 ? _d : "");
    this.type = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.type, _f !== null && _f !== void 0 ? _f : exports.facilityTypeNotSet);
    this.rate = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.rate, _h !== null && _h !== void 0 ? _h : exports.facilityRateDefault);
    this.operationLevel = (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.operationLevel, _k !== null && _k !== void 0 ? _k : exports.facilityOperationLevelDefault);
    this.cost = (_m = (_l = options) === null || _l === void 0 ? void 0 : _l.cost, _m !== null && _m !== void 0 ? _m : exports.facilityCostDefault);
  }

  return Facility;
}();

exports.default = Facility;
},{"../../../../../util/id":"src/util/id.ts"}],"src/galaxy/system/planet/facilities/facilities.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var facility_1 = __importStar(require("./facility/facility"));
/** maximum amount of facilities of any type */


exports.facilitiesCount = 8;
/** facilities data */

var Facilities =
/** @class */
function () {
  function Facilities(options) {
    var _a, _b, _c, _d;

    this.construction = this.generateFacilities(facility_1.facilityTypeConstruction, (_a = options) === null || _a === void 0 ? void 0 : _a.construction);
    this.espionage = this.generateFacilities(facility_1.facilityTypeEspionage, (_b = options) === null || _b === void 0 ? void 0 : _b.espionage);
    this.population = this.generateFacilities(facility_1.facilityTypePopulation, (_c = options) === null || _c === void 0 ? void 0 : _c.population);
    this.research = this.generateFacilities(facility_1.facilityTypeResearch, (_d = options) === null || _d === void 0 ? void 0 : _d.research);
  }
  /** get facility name by type */


  Facilities.prototype.facilityType = function (type) {
    if (type === facility_1.facilityTypeConstruction) {
      return "construction";
    }

    if (type === facility_1.facilityTypeEspionage) {
      return "espionage";
    }

    if (type === facility_1.facilityTypePopulation) {
      return "population";
    }

    if (type === facility_1.facilityTypeResearch) {
      return "research";
    }

    return "unknown";
  };
  /** get facility settings */


  Facilities.prototype.facilitySettings = function (level, rate, type) {
    return {
      name: level + " level " + this.facilityType(type),
      type: type,
      rate: rate,
      operationLevel: facility_1.facilityOperationLevelDefault,
      cost: Math.floor(level * (facility_1.facilityCostDefault + 1e4 * rate))
    };
  };
  /** generate default facilities list */


  Facilities.prototype.generateFacilitiesList = function (type) {
    var _this = this;

    return Array.from({
      length: exports.facilitiesCount
    }, function (value, index) {
      return new facility_1.default(_this.facilitySettings(index, facility_1.facilityRates[index], type));
    });
  };
  /** restore facilities list from options or generate default list */


  Facilities.prototype.generateFacilities = function (type, options) {
    if (options instanceof Array && options.length === 8) {
      return options.map(function (source) {
        return new facility_1.default(source);
      });
    }

    return this.generateFacilitiesList(type);
  };

  return Facilities;
}();

exports.default = Facilities;
},{"./facility/facility":"src/galaxy/system/planet/facilities/facility/facility.ts"}],"src/galaxy/system/planet/planet.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../../util/id"));

var randomNumber_1 = __importDefault(require("../../../util/randomNumber"));

var facilities_1 = __importDefault(require("./facilities/facilities"));
/** planet data */


var Planet =
/** @class */
function () {
  function Planet(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.abundance = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.abundance, _d !== null && _d !== void 0 ? _d : randomNumber_1.default(12, 1));
    this.size = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.size, _f !== null && _f !== void 0 ? _f : randomNumber_1.default(7, 1));
    this.constructionPoints = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.constructionPoints, _h !== null && _h !== void 0 ? _h : 0);
    this.espionagePoints = (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.espionagePoints, _k !== null && _k !== void 0 ? _k : 0);
    this.researchPoints = (_m = (_l = options) === null || _l === void 0 ? void 0 : _l.researchPoints, _m !== null && _m !== void 0 ? _m : 0);
    this.populationPoints = (_p = (_o = options) === null || _o === void 0 ? void 0 : _o.populationPoints, _p !== null && _p !== void 0 ? _p : 0);
    this.populationMaximumInitial = (_r = (_q = options) === null || _q === void 0 ? void 0 : _q.populationMaximumInitial, _r !== null && _r !== void 0 ? _r : Math.floor(this.size + this.size * (this.abundance / 10)));
    this.populationMaximum = (_t = (_s = options) === null || _s === void 0 ? void 0 : _s.populationMaximum, _t !== null && _t !== void 0 ? _t : this.populationMaximumInitial);
    this.population = (_v = (_u = options) === null || _u === void 0 ? void 0 : _u.population, _v !== null && _v !== void 0 ? _v : 0);
    this.defensePointsMaximumInitial = 0;
    this.defensePointsMaximum = 0;
    this.defensePoints = 0;
    this.facilities = new facilities_1.default((_w = options) === null || _w === void 0 ? void 0 : _w.facilities);
  }

  return Planet;
}();

exports.default = Planet;
},{"../../../util/id":"src/util/id.ts","../../../util/randomNumber":"src/util/randomNumber.ts","./facilities/facilities":"src/galaxy/system/planet/facilities/facilities.ts"}],"src/galaxy/system/wormhole/wormhole.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../../util/id"));
/** wormhole data */


var Wormhole =
/** @class */
function () {
  function Wormhole(options) {
    var _a, _b;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
  }

  return Wormhole;
}();

exports.default = Wormhole;
},{"../../../util/id":"src/util/id.ts"}],"src/galaxy/system/system.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var generateEntities_1 = __importDefault(require("../../util/generateEntities"));

var id_1 = __importDefault(require("../../util/id"));

var randomNumber_1 = __importDefault(require("../../util/randomNumber"));

var governor_1 = __importDefault(require("./governor/governor"));

var planet_1 = __importDefault(require("./planet/planet"));

var wormhole_1 = __importDefault(require("./wormhole/wormhole"));
/** system data */


var System =
/** @class */
function () {
  function System(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.populated = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.populated, _d !== null && _d !== void 0 ? _d : false);
    this.governor = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.governor, _f !== null && _f !== void 0 ? _f : new governor_1.default());
    this.planetsCount = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.planetsCount, _h !== null && _h !== void 0 ? _h : randomNumber_1.default(7, 2));
    this.planets = generateEntities_1.default(planet_1.default, this.planetsCount, (_j = options) === null || _j === void 0 ? void 0 : _j.planets);
    this.wormholesCount = (_l = (_k = options) === null || _k === void 0 ? void 0 : _k.wormholesCount, _l !== null && _l !== void 0 ? _l : randomNumber_1.default(4, 1));
    this.wormholes = generateEntities_1.default(wormhole_1.default, this.wormholesCount, (_m = options) === null || _m === void 0 ? void 0 : _m.wormholes);
  }

  return System;
}();

exports.default = System;
},{"../../util/generateEntities":"src/util/generateEntities.ts","../../util/id":"src/util/id.ts","../../util/randomNumber":"src/util/randomNumber.ts","./governor/governor":"src/galaxy/system/governor/governor.ts","./planet/planet":"src/galaxy/system/planet/planet.ts","./wormhole/wormhole":"src/galaxy/system/wormhole/wormhole.ts"}],"src/galaxy/galaxy.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../util/id"));

var system_1 = __importDefault(require("./system/system"));

var Galaxy =
/** @class */
function () {
  function Galaxy(options) {
    var _a, _b, _c, _d;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.systemsCount = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.systemsCount, _d !== null && _d !== void 0 ? _d : 10);
    this.systems = this.generateSystems();
  }

  Galaxy.prototype.generateSystems = function (options) {
    if (options && options.systems && options.systems.length) {
      return options.systems.map(function (source) {
        return new system_1.default(source);
      });
    }

    return Array.from({
      length: this.systemsCount
    }, function () {
      return new system_1.default();
    });
  };

  return Galaxy;
}();

exports.default = Galaxy;
},{"../util/id":"src/util/id.ts","./system/system":"src/galaxy/system/system.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var galaxy_1 = __importDefault(require("./galaxy/galaxy"));

var start = new Date().getTime();
document.g = new galaxy_1.default();
console.log("generation time: " + (new Date().getTime() - start));
var app = document.getElementById('app');

if (app) {
  app.innerHTML = 'q';
  app.innerHTML += "<pre>" + JSON.stringify(document.g, null, 2) + "</pre>";
}
},{"./galaxy/galaxy":"src/galaxy/galaxy.ts"}],".yarn/unplugged/parcel-bundler-npm-1.12.4-a8e54cfc66/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62839" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},[".yarn/unplugged/parcel-bundler-npm-1.12.4-a8e54cfc66/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map