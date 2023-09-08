function getDashboardViews() {

    bbEmbed('<style type="text/css"> #no-filter-views { float: left; display: none; width: 100%; text-align: center; margin-top: 15px; font-size: 14px; cursor: default; } #no-filter-views label { max-width: 93%; display: inline-block; margin-bottom: 5px; font-weight: inherit; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--primary-text-normal-color)!important; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> #saved-filter-view-list { display: none; float: left; margin-right: 0; width: 100%; height: auto; position: absolute; overflow: hidden; margin-right: 10px; font-size: 14px; } #saved-filter-view-list li { padding-bottom: 0; padding-top: 6px; list-style: none; color: var(--primary-text-normal-color); } #saved-filter-view-list li:hover { background-color: var(--view-section-content-bg-hover-color)!important; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> .saved-filter-view-options { float: right; margin-top: 2px; display: none; width: 20%; } .saved-filter-view-options .view-options { width: 32px; height: 32px; float: right; cursor: pointer; } #saved-filter-view-list li:hover > .saved-filter-view-options { display: block; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> .view-list-column { width: 20%; float: right; display: none; right: 0; height: 100% !important; margin-bottom: 0 !important; position: absolute; z-index: 10003; box-shadow: 0 1px 3px 1px rgba(0,0,0,.15); background-color: var(--primary-background-color); border-right: 1px solid var(--secondary-border-color) } #view-panel-header { width: 100%; height: 40px; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> .dashboard-resize { width: 80% !important; float: left; } .view-list.active-view-list { background-color: var(--view-section-content-bg-color) !important; } .applied-filters { padding: 10px 20px 10px 20px; margin: 0; } .applied-filters .applied-column-name { font-weight: 700 !important; margin-bottom: 10px; } .applied-filters .applied-column-value { margin-bottom: 5px; font-size: 12px; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> #view-panel-header #view-panel-header-name { color: var(--primary-text-normal-color); width: 80%; float: left; font-size: 14px; margin: 13px 10px; text-align: left; font-weight: 700; cursor: default; } #view-panel-header #view-panel-close { color: var(--primary-text-normal-color); width: 4%; float: right; font-size: 15px; margin-top: 13px; padding-right: 20px; cursor: pointer; } </style>').appendTo('head');
    bbEmbed('<style type="text/css"> .saved-view-label { font-weight: inherit !important; width: 75%; display: inline-block; margin-bottom: 5px; } .saved-view-label .saved-view-link { color: var(--hyper-link-normal-color)!important; font-size: 12px; max-width: 65%; margin-left: 10px; float: left; text-decoration-line: none; cursor: pointer; } .saved-view-label .saved-view-link:hover { text-decoration-line: underline; } </style>').appendTo('head');

    var dbrdInstance = BoldBI.getInstance("dashboard");
    const itemId = dbrdInstance.isMultiTab ? dbrdInstance._getChildDashboardId() : dbrdInstance.embedOptions.dashboardId;
    dbrdInstance.getDashboardViewsByDashboardId(itemId, function (viewInfos) {
        const viewListColumn = bbEmbed('.view-list-column');
        const dashboardContainerId = dbrdInstance.isMultiTab ? `#multi_${itemId.replaceAll('-', '')}_embeddedbi_designerContainer` : '#dashboard_embeddedbi_designerContainer';
        const dashboardContainer = bbEmbed(dashboardContainerId);
        const viewListPanel = bbEmbed('<div class="view-list-column"></div>').css('display', 'block');
        if (viewListColumn.is(':visible')) {
            dashboardContainer.removeClass('dashboard-resize');
            viewListColumn.remove();
            dbrdInstance.resizeDashboard();
        }
        else {
            viewListColumn.remove();
            dashboardContainer.addClass('dashboard-resize');
            bbEmbed(dbrdInstance.isMultiTab ? '#multi_' + itemId.replaceAll('-', '') + '_embeddedbi' : '#dashboard_embeddedbi').append(viewListPanel);
            dbrdInstance.resizeDashboard();
            const viewPanelHeaderDiv = bbEmbed('<div id="view-panel-header"></div>');
            viewListPanel.append(viewPanelHeaderDiv);
            const viewPanelHeader = bbEmbed('<div id="view-panel-header-name">VIEWS</div>');
            viewPanelHeaderDiv.append(viewPanelHeader);
            const viewPanelCloseDiv = bbEmbed('<div id="view-panel-close"></div>').on('click', () => _closeViewPanel(dbrdInstance));
            const viewPanelClose = bbEmbed('<span class="su su-close"></span>');
            viewPanelCloseDiv.append(viewPanelClose);
            viewPanelHeaderDiv.append(viewPanelCloseDiv);
            const noFilterViews = bbEmbed('<div id="no-filter-views"><label>No views found.</label></div>');
            viewListPanel.append(noFilterViews);
            const savedViewList = bbEmbed('<div id="saved-filter-view-list"></div>');
            viewListPanel.append(savedViewList);
            if (viewInfos) {
                savedViewList.css('display', 'block');
                noFilterViews.css('display', 'none');
                viewInfos.reverse().forEach((viewInfo) => {
                    _listViewsInViewPanel(viewInfo);
                });
            }
            else {
                savedViewList.css('display', 'none');
                noFilterViews.css('display', 'block');
            }
        }
    });
    bbEmbed(document).on('click', '.e-toolbar-items', function () {
        _closeViewPanel(dbrdInstance);
    });
}

function _closeViewPanel(dbrdInstance) {
    var dbrdInstance = BoldBI.getInstance("dashboard");
    const itemId = dbrdInstance.isMultiTab ? dbrdInstance._getChildDashboardId() : dbrdInstance.embedOptions.dashboardId;
    const dashboardContainerId = dbrdInstance.isMultiTab ? `#multi_${itemId.replaceAll('-', '')}_embeddedbi_designerContainer` : '#dashboard_embeddedbi_designerContainer';
    bbEmbed(dashboardContainerId).removeClass('dashboard-resize');
    bbEmbed('.view-list-column').remove();
    dbrdInstance.resizeDashboard();
}
function _showAppliedFilters(viewInfo) {
    const filterQueryArray = JSON.parse(decodeURIComponent(viewInfo.QueryString).split('filterQuery=')[1]);
    filterQueryArray.forEach((queryItem) => {
        const { dimfi, idf } = queryItem;
        let columnName = queryItem.cn;
        const columnValueArray = dimfi ? dimfi.t : idf.dfl;
        if (dimfi && !dimfi.c.toLowerCase().includes('include')) {
            columnName += ` (${dimfi.c})`;
        }
        _createAppliedFiltersElement(columnName, columnValueArray);
    });
}
function _createAppliedFiltersElement(name, values) {
    const activeListElement = bbEmbed('.active-view-list').first();
    const appliedFilters = bbEmbed('<div>').addClass('applied-filters').appendTo(activeListElement);
    bbEmbed('<label>').addClass('applied-column-name').text(name).appendTo(appliedFilters);
    bbEmbed('<br>').appendTo(appliedFilters);
    for (let x = 0; x < values.length; x++) {
        bbEmbed('<label>').addClass('applied-column-value').text(values[`${x}`]).appendTo(appliedFilters);
        bbEmbed('<br>').appendTo(appliedFilters);
    }
}

function _getFilterQuery(dbrdInstance, thisElement) {
    var dbrdInstance = BoldBI.getInstance("dashboard");
    const viewId = bbEmbed(thisElement).attr('viewid');
    bbEmbed('.view-list').removeClass('active-view-list');
    bbEmbed('.applied-filters').remove();
    bbEmbed(thisElement).addClass('active-view-list');
    dbrdInstance.getDashboardViewByViewId(viewId, (viewInfo) => {
        _showAppliedFilters(viewInfo);
    });
}

function _listViewsInViewPanel(viewInfo) {
    var dbrdInstance = BoldBI.getInstance("dashboard");
    const savedViewList = bbEmbed('#saved-filter-view-list');
    const viewOptions = bbEmbed('<div class="saved-filter-view-options"></div>');
    const deleteViewOptionDiv = bbEmbed('<div class="view-options" title="Delete"></div>')
        .attr({
            viewid: viewInfo.ViewId,
            itemid: viewInfo.ItemId,
            viewname: viewInfo.ViewName
        })
        .on('click', () => _deleteView(dbrdInstance, deleteViewOptionDiv))
        .append('<span class="su su-delete"></span');
    viewOptions.append(deleteViewOptionDiv);
    //const copyViewOptionDiv = bbEmbed('<div class="view-options" title="Copy"></div>')
    //    .attr({
    //        viewid: viewInfo.ViewId,
    //        itemid: viewInfo.ItemId,
    //        viewname: viewInfo.ViewName
    //    })
    //    .on("click", () => that._copyView(that, copyViewOptionDiv))
    //    .append('<span class="su su-link"></span>');
    //viewOptions.append(copyViewOptionDiv);
    const listView = bbEmbed('<li class="view-list"></li>')
        .attr('viewid', viewInfo.ViewId)
        .append(viewOptions)
        .on('click', () => _getFilterQuery(dbrdInstance, listView));
    const viewLabel = bbEmbed('<label class="saved-view-label"></label>')
        .attr({
            viewid: viewInfo.ViewId,
            itemid: viewInfo.ItemId,
            filterquery: viewInfo.QueryString
        });
    const viewLabelLink = bbEmbed('<a class="saved-view-link"></a>')
        .attr('title', viewInfo.ViewName)
        .text(viewInfo.ViewName)
        .on('click', () => _renderFilterViewDashboard(dbrdInstance, viewLabelLink));
    viewLabel.append(viewLabelLink);
    listView.append(viewLabel);
    savedViewList.prepend(listView);
}
function _renderFilterViewDashboard(dbrdInstance, thisElement) {
    var dbrdInstance = BoldBI.getInstance("dashboard");
    dbrdInstance.destroy();
    dbrdInstance.embedOptions.dashboardSettings.filterOverviewSettings.viewId = bbEmbed(thisElement).parent().attr('viewId');
    dbrdInstance.embedOptions.dashboardSettings.filterOverviewSettings.viewName = bbEmbed(thisElement).text();
    dbrdInstance.embedOptions.filterParameters = bbEmbed(thisElement).parent().attr('filterquery');
    const dashboard = BoldBI.create(dbrdInstance.embedOptions);
    dashboard.loadDashboard();
}
function _deleteView(dbrdInstance, thisElement) {
    var dbrdInstance = BoldBI.getInstance("dashboard");
    const itemId = dbrdInstance.isMultiTab ? dbrdInstance._getChildDashboardId() : dbrdInstance.embedOptions.dashboardId;
    const dashboardContainer = dbrdInstance.isMultiTab ? `multi_${itemId.replaceAll('-', '')}_embeddedbi` : `${dbrdInstance.embedOptions.embedContainerId}_embeddedbi`;
    bbEmbed('#' + dashboardContainer + '_designAreaContainer_WaitingPopup').show();
    const viewId = bbEmbed(thisElement).attr('viewId');
    dbrdInstance.deleteFilterView(viewId, () => {
        dbrdInstance._createSaveViewResponseDialog('Views deleted successfully');
    });
    const filterViewList = bbEmbed('#saved-filter-view-list li');
    filterViewList.each(function () {
        if (bbEmbed(this).attr('viewid') == viewId) {
            bbEmbed(this).remove();
            return false; // Exit the loop after removing the element
        }
    });
    if (bbEmbed('#saved-filter-view-list li').length === 0) {
        bbEmbed('#saved-filter-view-list').hide();
        bbEmbed('#no-filter-views').show();
    }
    const dbrdModelInstance = bbEmbed(`#${dashboardContainer}`).data('BoldBIDashboardDesigner');
    if (dbrdModelInstance.model.filterOverviewSettings.viewId == viewId) {
        location.reload();
    }
    bbEmbed('#' + dashboardContainer + '_designAreaContainer_WaitingPopup').hide();
}

    //function _copyView(dbrdInstance, thisElement) {
    //    const that = dbrdInstance;
    //    const { embedOptions, isMultiTab, rootUrl, siteIdentifier } = that;
    //    const viewId = bbEmbed(thisElement).attr("viewId");
    //    const childItemId = isMultiTab ? that._getChildDashboardId() : "";
    //    const childItemPath = isMultiTab ? that._getChildDashboardPath(childItemId) : "";
    //    const viewURL = `${rootUrl}/${siteIdentifier}/dashboards/${embedOptions.dashboardId}/${childItemPath}?viewid=${viewId}${isMultiTab ? "&tab=" + childItemId : ""}`;
    //    navigator.clipboard.writeText(viewURL);
    //    that._responseDialog("View URL copied successfully", true);
    //}