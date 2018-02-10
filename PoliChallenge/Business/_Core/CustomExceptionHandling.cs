using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;

namespace PoliChallenge.Business._Core
{
    public class CustomExceptionHandling : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            CheckException(context.Exception);
        }

        public override Task OnExceptionAsync(HttpActionExecutedContext context, CancellationToken cancellationToken)
        {
            OnException(context);

            return Task.FromResult<object>(null);
        }

        private void CheckException(Exception ex)
        {
            if(ex.GetType().IsAssignableFrom(typeof(TokenException)))
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            if (ex.GetType().IsAssignableFrom(typeof(ArgumentException)))
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            if (ex.GetType().IsAssignableFrom(typeof(ArgumentNullException)))
                throw new HttpResponseException(HttpStatusCode.NotFound);
        }
    }
}