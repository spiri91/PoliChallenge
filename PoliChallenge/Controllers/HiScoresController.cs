using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PoliChallenge.Contracts;
using PoliChallenge.Business.HiScores;
using PoliChallenge.Business._Core;
using System.Web.OData;

namespace PoliChallenge.Controllers
{
    [CustomAuthorize]
    [CustomExceptionHandling]
    [RoutePrefix("api/scores")]
    public class HiScoresController : ApiController
    {
        private readonly IRepository<HiScore> _repo;

        public HiScoresController(IRepository<HiScore> hiScoresRepo) { _repo = hiScoresRepo; }

        public HiScoresController() : this(new HiScoresRepository()) { }

        /// <summary>
        /// OData enabled
        /// Gets the Hi Scores of this game
        /// </summary>
        /// <returns code="200"></returns>
        [Route("")]
        [EnableQuery]
        [AllowAnonymous]
        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().AsDTOs());

        /// <summary>
        /// If the score is in top it will be saved
        /// </summary>
        /// <param name="hiScore"></param>
        /// <returns code="201"></returns>
        [Route("")]
        public HttpResponseMessage Post(HiScoreDTO hiScore)
        {
            uint totalHiScores = uint.Parse(FromConfiguration.Get(SettingsName.TotalHiScores));

            if (hiScore.ToNonDTO().IsInTop(_repo, totalHiScores)) _repo.Add(hiScore);

            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
