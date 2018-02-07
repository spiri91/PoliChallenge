using System;
using System.ComponentModel.DataAnnotations;

namespace PoliChallenge.Business.HiScores
{
    public class HiScore
    {
        [Key]
        public Guid Key { get; set; }

        [Required]
        public string TeamName { get; set; }

        public double Score { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

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
