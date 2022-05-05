import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { PerfMonMemoryPersistence } from 'service-perfmon-node';
import { PerfMonController } from 'service-perfmon-node';
import { PerfMonHttpServiceV1 } from 'service-perfmon-node';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';
import { PerfMonHttpClientV1 } from '../../src/version1/PerfMonHttpClientV1';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PerfMonHttpClientV1', ()=> {
    let service: PerfMonHttpServiceV1;
    let client: PerfMonHttpClientV1;
    let fixture: PerfMonClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-perfmon', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new PerfMonHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new PerfMonClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
