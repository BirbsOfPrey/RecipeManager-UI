using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
  options.ForwardedHeaders =
    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

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
    options.Authority = "http://sinv-56060.rj.ost.ch:40000";

    options.RequireHttpsMetadata = false;

    options.ClientId = "bff";
    options.ClientSecret = "secret";
    options.ResponseType = "code";

    //options.Scope.Clear(); //This causes Exception on IdentityServer!
    options.Scope.Add("api1");
    //options.Scope.Add("openid");
    //options.Scope.Add("profile");
    //options.Scope.Add("offline_access");

    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;

  });

builder.Services.AddControllers();

var app = builder.Build();

app.UseForwardedHeaders();

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

  endpoints.MapRemoteBffApiEndpoint("/remote", "http://recipemanagerapi:80")
    .RequireAccessToken(Duende.Bff.TokenType.User);

});

app.MapFallbackToFile("index.html");

app.Run();


[Authorize]
static IResult LocalIdentityHandler(ClaimsPrincipal user)
{
  var name = user.FindFirst("name")?.Value ?? user.FindFirst("sub")?.Value;
  return Results.Json(new { message = "Local API Success!", user = name });
}
