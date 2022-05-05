const assert = require('chai').assert;

import { CounterType } from 'pip-services3-components-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';

import { CounterV1 } from '../../src/version1/CounterV1';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';

export class PerfMonClientFixtureV1 {
    private _client: IPerfMonClientV1;
    
    constructor(client: IPerfMonClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        let counter = new CounterV1("counter1", "source1", CounterType.Statistics, 5, 2, 2, 5, 3.5);
        counter.count = 1;
        counter.max = 10;
        counter.min = 1;
        counter.average = 5;

        counter = await this._client.writeCounter(null, counter);
        assert.isObject(counter);

        let counter1 = new CounterV1("counter1", "source1", CounterType.Statistics, 5, 2, 2, 5, 3.5);
        counter1.count = 2;
        counter1.max = 7;
        counter1.min = 0;
        counter1.average = 5;

        let counter2 = new CounterV1("counter2", "source2", CounterType.Statistics, 5, 2, 2, 5, 3.5);
        counter2.count = 1;

        await this._client.writeCounters(null, [counter1, counter2]);

        let page = await this._client.readCounters(null, FilterParams.fromTuples("name", "counter1"), null);

        assert.lengthOf(page.data, 1);

        counter = page.data[0];
        assert.equal(3, counter.count);
        assert.equal(0, counter.min);
        assert.equal(10, counter.max);
        assert.equal(5, counter.average);
    }
}
