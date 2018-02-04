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

        public HiScoresController(IRepository<HiScore> hiScoresRepo) { _repo = hiScoresRepo; }

        public HiScoresController() : this(new HiScoresRepository()) { }

        [Route("")]
        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().AsDTOs());

        [Route("")]
        public HttpResponseMessage Post(HiScoreDTO hiScore)
        {
            // TODO extract this to configuration file
            uint totalHiScores = 50;

            Ensure.Condition(hiScore.ToNonDTO().IsInTop(_repo, totalHiScores), () => _repo.Add(hiScore));

            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
