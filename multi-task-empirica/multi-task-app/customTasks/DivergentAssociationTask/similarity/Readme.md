# Similarity setup

We need a GloVe dataset to run similarity. Find the available datasets at
https://nlp.stanford.edu/projects/glove/.

Since this dataset is massive and contains all kinds of unwanted "words" such as
punctuations and given names, we filter it through a "words-common.txt"
dictionary. We do this filtering up front, so we do not need to do this on each
load.

Then, we gzip this filtered GloVe dataset, and for convenience of deployment, we
upload it to AWS S3. When the experiment boots, it will load the dataset into
memory from S3.

## Prep GloVe

To get filtered glove data file, run:

```
> node filter.js
```

Change the file names as needed. It should make a glove.txt file.

Then compress the file with:

```
> gzip glove.txt
```

Finally upload to S3. Currently using an Empirica AWS account owned by Abdullah
Almaatouq, in a bucket named `empirica-multitask`. If you change S3 accounts,
or file names, you will need change the hard-coded URL in the similaty.js file.

## More

See https://github.com/jayolson/divergent-association-task for details about the
algorithm.
