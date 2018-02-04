using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.Places
{
    public class PlacesRepository : ContextHolder, IRepository<Place>
    {
        public IQueryable<Place> Query() => dbContext.Places.AsQueryable();

        public List<Place> FetchAll() => dbContext.Places.ToList();

        public void Put(Place entity) => dbContext.Entry(entity).State = EntityState.Modified;

        public void Add(Place entity) => dbContext.Places.Add(entity);

        public void Delete(Place entity) => dbContext.Places.Remove(entity);
    }
}