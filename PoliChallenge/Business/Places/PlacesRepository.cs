using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;
using System.Collections.Generic;
using System.Linq;

namespace PoliChallenge.Business.Places
{
    using Ensure.NET;
    using System;

    public class PlacesRepository : ContextHolder, IRepository<Place>
    {
        public IQueryable<Place> Query() => dbContext.Places.AsQueryable();

        public List<Place> FetchAll() => dbContext.Places.ToList();

        public void Put(Place entity)
        {
            var _entity = dbContext.Places.Find(entity.Key);
            Ensure.Condition(entity != null, new InvalidOperationException());

            dbContext.Entry(_entity).CurrentValues.SetValues(entity);
        }

        public void Add(Place entity) => dbContext.Places.Add(entity);

        public void Delete(Place entity) => dbContext.Places.Remove(entity);
    }
}