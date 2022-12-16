import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex'
import { CompositeCounters } from 'pip-services3-components-nodex'

import { IPerfMonClientV1 } from './IPerfMonClientV1';
import { CounterV1 } from './CounterV1';

export class PerfMonDirectClientV1 extends DirectClient<any> implements IPerfMonClientV1 {

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-perfmon", "controller", "*", "*", "*"))
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._logger = new CompositeLogger();
        this._counters = new CompositeCounters();
    }

    public async readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>> {
        let timing = this.instrument(correlationId, 'counters.read_counters');
        
        try {
            let res = await this._controller.readCounters(correlationId, filter, paging);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1> {
        let timing = this.instrument(correlationId, 'counters.write_counter');
        
        try {
            let res = await this._controller.writeCounter(correlationId, counter);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async writeCounters(correlationId: string, counters: CounterV1[]): Promise<void> {
        let timing = this.instrument(correlationId, 'counters.write_counters');
        
        try {
            let res = await this._controller.writeCounters(correlationId, counters);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async clear(correlationId: string): Promise<void> {
        let timing = this.instrument(correlationId, 'counters.clear');
        
        try {
            let res = await this._controller.clear(correlationId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

}