window.sendIssue = function(){

    var currentUrl = window.location.href;
    var issueID = document.querySelector('[data-test-id="issueDetails"]').textContent.substring(2);
    var issueTitle = document.querySelector('[data-test-id="issueTitle"]').value;

    var data = {
        url: currentUrl,
        issueID: issueID,
        title: issueTitle
    }

    console.log(data);
}