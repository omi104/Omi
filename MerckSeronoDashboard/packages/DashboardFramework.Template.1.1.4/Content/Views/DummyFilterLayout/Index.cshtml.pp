@model $rootnamespace$.Models.Config.DummyFilterLayoutConfig

<div>@Model.Label</div>
<select id="@Model.ControlId" onchange="CommandCenter.filterChanged('RecordCount',this.value)">
</select>