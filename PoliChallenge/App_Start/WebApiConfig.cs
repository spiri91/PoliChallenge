using System.Web.Http;
using System.Web.OData.Extensions;

namespace PoliChallenge
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var cacheCow = new CacheCow.Server.CachingHandler(config, "");
            config.MessageHandlers.Add(cacheCow);
        }
    }
}
