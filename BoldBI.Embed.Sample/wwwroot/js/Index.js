var token = ""
var isMultiTab = false
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
        getDashboardAccessToken(data[0].Id, 'view', '100000');
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

// 1. Generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 2. Build embed query string
function generateEmbedQueryString(dashboardId, mode, expirationTime) {
  return [
    `embed_nonce=${generateUUID()}`,
    `embed_dashboard_id=${dashboardId}`,
    `embed_mode=${mode}`,
    `embed_timestamp=${Math.floor(Date.now() / 1000)}`,
    `embed_expirationtime=${expirationTime}`
  ].join('&');
}

// 3. Build request payload
function buildRequestPayload(queryString) {
  return {
    embedQuerString: queryString,
    dashboardServerApiUrl: `${rootUrl}/api/${siteIdentifier}`
  };
}

// 4. Send request and render dashboard
function sendAuthorizationRequest(payload, dashboardId) {
  $.ajax({
    url: authorizationServerUrl,
    type: "POST",
    async: true,
    data: JSON.stringify(payload),
    contentType: "application/json",
   success: function (response) {
        try {
            const parsed = typeof response === 'string' ? JSON.parse(response) : response;
            let accessToken;

            if (Array.isArray(parsed?.Data)) { // For multiTab dashboard
                for (const item of parsed.Data) {
                    if (item.access_token) {
                        accessToken = item.access_token;
                        isMultiTab = true
                        break;
                    }
                }
            } 
            else{
                accessToken = parsed.Data.access_token;
            }

            if (accessToken) {
                token = accessToken;
                renderDashboard(dashboardId);
            } else {
                alert("Access token not found in response.");
            }
        } catch (error) {
            alert("Error parsing response:", error);
        }
        },
  });
}

// 5. Main function to call
function getDashboardAccessToken(dashboardId, mode, expirationTime) {
  const queryString = generateEmbedQueryString(dashboardId, mode, expirationTime);
  const payload = buildRequestPayload(queryString);
  sendAuthorizationRequest(payload, dashboardId);
}

function renderDashboard(dashboardId) {
    this.dashboard = BoldBI.create({
        serverUrl: rootUrl + "/" + siteIdentifier,
        dashboardId: dashboardId,
        embedContainerId: "dashboard",
        embedToken: token,
        isMultiTabDashboard: isMultiTab
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