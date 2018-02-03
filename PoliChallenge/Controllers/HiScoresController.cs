using PoliChallenge.Contracts;
using System.Web.Http;
using PoliChallenge.Business.HiScores;

namespace PoliChallenge.Controllers
{
    public class HiScoresController : ApiController
    {
        private readonly IRepository<HiScore> _repo;

        public HiScoresController(IRepository<HiScore> hiScoresRepo)
        {
            _repo = hiScoresRepo;
        }

        public HiScoresController() : this(new HiScoresRepository()) { }
    }
}
