using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System;

namespace PoliChallenge_Tests
{
    public  static class Store
    {
        public static HiScoreDTO TestHiScore => new HiScoreDTO() {Key = Guid.NewGuid(), Score = 44, Date = DateTime.Now, TeamName = "VacaMuu"};

        public static PlaceDTO TestPlace => new PlaceDTO()
        {
            Key = Guid.NewGuid(),
            Name = "Facultatea de Bioinginerie",
            Observations = "Place of medicine and science",
            Latitude = 51.50154517m,
            Longitude = -0.184810403m
        };

        public static QuestionDTO TestQuestion => new QuestionDTO()
        {
            Key = Guid.NewGuid(),
            Statement = "Smart question22",
            Answer1 = "Answer22",
            Answer2 = "Answer33",
            Answer3 = "Answer55",
            CorrectAnswer = "CorrectAnswer1"
        };
    }
}
