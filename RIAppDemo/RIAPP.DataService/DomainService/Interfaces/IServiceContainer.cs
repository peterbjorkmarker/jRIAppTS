using System;
namespace RIAPP.DataService
{
    public interface IServiceContainer
    {
        RIAPP.DataService.Security.IAuthorizer Authorizer { get; }
        RIAPP.DataService.Utils.Interfaces.IDataHelper DataHelper { get; }
        RIAPP.DataService.Utils.Interfaces.IQueryHelper QueryHelper { get; }
        RIAPP.DataService.Utils.Interfaces.ISerializer Serializer { get; }
        RIAPP.DataService.Utils.Interfaces.IValidationHelper ValidationHelper { get; }
        RIAPP.DataService.Utils.Interfaces.IValueConverter ValueConverter { get; }
    }
}
