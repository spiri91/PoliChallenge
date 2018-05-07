
using System.Web.Http;

namespace PoliChallenge
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                 name: "DefaultApi",
                 routeTemplate: "api/{controller}/{id}",
                 defaults: new { id = RouteParameter.Optional }
               );

            var cacheCow = new CacheCow.Server.CachingHandler(config, "");
            config.MessageHandlers.Add(cacheCow);
        }
    }
}
