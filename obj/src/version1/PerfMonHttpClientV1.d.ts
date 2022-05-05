import { IReferences } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';
export declare class PerfMonHttpClientV1 extends CommandableHttpClient implements IPerfMonClientV1 {
    constructor(config?: any);
    setReferences(references: IReferences): void;
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CounterV1>>;
    writeCounter(correlationId: string, counter: CounterV1): Promise<CounterV1>;
    writeCounters(correlationId: string, counters: CounterV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
