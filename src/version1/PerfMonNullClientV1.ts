import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';

export class PerfMonNullClientV1 implements IPerfMonClientV1 {
    constructor(config?: any) {}

    public async writeCounters(correlationId: string, counters: CounterV1[]): Promise<void> {
        return;
    }
    
    public async clear(correlationId: string): Promise<void> {
        return;
    }
        
    public async readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>> {
        return new DataPage<CounterV1>([], 0);
    }

    public async writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1> {
        return counter;
    }
}
