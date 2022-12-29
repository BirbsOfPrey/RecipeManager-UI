using RecipeManagerBff.Extensions;
using Serilog;

Log.Logger = new LoggerConfiguration()
  .WriteTo.Console()
  .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
  var builder = WebApplication.CreateBuilder(args);

  var app = builder
    .ConfigureHost()
    .ConfigureSettings()
    .ConfigureServices()
    .ConfigurePipeline();

  app.Run();
}
catch (Exception ex)
{
  Log.Fatal(ex, "Unhandled exception");
}
finally
{
  Log.Information("Shut down complete");
  Log.CloseAndFlush();
}