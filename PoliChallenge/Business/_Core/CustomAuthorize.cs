﻿using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace PoliChallenge.Business._Core
{
    public class TokenException : Exception { }

    public class CustomAuthorize : AuthorizeAttribute
    {
        private static bool SkipAuthorization(HttpActionContext actionContext)
        {
            Contract.Assert(actionContext != null);

            if (actionContext.ActionDescriptor == null) return false;

            return actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                       || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (SkipAuthorization(actionContext)) return;

            Check(GetAuthorizationHeader(actionContext));
        }
           
        public override Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            this.OnAuthorization(actionContext);

            return Task.FromResult<object>(null);
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            this.OnAuthorization(actionContext);

            return true;
        }

        private string GetAuthorizationHeader(HttpActionContext context)
        {
            if (context.Request.Headers.Authorization == null)
                throw new TokenException();

            return context.Request.Headers.Authorization.Scheme;
        }

        private bool Check(string token) => IsValid(token);

        private bool IsValid(string token)
        {
            var realToken = FromConfiguration.Get(SettingsName.Token);
           
            if(realToken != token) throw new TokenException();

            return true;
        }
    }
}
