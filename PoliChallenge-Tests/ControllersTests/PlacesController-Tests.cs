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
            throw new NotImplementedException();
        }

        [TestCase]
        public void Should_Delete_Entity()
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        [TestCase]
        public void Should_Not_Put_Invalid_Entity()
        {
            throw new NotImplementedException();
        }

        [TestCase]
        public void Should_Put_Entity()
        {
            throw new NotImplementedException();
        }

        [TestCase]
        public void Should_Throw_Error_On_Not_Existing_Key_For_Delete()
        {
            throw new NotImplementedException();
        }
    }
}
