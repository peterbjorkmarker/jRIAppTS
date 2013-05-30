using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;


namespace RIAPP.DataService
{
   
    public class Metadata
    {
        private DBSetList _dbSets = new DBSetList();
        private AssocList _associations = new AssocList();

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        public DBSetList DbSets
        {
            get
            {
                return _dbSets;
            }
        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        public AssocList Associations
        {
            get
            {
                return _associations;
            }
        }

    }
}
