using PoliChallenge.Contracts;
using System.Web.Http;
using PoliChallenge.Business.HiScores;

namespace PoliChallenge.Controllers
{
    public class HiScoresController : ApiController
    {
        public HiScoresController(IRepository<HiScoreDTO> hiScoresRepo)
        {
                
        }
    }
}
