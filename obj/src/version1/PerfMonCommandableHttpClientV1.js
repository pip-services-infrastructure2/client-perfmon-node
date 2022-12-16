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
exports.PerfMonCommandableHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
class PerfMonCommandableHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor(config) {
        super('v1/perfmon');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    setReferences(references) {
        super.setReferences(references);
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._counters = new pip_services3_components_nodex_2.CompositeCounters();
    }
    readCounters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_counters', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    writeCounter(correlationId, counter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('write_counter', correlationId, {
                counter: counter
            });
        });
    }
    writeCounters(correlationId, counters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('write_counters', correlationId, {
                counters: counters
            });
        });
    }
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('clear', correlationId, null);
        });
    }
}
exports.PerfMonCommandableHttpClientV1 = PerfMonCommandableHttpClientV1;
//# sourceMappingURL=PerfMonCommandableHttpClientV1.js.map