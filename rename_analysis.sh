#!/bin/bash
echo "=================================================="
echo "🛡️ Crenox Rebranding Analysis Script"
echo "=================================================="

# Directories to ignore
IGNORE_DIRS="--exclude-dir=.git --exclude-dir=.github"
IGNORE_FILES="--exclude=*.exe --exclude=*.bin --exclude=*.tar.gz --exclude=rename_analysis.sh"

echo "[*] Files containing the word 'sentinel' (case-insensitive):"
grep -ilr "sentinel" $IGNORE_DIRS $IGNORE_FILES . | while read file; do
    count=$(grep -ic "sentinel" "$file")
    echo "  - $file : ($count occurrences)"
done | sort -k5 -nr

echo ""
echo "[*] Key Areas Impacted:"
echo "1. Go Modules: go.mod and all import paths in .go files."
echo "2. Documentation: README.md, docs/index.html, docs/index-ar.html"
echo "3. Binaries/Makefile: Commands building 'sentinel'"
echo "4. GitHub Workflows: CI/CD scripts referencing 'sentinel-cli'"

echo "=================================================="
echo "✅ Analysis Complete. Ready for Rebranding!"
