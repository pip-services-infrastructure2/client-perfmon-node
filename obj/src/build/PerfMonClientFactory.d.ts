import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';
export declare class PerfMonClientFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectPerfMonDescriptor: Descriptor;
    static HttpPerfMonDescriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    constructor();
}
