using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.Questions
{
    public class QuestionsRepository : ContextHolder, IRepository<Question>
    {
        public IQueryable<Question> Query() => dbContext.Questions.AsQueryable();

        public List<Question> FetchAll() => dbContext.Questions.ToList();

        public void Put(Question entity) => dbContext.Entry(entity).State = EntityState.Modified;

        public void Add(Question entity) => dbContext.Questions.Add(entity);

        public void Delete(Question entity) => dbContext.Questions.Remove(entity);
    }
}