using System.Web.Mvc;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;

namespace Dashboard.Controllers
{
    public class FavouriteOperationController : Controller
    {
        private readonly IFavouriteRepository _favouriteRepository;
        public FavouriteOperationController()
        {
            _favouriteRepository = new FavouriteRepository();
        }

        public string SaveFavourite(string navigationName, string userId, string title, string parameter, string isSaveCompanyFavourite, string onClick)
        {
            var isCompany = isSaveCompanyFavourite.ToLower() == true.ToString().ToLower();
            var result =
                _favouriteRepository.SaveFavourite(new Favourite
                    {
                        NavName = navigationName,
                        UserId = userId,
                        Title = title,
                        Params = parameter,
                        OnClick = onClick,
                        IsCompany = isCompany
                    });
            return result;
        }

        public string RenameFavourite(string favouriteId, string title)
        {
            var result = _favouriteRepository.RenameFavourite(int.Parse(favouriteId), title);
            return result;
        }

        public string DeleteFavourite(string favouriteId)
        {
            var result = _favouriteRepository.DeleteFavourite(int.Parse(favouriteId));
            return result;
        }
    }

    
}
