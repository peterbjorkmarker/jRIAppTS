using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;

namespace RIAppDemo.BLL.Models
{

    [Dictionary(KeyName="Key", DictionaryName="TestDictionary")]
    [List(ListName = "TestList")]
    [Comment(Text="A Class for testing of conversion C# types to typescript")]
    [TypeName("IClientTestModel")]
    public class TestModel
    {
        public string Key
        {
            get;
            set;
        }

        public string SomeProperty1
        {
            get;
            set;
        }

        public byte[] SomeProperty2
        {
            get;
            set;
        }
        public IEnumerable<string> SomeProperty3
        {
            get;
            set;
        }

        public IEnumerable<LookUpProduct> MoreComplexProperty
        {
            get;
            set;
        }
    }
}
