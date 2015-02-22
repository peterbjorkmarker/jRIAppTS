using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Text;
using RIAPP.DataService.Types;
using RIAPP.DataService.Resources;

namespace RIAPP.DataService.Utils
{
    public class CachedMetadata
    {
        DbSetsDictionary _dbSets = new DbSetsDictionary();
        AssociationsDictionary _associations = new AssociationsDictionary();
        IDictionary<string, MethodDescription> _invokeMethods = new Dictionary<string,MethodDescription>();
        IDictionary<string, MethodDescription> _queryMethods = new Dictionary<string,MethodDescription>();

        public CachedMetadata() 
        {
        }
        internal IDictionary<string, MethodDescription> invokeMethods { get { return this._invokeMethods; } }
        internal IDictionary<string, MethodDescription> queryMethods { get { return this._queryMethods; } }

        public MethodDescription GetQueryMethod(string name)
        {
            MethodDescription method = null;
            if (!queryMethods.TryGetValue(name, out method))
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_QUERY_NAME_INVALID, name));
            }
            return method;
        }

        public MethodDescription GetInvokeMethod(string name)
        {
            MethodDescription method = null;
            if (!invokeMethods.TryGetValue(name, out method))
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_METH_NAME_INVALID, name));
            }
            return method;
        }

        public DbSetsDictionary dbSets { get { return _dbSets; } }
        public AssociationsDictionary associations { get { return _associations; } }
        public MethodsList methodDescriptions { get; set; }
      }


    public class MetadataCache : ConcurrentDictionary<Type, CachedMetadata>
    {
        public MetadataCache()
        {
        }
    }

}
