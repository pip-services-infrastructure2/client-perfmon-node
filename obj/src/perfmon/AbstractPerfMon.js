"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPerfMon = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_3 = require("pip-services3-components-nodex");
class AbstractPerfMon extends pip_services3_components_nodex_1.CachedCounters {
    constructor(client) {
        super();
        this._client = client;
    }
    configure(config) {
        super.configure(config);
        this._source = config.getAsStringWithDefault("source", this._source);
        this._client.configure(config);
    }
    setReferences(references) {
        this._client.setReferences(references);
        this._client._logger = new pip_services3_components_nodex_2.CompositeLogger();
        this._client._counters = new pip_services3_components_nodex_3.CompositeCounters();
        let contextInfo = references.getOneOptional(new pip_services3_commons_nodex_1.Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }
    isOpen() {
        return this._client.isOpened();
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.open(correlationId);
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.close(correlationId);
            this.dump();
        });
    }
    save(counters) {
        return __awaiter(this, void 0, void 0, function* () {
            counters.forEach(counter => {
                counter.source = counter.source || this._source || "unknown";
            });
            yield this._client.writeCounters('counters', counters);
        });
    }
}
exports.AbstractPerfMon = AbstractPerfMon;
//# sourceMappingURL=AbstractPerfMon.js.map