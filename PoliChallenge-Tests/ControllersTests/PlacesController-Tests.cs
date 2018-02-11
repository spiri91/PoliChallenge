using NUnit.Framework;
using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Controllers;
using PoliChallenge_Tests._Core;
using PoliChallenge_Tests.Contracts;
using PoliChallenge_Tests.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PoliChallenge_Tests.ControllersTests
{
    [TestFixture]
    public class PlacesController_Tests : ContextDependent, IQueryDataTests, IAddDataTests, IPutDataTests, IDeleteDataTests
    {
        private PlacesController controller;

        [SetUp]
        public void SetUp()
        {
            controller = new PlacesController()
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
        }

        [TestCase]
        public void Should_Add_Entity()
        {
            var response = controller.Post(Store.TestPlace);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            var places = controller.Get().Content.ReadAsAsync<IEnumerable<PlaceDTO>>().Result.ToList();

            Assert.IsTrue(places.DoesContain(Store.TestPlace));
        }

        [TestCase]
        public void Should_Delete_Entity()
        {
            controller.Post(Store.TestPlace);

            var places = controller.Get().Content.ReadAsAsync<IEnumerable<PlaceDTO>>().Result.ToList();

            Assert.IsTrue(places.DoesContain(Store.TestPlace));

            var response = controller.Delete(Store.TestPlace.Key.Value);

            Assert.IsTrue(HttpStatusCode.NoContent == response.StatusCode);

            places = controller.Get().Content.ReadAsAsync<IEnumerable<PlaceDTO>>().Result.ToList();

            Assert.IsFalse(places.DoesContain(Store.TestPlace));
        }

        [TestCase]
        public void Should_Fetch_All()
        {
            var response = controller.Get();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var result = response.Content.ReadAsAsync<IEnumerable<PlaceDTO>>().Result.ToList();
            var dbResult = dbContext.Places.ToList().AsDTOs();

            Assert.IsTrue(result.IsSameByValue(dbResult));
        }

        [TestCase]
        public void Should_Not_Add_Invalid_Entity()
        {
            var placeDTO = Store.TestPlace;

            placeDTO.Name = string.Empty;
            placeDTO.Observations = string.Empty;

            Assert.Throws<ArgumentException>(() => controller.Post(placeDTO));
        }

        [TestCase]
        public void Should_Not_Put_Invalid_Entity()
        {
            var placeDTO = Store.TestPlace;

            var response = controller.Post(placeDTO);
            Assert.IsTrue(HttpStatusCode.Created == response.StatusCode);

            placeDTO.Name = string.Empty;
            placeDTO.Observations = string.Empty;

            Assert.Throws<ArgumentException>(() => controller.Put(placeDTO));
        }

        [TestCase]
        public void Should_Put_Entity()
        {
            controller.Post(Store.TestPlace);

            var placeDTO = Store.TestPlace;
            placeDTO.Latitude++;
            placeDTO.Longitude++;
            placeDTO.Name = "Test Place";
            placeDTO.Observations = "Test Observations";

           var response =  controller.Put(placeDTO);

            Assert.IsTrue(HttpStatusCode.NoContent == response.StatusCode);

            var result = controller.Get().Content.ReadAsAsync<IEnumerable<PlaceDTO>>().Result.ToList();

            Assert.IsTrue(result.DoesContain(placeDTO));
            Assert.IsFalse(result.DoesContain(Store.TestPlace));
        }

        [TestCase]
        public void Should_Throw_Error_On_Not_Existing_Key_For_Delete()
        {
            Assert.Throws<InvalidOperationException>(() => controller.Delete(Guid.NewGuid()));
        }
    }
}
