import { IReferences } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { IPerfMonClientV1 } from './IPerfMonClientV1';
import { CounterV1 } from './CounterV1';
export declare class PerfMonDirectClientV1 extends DirectClient<any> implements IPerfMonClientV1 {
    constructor();
    setReferences(references: IReferences): void;
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>>;
    writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1>;
    writeCounters(correlationId: string, counters: CounterV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
