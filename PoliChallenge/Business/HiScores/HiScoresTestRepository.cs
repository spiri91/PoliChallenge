using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    public class HiScoresTestRepository : IRepository<Places.Place>
    {
        public IQueryable<Places.Place> Query()
        {
            throw new System.NotImplementedException();
        }

        public List<Places.Place> FetchAll()
        {
            throw new System.NotImplementedException();
        }

        public void Put(Places.Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Add(Places.Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Places.Place entity)
        {
            throw new System.NotImplementedException();
        }

        public void Save()
        {
            throw new System.NotImplementedException();
        }
    }
}