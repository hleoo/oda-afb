window.sendBuild = function(senderID, webhookURL){

    var currentUrl = window.location.href;
    var buildName;
    var buildVersion;
    var buildURL;
    var runTitle = document.querySelector('textarea[data-test-id="runPageTitleInput"]').value;
    var runID = window.location.pathname.split('/').pop();
    console.log(lastPath);
    
    var buildTag = document.querySelector('div[class^="Tags_triggerWrapper"] ul li').textContent;

    // Select all <a> elements with the text "Download"
    const links = document.querySelectorAll('a');

    // Iterate through each link
    links.forEach(link => {
    // Check if the link text is "Download"
    if (link.textContent.trim() === 'Download') {
        // Find the parent <div> with a class
        const parentDiv = link.closest('div[class]');
        
        if (parentDiv) {
            buildURL = link.href;

            // Find the parent of the parentDiv
            const grandparentDiv = parentDiv.parentElement;

            // Check for textareas within the grandparentDiv
            const textareas = grandparentDiv.querySelectorAll('textarea');

            // BuildName
            textareas.forEach(textarea => {
                if (textarea.value !== "") buildName = textarea.value;
            });

            // Check for input within the grandparentDiv
            const versions = grandparentDiv.querySelectorAll('input');

            // Version
            versions.forEach(ver => {
                if (ver.value !== "") buildVersion = ver.value;
            });

        }
    }
    });

    var data = {
        buildName: buildName,
        buildVersion: buildVersion,
        buildURL: buildURL,
        buildTag: buildTag,
        runTitle: runTitle,
        runURL: currentUrl,
        runID: runID,
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