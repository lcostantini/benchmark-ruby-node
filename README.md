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
##### 10 concurrent requests from 10 users
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                   **4.82 secs**
* Data transferred:            7629.39 MB
* Response time:                  0.47 secs
* Transaction rate:              20.75 trans/sec
* Throughput:                  1582.86 MB/sec
* Concurrency:                    9.66
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:            0.85
* Shortest transaction:           0.11

#### Node
This results are running against the asynchronously server.

##### 10 concurrent requests from 10 users
* Transactions:                    100 hits
* Availability:                 100.00 %
* Elapsed time:                   **0.95 secs**
* Data transferred:             976.56 MB
* Response time:                  0.09 secs
* Transaction rate:             105.26 trans/sec
* Throughput:                  1027.96 MB/sec
* Concurrency:                    9.51
* Successful transactions:         100
* Failed transactions:               0
* Longest transaction:            0.32
* Shortest transaction:           0.01

##### 100 concurrent requests from 100 users
* Transactions:                  10000 hits
* Availability:                 100.00 %
* Elapsed time:                  **69.84 secs**
* Data transferred:           97656.25 MB
* Response time:                  0.69 secs
* Transaction rate:             143.18 trans/sec
* Throughput:                  1398.29 MB/sec
* Concurrency:                   99.26
* Successful transactions:       10000
* Failed transactions:               0
* Longest transaction:            2.28
* Shortest transaction:           0.03

##### 100 concurrent requests from 500 users
* Transactions:                  50000 hits
* Availability:                 100.00 %
* Elapsed time:                 **335.23 secs**
* Data transferred:          488281.25 MB
* Response time:                  3.33 secs
* Transaction rate:             149.15 trans/sec
* Throughput:                  1456.56 MB/sec
* Concurrency:                  496.44
* Successful transactions:       50000
* Failed transactions:               0
* Longest transaction:            5.05
* Shortest transaction:           0.09

## Where this run
* Ubuntu 14.04 LTS - 64 bits
* Intel Core i7-4790 CPU @ 3.60GHz × 8
* 8GB RAM
* 120GB SSD
* Ruby 2.2.1
* Node 4.0.0
