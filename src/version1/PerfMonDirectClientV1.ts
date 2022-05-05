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
            return await this._controller.readCounters(correlationId, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1> {
        let timing = this.instrument(correlationId, 'counters.write_counter');
        
        try {
            return await this._controller.writeCounter(correlationId, counter);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeCounters(correlationId: string, counters: CounterV1[]): Promise<void> {
        let timing = this.instrument(correlationId, 'counters.write_counters');
        
        try {
            return await this._controller.writeCounters(correlationId, counters);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async clear(correlationId: string): Promise<void> {
        let timing = this.instrument(correlationId, 'counters.clear');
        
        try {
            return await this._controller.clear(correlationId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}