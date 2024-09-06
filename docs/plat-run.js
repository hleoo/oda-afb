window.sendRun = function(senderID, webhookURL){

    console.log('SendRun');

    var currentURL = window.location.href;
    var workspace = window.location.pathname.split('/')[3];
    var runID = currentURL.match(/\/runs\/(\d+)/)?.[1] || null;;
    var runTitle = document.querySelector('textarea[data-test-id="runPageTitleInput"]').value;
    var runTL = document.querySelector('[data-test-id="runPageAssignTestLeadModalToggle"]').textContent;
    var runDateStart = document.querySelector('[data-test-id="rangePickerComponentStartDate"]').textContent;
    var runDateEnd = document.querySelector('[data-test-id="rangePickerComponentEndDate"]').textContent;
    var runTitle = document.querySelector('textarea[data-test-id="runPageTitleInput"]').value;
    var runStatus = document.querySelector('[data-test-id="runStatusBadge"]').textContent;


    var data = {
        runID: runID,
        runTitle: runTitle,
        runURL: currentURL,
        runTL: runTL,
        runDateStart: runDateStart,
        runDateEnd: runDateEnd,
        runStatus: runStatus,
        workspace: workspace,
        senderID: senderID
    }

    console.table(data);

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