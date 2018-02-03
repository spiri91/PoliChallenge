using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System.Collections.Generic;
using System.Data.Entity;

namespace PoliChallenge.Business._Core
{
    public abstract class ContextHolder
    {
        protected Context DataBaseContext { get; set; }

        protected ContextHolder() =>
#if DEBUG
            DataBaseContext = new Context();
#else
            this.Context = new Context("ConnectionInfo");
#endif

        protected void Populate(IList<Question> questions, IList<Place> places, IList<HiScore> hiScores)
        {
            var dbInit = new DatabaseInitializer();
            dbInit.PopulateDb(questions, places, hiScores, DataBaseContext);
        }

        ~ContextHolder()
        {
            DataBaseContext.Dispose();
        }

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
            } 
        }
    }
}
                        
            
