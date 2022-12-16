import { AbstractPerfMon } from './AbstractPerfMon';
import { PerfMonCommandableHttpClientV1 } from '../version1/PerfMonCommandableHttpClientV1';

export class CommandableHttpPerfMon extends AbstractPerfMon {
    public constructor() {
        super(new PerfMonCommandableHttpClientV1());
    }
}