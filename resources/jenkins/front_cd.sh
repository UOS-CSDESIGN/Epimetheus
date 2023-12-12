latest_file=$(aws s3 ls s3://react-build-bucket/ | grep reactApp- | sort -r | awk '{print $4}' | head -n 1)
aws s3 cp "s3://react-build-bucket/$latest_file" .
unzip -o $latest_file -d out/

# Clear the deploy bucket
aws s3 rm s3://www.epimetheus.store/ --recursive

# Sync the unzipped files to the deploy bucket
aws s3 sync out/build/ s3://www.epimetheus.store/

# Cleanup
rm -rf $latest_file out/