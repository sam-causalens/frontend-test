const bodyParser = require("body-parser");
const express = require("express");
const difference = require("lodash/difference");

const app = express();
app.use(bodyParser.json());
const port = 3000;

/**
 * Main endpoint for predicting the some results from the data and target provided. The data should be in json form and
 * can contain any number of fields. Those fields must be consistent between all the objects, but can be null, and every
 * record must contain an index key. The value of index can either be an increasing integer or a timestamp and both
 * should be supported in the UI.
 *
 * Request body structure should be as follows:
 *
 * {
 *     data: [{
 *          index: 0,
 *          price: 123,
 *          interestRate: 0.3,
 *          borrowRate: 0.5,
 *          marketCap: 1e14,
 *     }, {
 *          index: 1,
 *          price: 456,
 *          interestRate: 0.32,
 *          borrowRate: 0.4,
 *          marketCap: 1e13,
 *     }]
 *     target: 'price'
 * }
 */
app.post("/predict", (req, res) => {
    // Run some validation on the input
    if (!req.body.data || !req.body.target || !Array.isArray(req.body.data)) {
        throw new Error(
            "Invalid request passed to endpoint, should be an object with data and target keys"
        );
    }

    const validKeys = Object.keys(req.body.data[0]);
    const indexes = [];

    for (let item of req.body.data) {
        if (difference(Object.keys(item), validKeys).length !== 0) {
            throw new Error(
                "Some of the objects passed have different keys, each item passed should have a consistent structure"
            );
        }
        if (item.index === undefined || item.index === null) {
            throw new Error("Every item must have an index field");
        }
        if (indexes.includes(item.index)) {
            throw new Error("The index value of each item must be unique");
        }
        indexes.push(item.index);
        if (
            item[req.body.target] === undefined ||
            item[req.body.target] === null
        ) {
            throw new Error("Target must be defined for every timestep");
        }
    }

    // Build out the fake responses for predictions and featureImportances
    const predictions = [];
    for (let item of req.body.data) {
        predictions.push(item[req.body.target] * (Math.random() + 0.5));
    }

    const featureImportance = {};
    let remaining = 1;
    for (let key of validKeys) {
        if (key === req.body.target) {
            continue;
        }
        const importance = Math.random();
        if (importance < remaining) {
            featureImportance[key] = importance;
            remaining = remaining - importance;
        } else {
            featureImportance[key] = remaining;
            remaining = 0;
        }
    }

    const confusionMetric = {};
    let confusionRemaining = req.body.data.length;
    for (let key of ["falsePositive", "truePositive", "falseNegative"]) {
        const count = Math.floor(Math.random() * confusionRemaining);
        confusionMetric[key] = count;
        confusionRemaining = confusionRemaining - count;
    }
    confusionMetric.trueNegative = confusionRemaining;

    const response = {
        featureImportance,
        predictions,
        metrics: {
            confusionMetric,
            detailedScoring: {
                pearsonR: Math.random(),
                spearmanRho: Math.random(),
                meanAbsError: Math.random() * 2,
                medianAbsError: Math.random() * 2,
                percentageAbsError: Math.random() * 100,
                signMatch: Math.random(),
            },
            overallScores: {
                training: 57,
                validation: 55,
                testing: 43,
            },
        },
        modelSummary: {
            algo_type: "linear.OLS",
            n_retrain: 0,
            n_training_gap: 0,
            n_training_warmup: 0,
            n_window_size: -1,
            scaling: "no_scaling",
            training_mode: "offline",
            weight_decay: 0.0,
        },
    };
    res.send(response);
});

app.listen(port, () =>
    console.log(`Test app listening at http://localhost:${port}`)
);
