using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Contracts;

namespace PoliChallenge.Business.HiScores
{
    public static class HiScoreExtensions
    {
        public static IList<HiScoreDTO> AsDTOs(this IList<HiScore> list) => list.Select(x => (HiScoreDTO) x).ToList();

        public static bool IsInTop(this HiScore hiScore, IRepository<HiScore> repo, uint totalHiScores)
        {
            if (repo.Query().Count() < totalHiScores)
                return true;

            if (hiScore.Score > repo.Query().OrderByDescending(x => x.Score).Last().Score)
                return true;

            return false;
        }
    }
}