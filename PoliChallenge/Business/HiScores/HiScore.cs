using System;

namespace PoliChallenge.Business.HiScores
{
    public class HiScore
    {
        public Guid Key { get; set; }

        public string TeamName { get; set; }

        public double Score { get; set; }
        
        public DateTime Date { get; set; }
    }
}
