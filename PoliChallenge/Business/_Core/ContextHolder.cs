﻿using System;
using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System.Collections.Generic;
using System.Data.Entity;
using WebGrease.Css.Extensions;

namespace PoliChallenge.Business._Core
{
    public abstract class ContextHolder
    {
        protected Context DataBaseContext { get; private set; }

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

        protected void TruncateTables()
        {
            var tables = new String[] { "Questions", "Places", "HiScores" };
            tables.ForEach(t => DataBaseContext.Database.ExecuteSqlCommand($"Truncate table {t}" ));
        }

        ~ContextHolder() => DataBaseContext.Dispose();

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
                        
            
