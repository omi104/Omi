using System.Collections.Generic;
using Dashboard.IdentityModel.Entity;

namespace Dashboard.ViewModels
{
    public class FavouriteViewModel
    {
        public List<Favourite> CompanyFavorites { get; set; }
        public List<Favourite> PersonalFavorites { get; set; }
    }
}