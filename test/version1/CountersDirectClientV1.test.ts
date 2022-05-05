import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { PerfMonMemoryPersistence } from 'service-perfmon-node';
import { PerfMonController } from 'service-perfmon-node';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';
import { PerfMonDirectClientV1 } from '../../src/version1/PerfMonDirectClientV1';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';

suite('PerfMonDirectClientV1', ()=> {
    let client: PerfMonDirectClientV1;
    let fixture: PerfMonClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-perfmon', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new PerfMonDirectClientV1();
        client.setReferences(references);

        fixture = new PerfMonClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
