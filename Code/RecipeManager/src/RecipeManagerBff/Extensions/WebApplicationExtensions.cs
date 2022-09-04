using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using Duende.Bff.Yarp;
using RecipeManagerBff.Settings;
using Serilog;

namespace RecipeManagerBff.Extensions
{
  internal static class WebApplicationExtensions
  {
    public static WebApplicationBuilder ConfigureHost(this WebApplicationBuilder builder)
    {
      builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext()
        .ReadFrom.Configuration(ctx.Configuration));

      builder.Host.ConfigureAppConfiguration((_, config) =>
      {
        var fileName = "appconfig.json";
        if (!File.Exists(fileName))
        {
          Log.Warning($"Starting with a dummy file. Some services may not work without the valid file: {fileName}");
          fileName = "dummyappconfig.json";
        }
        config.AddJsonFile(fileName,
          optional: false,
          reloadOnChange: true);
      });

      return builder;
    }

    public static WebApplicationBuilder ConfigureSettings(this WebApplicationBuilder builder)
    {
      builder.Services.AddSingleton<IApiSettings>(_ => ValidSettings<ApiSettings>(builder, nameof(ApiSettings)));

      return builder;
    }

    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
      builder.Services.AddAuthorization();

      builder.Services
        .AddBff()
        .AddRemoteApis();

      var apiSettings = builder.Services.BuildServiceProvider().GetRequiredService<IApiSettings>();
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
          options.Authority = apiSettings.Authority;

          options.ClientId = apiSettings.BffClientId;
          options.ClientSecret = apiSettings.BffClientSecret;
          options.ResponseType = "code";
          
          options.Scope.Add(apiSettings.ApiScopeName);

          options.SaveTokens = true;
          options.GetClaimsFromUserInfoEndpoint = true;

        });

      builder.Services.AddControllers();

      return builder.Build();
    }


    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
      app.Use((context, next) =>
      {
        //Required, as it is hosted behind reverse proxy (forwarded headers middleware didn't work)
        context.Request.Scheme = "https";
        return next();
      });

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

      var apiSettings = app.Services.GetRequiredService<IApiSettings>();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapBffManagementEndpoints();

        endpoints.MapControllers()
          .RequireAuthorization()
          .AsBffApiEndpoint();

        endpoints.MapRemoteBffApiEndpoint(apiSettings.ProxyRoute, apiSettings.ProxyAddress)
          .RequireAccessToken();

      });

      app.MapFallbackToFile("index.html");

      return app;
    }

    private static T ValidSettings<T>(WebApplicationBuilder builder, string sectionName) where T : class
    {
      var settings = builder.Configuration.GetSection(sectionName).Get<T>();
      if (!Validator.TryValidateObject(settings, new ValidationContext(settings), new List<ValidationResult>(), true))
      {
        throw new Exception($"Application settings {sectionName} not valid!");
      }
      return settings;
    }
  }
}
