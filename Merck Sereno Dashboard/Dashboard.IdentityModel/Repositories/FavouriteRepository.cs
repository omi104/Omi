using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using Dashboard.Configurations.Constant;
using Dashboard.IdentityModel.Context;
using Dashboard.IdentityModel.Entity;
using Dashboard.IdentityModel.Repositories;

namespace Dashboard.IdentityModel.Repositories
{
    public class FavouriteRepository : IFavouriteRepository
    {
        public List<Favourite> GetFavourite(string userId)
        {
            using (var ctx = new RbDbContext())
            {
                return ctx.Favourites.Where(x=>x.UserId == userId).ToList();
            }
        }

        public List<Favourite> GetCompanyFavourite()
        {
            using (var ctx = new RbDbContext())
            {
                return ctx.Favourites.Where(x => x.IsCompany == true).ToList();
            }
        }

        public string SaveFavourite(Favourite favourite)
        {
            using (var ctx = new RbDbContext())
            {
                var result = ctx.Favourites.FirstOrDefault(x => x.UserId == favourite.UserId && x.NavName == favourite.NavName);
                if (result == null)
                    ctx.Favourites.Add(favourite);
                else
                {
                    result.IsCompany = favourite.IsCompany;
                    result.OnClick = favourite.OnClick;
                    result.Params = favourite.Params;
                    result.Title = favourite.Title;
                }
                ctx.SaveChanges(); 
                return "Saved successfully";
            }
        }

        public string RenameFavourite(int favouriteId, string favouriteText)
        {
            using (var ctx = new RbDbContext())
            {
                var favourite = ctx.Favourites.FirstOrDefault(x => x.Id == favouriteId);
                if (favourite != null)
                {
                    favourite.Title = favouriteText;
                    ctx.Entry(favourite).State = EntityState.Modified;
                    ctx.SaveChanges();
                    return "Updated successfully";
                }
                return "No data found";
            }
        }

        public string DeleteFavourite(int favouriteId)
        {
            using (var ctx = new RbDbContext())
            {
                var favourites = ctx.Favourites.FirstOrDefault(x => x.Id == favouriteId);
                if (favourites != null)
                {
                    ctx.Favourites.Remove(favourites);
                    ctx.SaveChanges();
                    return "Record has been successfully deleted";
                }
                return "No data found";    
            }
        }
    }
}
