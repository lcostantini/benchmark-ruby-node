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
##### 10 concurrent requests from 10 users
* Transactions:            100 hits
* Availability:         100.00 %
* Elapsed time:           0.02 secs
* Data transferred:         7.63 MB
* Response time:            0.00 secs
* Transaction rate:      5000.00 trans/sec
* Throughput:         381.47 MB/sec
* Concurrency:           10.00
* Successful transactions:         100
* Failed transactions:             0
* Longest transaction:          0.01
* Shortest transaction:         0.00


##### 100 concurrent requests from 100 users
* Transactions:          10000 hits
* Availability:         100.00 %
* Elapsed time:           1.58 secs
* Data transferred:       762.94 MB
* Response time:            0.02 secs
* Transaction rate:      6329.11 trans/sec
* Throughput:         482.87 MB/sec
* Concurrency:           97.99
* Successful transactions:       10000
* Failed transactions:             0
* Longest transaction:          0.08


##### 100 concurrent requests from 500 users
* Transactions:          50000 hits
* Availability:         100.00 %
* Elapsed time:           7.10 secs
* Data transferred:      3814.70 MB
* Response time:            0.07 secs
* Transaction rate:      7042.25 trans/sec
* Throughput:         537.28 MB/sec
* Concurrency:          495.36
* Successful transactions:       50000
* Failed transactions:             0
* Longest transaction:          0.20
* Shortest transaction:         0.00


## Where this run
* Ubuntu 14.04 LTS - 64 bits
* Intel Core i7-4790 CPU @ 3.60GHz × 8
* 8GB RAM
* 120GB SSD
* Ruby 2.2.1

