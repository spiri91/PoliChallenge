using System;
using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    public class HiScoresRepository : ContextHolder, IRepository<HiScore>
    {
        public IQueryable<HiScore> Query() => dbContext.HiScores.AsQueryable();

        public List<HiScore> FetchAll() => dbContext.HiScores.ToList();
        
        public void Add(HiScore entity) => dbContext.HiScores.Add(entity);

        public void Put(HiScore entity) => throw new NotImplementedException();

        public void Delete(HiScore entity) => throw new NotImplementedException();
    }
}