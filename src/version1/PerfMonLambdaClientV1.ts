import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex'
import { CompositeCounters } from 'pip-services3-components-nodex'

import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';

export class PerfMonLambdaClientV1 extends CommandableLambdaClient implements IPerfMonClientV1 {

    constructor(config?: any) {
        super('counters');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._logger = new CompositeLogger();
        this._counters = new CompositeCounters();
    }

    public async readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>> {
        let timing = this.instrument(correlationId, 'counters.read_counters');

        try {
            return await this.callCommand(
                'read_counters',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
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
            return await this.callCommand(
                'write_counter',
                correlationId,
                {
                    counter: counter
                }
            );
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
            return await this.callCommand(
                'write_counters',
                correlationId,
                {
                    counters: counters
                }
            );
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
            return await this.callCommand(
                'clear',
                correlationId,
                null
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}
