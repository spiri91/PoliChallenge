using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System;

namespace PoliChallenge_Tests
{
    public  static class Store
    {
        private static readonly DateTime date = DateTime.Now;
        private static readonly Guid HiScoreKey = Guid.NewGuid();
        private static readonly Guid PlaceKey = Guid.NewGuid();
        private static readonly Guid QuestionKey = Guid.NewGuid();

        public static HiScoreDTO TestHiScore => new HiScoreDTO() {Key = HiScoreKey, Score = 44, Date = date, TeamName = "VacaMuu"};

        public static PlaceDTO TestPlace => new PlaceDTO()
        {
            Key = PlaceKey,
            Name = "Facultatea de Bioinginerie",
            Observations = "Place of medicine and science",
            Latitude = 51.50154517m,
            Longitude = -0.184810403m
        };

        public static QuestionDTO TestQuestion => new QuestionDTO()
        {
            Key = QuestionKey,
            For = PlaceKey,
            Statement = "Smart question22",
            Answer1 = "Answer22",
            Answer2 = "Answer33",
            Answer3 = "Answer55",
            CorrectAnswer = "CorrectAnswer1"
        };

        public static string GoodToken => "Test1234";

        public static string BadToken => "BadToken";
    }
}
