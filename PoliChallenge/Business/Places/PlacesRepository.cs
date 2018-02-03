using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.Places
{
    public class PlacesRepository : IRepository<Place>
    {
        public IQueryable<Place> Query()
        {
            throw new System.NotImplementedException();
        }

        public List<Place> FetchAll()
        {
            throw new System.NotImplementedException();
        }

        public void Put(Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Add(Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Save()
        {
            throw new System.NotImplementedException();
        }
    }
}