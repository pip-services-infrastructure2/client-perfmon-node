import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CounterV1 } from './CounterV1';
export interface IPerfMonClientV1 {
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>>;
    writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1>;
    writeCounters(correlationId: string, counters: CounterV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
