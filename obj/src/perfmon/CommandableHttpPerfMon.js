"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandableHttpPerfMon = void 0;
const AbstractPerfMon_1 = require("./AbstractPerfMon");
const PerfMonCommandableHttpClientV1_1 = require("../version1/PerfMonCommandableHttpClientV1");
class CommandableHttpPerfMon extends AbstractPerfMon_1.AbstractPerfMon {
    constructor() {
        super(new PerfMonCommandableHttpClientV1_1.PerfMonCommandableHttpClientV1());
    }
}
exports.CommandableHttpPerfMon = CommandableHttpPerfMon;
//# sourceMappingURL=CommandableHttpPerfMon.js.map