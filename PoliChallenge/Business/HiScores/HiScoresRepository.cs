using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    public class HiScoresRepository : ContextHolder, IRepository<HiScore>
    {
        public IQueryable<HiScore> Query()
        {
            throw new System.NotImplementedException();
        }

        public List<HiScore> FetchAll()
        {
            throw new System.NotImplementedException();
        }

        public void Put(HiScore entity)
        {
            throw new System.NotImplementedException();
        }

        public void Add(HiScore entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(HiScore entity)
        {
            throw new System.NotImplementedException();
        }

        public void Save()
        {
            throw new System.NotImplementedException();
        }
    }
}