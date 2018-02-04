using System;
using System.Linq;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    public class HiScore
    {
        public Guid Key { get; set; }

        public string TeamName { get; set; }

        public double Score { get; set; }
        
        public DateTime Date { get; set; }

        public bool IsInTop(IRepository<HiScore> repo, uint totalHiScores)
        {
            if (repo.Query().Count() < totalHiScores)
                return true;

            if (Score > repo.Query().OrderByDescending(x => x.Score).Last().Score)
                return true;

            return false;
        }

        public static implicit operator HiScoreDTO(HiScore hiScore)
        {
            return new HiScoreDTO
            {
                Date = hiScore.Date,
                Key = hiScore.Key,
                Score = hiScore.Score,
                TeamName = hiScore.TeamName
            };
        }
    }
}
