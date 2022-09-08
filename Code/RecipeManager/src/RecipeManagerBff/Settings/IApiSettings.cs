namespace RecipeManagerBff.Settings;

public interface IApiSettings
{
  string Authority { get; set; }
  string ApiScopeName { get; set; }
  string BffClientId { get; set; }
  string BffClientSecret { get; set; }
  string ProxyRoute { get; set; }
  string ProxyAddress { get; set; }
}
