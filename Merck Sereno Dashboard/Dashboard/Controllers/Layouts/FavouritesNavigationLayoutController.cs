using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.IdentityModel.Repositories;
using Dashboard.ViewModels;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class FavouritesNavigationLayoutController : LayoutBaseController<object>
    {
        private readonly IFavouriteRepository _favouriteRepository;
        public FavouritesNavigationLayoutController()
        {
            _favouriteRepository = new FavouriteRepository();
        }

        public override ViewResult Index()
        {
            var model = new FavouriteViewModel();


            model.CompanyFavorites = _favouriteRepository.GetCompanyFavourite().ToList();
            var favourite = _favouriteRepository.GetFavourite(HttpContext.User.Identity.Name);
            if (favourite != null && favourite.Any())
            {
                
                model.PersonalFavorites = favourite.Where(x => !x.IsCompany).ToList();
            }

            return View(model);
        }
    }
}