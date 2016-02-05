# Description
The idea is testing the time for a server response between Ruby and NodeJS.
We're using a sample file **test.txt** with 80kb and 20_000 lines with.

# How is works
We read the test.txt file and made a concatenation with the result of the file 1_000 times.

## Ruby
I used [Rack](https://github.com/rack/rack ) and [Puma](https://github.com/puma/puma) to testing this.
I chose **Rack** because [here](https://github.com/luislavena/bench-micro) I see
that have better performance against others web microframeworks
I chose **Puma** because offers a lean and fast web server solution for
applications that require high concurrency.

I run the Puma server with 8 threads
```
puma -e production -t 8:8 ruby.ru
```

## NodeJS
There are three files in *node* folder, one asynchronously, one synchronously and
the last one with express.
To run each one in the node foler

**Asynchronously**
```
npm start
```

**Synchronously**
```
npm run sync
```

**Express**
```
npm run express
```

## Benchmark tool
I use the **siege** command (sudo apt-get install siege)
```
siege -b -r 10 -c 10 http://localhost:9292
```

# Results
Here are the results in Ruby and NodeJS

#### Ruby
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                   5.61 secs
* Data transferred:            7629.39 MB
* Response time:                  0.55 secs
* Transaction rate:              17.83 trans/sec
* Throughput:                  1359.96 MB/sec
* Concurrency:                    9.78
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:            0.86
* Shortest transaction:           0.08

#### Node

**Asynchronously**
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                  24.08 secs
* Data transferred:            7621.77 MB
* Response time:                  2.33 secs
* Transaction rate:               4.15 trans/sec
* Throughput:                   316.52 MB/sec
* Concurrency:                    9.68
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:           14.52
* Shortest transaction:           0.41

**Synchronously**
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                  34.90 secs
* Data transferred:            7621.77 MB
* Response time:                  3.40 secs
* Transaction rate:               2.87 trans/sec
* Throughput:                   218.39 MB/sec
* Concurrency:                    9.73
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:           24.74
* Shortest transaction:           0.43

**Express**
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                  31.78 secs
* Data transferred:            7621.77 MB
* Response time:                  3.04 secs
* Transaction rate:               3.15 trans/sec
* Throughput:                   239.83 MB/sec
* Concurrency:                    9.58
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:           21.36
* Shortest transaction:           0.25

## Where this run
* Ubuntu 14.04 LTS - 64 bits
* Intel Core i7-4790 CPU @ 3.60GHz × 8
* 8GB RAM
* 120GB SSD
* Ruby 2.2.1
* Node 4.0.0
