using System.Collections.Generic;
using System.Linq;

namespace PoliChallenge.Contracts
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> Query();

        List<T> FetchAll();

        void Put(T entity);

        void Add(T entity);

        void Delete(T entity);

        void Save();
    }
}
