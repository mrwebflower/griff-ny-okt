#!/bin/bash

echo "=== FILE SIZE ANALYSIS - OPTIMIZED IMAGES ==="
echo ""

for folder in all-pictures-optimized/*/; do
    if [ -d "$folder" ]; then
        folder_name=$(basename "$folder")
        echo "📁 $folder_name"
        echo "────────────────────────────────────────"

        # Find min and max sizes
        find "$folder" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) -exec ls -lh {} \; | \
        awk '{print $5, $9}' | \
        sort -k1 -h | \
        {
            read first_line
            min_size=$(echo "$first_line" | awk '{print $1}')
            min_file=$(basename $(echo "$first_line" | awk '{print $2}'))

            last_line="$first_line"
            while read line; do
                last_line="$line"
            done

            max_size=$(echo "$last_line" | awk '{print $1}')
            max_file=$(basename $(echo "$last_line" | awk '{print $2}'))

            echo "MIN: $min_size - $min_file"
            echo "MAX: $max_size - $max_file"
        }

        count=$(find "$folder" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | wc -l | tr -d ' ')
        echo "COUNT: $count images"
        echo ""
    fi
done
