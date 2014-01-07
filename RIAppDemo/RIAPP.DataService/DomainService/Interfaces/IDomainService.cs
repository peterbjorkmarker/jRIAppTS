using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Types;

namespace RIAPP.DataService
{
    public interface IDomainService: IDisposable
    {
        //typescript strongly typed implementation of entities, DbSet and DbContext in the text form
        string ServiceGetTypeScript(string comment=null);
        string ServiceGetXAML();
        string ServiceGetCSharp();

       //information about permissions to execute service operations for the client
        Permissions ServiceGetPermissions();
        //information about service methods, DbSets and their fields information
        MetadataResult ServiceGetMetadata();
        QueryResponse ServiceGetData(QueryRequest request);
        ChangeSet ServiceApplyChangeSet(ChangeSet changeSet);
        RefreshRowInfo ServiceRefreshRow(RefreshRowInfo rowInfo);
        InvokeResponse ServiceInvokeMethod(InvokeRequest invokeInfo);
    }
}
