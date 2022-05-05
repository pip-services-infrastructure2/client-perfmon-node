import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { DirectPerfMon } from '../perfmon/DirectPerfMon';
import { HttpPerfMon } from '../perfmon/HttpPerfMon';

import { PerfMonNullClientV1 } from '../version1/PerfMonNullClientV1';
import { PerfMonDirectClientV1 } from '../version1/PerfMonDirectClientV1';
import { PerfMonHttpClientV1 } from '../version1/PerfMonHttpClientV1';

export class PerfMonClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-perfmon', 'factory', 'default', 'default', '1.0');
	public static DirectPerfMonDescriptor = new Descriptor('service-perfmon', 'counters', 'direct', 'default', '1.0');
	public static HttpPerfMonDescriptor = new Descriptor('service-perfmon', 'counters', 'http', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-perfmon', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-perfmon', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-perfmon', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(PerfMonClientFactory.DirectPerfMonDescriptor, DirectPerfMon);
		this.registerAsType(PerfMonClientFactory.HttpPerfMonDescriptor, HttpPerfMon);

		this.registerAsType(PerfMonClientFactory.NullClientV1Descriptor, PerfMonNullClientV1);
		this.registerAsType(PerfMonClientFactory.DirectClientV1Descriptor, PerfMonDirectClientV1);
		this.registerAsType(PerfMonClientFactory.HttpClientV1Descriptor, PerfMonHttpClientV1);
	}
	
}
