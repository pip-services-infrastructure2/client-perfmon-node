# Client API (version 1) <br/> Counters Microservices Client SDK for Node.js / ES2017

Node.js client API for Counters microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [CounterV1 class](#class1)
* [ICountersClientV1 interface](#interface)
    - [readCounters()](#operation1)
    - [writeCounter()](#operation3)
    - [writeCounters()](#operation4)
    - [clear()](#operation5)
* [CountersHttpClientV1 class](#client_http)
* [CountersSenecaClientV1 class](#client_seneca)
* [CountersDirectClientV1 class](#client_direct)
* [CountersNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "client-perfmon-node": "^1.0.0",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
let sdk = new require('client-perfmon-node');

// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
let client = sdk.CountersHttpClientV1(config);

// Open client connection to the microservice
await client.open(null);
 
console.log('Opened connection');
        
// Log counter
let counter = await client.writeCounter(
  null,
  {
      time: new Date(),
      level: 4,
      counter: 'Server restarted'
  }
);

console.log('Logged counter is');
console.log(counter);
            
let now = new Date();
    
// Read server events
let page = await client.readCounters(
    {
        search: 'server',
        from_time: new Date(now.getTime() - 24 * 3600 * 1000),
        to_time: now
    },
    {
        total: true,
        skip: 0, 
        take: 100
    }
);
console.log('Counters containing "server" were');
console.log(page.data);
        
// Close connection
await client.close(); 
```

### <a name="class1"></a> CounterV1 class

Represents a record of a system activity performed in the past

**Properties:**
- correlation_id: string - unique id of transaction that caused the event
- time: Date - date and time in UTC when the event took place (default: current time)
- source: string - server name where event took place (default: current host)
- level: number - log level: 1 - fatal, 2 - error, 3 - warning, 4 - info, 5 - debug, 6 - trace.
- error: Object - error object
- counter: string - descriptive counter

## <a name="interface"></a> ICountersClientV1 interface

If you are using Typescript, you can use ICountersClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ICountersClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ICountersClientV1 {
    readCounters(correlationId, filter, paging);
    readErrors(correlationId, filter, paging);
    writeCounter(correlationId, counter);
    writeCounters(correlationId, counters);
    clear(correlationId);
}
```

### <a name="operation1"></a> readCounters(correlationId, filter, paging)

Retrieves logged counters by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or counter
  - level: number - (optional) log level
  - max_level: number - (optional) maximum log level
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- returns: DataPage<CounterV1> - retrieved CounterV1 objects in paged format

### <a name="operation2"></a> readErrors(correlationId, filter, paging)

Retrieves logged errors by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or counter
  - level: number - (optional) log level
  - max_level: number - (optional) maximum log level
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- returns: DataPage<CounterV1> - retrieved CounterV1 objects in paged format

### <a name="operation3"></a> writeCounter(correlationId, counter)

Log counter

**Activities:** 
- correlationId: string - id that uniquely identifies transaction
- counter: CounterV1 - counter to be logged
- returns: CounterV1 - logged system event
 
### <a name="operation4"></a> writeCounters(correlationId, counters)

Log multiple counters

**Activities:** 
- correlationId: string - id that uniquely identifies transaction
- counters: CounterV1[] - array of counters to be logged

### <a name="operation5"></a> clear(correlationId)

Clears all logged counters and errors

**Activities:** 
- correlationId: string - id that uniquely identifies transaction

## <a name="client_http"></a> CountersHttpClientV1 class

CountersHttpClientV1 is a client that implements HTTP protocol

```javascript
class CountersHttpClientV1 extends CommandableHttpClient implements ICountersClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId);
    close(correlationId);
    readCounters(correlationId, filter, paging);
    writeCounter(correlationId, event);
    writeCounters(correlationId, counters);
    clear(correlationId);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> CountersSenecaClientV1 class

CountersSenecaClientV1 is a client that implements Seneca protocol

```javascript
class CountersSenecaClientV1 extends CommandableSenecaClient implements ICountersClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId);
    close(correlationId);
    readCounters(correlationId, filter, paging);
    writeCounter(correlationId, event);
    writeCounters(correlationId, counters);
    clear(correlationId);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> CountersDirectClientV1 class

CountersDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class CountersDirectClientV1 extends DirectClient implements ICountersClientV1 {
    constructor();
    setReferences(references);
    open(correlationId);
    close(correlationId);
    readCounters(correlationId, filter, paging);
    writeCounter(correlationId, event);
    writeCounters(correlationId, counters);
    clear(correlationId);
}
```

## <a name="client_null"></a> CountersNullClientV1 class

CountersNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class CountersNullClientV1 implements ICountersClientV1 {
    constructor();
    readCounters(correlationId, filter, paging);
    writeCounter(correlationId, event);
    writeCounters(correlationId, counters);
    clear(correlationId);
}
```
