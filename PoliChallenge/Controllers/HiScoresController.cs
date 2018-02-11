﻿using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PoliChallenge.Contracts;
using PoliChallenge.Business.HiScores;
using PoliChallenge.Business._Core;
using System.Web.OData;

namespace PoliChallenge.Controllers
{
    [CustomExceptionHandling]
    [RoutePrefix("api/scores")]
    public class HiScoresController : ApiController
    {
        private readonly IRepository<HiScore> _repo;

        public HiScoresController(IRepository<HiScore> hiScoresRepo) { _repo = hiScoresRepo; }

        public HiScoresController() : this(new HiScoresRepository()) { }

        [Route("")]
        [EnableQuery]
        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().AsDTOs());

        [Route("")]
        [CustomAuthorize]
        public HttpResponseMessage Post(HiScoreDTO hiScore)
        {
            uint totalHiScores = uint.Parse(FromConfiguration.Get(SettingsName.TotalHiScores));

            if (hiScore.ToNonDTO().IsInTop(_repo, totalHiScores)) _repo.Add(hiScore);

            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
