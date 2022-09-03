using System.ComponentModel.DataAnnotations;

namespace RecipeManagerBff.Settings;

public class ApiSettings : IApiSettings
{
  [Required] 
  public string Authority { get; set; } = null!;
  [Required]
  public string ApiScopeName { get; set; } = null!;
  [Required]
  public string BffClientId { get; set; } = null!;
  [Required]
  public string BffClientSecret { get; set; } = null!;
  [Required]
  public string ProxyRoute { get; set; } = null!;
  [Required]
  public string ProxyAddress { get; set; } = null!;
}