import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { PerfMonMemoryPersistence } from 'service-perfmon-node';
import { PerfMonController } from 'service-perfmon-node';
import { PerfMonHttpServiceV1 } from 'service-perfmon-node';
import { CommandableHttpPerfMon } from '../../src/perfmon/CommandableHttpPerfMon';
import { PerfMonFixture } from './PerfMonFixture';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PerfMonCommandableHttpClientV1', ()=> {
    let service: PerfMonHttpServiceV1;
    let logger: CommandableHttpPerfMon;
    let fixture: PerfMonFixture;

    suiteSetup(async () => {
        let consolePerfMon = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), consolePerfMon,
            new Descriptor('service-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-perfmon', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        logger = new CommandableHttpPerfMon();
        logger.configure(httpConfig);

        fixture = new PerfMonFixture(logger, controller);

        await service.open(null);
        await logger.open(null);
    });
    
    suiteTeardown(async () => {
        await logger.close(null);
        await service.close(null);
    });

    test('Simple perfmon', async () => {
        await fixture.testSimplePerfMon();
    });

});
