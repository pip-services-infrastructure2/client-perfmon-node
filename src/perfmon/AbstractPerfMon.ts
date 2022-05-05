import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { CachedCounters } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { ContextInfo } from 'pip-services3-components-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex'
import { CompositeCounters } from 'pip-services3-components-nodex'

import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';

export abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    
    protected _client: IPerfMonClientV1;
    protected _source: string;

    public constructor(client: IPerfMonClientV1) {
        super();
        this._client = client;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._source = config.getAsStringWithDefault("source", this._source);
        (this._client as any).configure(config);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
        (this._client as any)._logger = new CompositeLogger();
        (this._client as any)._counters = new CompositeCounters();
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }

    public isOpen(): boolean {
        return (this._client as any).isOpened();
    }

    public async open(correlationId: string): Promise<void> {
        await (this._client as any).open(correlationId);
    }

    public async close(correlationId: string): Promise<void> {
        await (this._client as any).close(correlationId);
        this.dump();
    }

    public async save(counters: CounterV1[]): Promise<void> {
        counters.forEach(counter => {
            counter.source = counter.source || this._source || "unknown";
        });
        await this._client.writeCounters('counters', counters);
    }

}
