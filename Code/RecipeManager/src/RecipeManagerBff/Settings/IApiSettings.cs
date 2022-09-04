namespace RecipeManagerBff.Settings;

public interface IApiSettings
{
  string Authority { get; set; }
  string ApiScopeName { get; set; }
  string BffClientId { get; set; }
  string BffClientSecret { get; set; }
  string ProxyRouteApi { get; set; }
  string ProxyAddressApi { get; set; }
  string ProxyRouteAuth { get; set; }
  string ProxyAddressAuth { get; set; }
}
