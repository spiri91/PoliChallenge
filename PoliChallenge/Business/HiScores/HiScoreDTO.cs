using System;

namespace PoliChallenge.Business.HiScores
{
    using Ensure.NET;

    public class HiScoreDTO
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
    }
}