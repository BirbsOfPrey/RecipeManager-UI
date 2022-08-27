using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authorization;

namespace RecipeManagerBff.Extensions
{
  internal static class HostingExtensions
  {
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
      builder.Services.AddAuthorization();

      builder.Services
        .AddBff()
        .AddRemoteApis();

      JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
      builder.Services
        .AddAuthentication(options =>
        {
          options.DefaultScheme = "Cookies";
          options.DefaultChallengeScheme = "oidc";
          options.DefaultSignOutScheme = "oidc";
        })
        .AddCookie("Cookies")
        .AddOpenIdConnect("oidc", options =>
        {
          //options.Authority = builder.Configuration.GetValue<string>("IdentityServer:Authority");
          //Or from environment $"https://{Environment.GetEnvironmentVariable("AUTHORITY_URI")}"
          options.Authority = "https://sinv-56060.rj.ost.ch:40000";

          options.ClientId = "bff";
          options.ClientSecret = "secret";
          options.ResponseType = "code";
          
          options.Scope.Add("api1");

          options.SaveTokens = true;
          options.GetClaimsFromUserInfoEndpoint = true;

        });

      builder.Services.AddControllers();

      return builder.Build();
    }


    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
      if (app.Environment.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseRouting();

      app.UseAuthentication();
      app.UseBff();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapBffManagementEndpoints();

        endpoints.MapGet("/local/identity", LocalIdentityHandler)
          .AsBffApiEndpoint();

        endpoints.MapControllers()
          .RequireAuthorization()
          .AsBffApiEndpoint();

        endpoints.MapRemoteBffApiEndpoint("/remote", "http://localhost:13513")
          .RequireAccessToken(Duende.Bff.TokenType.User);

      });

      app.MapFallbackToFile("index.html");

      return app;
    }


    [Authorize]
    static IResult LocalIdentityHandler(ClaimsPrincipal user)
    {
      var name = user.FindFirst("name")?.Value ?? user.FindFirst("sub")?.Value;
      return Results.Json(new { message = "Local API Success!", user = name });
    }
  }
}
