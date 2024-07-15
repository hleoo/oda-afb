window.sendIssue = function(senderID, webhookURL){

    var currentUrl = window.location.href;
    var issueID = document.querySelector('[data-test-id="issueDetails"]').textContent.substring(2);
    var issueTitle = document.querySelector('[data-test-id="issueTitle"]').value;
    var issueStatus = document.querySelector('[data-test-id="issueStatus"]').innerText.replace('Status\n','');    ;
    var issueDesc = document.querySelector('[data-test-id="IssuePageIssueDescription"]').textContent;  
    var issueReporter = document.querySelector('[data-test-id="issueCreatedBy"]').innerText.split('\n')[1];
    var issueSeverity = document.querySelector('[data-test-id="issueSeverity"]').innerText.split('\n')[1];  
    var issueIntegration = document.querySelector('[data-test-id="issueIntegrations"]').innerText.split('\n')[1];
    var issueRun = document.querySelector('[data-test-id="issueRun"]').innerText.split('\n')[1];
    var issueFeature = document.querySelector('[data-test-id="issueFeatures"]').innerText;
    var issueLabels = document.querySelector('[data-test-id="issueLabels"]').innerText.trim().replace('Add','').split('\n');

    issueLabels.pop(); // last item is empty

    var data = {
        url: currentUrl,
        issueID: issueID,
        title: issueTitle,
        description: issueDesc,
        status: issueStatus,
        reporter: issueReporter,
        severity: issueSeverity,
        integration: issueIntegration,
        reportedAtRun: issueRun,
        feature: issueFeature,
        label: issueLabels,
        senderID: senderID
    };

    console.table(data);

    // Send data to webhook
    fetch(webhookURL, {
        method: 'GET',
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