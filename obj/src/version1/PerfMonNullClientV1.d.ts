import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';
export declare class PerfMonNullClientV1 implements IPerfMonClientV1 {
    constructor(config?: any);
    writeCounters(correlationId: string, counters: CounterV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>>;
    writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1>;
}
