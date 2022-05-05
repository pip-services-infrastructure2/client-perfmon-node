const assert = require('chai').assert;

import { CounterType } from 'pip-services3-components-nodex';
import { IPerfMonController } from 'service-perfmon-node';
import { AbstractPerfMon } from '../../src/perfmon/AbstractPerfMon';

export class PerfMonFixture {
    private _perfmon: AbstractPerfMon;
    private _controller: IPerfMonController;

    public constructor(perfmon: AbstractPerfMon, controller: IPerfMonController) {
        this._perfmon = perfmon;
        this._controller = controller;
    }

    public async testSimplePerfMon() {
        this._perfmon.last("Test.LastValue", 123);
        this._perfmon.last("Test.LastValue", 123456);

        var counter = this._perfmon.get("Test.LastValue", CounterType.LastValue);
        assert.isNotNull(counter);
        assert.isNotNull(counter.last);
        assert.equal(counter.last, 123456, 3);

        this._perfmon.incrementOne("Test.Increment");
        this._perfmon.increment("Test.Increment", 3);

        counter = this._perfmon.get("Test.Increment", CounterType.Increment);
        assert.isNotNull(counter);
        assert.equal(counter.count, 4);

        this._perfmon.timestampNow("Test.Timestamp");
        this._perfmon.timestampNow("Test.Timestamp");

        counter = this._perfmon.get("Test.Timestamp", CounterType.Timestamp);
        assert.isNotNull(counter);
        assert.isNotNull(counter.time);

        this._perfmon.stats("Test.Statistics", 1);
        this._perfmon.stats("Test.Statistics", 2);
        this._perfmon.stats("Test.Statistics", 3);

        counter = this._perfmon.get("Test.Statistics", CounterType.Statistics);
        assert.isNotNull(counter);
        assert.equal(counter.average, 2, 3);

        this._perfmon.dump();

        // Check that something was written
        await new Promise((res) => setTimeout(res, 500));

        let page = await this._controller.readCounters(null, null, null);
        
        assert.isObject(page);
        assert.isTrue(page.data.length > 0);
    }
}