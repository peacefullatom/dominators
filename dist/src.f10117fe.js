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
},{"./id.const":"src/util/id.const.ts","./randomValue":"src/util/randomValue.ts"}],"src/util/randomNumber.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** get random value from range */

var RandomNumber = function RandomNumber(to, from) {
  return Math.floor(Math.random() * (to !== null && to !== void 0 ? to : 100)) + (from !== null && from !== void 0 ? from : 0);
};

exports.default = RandomNumber;
},{}],"src/galaxy/atmosphere/atmosphere.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../util/id"));

var randomNumber_1 = __importDefault(require("../../util/randomNumber"));
/** sparse atmosphere */


exports.atmosphereTypeVacuum = 0;
/** hydrogen and helium atmosphere */

exports.atmosphereTypeHydrogenHelium = 1;
/** nitrogen and carbon dioxide atmosphere */

exports.atmosphereTypeNitrogenCarbonDioxide = 2;
/** nitrogen and methane atmosphere */

exports.atmosphereTypeNitrogenMethane = 3;
/** nitrogen and oxygen atmosphere (sol) */

exports.atmosphereTypeNitrogenOxygen = 4;
/** list of atmosphere types */

exports.atmosphereTypes = [exports.atmosphereTypeVacuum, exports.atmosphereTypeHydrogenHelium, exports.atmosphereTypeNitrogenCarbonDioxide, exports.atmosphereTypeNitrogenMethane, exports.atmosphereTypeNitrogenOxygen];
/** atmosphere data */

var Atmosphere =
/** @class */
function () {
  function Atmosphere(options) {
    var _a, _b, _c;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.type = this.generateAtmosphere((_c = options) === null || _c === void 0 ? void 0 : _c.type);
  }

  Atmosphere.prototype.generateAtmosphere = function (options) {
    if (options instanceof Array && options.length) {
      return options;
    }

    return __spreadArrays(exports.atmosphereTypes).sort(function () {
      return Math.random() >= 0.5 ? -1 : 1;
    }).slice(0, randomNumber_1.default(3, 1));
  };

  return Atmosphere;
}();

exports.default = Atmosphere;
},{"../../util/id":"src/util/id.ts","../../util/randomNumber":"src/util/randomNumber.ts"}],"src/galaxy/temperature/temperature.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../util/id"));

var randomValue_1 = __importDefault(require("../../util/randomValue"));
/** sparse temperature */


exports.temperatureTypeVeryCold = 0;
/** hydrogen and helium temperature */

exports.temperatureTypeCold = 1;
/** nitrogen and carbon dioxide temperature */

exports.temperatureTypeNeutral = 2;
/** nitrogen and methane temperature */

exports.temperatureTypeHot = 3;
/** nitrogen and oxygen temperature (sol) */

exports.temperatureTypeVeryHot = 4;
/** list of temperature types */

exports.temperatureTypes = [exports.temperatureTypeVeryCold, exports.temperatureTypeCold, exports.temperatureTypeNeutral, exports.temperatureTypeHot, exports.temperatureTypeVeryHot];
/** temperature data */

var Temperature =
/** @class */
function () {
  function Temperature(options) {
    var _a, _b, _c;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.type = this.generateTemperature((_c = options) === null || _c === void 0 ? void 0 : _c.type);
  }

  Temperature.prototype.generateTemperature = function (options) {
    if (typeof options === 'number') {
      return options;
    }

    return randomValue_1.default(exports.temperatureTypes);
  };

  return Temperature;
}();

exports.default = Temperature;
},{"../../util/id":"src/util/id.ts","../../util/randomValue":"src/util/randomValue.ts"}],"src/galaxy/species/species.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __importDefault(require("../../util/id"));

var atmosphere_1 = __importDefault(require("../atmosphere/atmosphere"));

var temperature_1 = __importDefault(require("../temperature/temperature"));
/** initial relations */


exports.speciesRelationsTypeNeutral = 0;
/** is species are allied they can share their activities */

exports.speciesRelationsTypeAllies = 1;
/** these relations will end by extinction */

exports.speciesRelationsTypeWar = 2;
/** species data */

var Species =
/** @class */
function () {
  function Species(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.name = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.name, _d !== null && _d !== void 0 ? _d : "");
    this.flag = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.flag, _f !== null && _f !== void 0 ? _f : "");
    this.atmosphere = new atmosphere_1.default((_g = options) === null || _g === void 0 ? void 0 : _g.atmosphere);
    this.temperature = new temperature_1.default((_h = options) === null || _h === void 0 ? void 0 : _h.temperature);
    this.relations = (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.relations, _k !== null && _k !== void 0 ? _k : {});
  }

  return Species;
}();

exports.default = Species;
},{"../../util/id":"src/util/id.ts","../atmosphere/atmosphere":"src/galaxy/atmosphere/atmosphere.ts","../temperature/temperature":"src/galaxy/temperature/temperature.ts"}],"src/util/generateEntities.ts":[function(require,module,exports) {
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
},{}],"src/galaxy/system/planet/facilities/facility/facility.ts":[function(require,module,exports) {
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

var atmosphere_1 = __importDefault(require("../../atmosphere/atmosphere"));

var temperature_1 = __importDefault(require("../../temperature/temperature"));

var facilities_1 = __importDefault(require("./facilities/facilities"));
/** planet data */


var Planet =
/** @class */
function () {
  function Planet(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.name = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.name, _d !== null && _d !== void 0 ? _d : "");
    this.populated = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.populated, _f !== null && _f !== void 0 ? _f : false);
    this.abundance = (_h = (_g = options) === null || _g === void 0 ? void 0 : _g.abundance, _h !== null && _h !== void 0 ? _h : randomNumber_1.default(12, 1));
    this.size = (_k = (_j = options) === null || _j === void 0 ? void 0 : _j.size, _k !== null && _k !== void 0 ? _k : randomNumber_1.default(7, 1));
    this.atmosphere = new atmosphere_1.default((_l = options) === null || _l === void 0 ? void 0 : _l.atmosphere);
    this.temperature = new temperature_1.default((_m = options) === null || _m === void 0 ? void 0 : _m.temperature);
    this.constructionPoints = (_p = (_o = options) === null || _o === void 0 ? void 0 : _o.constructionPoints, _p !== null && _p !== void 0 ? _p : 0);
    this.espionagePoints = (_r = (_q = options) === null || _q === void 0 ? void 0 : _q.espionagePoints, _r !== null && _r !== void 0 ? _r : 0);
    this.researchPoints = (_t = (_s = options) === null || _s === void 0 ? void 0 : _s.researchPoints, _t !== null && _t !== void 0 ? _t : 0);
    this.populationPoints = (_v = (_u = options) === null || _u === void 0 ? void 0 : _u.populationPoints, _v !== null && _v !== void 0 ? _v : 0);
    this.populationMaximumInitial = (_x = (_w = options) === null || _w === void 0 ? void 0 : _w.populationMaximumInitial, _x !== null && _x !== void 0 ? _x : Math.floor(this.size + this.size * (this.abundance / 10)));
    this.populationMaximum = (_z = (_y = options) === null || _y === void 0 ? void 0 : _y.populationMaximum, _z !== null && _z !== void 0 ? _z : this.populationMaximumInitial);
    this.population = (_1 = (_0 = options) === null || _0 === void 0 ? void 0 : _0.population, _1 !== null && _1 !== void 0 ? _1 : 0);
    this.defensePointsMaximumInitial = 0;
    this.defensePointsMaximum = 0;
    this.defensePoints = 0;
    this.facilities = new facilities_1.default((_2 = options) === null || _2 === void 0 ? void 0 : _2.facilities);
    this.species = (_3 = options) === null || _3 === void 0 ? void 0 : _3.species;
  }

  return Planet;
}();

exports.default = Planet;
},{"../../../util/id":"src/util/id.ts","../../../util/randomNumber":"src/util/randomNumber.ts","../../atmosphere/atmosphere":"src/galaxy/atmosphere/atmosphere.ts","../../temperature/temperature":"src/galaxy/temperature/temperature.ts","./facilities/facilities":"src/galaxy/system/planet/facilities/facilities.ts"}],"src/galaxy/system/wormhole/wormhole.ts":[function(require,module,exports) {
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
    this.planetsCount = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.planetsCount, _f !== null && _f !== void 0 ? _f : randomNumber_1.default(7, 2));
    this.planets = generateEntities_1.default(planet_1.default, this.planetsCount, (_g = options) === null || _g === void 0 ? void 0 : _g.planets);
    this.wormholesCount = (_j = (_h = options) === null || _h === void 0 ? void 0 : _h.wormholesCount, _j !== null && _j !== void 0 ? _j : randomNumber_1.default(4, 1));
    this.wormholes = generateEntities_1.default(wormhole_1.default, this.wormholesCount, (_k = options) === null || _k === void 0 ? void 0 : _k.wormholes);
    this.species = (_m = (_l = options) === null || _l === void 0 ? void 0 : _l.species, _m !== null && _m !== void 0 ? _m : []);
    this.setup();
  }
  /** setup system after creation */


  System.prototype.setup = function () {
    this.populated = !!this.species.some(function (s) {
      return s.populated;
    });
  };
  /** populate system at the start */


  System.prototype.populate = function () {};
  /** user colonizes system */


  System.prototype.colonize = function () {};

  return System;
}();

exports.default = System;
},{"../../util/generateEntities":"src/util/generateEntities.ts","../../util/id":"src/util/id.ts","../../util/randomNumber":"src/util/randomNumber.ts","./planet/planet":"src/galaxy/system/planet/planet.ts","./wormhole/wormhole":"src/galaxy/system/wormhole/wormhole.ts"}],"src/galaxy/galaxy.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

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

var id_1 = __importDefault(require("../util/id"));

var species_1 = __importStar(require("./species/species"));

var system_1 = __importDefault(require("./system/system"));

var Galaxy =
/** @class */
function () {
  function Galaxy(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;

    this.id = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.id, _b !== null && _b !== void 0 ? _b : id_1.default());
    this.systemsCount = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.systemsCount, _d !== null && _d !== void 0 ? _d : 10);
    this.systems = this.generateSystems((_e = options) === null || _e === void 0 ? void 0 : _e.systems);
    this.speciesCount = (_g = (_f = options) === null || _f === void 0 ? void 0 : _f.speciesCount, _g !== null && _g !== void 0 ? _g : 3);
    this.species = this.generateSpecies((_h = options) === null || _h === void 0 ? void 0 : _h.species);
  }

  Galaxy.prototype.generateSystems = function (options) {
    if (options instanceof Array && options.length) {
      return options.map(function (source) {
        return new system_1.default(source);
      });
    }

    return Array.from({
      length: this.systemsCount
    }, function () {
      return new system_1.default();
    });
  };

  Galaxy.prototype.generateSpecies = function (options) {
    if (options instanceof Array && options.length) {
      return options.map(function (source) {
        return new species_1.default(source);
      });
    }

    var species = Array.from({
      length: this.speciesCount
    }, function () {
      return new species_1.default();
    });
    species.forEach(function (s) {
      species.forEach(function (d) {
        if (s.id !== d.id) {
          s.relations[d.id] = {
            activities: {
              research: false,
              routeSharing: false,
              trade: false
            },
            relations: species_1.speciesRelationsTypeNeutral
          };
        }
      });
    });
    return species;
  };

  return Galaxy;
}();

exports.default = Galaxy;
},{"../util/id":"src/util/id.ts","./species/species":"src/galaxy/species/species.ts","./system/system":"src/galaxy/system/system.ts"}],"src/index.ts":[function(require,module,exports) {
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