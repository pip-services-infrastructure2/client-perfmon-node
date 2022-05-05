"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfMonClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const DirectPerfMon_1 = require("../perfmon/DirectPerfMon");
const HttpPerfMon_1 = require("../perfmon/HttpPerfMon");
const PerfMonNullClientV1_1 = require("../version1/PerfMonNullClientV1");
const PerfMonDirectClientV1_1 = require("../version1/PerfMonDirectClientV1");
const PerfMonHttpClientV1_1 = require("../version1/PerfMonHttpClientV1");
class PerfMonClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(PerfMonClientFactory.DirectPerfMonDescriptor, DirectPerfMon_1.DirectPerfMon);
        this.registerAsType(PerfMonClientFactory.HttpPerfMonDescriptor, HttpPerfMon_1.HttpPerfMon);
        this.registerAsType(PerfMonClientFactory.NullClientV1Descriptor, PerfMonNullClientV1_1.PerfMonNullClientV1);
        this.registerAsType(PerfMonClientFactory.DirectClientV1Descriptor, PerfMonDirectClientV1_1.PerfMonDirectClientV1);
        this.registerAsType(PerfMonClientFactory.HttpClientV1Descriptor, PerfMonHttpClientV1_1.PerfMonHttpClientV1);
    }
}
exports.PerfMonClientFactory = PerfMonClientFactory;
PerfMonClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'factory', 'default', 'default', '1.0');
PerfMonClientFactory.DirectPerfMonDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'counters', 'direct', 'default', '1.0');
PerfMonClientFactory.HttpPerfMonDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'counters', 'http', 'default', '1.0');
PerfMonClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'client', 'null', 'default', '1.0');
PerfMonClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'client', 'direct', 'default', '1.0');
PerfMonClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=PerfMonClientFactory.js.map