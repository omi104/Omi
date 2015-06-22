using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class ColorListDataSource
    {
        private int _colorCounter;
        private List<string> _colorList;
        public const string ColorOfTotal = "#91C3D5";
        public const string ColorOfMerck = "#4BACC6";

        public ColorListDataSource()
        {
            _colorCounter = 0;
            _colorList = new List<string>()
                {
                    "f8bd19",
                    "848f29",
                    "e44a00",
                    "008ee4",
                    "33bdda",
                    "6baa01",
                    "583e78",
                    "0B3861",
                    "FF0033",
                    "F7D417",
                    "7DBF00",
                    "996600",
                    "00AFFF",
                    "FF00FF",
                    "088953",
                    "db35ef",
                    "f8bd19",
                    "848f29",
                    "e44a00",
                    "008ee4",
                    "33bdda",
                    "6baa01",
                    "583e78",
                    "0B3861",
                    "FF0033",
                    "F7D417",
                    "7DBF00"
                };
        }

        public string GetNextColor()
        {
            string nextColor = _colorList[_colorCounter];
            _colorCounter++;
            if (_colorCounter == _colorList.Count)
                _colorCounter = 0;
            return nextColor;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}