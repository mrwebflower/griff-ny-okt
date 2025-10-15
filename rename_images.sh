#!/bin/bash

# Script to rename images with SEO-friendly names including parent folder and griff-entreprenor
# Headers will be prefixed with 01-header

set -e

BASE_DIR="all-pictures-again"

# Function to slugify folder names (convert to SEO-friendly format)
slugify() {
    echo "$1" | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9]+/-/g' | sed -E 's/^-+|-+$//g' | tr '[:upper:]' '[:lower:]'
}

# Function to rename images in a folder
rename_folder_images() {
    local folder="$1"
    local folder_slug="$2"
    local counter=2

    echo "Processing folder: $folder"

    # First, rename the header file
    for header in "$BASE_DIR/$folder"/header.*; do
        if [ -f "$header" ]; then
            ext="${header##*.}"
            new_name="$BASE_DIR/$folder/01-header-${folder_slug}-griff-entreprenor.${ext}"
            if [ "$header" != "$new_name" ]; then
                echo "  Renaming: $(basename "$header") → $(basename "$new_name")"
                mv "$header" "$new_name"
            fi
        fi
    done

    # Then rename all other images
    find "$BASE_DIR/$folder" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) ! -name "01-header-*" | sort | while read -r file; do
        ext="${file##*.}"
        basename_file=$(basename "$file")

        # Skip if already renamed
        if [[ "$basename_file" =~ ^${folder_slug}-griff-entreprenor- ]]; then
            echo "  Skipping (already renamed): $basename_file"
            continue
        fi

        # Create new name with sequential number
        new_name="$BASE_DIR/$folder/${folder_slug}-griff-entreprenor-$(printf "%02d" $counter).${ext}"

        # If file already exists, increment counter
        while [ -f "$new_name" ]; do
            counter=$((counter + 1))
            new_name="$BASE_DIR/$folder/${folder_slug}-griff-entreprenor-$(printf "%02d" $counter).${ext}"
        done

        echo "  Renaming: $(basename "$file") → $(basename "$new_name")"
        mv "$file" "$new_name"
        counter=$((counter + 1))
    done

    echo ""
}

# Rename images in each folder
echo "Starting image renaming process..."
echo "=================================="
echo ""

rename_folder_images "Bad og våtrom" "bad-vatrom"
rename_folder_images "Garasje" "garasje"
rename_folder_images "Nybygg" "nybygg"
rename_folder_images "Rehabilitering" "rehabilitering"
rename_folder_images "Terrasse" "terrasse"
rename_folder_images "Tilbygg" "tilbygg"
rename_folder_images "Vinduer" "vinduer"

echo "=================================="
echo "Image renaming complete!"
echo ""
echo "Summary:"
echo "- All header images renamed to: 01-header-[folder]-griff-entreprenor.[ext]"
echo "- All other images renamed to: [folder]-griff-entreprenor-[number].[ext]"
