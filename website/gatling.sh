#!/bin/bash

n=100

for ((i=1; i<=n; i++)); do
    curl -s http://167.71.49.200/ &
done

# Wait for all background processes to finish
wait