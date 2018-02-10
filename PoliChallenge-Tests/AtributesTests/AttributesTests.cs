using PoliChallenge_Tests._Core;
using System;
using NUnit.Framework.Internal;
using NUnit.Framework;
using PoliChallenge.Business._Core;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http;

namespace PoliChallenge_Tests.AtributesTests
{
    [TestFixture]
    public class AttributesTests
    {
        CustomAuthorize authorizedAtt;
        CustomExceptionHandling exceptionAtt;

        [SetUp]
        public void Init()
        {
            authorizedAtt = new CustomAuthorize();
            exceptionAtt = new CustomExceptionHandling();
        }

        [TestCase]
        public void Should_Throw_Not_Authorized_Error()
        {
            var request = new System.Net.Http.HttpRequestMessage();
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(Store.BadToken);

            var context = new HttpActionContext() { ControllerContext = new HttpControllerContext() { Request = request } };

            Assert.Throws<TokenException>(() => authorizedAtt.OnAuthorization(context));
        }

        [TestCase]
        public void Should_Respond_Not_Found_Error()
        {
            HttpActionExecutedContext context = new HttpActionExecutedContext() { Exception = new ArgumentNullException() };
            try
            {
                exceptionAtt.OnException(context);
            }
            catch(HttpResponseException ex)
            {
                Assert.IsTrue(ex.Response.StatusCode == System.Net.HttpStatusCode.NotFound);
            }
        }

        [TestCase]
        public void Should_Respond_Bad_Request_Error()
        {
            HttpActionExecutedContext context = new HttpActionExecutedContext() { Exception = new ArgumentException() };
            try
            {
                exceptionAtt.OnException(context);
            }
            catch (HttpResponseException ex)
            {
                Assert.IsTrue(ex.Response.StatusCode == System.Net.HttpStatusCode.BadRequest);
            }
        }

        [TestCase]
        public void Should_Respond_Not_Authorized_Error()
        {
            HttpActionExecutedContext context = new HttpActionExecutedContext() { Exception = new TokenException() };
            try
            {
                exceptionAtt.OnException(context);
            }
            catch (HttpResponseException ex)
            {
                Assert.IsTrue(ex.Response.StatusCode == System.Net.HttpStatusCode.Unauthorized);
            }
        }

        [TestCase]
        public void Should_Not_Throw_Authorized_Error()
        {
            var request = new System.Net.Http.HttpRequestMessage();
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(Store.GoodToken);

            var context = new HttpActionContext() { ControllerContext = new HttpControllerContext() { Request = request } };

            Assert.DoesNotThrow(() => authorizedAtt.OnAuthorization(context));
        }
    }
}
