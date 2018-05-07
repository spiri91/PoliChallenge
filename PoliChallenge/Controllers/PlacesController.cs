using PoliChallenge.Business._Core;
using PoliChallenge.Business.Places;
using PoliChallenge.Contracts;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.OData;

namespace PoliChallenge.Controllers
{
    [CustomAuthorize]
    [CustomExceptionHandling]
    [RoutePrefix("api/places")]
    public class PlacesController : ApiController
    {
        private readonly IRepository<Place> _repo;

        public PlacesController(IRepository<Place> placesRepository)
        {
            _repo = placesRepository;
        }

        public PlacesController() : this(new PlacesRepository()) { }

        /// <summary>
        /// OData enabled
        /// Get all Places in game
        /// </summary>
        /// <returns></returns>
        /// <response code="200"></response>
        [Route("")]
        [EnableQuery]
        [AllowAnonymous]
        [HttpGet]
        public HttpResponseMessage Get() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().AsDTOs());

        /// <summary>
        /// Not querable with OData
        /// Get all Places in game in random order
        /// </summary>
        /// <returns></returns>
        /// <response code="200"></response>
        [Route("GetShuffled")]
        [AllowAnonymous]
        public HttpResponseMessage GetShuffled() => Request.CreateResponse(HttpStatusCode.OK, _repo.FetchAll().Shuffle().AsDTOs());

        /// <summary>
        /// Creates a new Place if values passed are valid.
        /// Doesn't return the newly created item!
        /// </summary>
        /// <param name="Place"></param>
        /// <returns code="201"></returns>
        [Route("")]
        [HttpPost]
        public HttpResponseMessage Post(PlaceDTO dto)
        {
            _repo.Add(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        /// <summary>
        /// Deletes the entity with the provided key
        /// </summary>
        /// <param name="key"></param>
        /// <returns code="204"></returns>
        [Route("{key}")]
        public HttpResponseMessage Delete(Guid key)
        {
            _repo.Delete(_repo.Query().Single(x => x.Key == key));
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// It changes the entity with this , if one is already present in the DB
        /// </summary>
        /// <param name="dto"></param>
        /// <returns code="204"></returns>
        [Route("")]
        public HttpResponseMessage Put(PlaceDTO dto)
        {
            _repo.Put(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
