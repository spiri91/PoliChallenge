using System.Collections.Generic;
using System.Linq;

namespace PoliChallenge.Business.HiScores
{
    public static class HiScoreExtensions
    {
        public static IList<HiScoreDTO> AsDTOs(this IList<HiScore> list) => list.Select(x => (HiScoreDTO) x).ToList();
    }
}