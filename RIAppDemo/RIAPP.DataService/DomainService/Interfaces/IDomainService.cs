using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public interface IDomainService: IDisposable
    {
        //typescript strongly typed implementation of entities, DbSet and DbContext in the text form
        string ServiceGetTypeScript(string comment=null);
        string ServiceGetXAML();
        string ServiceGetCSharp();

       //information about permissions to execute service operations for the client
        PermissionsInfo ServiceGetPermissions();
        //information about service methods, DbSets and their fields information
        MetadataInfo ServiceGetMetadata();
        QueryResponse ServiceGetData(QueryRequest getInfo);
        ChangeSet ServiceApplyChangeSet(ChangeSet changeSet);
        RefreshRowInfo ServiceRefreshRow(RefreshRowInfo getInfo);
        InvokeResponse ServiceInvokeMethod(InvokeRequest parameters);
    }
}
