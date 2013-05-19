using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public class DBSetList : List<DbSetInfo>
    {
    }

    public class AssocList : List<Association>
    {
    }

    public class Metadata
    {
        private DBSetList _dbSets = new DBSetList();
        private AssocList _associations = new AssocList();

        public DBSetList DbSets
        {
            get
            {
                return _dbSets;
            }
            set
            {
                this._dbSets = value;
            }
        }


        public AssocList Associations
        {
            get
            {
                return _associations;
            }
            set
            {
                this._associations = value;
            }
        }

    }
}
