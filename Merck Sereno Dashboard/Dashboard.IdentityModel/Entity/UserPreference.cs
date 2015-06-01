using System.ComponentModel.DataAnnotations;

namespace Dashboard.IdentityModel.Entity
{
    public class UserPreference
    {
        [Key]
        [MaxLength(50)]
        public string UserName { get; set; }

        public string MktSegName { get; set; }
        public string MktSegValue { get; set; }

        public string RegionName { get; set; }
        public string RegionValue { get; set; }

        public string CountryName { get; set; }
        public string CountryValue { get; set; }

        public string BrandName { get; set; }
        public string BrandValue { get; set; }

        public string PeriodName { get; set; }
        public string PeriodValue { get; set; }

        public string MeasureName { get; set; }
        public string MeasureValue { get; set; }

        public string DisplayInName { get; set; }
        public string DisplayInValue { get; set; }
    }
}
