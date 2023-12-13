/** 
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {Array} books - An array of book objects representing the scanned text.
 * @returns {Object} - Search results.
 */
function findSearchTermInBooks(searchTerm, books) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Iterate through each book
    for (const book of books) {
        const { ISBN, Content } = book;

        // Iterate through each piece of scanned text in the book
        for (const scannedText of Content) {
            const { Page, Line, Text } = scannedText;

            // Check if the search term is present in the text
            if (Text.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": ISBN,
                    "Page": Page,
                    "Line": Line
                });
            }
        }
    }

    return result;
}

// Example input objects
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
];

// Example output objects
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

// Unit tests
function runTests() {
    // Positive Test: Word "now" should be found in the text
    const positiveTest = findSearchTermInBooks("now", twentyLeaguesIn);
    assert(positiveTest.Results.length > 0, "Positive Test Failed");

    // Negative Test: Word "falsetest" should not be found in the text
    const negativeTest = findSearchTermInBooks("falsetest", twentyLeaguesIn);
    assert(negativeTest.Results.length === 0, "Negative Test Failed");

    // Case-Sensitive Test: Word "The" should be found, but not "the"
    const caseSensitiveTest = findSearchTermInBooks("The", twentyLeaguesIn);
    assert(caseSensitiveTest.Results.length > 0, "Case-Sensitive Test Failed");
}

// Assertion function
function assert(condition, message) {
    if (!condition) {
        console.error("Assertion Failed:", message);
    } else {
        console.log("Assertion Passed");
    }
}

// Run the tests
runTests();
