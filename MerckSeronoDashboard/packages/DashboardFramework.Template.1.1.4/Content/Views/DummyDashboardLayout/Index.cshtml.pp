@model $rootnamespace$.Models.Config.DummyDashboardLayoutConfig
<h1>@Model.Header</h1>
<div id="filter-RecordCount-layout"></div>
<style type="text/css">
    .nav-selected {
        color: blue;
    }
</style>
<ul>
    <li id="nav-NavigationOne" onclick="CommandCenter.navigationChanged('NavigationOne')" class="nav-selected">Navigation One</li>
    <li id="nav-NavigationTwo" onclick="CommandCenter.navigationChanged('NavigationTwo')">Navigation Two</li>
</ul>

<div id="navigation-layout"></div>
<h6 style="color: gray">@Model.CopyRight</h6>
