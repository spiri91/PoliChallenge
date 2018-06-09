using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.Questions
{
    using Ensure.NET;
    using System;

    public class QuestionsRepository : ContextHolder, IRepository<Question>
    {
        public IQueryable<Question> Query() => dbContext.Questions.AsQueryable();

        public List<Question> FetchAll() => dbContext.Questions.ToList();

        public void Put(Question entity)
        {
            var _entity = dbContext.Questions.Find(entity.Key);
            Ensure.Condition(entity != null, new InvalidOperationException());

            dbContext.Entry(_entity).CurrentValues.SetValues(entity);
        }

        public void Add(Question entity) => dbContext.Questions.Add(entity);

        public void Delete(Question entity) => dbContext.Questions.Remove(entity);
    }
}