function formatText(key, text) {
    if (key === 'Environment' || key === 'Test Case information') {
        return text.split('\n').map(line => `> ${line}`).join('\n');
    }
    if (key === 'Steps to reproduce') {
        return text.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
    }
    if (key === 'Expected result' || key === 'Actual result') {
        return text.split('\n').map(line => `- ${line}`).join('\n');
    }
    return text;
}

function extractTextBetweenKeywords(text, keywords) {
    const results = {};
    
    for (let i = 0; i < keywords.length - 1; i++) {
        const startKeyword = keywords[i];
        const endKeyword = keywords[i + 1];
        const regex = new RegExp(`${startKeyword}(.*?)${endKeyword}`, 's');
        const match = text.match(regex);
        
        if (match && match[1]) {
            const key = startKeyword.replace(':', '').trim();
            const value = formatText(match[1].trim());
            results[key] = value;
        }
    }

    // Handle the last section
    const lastKeyword = keywords[keywords.length - 1];
    const lastRegex = new RegExp(`${lastKeyword}(.*)`, 's');
    const lastMatch = text.match(lastRegex);

    if (lastMatch && lastMatch[1]) {
        const key = lastKeyword.replace(':', '').trim();
        const value = formatText(lastMatch[1].trim());
        results[key] = value;
    }

    return results;
}

window.sendIssue = function(senderID, webhookURL){

    var currentUrl = window.location.href;
    var issueID = document.querySelector('[data-test-id="issueDetails"]').textContent.substring(2);
    var issueTitle = document.querySelector('[data-test-id="issueTitle"]').value;
    var issueStatus = document.querySelector('[data-test-id="issueStatus"]').innerText.replace('Status\n','');    ;
    var issueDescRaw = document.querySelector('[data-test-id="IssuePageIssueDescription"]').textContent;  
    var issueReporter = document.querySelector('[data-test-id="issueCreatedBy"]').innerText.split('\n')[1];
    var issueSeverity = document.querySelector('[data-test-id="issueSeverity"]').innerText.split('\n')[1];  
    var issueIntegration = document.querySelector('[data-test-id="issueIntegrations"]').innerText.split('\n')[1];
    var issueRun = document.querySelector('[data-test-id="issueRun"]').innerText.split('\n')[1];
    var issueFeature = document.querySelector('[data-test-id="issueFeatures"]').innerText;
    var issueLabels = document.querySelector('[data-test-id="issueLabels"]').innerText.trim().replace('Add','').split('\n');

    issueLabels.pop(); // last item is empty

    const keywords = [
        'Environment:', 
        'Test Case information:', 
        'Steps to reproduce:', 
        'Expected result:', 
        'Actual result:'
    ];

    var issueDesc = extractTextBetweenKeywords(issueDescRaw, keywords);

    var data = {
        url: currentUrl,
        issueID: issueID,
        title: issueTitle,
        description: issueDesc,
        rawDescription: issueDescRaw,
        status: issueStatus,
        reporter: issueReporter,
        severity: issueSeverity,
        integration: issueIntegration,
        reportedAtRun: issueRun,
        feature: issueFeature,
        label: issueLabels,
        senderID: senderID
    };

    console.table(issueDesc);

    // Send data to webhook
    fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(result => {
        // Displaying a prompt with the result
        var message = 'API call successful!\n\nResult:\n' + result;
        window.prompt(message, result);
    })
    .catch(error => {
        // Handling errors and displaying a prompt
        var errorMessage = 'Error sending data: ' + error.message;
        window.prompt(errorMessage, null);
        console.error(errorMessage);
    });

}