echo "start delete"

cd .next/standalone
rm -rf docs/.git/objects
rm -rf docs_*
rm -rf package-lock.json
echo "end delete"

