using System;
using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Business._Core;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.Questions
{
    public class QuestionsRepository : ContextHolder, IRepository<Question>
    {
        public IQueryable<Question> Query()
        {
            throw new NotImplementedException();
        }

        public List<Question> FetchAll()
        {
            throw new NotImplementedException();
        }

        public void Put(Question entity)
        {
            throw new NotImplementedException();
        }

        public void Add(Question entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Question entity)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }
}