﻿using System.Runtime.Serialization;
using System.ComponentModel;


namespace RIAPP.DataService.Types
{
    [DataContract]
    public class FieldRel
    {
        public FieldRel()
        {
        }
        [DataMember]
        public string parentField { get; set; }
        [DataMember]
        public string childField { get; set; }
    }

  
    [DataContract]
    public class Association
    {
        private FieldRelList _fieldRelations = new FieldRelList();

        public Association()
        { 
        }
        
        /// <summary>
        /// unique association name
        /// </summary>
        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string parentDbSetName { get; set; }
        [DataMember]
        public string childDbSetName { get; set; }
        
        /// <summary>
        /// navigation property name from child entity to parent entity
        /// </summary>
        [DataMember]
        public string childToParentName { get; set; }

        /// <summary>
        /// navigation property name from parent entity to children entity
        /// </summary>
        [DataMember]
        public string parentToChildrenName { get; set; }

        [DataMember]
        public DeleteAction onDeleteAction { get; set; }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        [DataMember]
        public FieldRelList fieldRels
        {
            get
            {
                return _fieldRelations;
            }
        }
    }
}
