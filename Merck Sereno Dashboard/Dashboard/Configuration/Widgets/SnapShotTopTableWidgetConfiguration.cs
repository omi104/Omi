using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class SnapShotTopTableWidgetConfiguration : WidgetConfiguration<HierarchyTableConfig, object>
    {
        public SnapShotTopTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            HasTitle(widgetItem.Name);

            View.HasController<SnapshotTableWidgetController>();

            View.HasConfig(p => p);
            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<SnapshotTableTransformer>()
                .HasProperty(t => t.IsTopTable).WithValue(true)
                .HasProperty(t => t.MeasureValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                .HasProperty(t => t.AbsoluteTousandValue).WithValue(p => p[ParameterList.AbsoluteThousandFilter]);
                //.HasProperty(t => t.ShowFullLength).WithValue(widgetItem.Name == WidgetItems.TopSubBrandSnapShotTable().Name || widgetItem.Name == WidgetItems.TopSKUSnapShotTable().Name);

            Export.HasController<SnapshotTopTableExportController>()
                  .DataFlow.AddSource<CubeDataSourceBase>()
                  .WithModule(widgetItem.ViewId)
                  .Transform().By<CubeDataToXTableSnapshotTransformer>()
                  .HasProperty(t => t.IsTopTable).WithValue(true)
                  .HasProperty(t => t.AbsoluteThousandValue).WithValue(p => p["absoluteThousandConversion"])
                  .Transform().By<ExportSnapshotModelTransformer>()
                  .HasProperty(t => t.MeasureText).WithValue(p => p[ParameterList.TypeOfMeasure])
                 .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
                  .HasProperty(t => t.Region).WithValue(p => p["@@" + ParameterList.RegionOrCluster + "_text"])
                  .HasProperty(t => t.Country).WithValue(p => p["@@" + ParameterList.Country + "_text"])
                  .HasProperty(t => t.Segment).WithValue(p => p["@@" + ParameterList.Segment + "_text"])
                //.HasProperty(t => t.Forms).WithValue(p => p["@@" + ParameterList.Form + "_text"])
                  .HasProperty(t => t.UnitOrValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                  .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                  .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"]);


            HasParameterDependency.On(widgetItem.HasParamDependency);
        }
    }
}