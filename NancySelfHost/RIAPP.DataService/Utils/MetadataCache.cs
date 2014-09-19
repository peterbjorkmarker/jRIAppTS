using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Text;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils
{
    public class CachedMetadata
    {
        DbSetsDictionary _dbSets = new DbSetsDictionary();
        AssociationsDictionary _associations = new AssociationsDictionary();

        public CachedMetadata() 
        {
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
