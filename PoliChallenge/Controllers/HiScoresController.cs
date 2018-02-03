using System.Net;
using System.Net.Http;
using System.Web.Http;
using PoliChallenge.Contracts;
using PoliChallenge.Business.HiScores;

namespace PoliChallenge.Controllers
{
    using Ensure.NET;

    [RoutePrefix("api/scores")]
    public class HiScoresController : ApiController
    {
        private readonly IRepository<HiScore> _repo;

        public HiScoresController(IRepository<HiScore> hiScoresRepo)
        {
            _repo = hiScoresRepo;
        }

        public HiScoresController() : this(new HiScoresRepository()) { }

        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll());

        public HttpResponseMessage Post(HiScoreDTO hiScore)
        {
            Ensure.Condition(hiScore.ToNonDTO().IsInTop(), _repo.Add(hiScore));

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
