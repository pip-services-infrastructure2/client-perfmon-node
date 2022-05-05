import { Descriptor } from 'pip-services3-commons-nodex';;
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { PerfMonMemoryPersistence } from 'service-perfmon-node';
import { PerfMonController } from 'service-perfmon-node';
import { DirectPerfMon } from '../../src/perfmon/DirectPerfMon';
import { PerfMonFixture } from './PerfMonFixture';

suite('DirectPerfMon', ()=> {
    let logger: DirectPerfMon;
    let fixture: PerfMonFixture;

    suiteSetup(async () => {
        let consolePerfMon = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), consolePerfMon,
            new Descriptor('service-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-perfmon', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        logger = new DirectPerfMon();
        logger.setReferences(references);

        fixture = new PerfMonFixture(logger, controller);

        await logger.open(null);
    });
    
    suiteTeardown(async () => {
        await logger.close(null);
    });

    test('Simple perfmon', async () => {
        await fixture.testSimplePerfMon();
    });

});
