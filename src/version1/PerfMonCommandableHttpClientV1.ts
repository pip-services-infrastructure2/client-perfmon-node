import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex'
import { CompositeCounters } from 'pip-services3-components-nodex'

import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';

export class PerfMonCommandableHttpClientV1 extends CommandableHttpClient implements IPerfMonClientV1 {

    constructor(config?: any) {
        super('v1/perfmon');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._logger = new CompositeLogger();
        this._counters = new CompositeCounters();
    }
        
    public async readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>> {
        return await this.callCommand(
            'read_counters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public async writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1> {
        return await this.callCommand(
            'write_counter',
            correlationId,
            {
                counter: counter
            }
        );
    }

    public async writeCounters(correlationId: string, counters: CounterV1[]): Promise<void> {
        return await this.callCommand(
            'write_counters',
            correlationId,
            {
                counters: counters
            }
        );
    }

    public async clear(correlationId: string): Promise<void> {
        return await this.callCommand(
            'clear',
            correlationId,
            null
        );
    }
}
