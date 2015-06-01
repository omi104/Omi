using System.Collections.Generic;
using Dashboard.IdentityModel.Entity;

namespace Dashboard.IdentityModel.Repositories
{
    public interface IFavouriteRepository
    {

        List<Favourite> GetFavourite(string userId);
        List<Favourite> GetCompanyFavourite();
        string SaveFavourite(Favourite favourite);
        string RenameFavourite(int favouriteId, string favouriteText);
        string DeleteFavourite(int favouriteId);

    }
}
