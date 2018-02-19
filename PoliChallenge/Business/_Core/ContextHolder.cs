using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using WebGrease.Css.Extensions;

namespace PoliChallenge.Business._Core
{
    public abstract class ContextHolder
    {
        protected Context dbContext { get; }

        protected ContextHolder()
        {
#if DEBUG
            dbContext = new Context();
#else
                this.Context = new Context("ConnectionInfo");
#endif
        }

        protected void Populate(IList<Question> questions, IList<Place> places, IList<HiScore> hiScores)
        {
            var dbInit = new DatabaseInitializer();
            dbInit.PopulateDb(questions, places, hiScores, dbContext);
        }

        protected void TruncateTables()
        {
            var tables = new String[] { "Questions", "Places", "HiScores" };
            tables.ForEach(t => dbContext.Database.ExecuteSqlCommand($"Truncate table {t}"));
        }

        public virtual void Save()
        {
#if DEBUG
            if (FromConfiguration.Get(SettingsName.PersistentSave) == "True")
                dbContext.SaveChanges();
#else
                dbContext.SaveChanges();
#endif
        }

        ~ContextHolder() => dbContext.Dispose();

        private class DatabaseInitializer : DropCreateDatabaseAlways<Context>
        {
            private IEnumerable<Question> _questions;
            private IEnumerable<Place> _places;
            private IEnumerable<HiScore> _hiScores;

            public void PopulateDb(IList<Question> questions, IList<Place> places, IList<HiScore> hiScores, Context context)
            {
                _questions = questions;
                _places = places;
                _hiScores = hiScores;

                Seed(context);
            }

            protected override void Seed(Context context)
            {
                context.Questions.AddRange(_questions);
                context.Places.AddRange(_places);
                context.HiScores.AddRange(_hiScores);

                context.SaveChanges();
            }
        }
    }
}



