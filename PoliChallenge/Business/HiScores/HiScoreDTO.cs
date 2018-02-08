using System;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    using Ensure.NET;

    public class HiScoreDTO : IIsEqual<HiScoreDTO>
    {
        public Guid? Key { get; set; }

        public string TeamName { get; set; }

        public double Score { get; set; }

        public DateTime? Date { get; set; }

        public HiScore ToNonDTO() => this;

        public static implicit operator HiScore(HiScoreDTO dto)
        {
            Ensure.Condition(dto.IsValid(), new ArgumentException());

            return new HiScore()
            {
                Key = dto.Key ?? Guid.NewGuid(),
                Date = dto.Date ?? DateTime.Now,
                Score = dto.Score,
                TeamName = dto.TeamName
            };
        }

        private bool IsValid()
        {
            if (String.IsNullOrWhiteSpace(TeamName))
                return false;

            if (Score < 0)
                return false;

            return true;
        }

        public bool IsEqual(HiScoreDTO comparator)
        {
            return this.Key == comparator.Key && Math.Abs((this.Date.Value - comparator.Date.Value).TotalSeconds) < 1 && this.Score == comparator.Score
                   && this.TeamName == comparator.TeamName;
        }
    }
}