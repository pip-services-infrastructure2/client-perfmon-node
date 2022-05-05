import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { CachedCounters } from 'pip-services3-components-nodex';
import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';
export declare abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    protected _client: IPerfMonClientV1;
    protected _source: string;
    constructor(client: IPerfMonClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpen(): boolean;
    open(correlationId: string): Promise<void>;
    close(correlationId: string): Promise<void>;
    save(counters: CounterV1[]): Promise<void>;
}
