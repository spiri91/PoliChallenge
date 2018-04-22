using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PoliChallenge.Business._Core
{
    internal sealed class DBConfigurationForTest : DropCreateDatabaseAlways<Context>
    {
        protected override void Seed(Context context)
        {
            var date = DateTime.Now;

            var hiScores = new List<HiScore>()
            {
                new HiScore() {Key = Guid.NewGuid(), Score = 100, Date = date, TeamName = "Team Rocket"},
                new HiScore() {Key = Guid.NewGuid(), Score = 90, Date = date, TeamName = "Bamboo"},
                new HiScore() {Key = Guid.NewGuid(), Score = 40, Date = date, TeamName = "Foo"}
            };

            var places = new List<Place>()
            {
                new Place(){Key = Guid.NewGuid(), Name = "Facultatea de Chimie", Latitude = 51.50154507m, Longitude  = -0.184810405m, Observations = "Locul cu eprubete"},
                new Place(){Key = Guid.NewGuid(), Name = "Facultatea de Fizica", Latitude = 51.50154508m, Longitude  = -0.184810403m, Observations = "Tesla, Edison, Watt"},
            };

            var questions = new List<Question>()
            {
                new Question() {Key = Guid.NewGuid(), For = places[0].Key, Statement = "Smart question1", Answer1 = "Answer1", Answer2 = "Answer4", Answer3 = "Answer8", CorrectAnswer = "CorrectAnswer1"},
                new Question() {Key = Guid.NewGuid(), For = places[0].Key, Statement = "Smart question2", Answer1 = "Answer2", Answer2 = "Answer5", Answer3 = "Answer9", CorrectAnswer = "CorrectAnswer2"},
                new Question() {Key = Guid.NewGuid(), For = places[1].Key, Statement = "Smart question3", Answer1 = "Answer3", Answer2 = "Answer6", Answer3 = "Answer10", CorrectAnswer = "CorrectAnswer3"},
                new Question() {Key = Guid.NewGuid(), For = places[1].Key, Statement = "Smart question4", Answer1 = "Answer4", Answer2 = "Answer7", Answer3 = "Answer11", CorrectAnswer = "CorrectAnswer4"}
            };

            context.HiScores.AddRange(hiScores);
            context.Places.AddRange(places);
            context.Questions.AddRange(questions);

            base.Seed(context);
        }
    }
}