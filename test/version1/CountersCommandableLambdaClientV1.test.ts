import { ConfigParams } from 'pip-services3-commons-nodex';

import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';
import { PerfMonCommandableLambdaClientV1 } from '../../src/version1/PerfMonCommandableLambdaClientV1';

suite('PerfMonCommandableLambdaClient', ()=> {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";

    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;

    let config = ConfigParams.fromTuples(
        "lambda.connection.protocol", "aws",
        "lambda.connection.arn", AWS_LAMDBA_ARN,
        "lambda.credential.access_id", AWS_ACCESS_ID,
        "lambda.credential.access_key", AWS_ACCESS_KEY,
        "lambda.options.connection_timeout", 30000
    );
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: PerfMonCommandableLambdaClientV1;
    let fixture: PerfMonClientFixtureV1;

    setup(async () => {
        client = new PerfMonCommandableLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new PerfMonClientFixtureV1(client);

        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
    });

    test('Crud Operations', async () => {
        await fixture.testCrudOperations();
    });

});