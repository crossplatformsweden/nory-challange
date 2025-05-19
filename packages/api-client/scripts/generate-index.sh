#!/bin/bash

# Create the index file with model exports
echo 'export * from "./generated/model";' >src/index.ts

# Add hook exports
for file in src/generated/hooks/*/*.ts; do
    if [[ ! $file =~ \.test\.ts$ ]] && [[ ! $file =~ \.d\.ts$ ]]; then
        relative_path=${file#src/}
        echo "export * from \"./${relative_path%.ts}\";" >>src/index.ts
    fi
done
