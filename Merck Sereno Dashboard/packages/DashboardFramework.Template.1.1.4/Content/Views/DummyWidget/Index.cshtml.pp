@model $rootnamespace$.Models.ViewModel.DummyWidgetViewModel

<h3>@Model.Config.TableName</h3>
<div>
    <table border="1" style="background-color: @Model.Config.Background">
        <tr>
            <th>Col1</th>
            <th>Col2</th>
            <th>Col3</th>
            <th>Col4</th>
        </tr>
        <tbody>
            @foreach (var i in Model.List)
            {
                <tr>
                    <td>@i.Col1</td>
                    <td>@i.Col2</td>
                    <td>@i.Col3</td>
                    <td>@i.Col4</td>
                </tr>
            }
        </tbody>
    </table>
</div>