using PoliChallenge.Business._Core;
using PoliChallenge.Business.Places;
using PoliChallenge.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;

namespace PoliChallenge.Controllers
{
    [RoutePrefix("api/places")]
    public class PlacesController : ApiController
    {
        private readonly IRepository<Place> _repo;

        public PlacesController(IRepository<Place> placesRepository)
        {
            _repo = placesRepository;
        }

        public PlacesController() : this(new PlacesRepository()){ }


        /// <summary>
        /// Get all Places in game
        /// </summary>
        /// <returns></returns>
        /// <response code="200"></response>
        [Route("")]
        [EnableQuery]
        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().AsDTOs());

        [Route("GetShuffled")]
        public HttpResponseMessage GetShuffled() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().Shuffle().AsDTOs());

        [Route("")]
        [HttpPost]
        public HttpResponseMessage Post(PlaceDTO dto)
        {
            _repo.Add(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [Route("")]
        public HttpResponseMessage Delete(Guid key)
        {
            _repo.Delete(_repo.Query().Single(x => x.Key == key));
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        [Route("")]
        public HttpResponseMessage Put(PlaceDTO dto)
        {
            _repo.Put(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
