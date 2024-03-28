function Init() {
    var http = new XMLHttpRequest();
    http.open("GET", getDashboardsUrl, true);
    http.responseType = 'json';
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            ListDashboards.call(this, typeof http.response == "object" ? http.response : JSON.parse(http.response));
        }
        else if (http.readyState == 4 && http.status == 404) {
            console.log("Server not found");
        }
        else if (http.readyState == 4) {
            console.log(http.statusText);
        }
    };

    http.send();
};

function ListDashboards(data) {
    if (typeof (data) != "undefined" && data != null) {
        renderDashboard(data[0].Id);
        data.forEach(function (element) {
            var divTag = document.createElement("div");
            divTag.innerHTML = element.Name;
            divTag.className = "dashboard-item";
            divTag.setAttribute("onclick", "renderDashboard('" + element.Id + "')");
            divTag.setAttribute("name", element.Name);
            divTag.setAttribute("itemid", element.Id);
            divTag.setAttribute("version", element.Version);
            divTag.setAttribute("ispublic", element.IsPublic);
            document.getElementById("panel").appendChild(divTag);
        });
    }
}

function renderDashboard(dashboardId) {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        mode: BoldBI.Mode.View,
        embedType: embedType,
        environment: environment,
        width: "100%",
        height: "100%",
        expirationTime: 10000,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmluaS5yYW1lc2hAc3luY2Z1c2lvbi5jb20iLCJ1cG4iOiJoYXJpbmkucmFtZXNoQHN5bmNmdXNpb24uY29tIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYWU4NDU0ZmUtYzZlYy00Njg0LWJkYmEtMjM2NWUyNjU1MzBlIiwiSVAiOiI6OjEiLCJpc3N1ZWRfZGF0ZSI6IjE3MTE1NDI2MjMiLCJuYmYiOjE3MTE1NDI2MjMsImV4cCI6MTcxMjE0NzQyMywiaWF0IjoxNzExNTQyNjIzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5OTk0L2JpL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ5OTk0L2JpL3NpdGUvc2l0ZTEifQ.JXhdSyRkFIwug7eQR0ZPLNhUkhy9ddoidiqlE915obE",
    });

    this.dashboard.loadDashboard();
};

function embedConfigErrorDialog() {
    var targetContainer = $('<div id="custom_dialog"></div>');
    var dlgDiv = $('<div id="sample_dialog" ></div>');
    targetContainer.append(dlgDiv);
    $('body').append(targetContainer);
    var dialog = new window.ejs.popups.Dialog({
        header: 'Error Message',
        width: '500px',
        isModal: true,
        showCloseIcon: true,
        target: document.getElementById('custom_dialog'),
        content: '<div>To compile and run the project, an embed config file needs to be required. Please use the <a href="https://help.boldbi.com/site-administration/embed-settings/" target="_blank">URL</a> to obtain the JSON file from the Bold BI server.</div>'
    });
    dialog.appendTo('#sample_dialog');
    var dialogFooter = $('<div id="sample_dialog_footer"><button id="custom_ok_button"onclick="Cancel()">OK</button></div>')
    $('#sample_dialog').append(dialogFooter);
    $('.e-dlg-overlay').css('position', 'fixed');
};

function Cancel() {
    $("#custom_dialog").html('');
}